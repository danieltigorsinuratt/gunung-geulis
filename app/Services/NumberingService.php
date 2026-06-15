<?php

namespace App\Services;

use App\Models\Document;

class NumberingService
{
    /**
     * Generate nomor surat resmi.
     * Format: GG/[Kode Divisi]/[Urut]/[Tahun]
     * Contoh: GG/ADM/1043/2023
     */
    public function generateNomorSurat(string $jenis, string $divisi = null): string
    {
        $kode = $this->getKodeDivisi($jenis, $divisi);
        $tahun = now()->year;

        // Hitung urutan surat berdasarkan kode divisi dan tahun
        $urutan = Document::where('nomor_surat', 'like', "GG/{$kode}/%/{$tahun}")
            ->count() + 1;

        return sprintf('GG/%s/%04d/%d', $kode, $urutan, $tahun);
    }

    /**
     * Get kode divisi berdasarkan jenis dokumen.
     */
    private function getKodeDivisi(string $jenis, string $divisi = null): string
    {
        // Mapping berdasarkan divisi user
        $divisiKodes = [
            'Tim Logistik' => 'OPS',
            'Tim Legal' => 'LGL',
            'Sekretaris' => 'ADM',
            'Superadmin' => 'ADM',
        ];

        // Mapping berdasarkan jenis dokumen
        $jenisKodes = [
            'Surat Masuk' => 'SM',
            'Surat Keluar' => 'SK',
            'Surat Internal' => 'ADM',
            'Surat Keputusan' => 'LGL',
            'Surat Jalan' => 'OPS',
            'Invois' => 'FIN',
            'Laporan' => 'OPS',
            'Izin' => 'LGL',
            'Memo' => 'ADM',
            'Kontrak' => 'FIN',
            'Lainnya' => 'ADM',
        ];

        // Prioritas: jenis dokumen > divisi user
        return $jenisKodes[$jenis] ?? $divisiKodes[$divisi] ?? 'ADM';
    }
}
