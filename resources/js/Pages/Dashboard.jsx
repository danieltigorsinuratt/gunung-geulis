import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, Link } from '@inertiajs/react';
import StatCard from '@/Components/Dashboard/StatCard';
import DocumentTable from '@/Components/Dashboard/DocumentTable';
import UrgentWarning from '@/Components/Dashboard/UrgentWarning';
import ActivityFeed from '@/Components/Dashboard/ActivityFeed';

// Dashboard Super Admin
function SuperAdminDashboard({ stats, documents, activities, selectedDivisi }) {
    return (
        <>
            <div className="mb-8">
                <h1 className="text-2xl font-hanken font-semibold text-primary-900">Dashboard Super Admin</h1>
                <p className="text-sm font-hanken text-gray-600 mt-1">
                    Ringkasan seluruh sistem persuratan Gunung Geulis Farm.
                    {selectedDivisi && <span className="font-bold"> Menampilkan: {selectedDivisi}</span>}
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => <StatCard key={i} {...stat} />)}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                    <DocumentTable documents={documents} />
                </div>
                <div className="flex flex-col gap-8">
                    <ActivityFeed activities={activities} />
                </div>
            </div>
        </>
    );
}

// Dashboard Manager
function ManagerDashboard({ stats, documents, urgentWarnings, activities }) {
    return (
        <>
            <div className="mb-8">
                <h1 className="text-2xl font-hanken font-semibold text-primary-900">Dashboard Manager</h1>
                <p className="text-sm font-hanken text-gray-600 mt-1">
                    Pantau persetujuan surat dan aktivitas tim hari ini.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => <StatCard key={i} {...stat} />)}
            </div>

            {/* Quick Action: Antrian Approval */}
            <div className="bg-white rounded-xl border border-surface-border p-6 mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-hanken font-bold text-primary-900">Antrian Approval</h2>
                        <p className="text-sm font-hanken text-gray-600">Surat yang menunggu persetujuan Anda.</p>
                    </div>
                    <Link href="/approval" className="px-4 py-2 bg-primary-700 text-white rounded-lg text-sm font-hanken font-bold hover:bg-primary-800 transition-colors">
                        Lihat Semua →
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                    <DocumentTable documents={documents} />
                </div>
                <div className="flex flex-col gap-8">
                    <UrgentWarning warnings={urgentWarnings} />
                    <ActivityFeed activities={activities} />
                </div>
            </div>
        </>
    );
}

// Dashboard Admin
function AdminDashboard({ stats, documents, activities }) {
    return (
        <>
            <div className="mb-8">
                <h1 className="text-2xl font-hanken font-semibold text-primary-900">Dashboard</h1>
                <p className="text-sm font-hanken text-gray-600 mt-1">
                    Pantau status surat dan aktivitas hari ini.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => <StatCard key={i} {...stat} />)}
            </div>

            {/* Quick Action: Tambah Surat */}
            <div className="bg-white rounded-xl border border-surface-border p-6 mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-hanken font-bold text-primary-900">Surat Saya</h2>
                        <p className="text-sm font-hanken text-gray-600">Lihat status surat yang telah Anda buat.</p>
                    </div>
                    <Link href="/documents" className="px-4 py-2 bg-primary-700 text-white rounded-lg text-sm font-hanken font-bold hover:bg-primary-800 transition-colors">
                        Lihat Semua →
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                    <DocumentTable documents={documents} />
                </div>
                <div className="flex flex-col gap-8">
                    <ActivityFeed activities={activities} />
                </div>
            </div>
        </>
    );
}

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
                    <circle cx="10" cy="10" r="8" stroke="#396A10" strokeWidth="1.5"/>
                    <path d="M6.5 10L9 12.5L13.5 7.5" stroke="#396A10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ),
            value: approvedDocuments.toLocaleString(),
            label: 'DISETUJUI',
        },
        {
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="#BA1A1A" strokeWidth="1.5"/>
                    <path d="M7 7L13 13M13 7L7 13" stroke="#BA1A1A" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            ),
            value: rejectedDocuments.toLocaleString(),
            label: 'DITOLAK',
        },
        {
            icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="8" stroke="#1D4ED8" strokeWidth="1.5" />
                    <path d="M9 4V9L12 12" stroke="#1D4ED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            value: urgentDocuments.toLocaleString(),
            label: 'URGENT',
            variant: urgentDocuments > 0 ? 'danger' : 'default',
        },
    ];

    return (
        <SidebarLayout>
            <Head title="Dashboard" />

            {userRole === 'superadmin' && (
                <SuperAdminDashboard stats={stats} documents={documents} activities={activities} selectedDivisi={selectedDivisi} />
            )}
            {(userRole === 'manager' || userRole === 'manajer') && (
                <ManagerDashboard stats={stats} documents={documents} urgentWarnings={urgentWarnings} activities={activities} />
            )}
            {userRole === 'admin' && (
                <AdminDashboard stats={stats} documents={documents} activities={activities} />
            )}
        </SidebarLayout>
    );
}
