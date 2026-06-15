<?php

namespace App\Services;

use App\Models\Document;
use Illuminate\Support\Facades\DB;

class NumberingService
{
    /**
     * Generate nomor surat resmi.
     * Format: [Kode]/[Urut]/GGF/[Bulan Romawi]/[Tahun]
     * Contoh: ADM/001/GGF/VI/2026
     */
    public function generateNomorSurat(string $jenis): string
    {
        $kode = $this->getKodeJenis($jenis);
        $bulanRomawi = $this->getBulanRomawi(now()->month);
        $tahun = now()->year;

        // Hitung urutan surat berdasarkan jenis dan bulan/tahun
        $urutan = Document::where('jenis', $jenis)
            ->whereYear('created_at', $tahun)
            ->whereMonth('created_at', now()->month)
            ->where('status', 'approved')
            ->count() + 1;

        return sprintf('%s/%03d/GGF/%s/%d', $kode, $urutan, $bulanRomawi, $tahun);
    }

    /**
     * Get kode singkatan untuk jenis dokumen.
     */
    private function getKodeJenis(string $jenis): string
    {
        $kodes = [
            'Surat Masuk' => 'SM',
            'Surat Keluar' => 'SK',
            'Surat Internal' => 'SI',
            'Surat Keputusan' => 'SK',
            'Surat Jalan' => 'SJ',
            'Invois' => 'INV',
            'Laporan' => 'LPR',
            'Izin' => 'IZN',
            'Memo' => 'MEM',
            'Kontrak' => 'KNT',
            'Lainnya' => 'ADM',
        ];

        return $kodes[$jenis] ?? 'ADM';
    }

    /**
     * Convert bulan ke format Romawi.
     */
    private function getBulanRomawi(int $bulan): string
    {
        $romawi = [
            1 => 'I',
            2 => 'II',
            3 => 'III',
            4 => 'IV',
            5 => 'V',
            6 => 'VI',
            7 => 'VII',
            8 => 'VIII',
            9 => 'IX',
            10 => 'X',
            11 => 'XI',
            12 => 'XII',
        ];

        return $romawi[$bulan] ?? 'I';
    }
}
