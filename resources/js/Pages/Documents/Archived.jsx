import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';

const statusStyles = {
    Selesai: { bg: 'bg-accent', dot: 'bg-primary-700', text: 'text-primary-600' },
    Pending: { bg: 'bg-[#FDF2D0]', dot: 'bg-[#8B6914]', text: 'text-[#8B6914]' },
    Diarsip: { bg: 'bg-gray-100', dot: 'bg-gray-400', text: 'text-gray-500' },
    Diproses: { bg: 'bg-[#DBEAFE]', dot: 'bg-[#1D4ED8]', text: 'text-[#1D4ED8]' },
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

export default function DocumentArchived({ documents = [], availableDocuments = [], isSuperAdmin = false }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleArchive = (docId) => {
        if (confirm('Yakin ingin mengarsipkan dokumen ini?')) {
            router.post(route('documents.archive', docId), {}, {
                onSuccess: () => setIsModalOpen(false),
            });
        }
    };

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
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 rounded-lg bg-primary-700 shadow-sm text-white text-sm font-hanken font-bold hover:bg-primary-800 transition-colors flex items-center gap-2"
                    >
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                            <path d="M5.5 0V11M0 5.5H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        Arsipkan Dokumen
                    </button>
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
                                    <div className="w-[80px] px-4 py-5 flex items-center justify-center gap-1">
                                        <Link
                                            href={`/documents/${doc.id}`}
                                            className="p-1.5 rounded hover:bg-surface transition-colors"
                                            title="Lihat"
                                        >
                                            <EyeIcon />
                                        </Link>
                                        <button
                                            onClick={() => {
                                                if (confirm('Yakin ingin mengeluarkan dokumen ini dari arsip?')) {
                                                    router.post(route('documents.restore', doc.id));
                                                }
                                            }}
                                            className="p-1.5 rounded hover:bg-surface transition-colors"
                                            title="Keluarkan dari Arsip"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8" stroke="#173901" strokeWidth="1.5" strokeLinecap="round"/>
                                                <path d="M8 10V5M8 5L5.5 7.5M8 5L10.5 7.5" stroke="#173901" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
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
                            <div
                                key={doc.id}
                                className="bg-white shadow-sm rounded-xl border border-surface-border p-4 flex flex-col gap-2"
                            >
                                <div className="flex items-center justify-between">
                                    <Link href={`/documents/${doc.id}`} className="text-xs font-hanken font-medium text-primary-900">
                                        {doc.nomor}
                                    </Link>
                                    <StatusBadge status={doc.status} />
                                </div>
                                <Link href={`/documents/${doc.id}`} className="text-sm font-hanken font-bold text-gray-900">
                                    {doc.perihal}
                                </Link>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-hanken text-gray-400">Diarsipkan: {doc.archived_at}</span>
                                    <button
                                        onClick={() => {
                                            if (confirm('Keluarkan dari arsip?')) {
                                                router.post(route('documents.restore', doc.id));
                                            }
                                        }}
                                        className="text-xs font-hanken font-bold text-primary-700 hover:underline"
                                    >
                                        Keluarkan
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Modal Arsipkan Dokumen */}
                <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="lg">
                    <div className="p-6 bg-[#F8F3EB]">
                        <h2 className="text-lg font-hanken font-bold text-primary-900 mb-4">
                            Arsipkan Dokumen
                        </h2>
                        <p className="text-sm font-hanken text-gray-600 mb-4">
                            Pilih dokumen yang ingin diarsipkan:
                        </p>

                        {availableDocuments.length === 0 ? (
                            <div className="p-8 text-center text-sm font-hanken text-gray-500 bg-white rounded-lg border border-surface-border">
                                Semua dokumen sudah diarsipkan.
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
                                {availableDocuments.map((doc) => (
                                    <div
                                        key={doc.id}
                                        className="flex items-center justify-between p-3 bg-white rounded-lg border border-surface-border hover:border-primary-700 transition-colors"
                                    >
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-sm font-hanken font-bold text-gray-900">{doc.perihal}</span>
                                            <span className="text-xs font-mono text-gray-400">#{doc.nomor} · {doc.status}</span>
                                        </div>
                                        <button
                                            onClick={() => handleArchive(doc.id)}
                                            className="px-4 py-2 bg-[#8B6914] hover:bg-[#7A5C10] text-white text-xs font-hanken font-bold rounded-lg transition-colors"
                                        >
                                            Arsipkan
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-sm font-hanken font-bold text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </SidebarLayout>
    );
}
