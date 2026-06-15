import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, Link } from '@inertiajs/react';
import StatCard from '@/Components/Dashboard/StatCard';
import DocumentTable from '@/Components/Dashboard/DocumentTable';
import UrgentWarning from '@/Components/Dashboard/UrgentWarning';
import ActivityFeed from '@/Components/Dashboard/ActivityFeed';

export default function Dashboard({
    totalDocuments = 0,
    approvedDocuments = 0,
    rejectedDocuments = 0,
    urgentDocuments = 0,
    documents = [],
    urgentWarnings = [],
    activities = [],
    selectedDivisi = '',
    isSuperAdmin = false,
    userRole = '',
}) {
    const stats = [
        {
            icon: (
                <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                    <path d="M1 1C1 0.447715 1.44772 0 2 0H20C20.5523 0 21 0.447715 21 1V15C21 15.5523 20.5523 16 20 16H2C1.44772 16 1 15.5523 1 15V1Z" stroke="#173901" strokeWidth="1.5" />
                    <path d="M5 5H17" stroke="#173901" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M5 8H17" stroke="#173901" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M5 11H12" stroke="#173901" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            ),
            value: totalDocuments.toLocaleString(),
            label: 'TOTAL DOKUMEN',
        },
        {
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="#16A34A" strokeWidth="1.5" />
                    <path d="M6.5 10L9 12.5L13.5 7.5" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ),
            value: approvedDocuments.toLocaleString(),
            label: 'DOKUMEN DISETUJUI',
        },
        {
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="#DC2626" strokeWidth="1.5" />
                    <path d="M7 7L13 13M13 7L7 13" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            ),
            value: rejectedDocuments.toLocaleString(),
            label: 'DOKUMEN DITOLAK',
        },
        {
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="#EA580C" strokeWidth="1.5" />
                    <path d="M10 6V10" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M10 13V13.01" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            value: urgentDocuments.toLocaleString(),
            label: 'DOKUMEN URGENT',
        },
    ];
    return (
        <SidebarLayout>
            <Head title="Dashboard" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 md:mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        {isSuperAdmin && (
                            <Link
                                href={route('dashboard')}
                                className="p-1.5 rounded-lg hover:bg-surface transition-colors"
                                title="Kembali ke Pilih Divisi"
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M12 4L6 10L12 16" stroke="#173901" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                        )}
                        <h1 className="text-xl md:text-2xl font-hanken font-semibold text-primary-900 leading-8">
                            Ringkasan Operasional
                        </h1>
                        {selectedDivisi && (
                            <span className="px-3 py-1 bg-primary-700 text-white text-xs font-mono font-bold rounded-full">
                                {selectedDivisi}
                            </span>
                        )}
                    </div>
                    <p className="text-sm md:text-base font-hanken text-gray-600 mt-1">
                        Pantau status persuratan dan administrasi peternakan hari ini.
                    </p>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                    <Link
                        href="/documents-export"
                        className="px-3 md:px-4 py-2 rounded-lg border border-primary-700 text-primary-700 text-xs font-mono font-medium tracking-wider hover:bg-primary-700 hover:text-white transition-colors"
                    >
                        Unduh Laporan
                    </Link>
                    <Link
                        href="/create"
                        className="px-3 md:px-4 py-2 rounded-lg bg-primary-700 text-white text-xs font-mono font-medium tracking-wider hover:bg-primary-800 transition-colors flex items-center gap-2"
                    >
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                            <path d="M5.5 0V11M0 5.5H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        Tambah Dokumen
                    </Link>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Urgent Warnings - Hanya untuk Manager */}
            {userRole === 'manager' && (
                <div className="mb-6 md:mb-8">
                    <UrgentWarning warnings={urgentWarnings} />
                </div>
            )}

            {/* Activity Feed */}
            <div className="mb-6 md:mb-8">
                <ActivityFeed activities={activities} />
            </div>

            {/* Document Table */}
            <div className="mb-6 md:mb-8">
                <DocumentTable documents={documents} />
            </div>
        </SidebarLayout>
    );
}
