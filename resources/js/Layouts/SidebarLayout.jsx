import { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';

// Navigation berdasarkan role - sesuai mockup BRD
const getNavigationByRole = (roleType, unreadCount) => {
    if (roleType === 'superadmin') {
        return [
            { type: 'item', name: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
            { type: 'header', name: 'SURAT' },
            { type: 'item', name: 'Daftar surat', href: '/documents', icon: 'mail-in' },
            { type: 'item', name: 'Tambah surat', href: '/create', icon: 'plus' },
            { type: 'header', name: 'MANAJEMEN SISTEM' },
            { type: 'item', name: 'Pengguna & role', href: '/users', icon: 'users' },
            { type: 'item', name: 'Template surat', href: '/templates', icon: 'template' },
            { type: 'item', name: 'Format nomor surat', href: '/numbering', icon: 'hash' },
            { type: 'header', name: 'LAINNYA' },
            { type: 'item', name: 'Notifikasi', href: '/notifications', icon: 'bell', badge: unreadCount },
            { type: 'item', name: 'Pengaturan akun', href: '/settings', icon: 'settings' },
        ];
    }

    if (roleType === 'manajer') {
        return [
            { type: 'item', name: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
            { type: 'header', name: 'APPROVAL' },
            { type: 'item', name: 'Antrian approval', href: '/approval', icon: 'check-circle', badge: unreadCount },
            { type: 'header', name: 'SURAT' },
            { type: 'item', name: 'Daftar surat', href: '/documents', icon: 'mail-in' },
            { type: 'item', name: 'Format nomor surat', href: '/numbering', icon: 'hash' },
            { type: 'header', name: 'LAINNYA' },
            { type: 'item', name: 'Notifikasi', href: '/notifications', icon: 'bell', badge: unreadCount },
            { type: 'item', name: 'Pengaturan akun', href: '/settings', icon: 'settings' },
        ];
    }

    // Staff/Admin
    return [
        { type: 'item', name: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
        { type: 'header', name: 'SURAT' },
        { type: 'item', name: 'Daftar surat', href: '/documents', icon: 'mail-in' },
        { type: 'item', name: 'Tambah surat', href: '/create', icon: 'plus' },
        { type: 'header', name: 'LAINNYA' },
        { type: 'item', name: 'Format nomor surat', href: '/numbering', icon: 'hash' },
        { type: 'item', name: 'Notifikasi', href: '/notifications', icon: 'bell', badge: unreadCount },
        { type: 'item', name: 'Pengaturan akun', href: '/settings', icon: 'settings' },
    ];
};

// Icon components
function NavIcon({ name, className }) {
    const icons = {
        dashboard: (
            <svg className={className} viewBox="0 0 20 20" fill="none">
                <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
            </svg>
        ),
        users: (
            <svg className={className} viewBox="0 0 20 20" fill="none">
                <circle cx="7" cy="6" r="3" stroke="currentColor" strokeWidth="1.6" />
                <path d="M2 17C2 14.2386 4.23858 12 7 12C9.76142 12 12 14.2386 12 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="14" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M13 17C13 14.7909 14.7909 13 16 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
        ),
        template: (
            <svg className={className} viewBox="0 0 20 20" fill="none">
                <rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M7 6H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M7 9H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M7 12H10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
        ),
        hash: (
            <svg className={className} viewBox="0 0 20 20" fill="none">
                <path d="M7 2L5 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M13 2L11 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M2 7H18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M2 13H18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
        ),
        'mail-in': (
            <svg className={className} viewBox="0 0 20 20" fill="none">
                <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M2 6L10 11L18 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M10 11V16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M7 14H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
        ),
        'mail-out': (
            <svg className={className} viewBox="0 0 20 20" fill="none">
                <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M2 6L10 11L18 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M10 4V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M7 7L10 4L13 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        'mail-internal': (
            <svg className={className} viewBox="0 0 20 20" fill="none">
                <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M2 6L10 11L18 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="14" cy="6" r="2" stroke="currentColor" strokeWidth="1.2" />
            </svg>
        ),
        'file-text': (
            <svg className={className} viewBox="0 0 20 20" fill="none">
                <path d="M4 2H12L17 7V18H4V2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M12 2V7H17" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M7 10H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M7 13H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M7 16H10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
        ),
        'check-circle': (
            <svg className={className} viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" />
                <path d="M6.5 10L9 12.5L13.5 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        chart: (
            <svg className={className} viewBox="0 0 20 20" fill="none">
                <rect x="2" y="10" width="4" height="8" rx="1" stroke="currentColor" strokeWidth="1.6" />
                <rect x="8" y="6" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.6" />
                <rect x="14" y="2" width="4" height="16" rx="1" stroke="currentColor" strokeWidth="1.6" />
            </svg>
        ),
        bell: (
            <svg className={className} viewBox="0 0 20 20" fill="none">
                <path d="M10 2C7.23858 2 5 4.23858 5 7V11L3 14H17L15 11V7C15 4.23858 12.7614 2 10 2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M8 14C8 15.1046 8.89543 16 10 16C11.1046 16 12 15.1046 12 14" stroke="currentColor" strokeWidth="1.6" />
            </svg>
        ),
        settings: (
            <svg className={className} viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.6" />
                <path d="M10 2V4M10 16V18M18 10H16M2 10H4M15.66 4.34L14.24 5.76M3.76 14.24L5.18 12.82M15.66 15.66L14.24 14.24M3.76 5.76L5.18 7.18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
        ),
        plus: (
            <svg className={className} viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" />
                <path d="M10 6V14M6 10H14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
        ),
        edit: (
            <svg className={className} viewBox="0 0 20 20" fill="none">
                <path d="M14 2L18 6L6 18H2V14L14 2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
        ),
    };

    return icons[name] || icons.dashboard;
}

export default function SidebarLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const roleType = user?.role_type || 'staff';
    const currentUrl = window.location.pathname;
    const currentQuery = window.location.search;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    const navigation = getNavigationByRole(roleType, unreadCount);

    // Fetch unread count
    useEffect(() => {
        fetch('/notifications/unread-count')
            .then(res => res.json())
            .then(data => setUnreadCount(data.count || 0))
            .catch(() => {});
    }, [currentUrl]);

    useEffect(() => {
        setMobileOpen(false);
    }, [currentUrl]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') setMobileOpen(false);
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    const getRoleLabel = () => {
        if (roleType === 'superadmin') return 'Super Admin';
        if (roleType === 'manajer') return 'Manajer / Pimpinan';
        return 'Admin / Sekretaris';
    };

    const getInitials = () => {
        if (!user?.name) return 'A';
        return user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-[#1a1a2e]">
            {/* Header */}
            <div className="px-4 pt-5 pb-4">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                            <path d="M4 4H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            <path d="M4 8H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            <path d="M4 12H11" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white leading-tight">Gunung Geulis Farm</p>
                        <p className="text-[10px] text-white/50">Sistem Persuratan</p>
                    </div>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                    <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">{getInitials()}</span>
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{user?.name || 'User'}</p>
                        <p className="text-[11px] text-white/50">{getRoleLabel()}</p>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="mx-4 h-px bg-white/10" />

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-3 px-3">
                {navigation.map((item, index) => {
                    if (item.type === 'header') {
                        return (
                            <div key={`header-${index}`} className="px-3 pt-4 pb-2">
                                <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">
                                    {item.name}
                                </p>
                            </div>
                        );
                    }

                    const isActive = currentUrl === item.href ||
                        (item.href.includes('?') && currentUrl + currentQuery === item.href);

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`
                                flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-all
                                ${isActive
                                    ? 'bg-white/10 text-white'
                                    : 'text-white/60 hover:bg-white/5 hover:text-white/80'
                                }
                            `}
                        >
                            <NavIcon name={item.icon} className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-white/50'}`} />
                            <span className="text-sm font-medium flex-1">{item.name}</span>
                            {item.badge > 0 && (
                                <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
            )}

            {/* Sidebar - Desktop */}
            <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 z-50">
                <SidebarContent />
            </aside>

            {/* Sidebar - Mobile */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 lg:hidden ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <SidebarContent />
            </aside>

            {/* Main Content */}
            <div className="flex-1 lg:ml-64 min-h-screen flex flex-col">
                {/* Mobile Header */}
                <header className="lg:hidden sticky top-0 z-30 h-14 bg-white border-b border-gray-200 flex items-center px-4">
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M3 5H17M3 10H17M3 15H17" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>
                    <span className="ml-3 text-sm font-semibold text-gray-800">Gunung Geulis Farm</span>
                </header>

                {/* Page Content */}
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
