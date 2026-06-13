import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, Link } from '@inertiajs/react';

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

export default function DocumentArchived({ documents = [], isSuperAdmin = false }) {
    return (
        <SidebarLayout>
            <Head title="Arsip Dokumen" />

            <div className="max-w-[1200px] mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 md:mb-8">
                    <div>
                        <h1 className="text-xl md:text-2xl font-hanken font-semibold text-primary-900 leading-8">
                            Arsip Dokumen
                        </h1>
                        <p className="text-sm font-hanken text-gray-600 mt-1">
                            Dokumen yang sudah selesai diproses dan diarsipkan.
                        </p>
                    </div>
                    <Link
                        href="/documents"
                        className="px-4 py-2 rounded-lg border border-primary-700 text-primary-700 text-sm font-hanken font-bold hover:bg-primary-700 hover:text-white transition-colors flex items-center gap-2"
                    >
                        <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
                            <path d="M14 6H1M1 6L6 1M1 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Kembali ke Daftar Dokumen
                    </Link>
                </div>

                {/* Document Table - Desktop */}
                <div className="hidden md:block bg-white shadow-sm rounded-xl border border-surface-border overflow-hidden">
                    <div className="bg-[rgba(200,230,160,0.3)] border-b border-surface-border">
                        <div className="flex items-center">
                            <div className="w-12 px-4 py-4 text-center text-xs font-mono font-medium text-primary-900 tracking-wider">NO</div>
                            <div className="w-[120px] px-4 py-4 text-xs font-mono font-medium text-primary-900 tracking-wider">TANGGAL</div>
                            <div className="w-[150px] px-4 py-4 text-xs font-mono font-medium text-primary-900 tracking-wider">NOMOR</div>
                            <div className="flex-1 px-4 py-4 text-xs font-mono font-medium text-primary-900 tracking-wider">PERIHAL</div>
                            <div className="w-[120px] px-4 py-4 text-xs font-mono font-medium text-primary-900 tracking-wider">STATUS</div>
                            <div className="w-[140px] px-4 py-4 text-xs font-mono font-medium text-primary-900 tracking-wider">DIARSIPKAN</div>
                            <div className="w-[80px] px-4 py-4 text-center text-xs font-mono font-medium text-primary-900 tracking-wider">AKSI</div>
                        </div>
                    </div>

                    <div className="divide-y divide-surface-border/30">
                        {documents.length === 0 ? (
                            <div className="px-6 py-12 text-center text-sm font-hanken text-gray-500">
                                Belum ada dokumen yang diarsipkan.
                            </div>
                        ) : (
                            documents.map((doc, index) => (
                                <div
                                    key={doc.id}
                                    className={`flex items-center ${index % 2 === 1 ? 'bg-[rgba(200,230,160,0.1)]' : ''} hover:bg-surface/30 transition-colors`}
                                >
                                    <div className="w-12 px-4 py-5 text-center text-sm font-hanken text-gray-500">
                                        {String(index + 1).padStart(2, '0')}
                                    </div>
                                    <div className="w-[120px] px-4 py-5 text-sm font-hanken text-gray-900">
                                        {doc.tanggal}
                                    </div>
                                    <div className="w-[150px] px-4 py-5 text-sm font-hanken font-bold text-primary-900">
                                        {doc.nomor}
                                    </div>
                                    <div className="flex-1 px-4 py-5 text-sm font-hanken font-bold text-gray-900">
                                        {doc.perihal}
                                    </div>
                                    <div className="w-[120px] px-4 py-5">
                                        <StatusBadge status={doc.status} />
                                    </div>
                                    <div className="w-[140px] px-4 py-5 text-xs font-hanken text-gray-500">
                                        {doc.archived_at}
                                    </div>
                                    <div className="w-[80px] px-4 py-5 flex items-center justify-center">
                                        <Link
                                            href={`/documents/${doc.id}`}
                                            className="p-1.5 rounded hover:bg-surface transition-colors"
                                            title="Lihat"
                                        >
                                            <EyeIcon />
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
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
                            <Link
                                key={doc.id}
                                href={`/documents/${doc.id}`}
                                className="bg-white shadow-sm rounded-xl border border-surface-border p-4 flex flex-col gap-2 hover:bg-surface/30 transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-hanken font-medium text-primary-900">{doc.nomor}</span>
                                    <StatusBadge status={doc.status} />
                                </div>
                                <p className="text-sm font-hanken font-bold text-gray-900">{doc.perihal}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-hanken text-gray-400">Diarsipkan: {doc.archived_at}</span>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </SidebarLayout>
    );
}
