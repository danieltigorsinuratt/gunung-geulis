<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $user = $request->user();
        $isSuperAdmin = $user->role_type === 'superadmin';
        $isManager = $user->role_type === 'manager';
        $selectedDivisi = $request->query('divisi');

        // Superadmin tanpa divisi dipilih → tampilkan halaman pilih divisi
        if ($isSuperAdmin && !$selectedDivisi) {
            $divisions = ['Tim Logistik', 'Tim Legal', 'Sekretaris'];

            $divisionStats = collect($divisions)->map(function ($divisi) {
                $total = Document::where('ditugaskan_ke', $divisi)->count();
                $diproses = Document::where('ditugaskan_ke', $divisi)->where('status', 'Diproses')->count();
                $pending = Document::where('ditugaskan_ke', $divisi)->where('status', 'Pending')->count();
                $selesai = Document::where('ditugaskan_ke', $divisi)->where('status', 'Selesai')->count();
                $diarsip = Document::where('ditugaskan_ke', $divisi)->where('status', 'Diarsip')->count();
                $userCount = User::where('divisi', $divisi)->where('status', 'Active')->count();

                return [
                    'name'        => $divisi,
                    'total'       => $total,
                    'diproses'    => $diproses,
                    'pending'     => $pending,
                    'selesai'     => $selesai,
                    'diarsip'     => $diarsip,
                    'userCount'   => $userCount,
                ];
            });

            return Inertia::render('Dashboard/SelectDivision', [
                'divisions' => $divisionStats,
            ]);
        }

        // Base query: semua dokumen untuk dashboard
        $baseQuery = Document::query();
        if ($isSuperAdmin && $selectedDivisi) {
            $baseQuery->where('ditugaskan_ke', $selectedDivisi);
        } elseif (!$isSuperAdmin) {
            $baseQuery->where('ditugaskan_ke', $user->divisi);
        }

        // 1. Total Dokumen (approved & rejected saja, pending tidak dihitung)
        $totalDocuments = (clone $baseQuery)->whereIn('status', ['approved', 'rejected'])->count();

        // 2. Dokumen Disetujui
        $approvedDocuments = (clone $baseQuery)->where('status', 'approved')->count();

        // 3. Dokumen Ditolak
        $rejectedDocuments = (clone $baseQuery)->where('status', 'rejected')->count();

        // 4. Dokumen Urgent (prioritas URGENT atau segera kedaluwarsa)
        $urgentDocuments = (clone $baseQuery)
            ->where(function ($q) {
                $q->where('prioritas', 'URGENT')
                  ->orWhere(function ($q2) {
                      $q2->whereNotNull('batas_waktu')
                         ->where('batas_waktu', '<=', now()->addDays(3))
                         ->where('batas_waktu', '>=', now());
                  });
            })
            ->count();

        // 5. Dokumen (max 10)
        $documents = (clone $baseQuery)
            ->with(['creator', 'approvals'])
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($doc) {
                // Get rejection notes if status is rejected
                $rejectionNotes = null;
                if ($doc->status === 'rejected') {
                    $rejectedApproval = $doc->approvals->where('status', 'rejected')->first();
                    $rejectionNotes = $rejectedApproval?->notes;
                }

                return [
                    'id'              => $doc->id,
                    'nomor'           => $doc->nomor_surat,
                    'perihal'         => $doc->perihal,
                    'jenis'           => strtolower($doc->jenis ?? '-'),
                    'status'          => $doc->status,
                    'file_url'        => $doc->file_path ? '/files/documents/' . $doc->file_path : null,
                    'file_name'       => $doc->file_original_name,
                    'rejection_notes' => $rejectionNotes,
                ];
            });

        // 6. Peringatan Urgent (hanya untuk manager)
        $urgentWarnings = [];
        if ($user->role_type === 'manager' || $isSuperAdmin) {
            $urgentWarnings = (clone $baseQuery)
                ->where(function ($q) {
                    $q->where('prioritas', 'URGENT')
                      ->orWhere(function ($q2) {
                          $q2->whereNotNull('batas_waktu')
                             ->where('batas_waktu', '<=', now()->addDays(3))
                             ->where('batas_waktu', '>=', now());
                      });
                })
                ->orderBy('batas_waktu', 'asc')
                ->limit(5)
                ->get()
                ->map(function ($doc) {
                    $daysLeft = $doc->batas_waktu ? max(0, (int) now()->diffInDays($doc->batas_waktu, false)) : null;

                    if ($daysLeft !== null) {
                        $badge = $daysLeft === 0 ? 'HARI INI' : 'KEDALUWARSA ' . $daysLeft . ' HARI';
                    } else {
                        $badge = $doc->masa_berlaku ? 'MASA BERLAKU' : 'DEADLINE';
                    }

                    $jenisLabel = match($doc->jenis) {
                        'masuk' => 'Surat Masuk',
                        'keluar' => 'Surat Keluar',
                        'internal' => 'Surat Internal',
                        'keputusan' => 'Surat Keputusan',
                        default => 'Dokumen',
                    };
                    $description = $jenisLabel . ' nomor #' . $doc->nomor_surat . ' membutuhkan perhatian.';

                    return [
                        'id'          => $doc->id,
                    'title'       => $doc->perihal,
                    'description' => $description,
                    'badge'       => $badge,
                    'color'       => $daysLeft !== null && $daysLeft <= 1 ? 'red' : 'amber',
                ];
            });
        }

        // 7. Aktivitas Terbaru — semua aktivitas hari ini (termasuk arsip)
        $allDocsToday = Document::where(function ($q) use ($baseQuery) {
                $q->whereDate('created_at', today())
                  ->orWhere(function ($q2) {
                      $q2->whereDate('updated_at', today());
                  });
            })
            ->orderBy('updated_at', 'desc')
            ->limit(10)
            ->get();

        $activities = $allDocsToday->map(function ($doc) {
            if ($doc->status === 'Diarsip') {
                return [
                    'id'          => $doc->id,
                    'title'       => $doc->perihal . ' dengan nomor ' . $doc->nomor_surat,
                    'description' => 'Status telah diarsipkan | ' . $doc->ditugaskan_ke,
                    'time'        => $doc->updated_at->format('H:i'),
                    'icon'        => 'upload',
                    'color'       => 'lightgreen',
                ];
            }
            if ($doc->status === 'Selesai') {
                return [
                    'id'          => $doc->id,
                    'title'       => $doc->perihal . ' dengan nomor ' . $doc->nomor_surat,
                    'description' => 'Status telah selesai | ' . $doc->ditugaskan_ke,
                    'time'        => $doc->updated_at->format('H:i'),
                    'icon'        => 'check',
                    'color'       => 'lightgreen',
                ];
            }
            return [
                'id'          => $doc->id,
                'title'       => 'Dokumen Baru: ' . $doc->perihal,
                'description' => 'Ditugaskan ke ' . $doc->ditugaskan_ke . ' oleh ' . ($doc->creator->name ?? '-'),
                'time'        => $doc->created_at->format('H:i'),
                'icon'        => 'upload',
                'color'       => 'green',
            ];
        })->take(5)->values();

        return Inertia::render('Dashboard', [
            'totalDocuments'      => $totalDocuments,
            'approvedDocuments'   => $approvedDocuments,
            'rejectedDocuments'   => $rejectedDocuments,
            'urgentDocuments'     => $urgentDocuments,
            'documents'           => $documents,
            'urgentWarnings'      => $urgentWarnings,
            'activities'          => $activities,
            'selectedDivisi'      => $selectedDivisi ?? $user->divisi,
            'isSuperAdmin'        => $isSuperAdmin,
            'userRole'            => $user->role_type,
        ]);
    }
}
