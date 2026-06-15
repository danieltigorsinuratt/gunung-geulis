import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const statusStyles = {
    pending: { bg: 'bg-[#FEF3C7]', text: 'text-[#92400E]', label: 'Menunggu' },
    approved: { bg: 'bg-accent', text: 'text-primary-700', label: 'Disetujui' },
    rejected: { bg: 'bg-[#FFDAD6]', text: 'text-[#B91C1C]', label: 'Ditolak' },
};

export default function ApprovalIndex({ approvals = [], stats = {} }) {
    const [filterStatus, setFilterStatus] = useState('pending');
    const [rejectNotes, setRejectNotes] = useState('');
    const [selectedDocId, setSelectedDocId] = useState(null);

    const filteredApprovals = approvals.filter(a =>
        filterStatus === 'all' || a.status === filterStatus
    );

    const handleApprove = (documentId) => {
        if (!confirm('Yakin ingin menyetujui dokumen ini?')) return;
        router.post(`/documents/${documentId}/approve`, {}, {
            preserveScroll: true,
        });
    };

    const handleReject = (documentId) => {
        if (!rejectNotes.trim()) {
            alert('Catatan penolakan harus diisi');
            return;
        }
        router.post(`/documents/${documentId}/reject`, {
            notes: rejectNotes,
        }, {
            preserveScroll: true,
            onFinish: () => {
                setRejectNotes('');
                setSelectedDocId(null);
            },
        });
    };

    return (
        <SidebarLayout>
            <Head title="Antrian Approval" />

            <div className="max-w-[1200px] mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-hanken font-semibold text-primary-900">Antrian Approval</h1>
                    <p className="text-sm font-hanken text-gray-600 mt-1">Review dan setujui surat yang menunggu persetujuan Anda.</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-xl border border-surface-border p-4">
                        <p className="text-xs font-mono text-gray-500 uppercase">Menunggu</p>
                        <p className="text-2xl font-hanken font-bold text-[#92400E]">{stats.pending || 0}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-surface-border p-4">
                        <p className="text-xs font-mono text-gray-500 uppercase">Disetujui</p>
                        <p className="text-2xl font-hanken font-bold text-primary-700">{stats.approved || 0}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-surface-border p-4">
                        <p className="text-xs font-mono text-gray-500 uppercase">Ditolak</p>
                        <p className="text-2xl font-hanken font-bold text-[#B91C1C]">{stats.rejected || 0}</p>
                    </div>
                </div>

                {/* Filter */}
                <div className="flex gap-2 mb-6">
                    {[
                        { id: 'pending', label: 'Menunggu' },
                        { id: 'approved', label: 'Disetujui' },
                        { id: 'rejected', label: 'Ditolak' },
                        { id: 'all', label: 'Semua' },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setFilterStatus(item.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-hanken font-medium transition-colors ${
                                filterStatus === item.id
                                    ? 'bg-primary-700 text-white'
                                    : 'bg-white text-gray-600 border border-surface-border hover:bg-gray-100'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Approvals List */}
                <div className="flex flex-col gap-4">
                    {filteredApprovals.length === 0 ? (
                        <div className="bg-white rounded-xl border border-surface-border p-12 text-center">
                            <svg className="w-12 h-12 mx-auto text-gray-300 mb-4" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                                <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p className="text-sm font-hanken text-gray-500">Tidak ada dokumen untuk ditinjau.</p>
                        </div>
                    ) : (
                        filteredApprovals.map((item) => {
                            const style = statusStyles[item.status] || statusStyles.pending;
                            return (
                                <div key={item.id || item.documentId} className="bg-white rounded-xl border border-surface-border p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-hanken font-bold ${style.bg} ${style.text}`}>
                                                    {style.label}
                                                </span>
                                                <span className="text-xs font-mono text-gray-400">
                                                    {item.createdAt}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-hanken font-bold text-primary-900">
                                                {item.document?.judul || '-'}
                                            </h3>
                                            <p className="text-sm font-hanken text-gray-600 mt-1">
                                                {item.document?.perihal || '-'}
                                            </p>
                                            <div className="flex items-center gap-4 mt-3 text-xs font-hanken text-gray-500">
                                                <span>Oleh: <strong className="text-gray-700">{item.createdBy}</strong></span>
                                                <span>Nomor: <strong className="text-gray-700">{item.document?.nomor}</strong></span>
                                                <span>Jenis: <strong className="text-gray-700">{item.document?.jenis}</strong></span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/documents/${item.documentId}`}
                                                className="px-3 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                                title="Lihat Dokumen"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </Link>
                                            {item.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleApprove(item.documentId)}
                                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                                    >
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                            <path d="M2 7L5.5 10.5L12 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                        Setuju
                                                    </button>
                                                    <button
                                                        onClick={() => setSelectedDocId(item.documentId)}
                                                        className="px-4 py-2 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-lg text-sm font-medium transition-colors"
                                                    >
                                                        Tolak
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Reject Modal */}
            {selectedDocId && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md">
                        <h3 className="text-lg font-hanken font-bold text-[#B91C1C] mb-2">Tolak Dokumen</h3>
                        <p className="text-sm font-hanken text-gray-600 mb-4">
                            Berikan alasan penolakan untuk dokumen ini.
                        </p>
                        <textarea
                            value={rejectNotes}
                            onChange={(e) => setRejectNotes(e.target.value)}
                            placeholder="Tulis catatan penolakan..."
                            rows={4}
                            className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-[#B91C1C] resize-none"
                        />
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => { setSelectedDocId(null); setRejectNotes(''); }}
                                className="px-4 py-2 text-sm font-hanken font-bold text-gray-600 hover:text-gray-900"
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => handleReject(selectedDocId)}
                                className="px-4 py-2 bg-[#B91C1C] hover:bg-[#A6141A] text-white rounded-lg text-sm font-hanken font-bold transition-colors"
                            >
                                Tolak Dokumen
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </SidebarLayout>
    );
}
