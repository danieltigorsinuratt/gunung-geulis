import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head } from '@inertiajs/react';
import StatCard from '@/Components/Dashboard/StatCard';
import DocumentTable from '@/Components/Dashboard/DocumentTable';
import UrgentWarning from '@/Components/Dashboard/UrgentWarning';
import ActivityFeed from '@/Components/Dashboard/ActivityFeed';
import Banner from '@/Components/Dashboard/Banner';

// Hardcoded data
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
        value: '1,284',
        label: 'TOTAL DOKUMEN',
        badge: '+12%',
    },
    {
        icon: (
            <svg width="19" height="21" viewBox="0 0 19 21" fill="none">
                <rect x="1" y="1" width="17" height="13" rx="2" stroke="#8B6914" strokeWidth="1.5" />
                <path d="M5 19H14" stroke="#8B6914" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M9.5 14V19" stroke="#8B6914" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M6 7L9 10L13 6" stroke="#8B6914" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        value: '24',
        label: 'BELUM DIBALAS',
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="#BA1A1A" strokeWidth="1.5" />
                <path d="M10 6V10" stroke="#BA1A1A" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10 13V13.01" stroke="#BA1A1A" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        value: '7',
        label: 'SEGERA KEDALUWARSA',
        variant: 'danger',
    },
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="8" stroke="#1D4ED8" strokeWidth="1.5" />
                <path d="M9 4V9L12 12" stroke="#1D4ED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        value: '45',
        label: 'AKTIVITAS HARI INI',
    },
];

const documents = [
    { nomor: 'GG/ADM/2023/1042', perihal: 'Kontrak Pakan Ternak Q4', jenis: 'EKSTERNAL', status: 'TERKIRIM' },
    { nomor: 'GG/LGL/2023/0891', perihal: 'Izin Lingkungan Kandang B', jenis: 'LEGAL', status: 'PROSES' },
    { nomor: 'GG/FIN/2023/0772', perihal: 'Invoice Vendor Bibit Sapi', jenis: 'FINANCIAL', status: 'TERTUNDA' },
    { nomor: 'GG/ADM/2023/1043', perihal: 'Memorandum Internal Vaksinasi', jenis: 'INTERNAL', status: 'SELESAI' },
    { nomor: 'GG/OPS/2023/1105', perihal: 'Laporan Harian Produksi Susu', jenis: 'OPERASIONAL', status: 'TERKIRIM' },
];

const urgentWarnings = [
    {
        id: 1,
        badge: 'KEDALUWARSA 2 HARI',
        title: 'Izin Distribusi Ternak Jabar',
        description: 'Dokumen legal nomor #LGL-992 segera habis masa berlakunya.',
        color: 'red',
    },
    {
        id: 2,
        badge: 'KEDALUWARSA 5 HARI',
        title: 'Sewa Lahan Area C',
        description: 'Perpanjangan kontrak dengan Pemda perlu segera diajukan.',
        color: 'amber',
    },
];

const activities = [
    {
        id: 1,
        title: 'Andi Saputra mengunggah dokumen baru',
        description: 'Laporan Audit Kebersihan Kandang A',
        time: '15 Menit yang lalu',
        icon: 'upload',
        color: 'green',
    },
    {
        id: 2,
        title: 'Siti Aminah mengubah status surat',
        description: '#GG/FIN/2023/0772 set menjadi \'Tunda\'',
        time: '1 Jam yang lalu',
        icon: 'edit',
        color: 'blue',
    },
    {
        id: 3,
        title: 'Sistem mengirim notifikasi email',
        description: 'Pengingat kedaluwarsa dokumen izin dikirim ke Admin Legal',
        time: '3 Jam yang lalu',
        icon: 'mail',
        color: 'lightgreen',
    },
];

export default function Dashboard() {
    return (
        <SidebarLayout>
            <Head title="Dashboard" />

            {/* Header */}
            <div className="flex items-end justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-hanken font-semibold text-primary-900 leading-8">
                        Ringkasan Operasional
                    </h1>
                    <p className="text-base font-hanken text-gray-600 mt-1">
                        Pantau status persuratan dan administrasi peternakan hari ini.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 rounded-lg border border-primary-700 text-primary-700 text-xs font-mono font-medium tracking-wider hover:bg-primary-700 hover:text-white transition-colors">
                        Unduh Laporan
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-primary-700 text-white text-xs font-mono font-medium tracking-wider hover:bg-primary-800 transition-colors flex items-center gap-2">
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                            <path d="M5.5 0V11M0 5.5H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        Tambah Dokumen
                    </button>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-3 gap-8 mb-8">
                {/* Document Table - 2 columns */}
                <div className="col-span-2">
                    <DocumentTable documents={documents} />
                </div>

                {/* Right Sidebar - 1 column */}
                <div className="flex flex-col gap-8">
                    <UrgentWarning warnings={urgentWarnings} />
                    <ActivityFeed activities={activities} />
                </div>
            </div>

            {/* Banner */}
            <Banner />
        </SidebarLayout>
    );
}
