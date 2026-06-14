import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, Link } from '@inertiajs/react';

const divisionIcons = {
    'Tim Logistik': (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect x="4" y="12" width="32" height="22" rx="3" stroke="white" strokeWidth="2.5"/>
            <path d="M4 18H36" stroke="white" strokeWidth="2"/>
            <path d="M14 12V6C14 4.89543 14.8954 4 16 4H24C25.1046 4 26 4.89543 26 6V12" stroke="white" strokeWidth="2.5"/>
            <circle cx="20" cy="24" r="3" stroke="white" strokeWidth="2"/>
        </svg>
    ),
    'Tim Legal': (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M10 6H30V34H10V6Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
            <path d="M14 12H26M14 17H26M14 22H20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M16 28L20 32L24 28" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    'Sekretaris': (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect x="6" y="4" width="28" height="32" rx="3" stroke="white" strokeWidth="2.5"/>
            <path d="M12 12H28M12 17H28M12 22H22" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="28" cy="28" r="6" stroke="white" strokeWidth="2"/>
            <path d="M28 25V28H31" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    ),
    'Superadmin': (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 4L4 12V20C4 28.84 10.64 37.16 20 39C29.36 37.16 36 28.84 36 20V12L20 4Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
            <path d="M14 20L18 24L26 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
};

const divisionColors = {
    'Tim Logistik': 'from-[#374151] to-[#1F2937]',
    'Tim Legal':    'from-[#4B5563] to-[#374151]',
    'Sekretaris':   'from-[#6B7280] to-[#4B5563]',
    'Superadmin':   'from-[#1F2937] to-[#111827]',
};

export default function SelectDivision({ divisions = [] }) {
    return (
        <SidebarLayout>
            <Head title="Pilih Divisi" />

            <div className="max-w-[1200px] mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-hanken font-bold text-primary-900">
                        Ringkasan Operasional
                    </h1>
                    <p className="text-sm md:text-base font-hanken text-gray-600 mt-2">
                        Pilih divisi untuk melihat data dokumen dan statistik.
                    </p>
                </div>

                {/* Division Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {divisions.map((div) => (
                        <Link
                            key={div.name}
                            href={route('dashboard') + '?divisi=' + encodeURIComponent(div.name)}
                            className="group bg-white rounded-2xl border border-surface-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                        >
                            {/* Card Header */}
                            <div className={`bg-gradient-to-r ${divisionColors[div.name] || 'from-gray-600 to-gray-800'} px-6 py-5 flex items-center gap-4`}>
                                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                                    {divisionIcons[div.name] || divisionIcons['Tim Logistik']}
                                </div>
                                <div>
                                    <h2 className="text-xl font-hanken font-bold text-white">
                                        {div.name.replace('Tim ', '')}
                                    </h2>
                                    <p className="text-xs font-mono text-white/60 tracking-wider">
                                        {div.userCount} anggota aktif
                                    </p>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="px-6 py-5">
                                <div className="mb-4">
                                    <p className="text-sm font-hanken text-gray-500">Total Dokumen</p>
                                    <p className="text-3xl font-hanken font-bold text-primary-900">{div.total}</p>
                                </div>

                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    <div className="text-center">
                                        <p className="text-lg font-hanken font-bold text-[#1D4ED8]">{div.diproses}</p>
                                        <p className="text-[10px] font-mono text-gray-400 uppercase">Diproses</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-lg font-hanken font-bold text-[#8B6914]">{div.pending}</p>
                                        <p className="text-[10px] font-mono text-gray-400 uppercase">Pending</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-lg font-hanken font-bold text-primary-700">{div.selesai}</p>
                                        <p className="text-[10px] font-mono text-gray-400 uppercase">Selesai</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-surface-border">
                                    <span className="text-xs font-hanken text-gray-400">
                                        Diarsip: {div.diarsip}
                                    </span>
                                    <span className="text-xs font-hanken font-bold text-primary-700 group-hover:underline flex items-center gap-1">
                                        Lihat Detail
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M4.5 2L8.5 6L4.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </SidebarLayout>
    );
}
