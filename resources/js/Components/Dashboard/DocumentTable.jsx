import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import axios from 'axios';

const statusColors = {
    Pending: 'text-[#8B6914]',
    Diproses: 'text-[#1D4ED8]',
    Selesai: 'text-primary-700',
    Diarsip: 'text-gray-500',
};

const statusBg = {
    Pending: 'bg-[#FDF2D0]',
    Diproses: 'bg-[#DBEAFE]',
    Selesai: 'bg-accent',
    Diarsip: 'bg-gray-100',
};

const jenisColors = {
    EKSTERNAL: 'bg-[#F2EDE5]',
    LEGAL: 'bg-[#F2EDE5]',
    FINANCIAL: 'bg-[#F2EDE5]',
    INTERNAL: 'bg-[#F2EDE5]',
    OPERASIONAL: 'bg-[#F2EDE5]',
};

function StatusDropdown({ status, documentId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(status);

    // Sync state dengan props saat status berubah dari backend
    useEffect(() => {
        setCurrentStatus(status);
    }, [status]);

    const statuses = ['Pending', 'Diproses', 'Selesai'];

    const handleStatusChange = (newStatus) => {
        if (newStatus === currentStatus) {
            setIsOpen(false);
            return;
        }
        setCurrentStatus(newStatus);
        setIsOpen(false);

        axios.patch(route('documents.updateStatus', documentId), {
            status: newStatus,
        }).then((response) => {
            if (response.data.success) {
                setCurrentStatus(response.data.status);
            }
        }).catch((error) => {
            console.error('Gagal update status:', error);
            setCurrentStatus(status); // Kembali ke status awal
        });
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-hanken font-bold cursor-pointer hover:opacity-80 transition-opacity ${statusBg[currentStatus]} ${statusColors[currentStatus]}`}
            >
                {currentStatus}
                <svg className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 12 12" fill="none">
                    <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className="absolute top-full left-0 mt-1 z-50 bg-white rounded-lg border border-surface-border shadow-lg min-w-[120px]" style={{ overflow: 'visible' }}>
                        {statuses.map((s) => (
                            <button
                                key={s}
                                onClick={() => handleStatusChange(s)}
                                className={`w-full px-3 py-2 text-left text-xs font-hanken font-bold hover:bg-surface transition-colors flex items-center gap-2 ${
                                    s === currentStatus ? 'bg-surface/50' : ''
                                }`}
                            >
                                <span className={`w-2 h-2 rounded-full ${statusBg[s]}`} />
                                {s}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default function DocumentTable({ documents }) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg md:text-xl font-hanken font-semibold text-primary-900">
                    Dokumen
                </h2>
                <a href={route('documents.index')} className="text-xs font-mono font-medium text-primary-700 tracking-wider hover:underline">
                    Lihat Semua
                </a>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-xl border border-surface-border mb-8" style={{ overflow: 'visible' }}>
                <table className="w-full">
                    <thead>
                        <tr className="bg-table-header border-b border-surface-border">
                            <th className="px-6 py-4 text-left text-xs font-mono font-medium uppercase tracking-wider text-gray-800">
                                NOMOR SURAT
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-mono font-medium uppercase tracking-wider text-gray-800">
                                PERIHAL
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-mono font-medium uppercase tracking-wider text-gray-800">
                                JENIS
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-mono font-medium uppercase tracking-wider text-gray-800">
                                STATUS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center text-sm font-hanken text-gray-500">
                                    Belum ada dokumen terbaru.
                                </td>
                            </tr>
                        ) : (
                            documents.map((doc, index) => (
                                <tr
                                    key={doc.nomor}
                                    className={`border-b border-surface-border/30 ${
                                        index % 2 === 1 ? 'bg-surface/5' : ''
                                    } hover:bg-surface/10 transition-colors`}
                                >
                                    <td className="px-6 py-4 text-sm font-hanken font-medium text-gray-900">
                                        {doc.nomor}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-hanken text-gray-900">
                                        {doc.perihal}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-hanken ${jenisColors[doc.jenis] || 'bg-gray-100'}`}>
                                            {doc.jenis}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusDropdown status={doc.status} documentId={doc.id} />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="md:hidden flex flex-col gap-3">
                {documents.length === 0 ? (
                    <div className="bg-white rounded-xl border border-surface-border p-6 text-center text-sm font-hanken text-gray-500">
                        Belum ada dokumen terbaru.
                    </div>
                ) : (
                    documents.map((doc) => (
                        <div
                            key={doc.nomor}
                            className="bg-white rounded-xl border border-surface-border p-4 flex flex-col gap-2"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-hanken font-medium text-primary-900">
                                    {doc.nomor}
                                </span>
                                <StatusDropdown status={doc.status} documentId={doc.id} />
                            </div>
                            <p className="text-sm font-hanken font-bold text-gray-900">
                                {doc.perihal}
                            </p>
                            <span className={`inline-block self-start px-2 py-0.5 rounded text-[10px] font-hanken ${jenisColors[doc.jenis] || 'bg-gray-100'}`}>
                                {doc.jenis}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
