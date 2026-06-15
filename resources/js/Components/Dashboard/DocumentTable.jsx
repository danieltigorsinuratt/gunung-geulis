const statusStyles = {
    pending: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Pending' },
    approved: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Approved' },
    rejected: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500', label: 'Rejected' },
    // Legacy
    Pending: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Pending' },
    Selesai: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Approved' },
    Diproses: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500', label: 'Diproses' },
    Diarsip: { bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400', label: 'Diarsip' },
};

function StatusBadge({ status }) {
    const style = statusStyles[status] || { bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400', label: status };
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
    const style = jenisBadgeStyles[jenis?.toLowerCase()] || 'bg-gray-100 text-gray-600';
    const labels = {
        masuk: 'Masuk',
        keluar: 'Keluar',
        internal: 'Internal',
        keputusan: 'Keputusan',
    };
    return (
        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${style}`}>
            {labels[jenis?.toLowerCase()] || jenis || '-'}
        </span>
    );
}

export default function DocumentTable({ documents }) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg md:text-xl font-bold text-gray-900">
                    Dokumen
                </h2>
                <a href="/documents" className="text-sm font-medium text-blue-600 hover:underline">
                    Lihat Semua
                </a>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                NOMOR SURAT
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                PERIHAL
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                JENIS
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                STATUS
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {documents.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center text-sm text-gray-500">
                                    Belum ada dokumen terbaru.
                                </td>
                            </tr>
                        ) : (
                            documents.map((doc, index) => (
                                <tr
                                    key={doc.id || index}
                                    className={`hover:bg-gray-50 transition-colors ${
                                        index % 2 === 1 ? 'bg-gray-50/50' : ''
                                    }`}
                                >
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        {doc.nomor}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {doc.perihal}
                                    </td>
                                    <td className="px-6 py-4">
                                        <JenisBadge jenis={doc.jenis} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={doc.status} />
                                        {doc.status === 'rejected' && doc.rejection_notes && (
                                            <p className="text-[10px] text-red-500 mt-1 max-w-[150px] line-clamp-2" title={doc.rejection_notes}>
                                                {doc.rejection_notes}
                                            </p>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden flex flex-col gap-3">
                {documents.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-sm text-gray-500">
                        Belum ada dokumen terbaru.
                    </div>
                ) : (
                    documents.map((doc, index) => (
                        <div
                            key={doc.id || index}
                            className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-2"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-900">
                                    {doc.nomor}
                                </span>
                                <StatusBadge status={doc.status} />
                            </div>
                            <p className="text-sm text-gray-700">
                                {doc.perihal}
                            </p>
                            <JenisBadge jenis={doc.jenis} />
                            {doc.status === 'rejected' && doc.rejection_notes && (
                                <p className="text-[10px] text-red-500 mt-1 line-clamp-2" title={doc.rejection_notes}>
                                    Alasan: {doc.rejection_notes}
                                </p>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
