import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const statusStyles = {
    pending: { bg: 'bg-amber-100', dot: 'bg-amber-500', text: 'text-amber-700', label: 'Pending' },
    approved: { bg: 'bg-emerald-100', dot: 'bg-emerald-500', text: 'text-emerald-700', label: 'Approved' },
    rejected: { bg: 'bg-red-100', dot: 'bg-red-500', text: 'text-red-700', label: 'Rejected' },
    // Legacy statuses
    Pending: { bg: 'bg-amber-100', dot: 'bg-amber-500', text: 'text-amber-700', label: 'Pending' },
    Selesai: { bg: 'bg-emerald-100', dot: 'bg-emerald-500', text: 'text-emerald-700', label: 'Approved' },
    Diproses: { bg: 'bg-blue-100', dot: 'bg-blue-500', text: 'text-blue-700', label: 'Diproses' },
    Diarsip: { bg: 'bg-gray-100', dot: 'bg-gray-400', text: 'text-gray-600', label: 'Diarsip' },
};

function StatusBadge({ status }) {
    const style = statusStyles[status] || { bg: 'bg-gray-100', dot: 'bg-gray-400', text: 'text-gray-600', label: status };
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
            {style.label}
        </span>
    );
}

const jenisBadgeStyles = {
    masuk: 'bg-blue-100 text-blue-700',
    keluar: 'bg-purple-100 text-purple-700',
    internal: 'bg-indigo-100 text-indigo-700',
    keputusan: 'bg-orange-100 text-orange-700',
};

function JenisBadge({ jenis }) {
    const style = jenisBadgeStyles[jenis] || 'bg-gray-100 text-gray-600';
    const labels = {
        masuk: 'Surat Masuk',
        keluar: 'Surat Keluar',
        internal: 'Surat Internal',
        keputusan: 'Surat Keputusan',
    };
    return (
        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${style}`}>
            {labels[jenis] || jenis || '-'}
        </span>
    );
}

const tabs = [
    { id: 'semua', label: 'Semua' },
    { id: 'masuk', label: 'Surat Masuk' },
    { id: 'keluar', label: 'Surat Keluar' },
    { id: 'internal', label: 'Internal' },
    { id: 'keputusan', label: 'Keputusan' },
];

const jenisToTab = {
    'masuk': 'masuk',
    'keluar': 'keluar',
    'internal': 'internal',
    'keputusan': 'keputusan',
    'surat-masuk': 'masuk',
    'surat-jalan': 'masuk',
    'izin': 'masuk',
    'surat-keluar': 'keluar',
    'invois': 'keluar',
    'kontrak': 'keluar',
    'memo': 'internal',
    'laporan': 'internal',
    'sk': 'keputusan',
    'surat-keputusan': 'keputusan',
};

export default function DocumentIndex({ documents = [], isSuperAdmin = false, userDivisi = '' }) {
    const [activeTab, setActiveTab] = useState('semua');
    const [filters, setFilters] = useState({
        status: '',
        periode: '',
    });

    const filteredDocuments = documents.filter((doc) => {
        // Tab filter
        if (activeTab !== 'semua') {
            const docTab = jenisToTab[doc.jenis?.toLowerCase()];
            if (docTab !== activeTab) return false;
        }
        // Status filter
        if (filters.status && doc.status !== filters.status) return false;
        return true;
    });

    return (
        <SidebarLayout>
            <Head title="Arsip Korespondensi" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Arsip Korespondensi</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Kelola dan telusuri seluruh dokumen administrasi operasional farm.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <a
                        href={route('documents.export')}
                        className="px-4 py-2.5 rounded-lg border-2 border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors flex items-center gap-2"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Ekspor Laporan
                    </a>
                    <Link
                        href="/create"
                        className="px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Tambah Dokumen
                    </Link>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                            activeTab === tab.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Filter Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
                <div className="flex flex-wrap items-end gap-4">
                    {/* Status */}
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-xs font-medium text-gray-500 uppercase mb-1.5">
                            STATUS
                        </label>
                        <select
                            value={filters.status}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                            className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Semua Status</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    {/* Reset & Apply */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setFilters({ status: '', periode: '' })}
                            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Reset Filter
                        </button>
                        <button
                            onClick={() => {}}
                            className="px-6 py-2 bg-gray-900 rounded-lg text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                        >
                            Terapkan Filter
                        </button>
                    </div>
                </div>
            </div>

            {/* Document Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {/* Table Header */}
                <div className="bg-gray-50 border-b border-gray-200">
                    <div className="grid grid-cols-12 gap-4 px-6 py-3">
                        <div className="col-span-1 text-xs font-medium text-gray-500 uppercase">NO</div>
                        <div className="col-span-2 text-xs font-medium text-gray-500 uppercase">TANGGAL</div>
                        <div className="col-span-2 text-xs font-medium text-gray-500 uppercase">NOMOR DOKUMEN</div>
                        <div className="col-span-3 text-xs font-medium text-gray-500 uppercase">PERIHAL / JENIS</div>
                        <div className="col-span-2 text-xs font-medium text-gray-500 uppercase">DIVISI</div>
                        <div className="col-span-1 text-xs font-medium text-gray-500 uppercase">STATUS</div>
                        <div className="col-span-1 text-xs font-medium text-gray-500 uppercase text-center">AKSI</div>
                    </div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-100">
                    {filteredDocuments.length === 0 ? (
                        <div className="px-6 py-12 text-center text-sm text-gray-500">
                            Belum ada dokumen.
                        </div>
                    ) : (
                        filteredDocuments.map((doc, index) => (
                            <div
                                key={doc.id}
                                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                            >
                                <div className="col-span-1 text-sm text-gray-500">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                                <div className="col-span-2 text-sm text-gray-700">
                                    {doc.tanggal}
                                </div>
                                <div className="col-span-2 text-sm font-medium text-gray-900">
                                    {doc.nomor}
                                </div>
                                <div className="col-span-3">
                                    <div className="text-sm font-medium text-gray-900">{doc.perihal}</div>
                                    <div className="mt-1">
                                        <JenisBadge jenis={doc.jenis?.toLowerCase()} />
                                    </div>
                                </div>
                                <div className="col-span-2 text-sm text-gray-700">
                                    {doc.ditugaskan_ke}
                                </div>
                                <div className="col-span-1">
                                    <StatusBadge status={doc.status} />
                                    {doc.status === 'rejected' && doc.rejection_notes && (
                                        <p className="text-[10px] text-red-500 mt-1 line-clamp-2" title={doc.rejection_notes}>
                                            {doc.rejection_notes}
                                        </p>
                                    )}
                                </div>
                                <div className="col-span-1 flex items-center justify-center gap-1">
                                    <Link
                                        href={`/documents/${doc.id}`}
                                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                                        title="Lihat"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round"/>
                                            <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </Link>
                                    {doc.file_url ? (
                                        <a
                                            href={`${doc.file_url}?name=${encodeURIComponent(doc.nomor + '_' + doc.file_name)}`}
                                            download
                                            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors"
                                            title="Unduh"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </a>
                                    ) : (
                                        <span className="p-2 rounded-lg opacity-30 cursor-not-allowed text-gray-400">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <div className="text-sm text-gray-600">
                        Menampilkan {filteredDocuments.length > 0 ? 1 : 0} - {filteredDocuments.length} dari {filteredDocuments.length} dokumen
                    </div>
                    <div className="flex items-center gap-1">
                        <button className="w-8 h-8 flex items-center justify-center rounded text-gray-400 hover:bg-gray-200 transition-colors">
                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                                <path d="M5 1L1 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded bg-blue-600 text-white text-sm font-medium">
                            1
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded text-gray-600 text-sm font-medium hover:bg-gray-200 transition-colors">
                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                                <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
}
