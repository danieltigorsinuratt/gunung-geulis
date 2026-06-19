<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\User;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class CashController extends Controller
{
    /**
     * Dashboard Pembukuan - Role-based
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $role = $user->role_type;
        $divisi = $user->divisi;

        // Base query
        $query = Transaction::query();

        // Admin Logistik & Sekretaris: hanya lihat divisi sendiri
        if ($role === 'admin' && $divisi) {
            $query->where('divisi', $divisi);
        }
        // Manager & Superadmin: lihat semua

        // KPI
        $totalPemasukan = (clone $query)->pemasukan()->approved()->sum('nominal');
        $totalPengeluaran = (clone $query)->pengeluaran()->approved()->sum('nominal');
        $saldoKas = $totalPemasukan - $totalPengeluaran;
        $pemasukanBulanIni = (clone $query)->pemasukan()->approved()->thisMonth()->sum('nominal');
        $pengeluaranBulanIni = (clone $query)->pengeluaran()->approved()->thisMonth()->sum('nominal');

        // Pending approval (Manager & Superadmin)
        $pendingApproval = 0;
        if ($role === 'manajer' || $role === 'superadmin') {
            $pendingApproval = Transaction::pending()->count();
        }

        // KPI khusus Admin Logistik
        $invoiceVendor = 0;
        $vendorAktif = 0;
        if ($role === 'admin' && $divisi === 'Tim Logistik') {
            $invoiceVendor = (clone $query)->pengeluaran()->pending()->count();
            $vendorAktif = (clone $query)->pengeluaran()->approved()->distinct('pihak')->count('pihak');
        }

        // KPI khusus Admin Sekretaris
        $pembayaranMasuk = 0;
        $piutangBelumLunas = 0;
        if ($role === 'admin' && $divisi === 'Sekretaris') {
            $pembayaranMasuk = (clone $query)->pemasukan()->approved()->thisMonth()->count();
            $piutangBelumLunas = (clone $query)->pemasukan()->pending()->count();
        }

        // Donut Pemasukan
        $distribusiPemasukan = (clone $query)
            ->pemasukan()->approved()
            ->select('kategori', DB::raw('SUM(nominal) as total'))
            ->groupBy('kategori')->orderByDesc('total')->get()
            ->map(fn($item) => [
                'kategori' => $item->kategori,
                'total' => (float) $item->total,
                'persentase' => $totalPemasukan > 0 ? round(($item->total / $totalPemasukan) * 100, 1) : 0,
            ]);

        // Donut Pengeluaran
        $distribusiPengeluaran = (clone $query)
            ->pengeluaran()->approved()
            ->select('kategori', DB::raw('SUM(nominal) as total'))
            ->groupBy('kategori')->orderByDesc('total')->get()
            ->map(fn($item) => [
                'kategori' => $item->kategori,
                'total' => (float) $item->total,
                'persentase' => $totalPengeluaran > 0 ? round(($item->total / $totalPengeluaran) * 100, 1) : 0,
            ]);

        // Cash Flow 12 bulan
        $cashFlow = collect();
        for ($i = 1; $i <= 12; $i++) {
            $p = (clone $query)->pemasukan()->approved()->whereMonth('tanggal', $i)->whereYear('tanggal', now()->year)->sum('nominal');
            $k = (clone $query)->pengeluaran()->approved()->whereMonth('tanggal', $i)->whereYear('tanggal', now()->year)->sum('nominal');
            $cashFlow->push([
                'bulan' => $this->getNamaBulan($i),
                'pemasukan' => (float) $p,
                'pengeluaran' => (float) $k,
                'saldo' => (float) ($p - $k),
            ]);
        }

        // Transaksi Terbaru
        $transaksiTerbaru = (clone $query)->with('creator')->orderByDesc('tanggal')->limit(10)->get()
            ->map(fn($t) => [
                'id' => $t->id,
                'tanggal' => $t->tanggal->format('d/m/Y'),
                'referensi' => $t->referensi,
                'deskripsi' => $t->deskripsi,
                'jenis' => $t->jenis,
                'nominal' => (float) $t->nominal,
                'status' => $t->status,
                'pihak' => $t->pihak,
                'kategori' => $t->kategori,
            ]);

        // Pemasukan & Pengeluaran Terbaru
        $pemasukanTerbaru = (clone $query)->pemasukan()->approved()->orderByDesc('tanggal')->limit(5)->get()
            ->map(fn($t) => ['id' => $t->id, 'tanggal' => $t->tanggal->format('d/m/Y'), 'referensi' => $t->referensi, 'pihak' => $t->pihak, 'kategori' => $t->kategori, 'nominal' => (float) $t->nominal]);

        $pengeluaranTerbaru = (clone $query)->pengeluaran()->approved()->orderByDesc('tanggal')->limit(5)->get()
            ->map(fn($t) => ['id' => $t->id, 'tanggal' => $t->tanggal->format('d/m/Y'), 'referensi' => $t->referensi, 'pihak' => $t->pihak, 'kategori' => $t->kategori, 'nominal' => (float) $t->nominal]);

        // Superadmin extras
        $totalUsers = 0;
        $totalDocuments = 0;
        $totalTransactions = 0;
        $activeUsers = 0;
        if ($role === 'superadmin') {
            $totalUsers = User::count();
            $totalDocuments = Document::count();
            $totalTransactions = Transaction::count();
            $activeUsers = User::where('status', 'Active')->count();
        }

        return Inertia::render('Cash/Dashboard', [
            'saldoKas' => (float) $saldoKas,
            'totalPemasukan' => (float) $totalPemasukan,
            'totalPengeluaran' => (float) $totalPengeluaran,
            'pemasukanBulanIni' => (float) $pemasukanBulanIni,
            'pengeluaranBulanIni' => (float) $pengeluaranBulanIni,
            'selisihKas' => (float) ($pemasukanBulanIni - $pengeluaranBulanIni),
            'pendingApproval' => $pendingApproval,
            'invoiceVendor' => $invoiceVendor,
            'vendorAktif' => $vendorAktif,
            'pembayaranMasuk' => $pembayaranMasuk,
            'piutangBelumLunas' => $piutangBelumLunas,
            'distribusiPemasukan' => $distribusiPemasukan,
            'distribusiPengeluaran' => $distribusiPengeluaran,
            'cashFlow' => $cashFlow,
            'transaksiTerbaru' => $transaksiTerbaru,
            'pemasukanTerbaru' => $pemasukanTerbaru,
            'pengeluaranTerbaru' => $pengeluaranTerbaru,
            'userRole' => $role,
            'userDivisi' => $divisi,
            'totalUsers' => $totalUsers,
            'totalDocuments' => $totalDocuments,
            'totalTransactions' => $totalTransactions,
            'activeUsers' => $activeUsers,
        ]);
    }

    /**
     * Simpan transaksi baru
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $role = $user->role_type;

        // Hanya admin & superadmin bisa input
        if (!in_array($role, ['admin', 'superadmin'])) {
            abort(403, 'Anda tidak memiliki akses untuk input transaksi.');
        }

        $validated = $request->validate([
            'jenis' => 'required|in:pemasukan,pengeluaran',
            'referensi' => 'required|string|max:255|unique:transactions,referensi',
            'deskripsi' => 'required|string|max:255',
            'kategori' => 'required|string|max:255',
            'nominal' => 'required|numeric|min:0',
            'metode_bayar' => 'nullable|string|max:255',
            'pihak' => 'required|string|max:255',
            'tanggal' => 'required|date',
            'surat_referensi' => 'nullable|string|max:255',
            'catatan' => 'nullable|string',
            'file_bukti' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:10240',
        ]);

        // Upload file bukti
        $filePath = null;
        $fileOriginal = null;
        if ($request->hasFile('file_bukti')) {
            $file = $request->file('file_bukti');
            $filePath = time() . '_' . $user->id . '.' . $file->getClientOriginalExtension();
            $file->storeAs('bukti', $filePath, 'public');
            $fileOriginal = $file->getClientOriginalName();
        }

        $transaction = Transaction::create([
            'jenis' => $validated['jenis'],
            'referensi' => $validated['referensi'],
            'deskripsi' => $validated['deskripsi'],
            'kategori' => $validated['kategori'],
            'nominal' => $validated['nominal'],
            'metode_bayar' => $validated['metode_bayar'] ?? null,
            'pihak' => $validated['pihak'],
            'divisi' => $user->divisi,
            'tanggal' => $validated['tanggal'],
            'file_bukti' => $filePath,
            'file_bukti_original' => $fileOriginal,
            'surat_referensi' => $validated['surat_referensi'] ?? null,
            'catatan' => $validated['catatan'] ?? null,
            'status' => 'pending',
            'created_by' => $user->id,
        ]);

        return redirect()->route('cash.dashboard')->with('success', 'Transaksi berhasil disimpan dan menunggu approval.');
    }

    /**
     * Approve transaksi (Manager/Superadmin)
     */
    public function approve(Request $request, Transaction $transaction)
    {
        $user = $request->user();

        if (!in_array($user->role_type, ['manajer', 'superadmin'])) {
            abort(403);
        }

        if ($transaction->status !== 'pending') {
            return back()->with('error', 'Transaksi tidak dapat di-approve.');
        }

        $transaction->update([
            'status' => 'approved',
            'approved_by' => $user->id,
            'approved_at' => now(),
        ]);

        return back()->with('success', 'Transaksi berhasil disetujui.');
    }

    /**
     * Reject transaksi (Manager/Superadmin)
     */
    public function reject(Request $request, Transaction $transaction)
    {
        $user = $request->user();

        if (!in_array($user->role_type, ['manajer', 'superadmin'])) {
            abort(403);
        }

        $request->validate([
            'rejection_notes' => 'required|string|max:500',
        ]);

        $transaction->update([
            'status' => 'rejected',
            'rejection_notes' => $request->rejection_notes,
            'approved_by' => $user->id,
            'approved_at' => now(),
        ]);

        return back()->with('success', 'Transaksi ditolak.');
    }

    /**
     * Buku Kas (Ledger)
     */
    public function ledger(Request $request)
    {
        $user = $request->user();
        $role = $user->role_type;

        $query = Transaction::approved()->orderBy('tanggal', 'asc');

        if ($role === 'admin' && $user->divisi) {
            $query->where('divisi', $user->divisi);
        }

        $transactions = $query->get();

        // Hitung saldo berjalan
        $saldoBerjalan = 0;
        $ledger = $transactions->map(function ($t) use (&$saldoBerjalan) {
            if ($t->jenis === 'pemasukan') {
                $saldoBerjalan += $t->nominal;
            } else {
                $saldoBerjalan -= $t->nominal;
            }

            return [
                'id' => $t->id,
                'tanggal' => $t->tanggal->format('d/m/Y'),
                'referensi' => $t->referensi,
                'deskripsi' => $t->deskripsi,
                'kas_masuk' => $t->jenis === 'pemasukan' ? (float) $t->nominal : 0,
                'kas_keluar' => $t->jenis === 'pengeluaran' ? (float) $t->nominal : 0,
                'saldo_berjalan' => (float) $saldoBerjalan,
            ];
        });

        return Inertia::render('Cash/Ledger', [
            'ledger' => $ledger,
            'userRole' => $role,
        ]);
    }

    private function getNamaBulan(int $bulan): string
    {
        return match($bulan) {
            1 => 'Jan', 2 => 'Feb', 3 => 'Mar', 4 => 'Apr',
            5 => 'Mei', 6 => 'Jun', 7 => 'Jul', 8 => 'Agu',
            9 => 'Sep', 10 => 'Okt', 11 => 'Nov', 12 => 'Des',
            default => '',
        };
    }
}
