const statusColors = {
    TERKIRIM: 'text-primary-700',
    PROSES: 'text-[#8B6914]',
    TERTUNDA: 'text-[#B91C1C]',
    SELESAI: 'text-primary-700',
};

const jenisColors = {
    EKSTERNAL: 'bg-[#F2EDE5]',
    LEGAL: 'bg-[#F2EDE5]',
    FINANCIAL: 'bg-[#F2EDE5]',
    INTERNAL: 'bg-[#F2EDE5]',
    OPERASIONAL: 'bg-[#F2EDE5]',
};

export default function DocumentTable({ documents }) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-hanken font-semibold text-primary-900">
                    Dokumen Terbaru
                </h2>
                <button className="text-xs font-mono font-medium text-primary-700 tracking-wider hover:underline">
                    Lihat Semua
                </button>
            </div>
            <div className="bg-white rounded-xl border border-surface-border overflow-hidden">
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
                        {documents.map((doc, index) => (
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
                                <td className={`px-6 py-4 text-sm font-hanken font-bold ${statusColors[doc.status] || 'text-gray-900'}`}>
                                    {doc.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
