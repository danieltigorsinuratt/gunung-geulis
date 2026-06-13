import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

const documents = [
    {
        id: 1,
        tanggal: '12 Okt 2023',
        nomor: 'GG-SJ-2023-0892',
        perihal: 'Pengiriman Pakan Ternak BR-1',
        jenis: 'Surat Jalan',
        lokasi: 'Sektor A',
        status: 'Selesai',
    },
    {
        id: 2,
        tanggal: '13 Okt 2023',
        nomor: 'INV-PURCH-8821',
        perihal: 'Tagihan Obat-obatan Vet-C',
        jenis: 'Invois',
        lokasi: 'Gudang Logistik',
        status: 'Pending',
    },
    {
        id: 3,
        tanggal: '14 Okt 2023',
        nomor: 'REP-MED-002-X',
        perihal: 'Laporan Kematian Mendadak Sektor B',
        jenis: 'Laporan Kesehatan',
        lokasi: 'Sektor B',
        status: 'Urgent',
    },
    {
        id: 4,
        tanggal: '15 Okt 2023',
        nomor: 'PERM-IZN-331',
        perihal: 'Perpanjangan Izin Lingkungan RT/RW',
        jenis: 'Izin Administrasi',
        lokasi: 'Semua Area',
        status: 'Proses',
    },
];

const statusStyles = {
    Selesai: { bg: 'bg-accent', dot: 'bg-primary-700', text: 'text-primary-600' },
    Pending: { bg: 'bg-[#FDF2D0]', dot: 'bg-[#8B6914]', text: 'text-[#8B6914]' },
    Urgent: { bg: 'bg-[#FFDAD6]', dot: 'bg-[#B91C1C]', text: 'text-[#B91C1C]' },
    Proses: { bg: 'bg-[#DBEAFE]', dot: 'bg-[#1D4ED8]', text: 'text-[#1D4ED8]' },
};

function StatusBadge({ status }) {
    const style = statusStyles[status] || statusStyles.Proses;
    return (
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-hanken font-bold ${style.bg} ${style.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
            {status}
        </span>
    );
}

function EyeIcon() {
    return (
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
            <path d="M1 7C1 7 3.5 2 9 2C14.5 2 17 7 17 7C17 7 14.5 12 9 12C3.5 12 1 7 1 7Z" stroke="#173901" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="9" cy="7" r="2.5" stroke="#173901" strokeWidth="1.5"/>
        </svg>
    );
}

function EditIcon() {
    return (
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path d="M12.5 0L14.5 2L5 11.5H3V9.5L12.5 0ZM0 14H17V17H0V14Z" fill="#8B6914"/>
        </svg>
    );
}

function DownloadIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 0L7 9.5M7 9.5L3.5 6M7 9.5L10.5 6" stroke="#1D4ED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M0 10.5V13H14V10.5" stroke="#1D4ED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const jenisColors = {
    EKSTERNAL: 'bg-[#F2EDE5]',
    LEGAL: 'bg-[#F2EDE5]',
    FINANCIAL: 'bg-[#F2EDE5]',
    INTERNAL: 'bg-[#F2EDE5]',
    OPERASIONAL: 'bg-[#F2EDE5]',
};

export default function DocumentIndex() {
    const [filters, setFilters] = useState({
        jenis: '',
        status: '',
        periode: '',
        lokasi: '',
    });

    return (
        <SidebarLayout>
            <Head title="Daftar Dokumen" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 md:mb-8">
                <div>
                    <h1 className="text-xl md:text-2xl font-hanken font-semibold text-primary-900 leading-8">
                        Arsip Korespondensi
                    </h1>
                    <p className="text-sm font-hanken text-gray-600 mt-1">
                        Kelola dan telusuri seluruh dokumen administrasi operasional farm.
                    </p>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                    <button className="px-3 md:px-4 py-2 rounded-lg border-2 border-primary-700 text-primary-700 text-xs md:text-sm font-hanken font-bold hover:bg-primary-700 hover:text-white transition-colors flex items-center gap-2">
                        <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
                            <path d="M1 1V11H11V1" stroke="currentColor" strokeWidth="1.5"/>
                            <path d="M6 1V11" stroke="currentColor" strokeWidth="1.5"/>
                            <path d="M3 5L6 2L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Ekspor Laporan
                    </button>
                    <button className="px-4 md:px-6 py-2 md:py-2.5 rounded-lg bg-primary-700 shadow-sm text-white text-xs md:text-sm font-hanken font-bold hover:bg-primary-800 transition-colors flex items-center gap-2">
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                            <path d="M5.5 0V11M0 5.5H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        Tambah Dokumen
                    </button>
                </div>
            </div>

            {/* Filter Section */}
            <div className="bg-surface shadow-sm rounded-xl border border-surface-border p-4 md:p-6 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {/* Jenis Dokumen */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono font-medium text-gray-600 tracking-wider uppercase">
                            JENIS DOKUMEN
                        </label>
                        <select
                            value={filters.jenis}
                            onChange={(e) => setFilters({ ...filters, jenis: e.target.value })}
                            className="w-full px-3 py-2 bg-white rounded-lg border border-surface-border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700"
                        >
                            <option value="">Semua Jenis</option>
                            <option value="surat-jalan">Surat Jalan</option>
                            <option value="invois">Invois</option>
                            <option value="laporan">Laporan</option>
                            <option value="izin">Izin</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono font-medium text-gray-600 tracking-wider uppercase">
                            STATUS
                        </label>
                        <select
                            value={filters.status}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                            className="w-full px-3 py-2 bg-white rounded-lg border border-surface-border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700"
                        >
                            <option value="">Semua Status</option>
                            <option value="selesai">Selesai</option>
                            <option value="pending">Pending</option>
                            <option value="urgent">Urgent</option>
                            <option value="proses">Proses</option>
                        </select>
                    </div>

                    {/* Periode */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono font-medium text-gray-600 tracking-wider uppercase">
                            PERIODE
                        </label>
                        <input
                            type="date"
                            value={filters.periode}
                            onChange={(e) => setFilters({ ...filters, periode: e.target.value })}
                            className="w-full px-3 py-2 bg-white rounded-lg border border-surface-border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700"
                        />
                    </div>

                    {/* Lokasi Farm */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono font-medium text-gray-600 tracking-wider uppercase">
                            LOKASI FARM
                        </label>
                        <select
                            value={filters.lokasi}
                            onChange={(e) => setFilters({ ...filters, lokasi: e.target.value })}
                            className="w-full px-3 py-2 bg-white rounded-lg border border-surface-border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700"
                        >
                            <option value="">Semua Area</option>
                            <option value="sektor-a">Sektor A</option>
                            <option value="sektor-b">Sektor B</option>
                            <option value="sektor-c">Sektor C</option>
                            <option value="gudang">Gudang Logistik</option>
                        </select>
                    </div>
                </div>

                {/* Filter Actions */}
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={() => setFilters({ jenis: '', status: '', periode: '', lokasi: '' })}
                        className="px-4 py-2 text-sm font-hanken font-bold text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        Reset Filter
                    </button>
                    <button className="px-6 py-2 bg-primary-900 rounded-lg text-white text-sm font-hanken font-bold hover:bg-primary-800 transition-colors">
                        Terapkan Filter
                    </button>
                </div>
            </div>

            {/* Document Table - Desktop */}
            <div className="hidden md:block bg-white shadow-sm rounded-xl border border-surface-border overflow-hidden">
                {/* Table Header */}
                <div className="bg-[rgba(200,230,160,0.3)] border-b border-surface-border">
                    <div className="flex items-center">
                        <div className="w-12 px-4 py-4 text-center text-xs font-mono font-medium text-primary-900 tracking-wider">
                            NO
                        </div>
                        <div className="w-[114px] px-4 py-4 text-xs font-mono font-medium text-primary-900 tracking-wider">
                            TANGGAL
                        </div>
                        <div className="w-[150px] px-4 py-4 text-xs font-mono font-medium text-primary-900 tracking-wider">
                            NOMOR DOKUMEN
                        </div>
                        <div className="flex-1 px-4 py-4 text-xs font-mono font-medium text-primary-900 tracking-wider">
                            PERIHAL / JENIS
                        </div>
                        <div className="w-[150px] px-4 py-4 text-xs font-mono font-medium text-primary-900 tracking-wider">
                            LOKASI
                        </div>
                        <div className="w-[120px] px-4 py-4 text-xs font-mono font-medium text-primary-900 tracking-wider">
                            STATUS
                        </div>
                        <div className="w-[140px] px-4 py-4 text-center text-xs font-mono font-medium text-primary-900 tracking-wider">
                            AKSI
                        </div>
                    </div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-surface-border/30">
                    {documents.map((doc, index) => (
                        <div
                            key={doc.id}
                            className={`flex items-center ${
                                index % 2 === 1 ? 'bg-[rgba(200,230,160,0.1)]' : ''
                            } hover:bg-surface/30 transition-colors`}
                        >
                            <div className="w-12 px-4 py-6 text-center text-sm font-hanken text-gray-600">
                                {String(index + 1).padStart(2, '0')}
                            </div>
                            <div className="w-[114px] px-4 py-6 text-sm font-hanken text-gray-900">
                                {doc.tanggal}
                            </div>
                            <div className="w-[150px] px-4 py-6 text-sm font-hanken font-bold text-primary-900">
                                {doc.nomor}
                            </div>
                            <div className="flex-1 px-4 py-6">
                                <div className="text-sm font-hanken font-bold text-gray-900">
                                    {doc.perihal}
                                </div>
                                <div className="text-xs font-hanken text-gray-600 mt-0.5">
                                    {doc.jenis}
                                </div>
                            </div>
                            <div className="w-[150px] px-8 py-6 text-sm font-hanken text-gray-900">
                                {doc.lokasi}
                            </div>
                            <div className="w-[120px] px-4 py-6">
                                <StatusBadge status={doc.status} />
                            </div>
                            <div className="w-[140px] px-4 py-6 flex items-center justify-center gap-2 opacity-60">
                                <Link
                                    href={`/documents/${doc.id}`}
                                    className="p-1.5 rounded hover:bg-surface transition-colors"
                                    title="Lihat"
                                >
                                    <EyeIcon />
                                </Link>
                                <button className="p-1.5 rounded hover:bg-surface transition-colors" title="Edit">
                                    <EditIcon />
                                </button>
                                <button className="p-1.5 rounded hover:bg-surface transition-colors" title="Unduh">
                                    <DownloadIcon />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-surface-border">
                    <div className="text-sm font-hanken text-gray-600">
                        Menampilkan 1 - 4 dari 128 dokumen
                    </div>
                    <div className="flex items-center gap-1">
                        <button className="w-8 h-8 flex items-center justify-center rounded text-gray-400 hover:bg-surface transition-colors">
                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                                <path d="M5 1L1 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded bg-primary-700 text-white text-sm font-hanken font-bold">
                            1
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded text-gray-600 text-sm font-hanken font-bold hover:bg-surface transition-colors">
                            2
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded text-gray-600 text-sm font-hanken font-bold hover:bg-surface transition-colors">
                            3
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-gray-400">
                            ...
                        </span>
                        <button className="w-8 h-8 flex items-center justify-center rounded text-gray-600 text-sm font-hanken font-bold hover:bg-surface transition-colors">
                            32
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded text-gray-400 hover:bg-surface transition-colors">
                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                                <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Document Cards - Mobile */}
            <div className="md:hidden flex flex-col gap-3">
                {documents.map((doc) => (
                    <Link
                        key={doc.id}
                        href={`/documents/${doc.id}`}
                        className="bg-white shadow-sm rounded-xl border border-surface-border p-4 flex flex-col gap-2 hover:bg-surface/30 transition-colors"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-hanken font-medium text-primary-900">
                                {doc.nomor}
                            </span>
                            <StatusBadge status={doc.status} />
                        </div>
                        <p className="text-sm font-hanken font-bold text-gray-900">
                            {doc.perihal}
                        </p>
                        <div className="flex items-center justify-between">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-hanken ${jenisColors[doc.jenis] || 'bg-gray-100'}`}>
                                {doc.jenis}
                            </span>
                            <span className="text-xs font-hanken text-gray-500">
                                {doc.tanggal}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Pagination - Mobile */}
            <div className="md:hidden flex items-center justify-between mt-4">
                <div className="text-xs font-hanken text-gray-600">
                    1-4 dari 128
                </div>
                <div className="flex items-center gap-1">
                    <button className="w-8 h-8 flex items-center justify-center rounded bg-primary-700 text-white text-sm font-hanken font-bold">
                        1
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded text-gray-600 text-sm font-hanken font-bold hover:bg-surface transition-colors">
                        2
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded text-gray-400 hover:bg-surface transition-colors">
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                            <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </SidebarLayout>
    );
}
