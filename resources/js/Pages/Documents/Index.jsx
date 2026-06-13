import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';



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

function TrashIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 16 18" fill="none">
            <path d="M1 4H15M5.5 4V2.5C5.5 1.94772 5.94772 1.5 6.5 1.5H9.5C10.0523 1.5 10.5 1.94772 10.5 2.5V4M6.5 7V13M9.5 7V13M2.5 4L3.5 15.5C3.5 16.0523 3.94772 16.5 4.5 16.5H11.5C12.0523 16.5 12.5 16.0523 12.5 15.5L13.5 4" stroke="#BA1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

export default function DocumentIndex({ documents = [], isSuperAdmin = false, userDivisi = '' }) {
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
                    <a
                        href={route('documents.export')}
                        className="px-3 md:px-4 py-2 rounded-lg border-2 border-primary-700 text-primary-700 text-xs md:text-sm font-hanken font-bold hover:bg-primary-700 hover:text-white transition-colors flex items-center gap-2"
                    >
                        <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
                            <path d="M1 1V11H11V1" stroke="currentColor" strokeWidth="1.5"/>
                            <path d="M6 1V11" stroke="currentColor" strokeWidth="1.5"/>
                            <path d="M3 5L6 2L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Ekspor Laporan
                    </a>
                    <Link
                        href="/create"
                        className="px-4 md:px-6 py-2 md:py-2.5 rounded-lg bg-primary-700 shadow-sm text-white text-xs md:text-sm font-hanken font-bold hover:bg-primary-800 transition-colors flex items-center gap-2"
                    >
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                            <path d="M5.5 0V11M0 5.5H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        Tambah Dokumen
                    </Link>
                </div>
            </div>

            {/* Filter Section - Semua User */}
            <div className="bg-surface shadow-sm rounded-xl border border-surface-border p-4 md:p-6 mb-6">
                <div className={`grid grid-cols-1 sm:grid-cols-2 ${isSuperAdmin ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-4 mb-4`}>
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
                            <option value="memo">Memo</option>
                            <option value="kontrak">Kontrak</option>
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
                            <option value="Selesai">Selesai</option>
                            <option value="Pending">Pending</option>
                            <option value="Urgent">Urgent</option>
                            <option value="Proses">Proses</option>
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

                    {/* Lokasi Farm - Hanya Superadmin */}
                    {isSuperAdmin && (
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono font-medium text-gray-600 tracking-wider uppercase">
                            LOKASI FARM
                        </label>
                        <select
                            value={filters.lokasi}
                            onChange={(e) => setFilters({ ...filters, lokasi: e.target.value })}
                            className="w-full px-3 py-2 bg-white rounded-lg border border-surface-border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700"
                        >
                            <option value="">Semua Divisi</option>
                            <option value="Tim Logistik">Tim Logistik</option>
                            <option value="Tim Legal">Tim Legal</option>
                            <option value="Sekretaris">Sekretaris</option>
                            <option value="Superadmin">Superadmin</option>
                        </select>
                    </div>
                    )}
                </div>

                {/* Filter Actions */}
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={() => {
                            setFilters({ jenis: '', status: '', periode: '', lokasi: '' });
                            router.get(route('documents.index'), {}, { preserveState: true });
                        }}
                        className="px-4 py-2 text-sm font-hanken font-bold text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        Reset Filter
                    </button>
                    <button
                        onClick={() => {
                            const params = {};
                            if (filters.jenis) params.jenis = filters.jenis;
                            if (filters.status) params.status = filters.status;
                            if (isSuperAdmin && filters.lokasi) params.divisi = filters.lokasi;
                            router.get(route('documents.index'), params, { preserveState: true });
                        }}
                        className="px-6 py-2 bg-primary-900 rounded-lg text-white text-sm font-hanken font-bold hover:bg-primary-800 transition-colors"
                    >
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
                        <div className="w-[170px] px-4 py-4 text-center text-xs font-mono font-medium text-primary-900 tracking-wider">
                            AKSI
                        </div>
                    </div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-surface-border/30">
                    {documents.length === 0 ? (
                        <div className="px-6 py-12 text-center text-sm font-hanken text-gray-500 bg-white">
                            Belum ada dokumen yang diarsipkan.
                        </div>
                    ) : (
                        documents.map((doc, index) => (
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
                            <div className="w-[170px] px-4 py-6 flex items-center justify-center gap-2 opacity-60">
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
                                {isSuperAdmin && (
                                    <button
                                        onClick={() => {
                                            if (confirm('Yakin ingin menghapus dokumen ini secara permanen? Tindakan ini tidak dapat dibatalkan.')) {
                                                router.delete(route('documents.destroy', doc.id));
                                            }
                                        }}
                                        className="p-1.5 rounded hover:bg-[#FFDAD6] transition-colors"
                                        title="Hapus"
                                    >
                                        <TrashIcon />
                                    </button>
                                )}
                            </div>
                        </div>
                    )))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-surface-border">
                    <div className="text-sm font-hanken text-gray-600">
                        Menampilkan {documents.length > 0 ? 1 : 0} - {documents.length} dari {documents.length} dokumen
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
                {documents.length === 0 ? (
                    <div className="bg-white shadow-sm rounded-xl border border-surface-border p-6 text-center text-sm font-hanken text-gray-500">
                        Belum ada dokumen yang diarsipkan.
                    </div>
                ) : (
                    documents.map((doc) => (
                    <div
                        key={doc.id}
                        className="bg-white shadow-sm rounded-xl border border-surface-border p-4 flex flex-col gap-2 hover:bg-surface/30 transition-colors"
                    >
                        <div className="flex items-center justify-between">
                            <Link href={`/documents/${doc.id}`} className="text-xs font-hanken font-medium text-primary-900">
                                {doc.nomor}
                            </Link>
                            <div className="flex items-center gap-2">
                                <StatusBadge status={doc.status} />
                                {isSuperAdmin && (
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (confirm('Yakin ingin menghapus dokumen ini secara permanen?')) {
                                                router.delete(route('documents.destroy', doc.id));
                                            }
                                        }}
                                        className="p-1 rounded hover:bg-[#FFDAD6] transition-colors"
                                        title="Hapus"
                                    >
                                        <TrashIcon />
                                    </button>
                                )}
                            </div>
                        </div>
                        <Link href={`/documents/${doc.id}`} className="text-sm font-hanken font-bold text-gray-900">
                            {doc.perihal}
                        </Link>
                        <div className="flex items-center justify-between">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-hanken ${jenisColors[doc.jenis] || 'bg-gray-100'}`}>
                                {doc.jenis}
                            </span>
                            <span className="text-xs font-hanken text-gray-500">
                                {doc.tanggal}
                            </span>
                        </div>
                    </div>
                )))}
            </div>

            {/* Pagination - Mobile */}
            <div className="md:hidden flex items-center justify-between mt-4">
                <div className="text-xs font-hanken text-gray-600">
                    1-{documents.length} dari {documents.length}
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
