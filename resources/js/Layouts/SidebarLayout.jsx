import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: DashboardIcon },
    { name: 'Daftar Dokumen', href: '/documents', icon: DocumentIcon },
    { name: 'Input Baru', href: '/documents/create', icon: PlusIcon },
    { name: 'Pengaturan', href: '/settings', icon: SettingsIcon },
];

function DashboardIcon({ className }) {
    return (
        <svg className={className} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="10" y="1" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="1" y="10" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="10" y="10" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

function DocumentIcon({ className }) {
    return (
        <svg className={className} viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5C1 3.89543 1.89543 3 3 3H10L15 8V17C15 18.1046 14.1046 19 13 19H3C1.89543 19 1 18.1046 1 17V5Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 3V8H15" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

function PlusIcon({ className }) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 6V14M6 10H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function SettingsIcon({ className }) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M16.1654 12.1654L14.8821 13.4487C14.7488 13.582 14.6388 13.739 14.5588 13.9104L14.0338 15.042C13.8768 15.3803 13.5368 15.5965 13.1638 15.5965L6.83542 15.5965C6.46242 15.5965 6.12242 15.3803 5.96542 15.042L5.44042 13.9104C5.36042 13.739 5.25042 13.582 5.11709 13.4487L3.83376 12.1654C3.54876 11.8804 3.54876 11.4187 3.83376 11.1337L4.78209 10.1854C4.89209 10.0754 4.97209 9.93709 5.01209 9.78876L5.48709 8.04542C5.62476 7.55042 6.08709 7.18709 6.60209 7.18709L7.50209 7.18709C7.74209 7.18709 7.97209 7.09209 8.14209 6.93542L10 5.07709C10.2851 4.79209 10.7468 4.79209 11.0318 5.07709L12.8894 6.93542C13.0594 7.09209 13.2894 7.18709 13.5294 7.18709L14.4294 7.18709C14.9444 7.18709 15.4068 7.55042 15.5444 8.04542L16.0194 9.78876C16.0594 9.93709 16.1394 10.0754 16.2494 10.1854L17.1978 11.1337C17.4828 11.4187 17.4828 11.8804 17.1978 12.1654H16.1654Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

export default function SidebarLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const currentUrl = window.location.pathname;

    return (
        <div className="flex min-h-screen bg-[#F2F8EA]">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-50 w-[220px] bg-gradient-to-b from-primary-900 to-primary-800 flex flex-col overflow-hidden">
                {/* Logo */}
                <div className="px-6 pt-6 pb-10">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-9 h-10 bg-accent-light rounded-lg">
                            <svg width="22" height="17" viewBox="0 0 22 17" fill="none">
                                <rect width="22" height="17" rx="2" fill="#173901" />
                                <rect x="3" y="4" width="16" height="2" rx="1" fill="#B9F38A" />
                                <rect x="3" y="8" width="16" height="2" rx="1" fill="#B9F38A" />
                                <rect x="3" y="12" width="10" height="2" rx="1" fill="#B9F38A" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-white font-hanken font-bold text-xl leading-7">
                                Gunung<br />Geulis
                            </div>
                            <div className="text-accent-light font-mono text-[10px] uppercase tracking-widest mt-0.5 opacity-80">
                                CORRESPONDENCE<br />ADMIN
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3">
                    {navigation.map((item) => {
                        const isActive = currentUrl === item.href || (item.href !== '/dashboard' && currentUrl.startsWith(item.href));
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 mb-1 text-[12px] font-mono font-medium tracking-wider transition-colors ${
                                    isActive
                                        ? 'bg-primary-700 border-l-4 border-accent-light text-white'
                                        : 'text-white/80 hover:bg-white/5'
                                }`}
                            >
                                <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Info */}
                <div className="px-6 py-5 border-t border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-700 flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <circle cx="8" cy="5" r="3" fill="white" />
                                <path d="M2 14C2 11.2386 4.68629 9 8 9C11.3137 9 14 11.2386 14 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-white text-sm font-medium font-hanken">
                                {user?.name || 'Admin GG Farm'}
                            </div>
                            <div className="text-accent-light/70 text-[10px] font-mono">
                                Head of Logistics
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-[220px] min-h-screen flex flex-col">
                {/* Top Bar */}
                <header className="sticky top-0 z-40 h-16 bg-[#FEF9F1] border-b border-surface-border flex items-center justify-between px-6">
                    <div className="flex-1 max-w-[448px]">
                        <div className="flex items-center gap-2 bg-surface rounded-full px-4 py-2.5">
                            <svg className="w-[18px] h-[18px] text-gray-400 flex-shrink-0" viewBox="0 0 18 18" fill="none">
                                <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M12 12L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Cari nomor surat atau perihal..."
                                className="w-full bg-transparent text-sm font-hanken text-gray-600 placeholder-gray-400 outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-full hover:bg-surface transition-colors">
                            <svg className="w-5 h-5 text-primary-900" viewBox="0 0 20 20" fill="none">
                                <path d="M15 7C15 4.23858 12.7614 2 10 2C7.23858 2 5 4.23858 5 7V10L3 13H17L15 10V7Z" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M8 15C8 16.1046 8.89543 17 10 17C11.1046 17 12 16.1046 12 15" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </button>
                        <button className="p-2 rounded-full hover:bg-surface transition-colors">
                            <svg className="w-5 h-5 text-primary-900" viewBox="0 0 20 20" fill="none">
                                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M7.5 7.5C7.5 6.11929 8.61929 5 10 5C11.3807 5 12.5 6.11929 12.5 7.5C12.5 8.88071 11.3807 10 10 10V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <circle cx="10" cy="14.5" r="0.75" fill="currentColor" />
                            </svg>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
