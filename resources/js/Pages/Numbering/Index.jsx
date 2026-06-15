import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head } from '@inertiajs/react';

const formats = [
    { id: 1, jenis: 'Surat Masuk', kode: 'SM', format: 'GG/SM/[Urut]/[Tahun]', contoh: 'GG/SM/1042/2023' },
    { id: 2, jenis: 'Surat Keluar', kode: 'SK', format: 'GG/SK/[Urut]/[Tahun]', contoh: 'GG/SK/0891/2023' },
    { id: 3, jenis: 'Surat Internal', kode: 'ADM', format: 'GG/ADM/[Urut]/[Tahun]', contoh: 'GG/ADM/1043/2023' },
    { id: 4, jenis: 'Surat Keputusan', kode: 'LGL', format: 'GG/LGL/[Urut]/[Tahun]', contoh: 'GG/LGL/0891/2023' },
    { id: 5, jenis: 'Invois', kode: 'FIN', format: 'GG/FIN/[Urut]/[Tahun]', contoh: 'GG/FIN/0772/2023' },
    { id: 6, jenis: 'Laporan', kode: 'OPS', format: 'GG/OPS/[Urut]/[Tahun]', contoh: 'GG/OPS/1105/2023' },
    { id: 7, jenis: 'Izin', kode: 'LGL', format: 'GG/LGL/[Urut]/[Tahun]', contoh: 'GG/LGL/0891/2023' },
    { id: 8, jenis: 'Memo', kode: 'ADM', format: 'GG/ADM/[Urut]/[Tahun]', contoh: 'GG/ADM/1043/2023' },
    { id: 9, jenis: 'Kontrak', kode: 'FIN', format: 'GG/FIN/[Urut]/[Tahun]', contoh: 'GG/FIN/0772/2023' },
];

export default function NumberingIndex() {
    return (
        <SidebarLayout>
            <Head title="Format Nomor Surat" />

            <div className="max-w-[1200px] mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-hanken font-semibold text-primary-900">Format Nomor Surat</h1>
                    <p className="text-sm font-hanken text-gray-600 mt-1">Konfigurasi format penomoran otomatis untuk setiap jenis dokumen.</p>
                </div>

                {/* Info Card */}
                <div className="bg-white shadow-sm rounded-xl border border-surface-border p-6 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M7 2L5 18" stroke="#173901" strokeWidth="1.6" strokeLinecap="round" />
                            <path d="M13 2L11 18" stroke="#173901" strokeWidth="1.6" strokeLinecap="round" />
                            <path d="M2 7H18" stroke="#173901" strokeWidth="1.6" strokeLinecap="round" />
                            <path d="M2 13H18" stroke="#173901" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                        <h3 className="text-lg font-hanken font-bold text-primary-900">Format Penomoran</h3>
                    </div>
                    <p className="text-sm font-hanken text-gray-600 mb-4">
                        Nomor surat di-generate otomatis saat dokumen di-approve oleh Manajer.
                    </p>
                    <div className="bg-surface rounded-lg p-4">
                        <p className="text-xs font-mono text-gray-500 mb-2">FORMAT:</p>
                        <p className="text-sm font-hanken text-gray-900">GG/[Kode Divisi]/[Urut]/[Tahun]</p>
                        <p className="text-xs font-hanken text-gray-500 mt-1">
                            Contoh: <span className="font-mono text-primary-700">GG/ADM/1043/2023</span>
                        </p>
                    </div>
                </div>

                {/* Tabel Format */}
                <div className="bg-white shadow-sm rounded-xl border border-surface-border overflow-hidden mb-6">
                    <div className="bg-[rgba(200,230,160,0.3)] border-b border-surface-border">
                        <div className="flex items-center">
                            <div className="w-[200px] px-6 py-4 text-xs font-mono font-medium text-primary-900 tracking-wider">JENIS DOKUMEN</div>
                            <div className="w-[100px] px-6 py-4 text-xs font-mono font-medium text-primary-900 tracking-wider">KODE</div>
                            <div className="flex-1 px-6 py-4 text-xs font-mono font-medium text-primary-900 tracking-wider">FORMAT</div>
                            <div className="w-[200px] px-6 py-4 text-xs font-mono font-medium text-primary-900 tracking-wider">CONTOH</div>
                        </div>
                    </div>
                    <div className="divide-y divide-surface-border/30">
                        {formats.map((fmt, index) => (
                            <div key={fmt.id} className={`flex items-center ${index % 2 === 1 ? 'bg-[rgba(200,230,160,0.05)]' : ''}`}>
                                <div className="w-[200px] px-6 py-4 text-sm font-hanken font-bold text-gray-900">{fmt.jenis}</div>
                                <div className="w-[100px] px-6 py-4">
                                    <span className="px-2 py-1 bg-surface rounded text-xs font-mono font-bold text-primary-900">{fmt.kode}</span>
                                </div>
                                <div className="flex-1 px-6 py-4 text-xs font-mono text-gray-600">{fmt.format}</div>
                                <div className="w-[200px] px-6 py-4 text-sm font-mono text-primary-700 font-medium">{fmt.contoh}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Keterangan */}
                <div className="bg-white shadow-sm rounded-xl border border-surface-border p-6">
                    <h4 className="text-sm font-hanken font-bold text-gray-900 mb-3">Keterangan:</h4>
                    <ul className="text-sm font-hanken text-gray-600 space-y-2">
                        <li className="flex items-start gap-2">
                            <span className="text-primary-700 mt-1">•</span>
                            <span><strong>GG</strong> — Kode perusahaan (Gunung Geulis)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary-700 mt-1">•</span>
                            <span><strong>[Kode Divisi]</strong> — Kode singkatan divisi/jenis dokumen</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary-700 mt-1">•</span>
                            <span><strong>[Urut]</strong> — Nomor urut otomatis (001, 002, 003, ...)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary-700 mt-1">•</span>
                            <span><strong>[Tahun]</strong> — Tahun pembuatan surat (contoh: 2023)</span>
                        </li>
                    </ul>

                    <div className="mt-4 pt-4 border-t border-surface-border">
                        <h4 className="text-sm font-hanken font-bold text-gray-900 mb-2">Daftar Kode Divisi:</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 bg-surface rounded text-xs font-mono font-bold text-primary-900">ADM</span>
                                <span className="text-xs font-hanken text-gray-600">Administrasi</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 bg-surface rounded text-xs font-mono font-bold text-primary-900">FIN</span>
                                <span className="text-xs font-hanken text-gray-600">Keuangan</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 bg-surface rounded text-xs font-mono font-bold text-primary-900">LGL</span>
                                <span className="text-xs font-hanken text-gray-600">Legal</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 bg-surface rounded text-xs font-mono font-bold text-primary-900">OPS</span>
                                <span className="text-xs font-hanken text-gray-600">Operasional</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 bg-surface rounded text-xs font-mono font-bold text-primary-900">SM</span>
                                <span className="text-xs font-hanken text-gray-600">Surat Masuk</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 bg-surface rounded text-xs font-mono font-bold text-primary-900">SK</span>
                                <span className="text-xs font-hanken text-gray-600">Surat Keluar</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
}
