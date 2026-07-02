import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function CashApproval({ transactions = [], stats = {} }) {
    const [filterStatus, setFilterStatus] = useState('pending');
    const [filterJenis, setFilterJenis] = useState('all');
    const [rejectNotes, setRejectNotes] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    const filtered = transactions.filter(t => {
        const statusMatch = filterStatus === 'all' || t.status === filterStatus;
        const jenisMatch = filterJenis === 'all' || t.jenis === filterJenis;
        return statusMatch && jenisMatch;
    });

    const handleApprove = (id) => {
        if (!confirm('Yakin ingin menyetujui transaksi ini?')) return;
        router.post(`/cash/${id}/approve`, {}, { preserveScroll: true });
    };

    const handleReject = () => {
        if (!rejectNotes.trim()) { alert('Catatan harus diisi'); return; }
        router.post(`/cash/${selectedId}/reject`, { rejection_notes: rejectNotes }, { preserveScroll: true, onFinish: () => { setRejectNotes(''); setSelectedId(null); } });
    };

    const formatNominal = (nominal, jenis) => {
        const formatted = 'Rp ' + nominal.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        return jenis === 'pengeluaran' ? `- ${formatted}` : formatted;
    };

    return (
        <SidebarLayout>
            <Head title="Approval Transaksi" />
            <div className="max-w-[1200px] mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-hanken font-semibold text-primary-900">Approval Transaksi</h1>
                    <p className="text-sm font-hanken text-gray-600 mt-1">Review dan setujui transaksi yang menunggu persetujuan.</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-xl border border-surface-border p-4">
                        <p className="text-xs font-mono text-gray-500 uppercase">Menunggu</p>
                        <p className="text-2xl font-hanken font-bold text-[#92400E]">{stats.pending || 0}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-surface-border p-4">
                        <p className="text-xs font-mono text-gray-500 uppercase">Disetujui</p>
                        <p className="text-2xl font-hanken font-bold text-[#396A10]">{stats.approved || 0}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-surface-border p-4">
                        <p className="text-xs font-mono text-gray-500 uppercase">Ditolak</p>
                        <p className="text-2xl font-hanken font-bold text-[#BA1A1A]">{stats.rejected || 0}</p>
                    </div>
                </div>

                {/* Filter Status & Jenis */}
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                    {/* Status Filter */}
                    {[{ id: 'pending', label: 'Menunggu' }, { id: 'approved', label: 'Disetujui' }, { id: 'rejected', label: 'Ditolak' }, { id: 'all', label: 'Semua' }].map(item => (
                        <button key={item.id} onClick={() => setFilterStatus(item.id)} className={`px-4 py-2 rounded-lg text-sm font-hanken font-medium transition-colors ${filterStatus === item.id ? 'bg-primary-700 text-white' : 'bg-white text-gray-600 border border-surface-border hover:bg-gray-100'}`}>
                            {item.label}
                        </button>
                    ))}
                    {/* Divider */}
                    <div className="w-px h-7 bg-surface-border mx-1" />
                    {/* Jenis Filter */}
                    {[
                        { id: 'all', label: 'Semua Jenis', activeClass: 'bg-gray-700 text-white' },
                        { id: 'pemasukan', label: 'Pemasukan', activeClass: 'bg-[#396A10] text-white' },
                        { id: 'pengeluaran', label: 'Pengeluaran', activeClass: 'bg-[#BA1A1A] text-white' },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setFilterJenis(item.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-hanken font-medium transition-colors ${
                                filterJenis === item.id
                                    ? item.activeClass
                                    : 'bg-white text-gray-600 border border-surface-border hover:bg-gray-100'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl border border-surface-border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-surface-border">
                                    <th className="px-4 py-3 text-left text-[10px] font-mono font-medium text-gray-500 uppercase">Tanggal</th>
                                    <th className="px-4 py-3 text-left text-[10px] font-mono font-medium text-gray-500 uppercase">Divisi</th>
                                    <th className="px-4 py-3 text-left text-[10px] font-mono font-medium text-gray-500 uppercase">Jenis</th>
                                    <th className="px-4 py-3 text-left text-[10px] font-mono font-medium text-gray-500 uppercase">Pihak</th>
                                    <th className="px-4 py-3 text-left text-[10px] font-mono font-medium text-gray-500 uppercase">Kategori</th>
                                    <th className="px-4 py-3 text-right text-[10px] font-mono font-medium text-gray-500 uppercase">Nominal</th>
                                    <th className="px-4 py-3 text-left text-[10px] font-mono font-medium text-gray-500 uppercase">Status</th>
                                    {filterStatus === 'pending' && <th className="px-4 py-3 text-center text-[10px] font-mono font-medium text-gray-500 uppercase">Aksi</th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filtered.length === 0 ? (
                                    <tr><td colSpan={filterStatus === 'pending' ? 8 : 7} className="px-4 py-12 text-center text-sm text-gray-400">Tidak ada transaksi.</td></tr>
                                ) : (
                                    filtered.map(t => (
                                        <tr key={t.id} className="hover:bg-gray-50/50">
                                            <td className="px-4 py-3 text-sm font-hanken text-gray-700">{t.tanggal}</td>
                                            <td className="px-4 py-3 text-sm font-hanken text-gray-700">
                                                <span className="text-xs font-mono font-semibold text-primary-900 bg-primary-50 px-2 py-0.5 rounded">{t.divisi_uploader}</span>
                                            </td>
                                            <td className="px-4 py-3 text-sm font-hanken">
                                                <span className={`px-2 py-0.5 rounded text-xs font-bold ${t.jenis === 'pemasukan' ? 'bg-[#D1FAE5] text-[#396A10]' : 'bg-[#FFDAD6] text-[#BA1A1A]'}`}>
                                                    {t.jenis === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm font-hanken text-gray-700">{t.pihak}</td>
                                            <td className="px-4 py-3 text-sm font-hanken text-gray-700">{t.kategori}</td>
                                            <td className={`px-4 py-3 text-sm font-mono text-right font-bold ${t.jenis === 'pengeluaran' ? 'text-[#BA1A1A]' : 'text-[#396A10]'}`}>
                                                {formatNominal(t.nominal, t.jenis)}
                                            </td>
                                            <td className="px-4 py-3 text-sm font-hanken">
                                                <span className={`px-2 py-0.5 rounded text-xs font-bold ${t.status === 'approved' ? 'bg-[#D1FAE5] text-[#396A10]' : t.status === 'rejected' ? 'bg-[#FFDAD6] text-[#BA1A1A]' : 'bg-[#FEF3C7] text-[#92400E]'}`}>
                                                    {t.status === 'approved' ? 'Disetujui' : t.status === 'rejected' ? 'Ditolak' : 'Menunggu'}
                                                </span>
                                            </td>
                                            {filterStatus === 'pending' && (
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button onClick={() => handleApprove(t.id)} className="px-3 py-1.5 bg-[#396A10] text-white rounded-lg text-xs font-hanken font-bold hover:bg-[#2D5016] transition-colors">Setuju</button>
                                                        <button onClick={() => setSelectedId(t.id)} className="px-3 py-1.5 border border-[#BA1A1C] text-[#BA1A1A] rounded-lg text-xs font-hanken font-bold hover:bg-[#BA1A1A] hover:text-white transition-colors">Tolak</button>
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Reject Modal */}
            {selectedId && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md">
                        <h3 className="text-lg font-hanken font-bold text-[#BA1A1A] mb-2">Tolak Transaksi</h3>
                        <p className="text-sm font-hanken text-gray-600 mb-4">Berikan alasan penolakan.</p>
                        <textarea value={rejectNotes} onChange={(e) => setRejectNotes(e.target.value)} placeholder="Tulis catatan penolakan..." rows={4} className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-[#BA1A1A] resize-none" />
                        <div className="flex justify-end gap-3 mt-4">
                            <button onClick={() => { setSelectedId(null); setRejectNotes(''); }} className="px-4 py-2 text-sm font-hanken font-bold text-gray-600 hover:text-gray-900">Batal</button>
                            <button onClick={handleReject} className="px-4 py-2 bg-[#BA1A1A] hover:bg-[#A6141A] text-white rounded-lg text-sm font-hanken font-bold transition-colors">Tolak Transaksi</button>
                        </div>
                    </div>
                </div>
            )}
        </SidebarLayout>
    );
}
