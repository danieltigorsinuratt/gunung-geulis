<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class LaporanController extends Controller
{
    /**
     * Display laporan page with statistics.
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        $startDate = $request->input('start_date', Carbon::now()->startOfMonth()->format('Y-m-d'));
        $endDate = $request->input('end_date', Carbon::now()->format('Y-m-d'));

        $query = Document::whereBetween('created_at', [$startDate, Carbon::parse($endDate)->endOfDay()]);

        // Filter by division for non-superadmin
        if (!$user->isSuperAdmin()) {
            $query->where('ditugaskan_ke', $user->divisi);
        }

        $totalDocuments = (clone $query)->count();
        $documentsByStatus = (clone $query)
            ->selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status');

        $documentsByJenis = (clone $query)
            ->selectRaw('jenis, COUNT(*) as count')
            ->groupBy('jenis')
            ->pluck('count', 'jenis');

        $documentsByPriority = (clone $query)
            ->selectRaw('prioritas, COUNT(*) as count')
            ->groupBy('prioritas')
            ->pluck('count', 'prioritas');

        // Daily document count for chart
        $dailyCount = (clone $query)
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return Inertia::render('Laporan/Index', [
            'stats' => [
                'total' => $totalDocuments,
                'by_status' => $documentsByStatus,
                'by_jenis' => $documentsByJenis,
                'by_prioritas' => $documentsByPriority,
                'daily_count' => $dailyCount,
            ],
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ],
        ]);
    }
}
