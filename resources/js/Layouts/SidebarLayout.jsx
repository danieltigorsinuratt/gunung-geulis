import { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';

const mainNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: DashboardIcon },
    { name: 'Daftar Dokumen', href: '/documents', icon: DocumentIcon },
    { name: 'Arsip', href: '/documents-arsip', icon: ArchiveIcon },
    { name: 'Input Dokumen', href: '/create', icon: PlusIcon },
];

const bottomNavigation = [
    { name: 'Pengaturan', href: '/settings', icon: SettingsIcon },
];

function DashboardIcon({ className }) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
            <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
            <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
            <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
    );
}

function DocumentIcon({ className }) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4C4 2.89543 4.89543 2 6 2H12L17 7V16C17 17.1046 16.1046 18 15 18H6C4.89543 18 4 17.1046 4 16V4Z" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 2V7H17" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M7 11H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M7 14H11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}

function PlusIcon({ className }) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" />
            <path d="M10 7V13M7 10H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}

function SettingsIcon({ className }) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.1654 12.1654L14.8821 13.4487C14.7488 13.582 14.6388 13.739 14.5588 13.9104L14.0338 15.042C13.8768 15.3803 13.5368 15.5965 13.1638 15.5965L6.83542 15.5965C6.46242 15.5965 6.12242 15.3803 5.96542 15.042L5.44042 13.9104C5.36042 13.739 5.25042 13.582 5.11709 13.4487L3.83376 12.1654C3.54876 11.8804 3.54876 11.4187 3.83376 11.1337L4.78209 10.1854C4.89209 10.0754 4.97209 9.93709 5.01209 9.78876L5.48709 8.04542C5.62476 7.55042 6.08709 7.18709 6.60209 7.18709L7.50209 7.18709C7.74209 7.18709 7.97209 7.09209 8.14209 6.93542L10 5.07709C10.2851 4.79209 10.7468 4.79209 11.0318 5.07709L12.8894 6.93542C13.0594 7.09209 13.2894 7.18709 13.5294 7.18709L14.4294 7.18709C14.9444 7.18709 15.4068 7.55042 15.5444 8.04542L16.0194 9.78876C16.0594 9.93709 16.1394 10.0754 16.2494 10.1854L17.1978 11.1337C17.4828 11.4187 17.4828 11.8804 17.1978 12.1654H16.1654Z" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

function ArchiveIcon({ className }) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="16" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
            <path d="M3 7V16C3 16.5523 3.44772 17 4 17H16C16.5523 17 17 16.5523 17 16V7" stroke="currentColor" strokeWidth="1.6" />
            <path d="M8 11H12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}

/* SVG icons untuk panel bantuan */
function PhoneIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
    );
}

function MailIcon2() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
    );
}

function BuildingIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
            <path d="M9 22v-4h6v4"/>
            <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M8 10h.01M16 10h.01M12 14h.01M8 14h.01M16 14h.01"/>
        </svg>
    );
}

const helpContents = {
    '/dashboard': {
        title: 'Panduan Ringkasan Operasional',
        sections: [
            {
                title: 'Ikhtisar Dashboard',
                text: 'Halaman ini memberikan ringkasan status persuratan hari ini. Anda dapat memantau jumlah total dokumen, dokumen yang belum dibalas, dan dokumen yang segera kedaluwarsa secara real-time.'
            },
            {
                title: 'Kartu Statistik',
                text: 'Klik pada kartu statistik untuk memantau detail cepat. Kartu berwarna merah menunjukkan dokumen yang mendekati batas kedaluwarsa dan memerlukan tindakan segera.'
            },
            {
                title: 'Unduh Laporan',
                text: 'Gunakan tombol "Unduh Laporan" di pojok kanan atas untuk mengekspor statistik performa administrasi farm dalam format PDF/Excel.'
            }
        ]
    },
    '/documents': {
        title: 'Panduan Arsip Korespondensi',
        sections: [
            {
                title: 'Pencarian & Penyaringan',
                text: 'Gunakan panel filter di bagian atas untuk menyaring dokumen berdasarkan Jenis Dokumen, Status, Periode Tanggal, atau Lokasi Sektor Farm. Klik "Terapkan Filter" untuk memperbarui tabel.'
            },
            {
                title: 'Aksi Dokumen',
                text: 'Di sebelah kanan setiap baris dokumen, terdapat ikon aksi: ikon <strong>Mata</strong> untuk melihat detail, ikon <strong>Pensil</strong> untuk mengedit metadata, dan ikon <strong>Unduh</strong> untuk mengunduh berkas scan dokumen.'
            },
            {
                title: 'Ekspor Laporan',
                text: 'Tombol "Ekspor Laporan" di bagian atas halaman memungkinkan Anda untuk mengunduh daftar surat yang telah disaring.'
            }
        ]
    },
    '/create': {
        title: 'Panduan Input Dokumen',
        sections: [
            {
                title: 'Unggah Berkas Scan',
                text: 'Seret (drag) atau klik area kotak putus-putus untuk mengunggah dokumen fisik (format PDF, JPG, atau PNG maksimal 10MB). Pastikan hasil scan terbaca dengan jelas.'
            },
            {
                title: 'Informasi Utama',
                text: 'Isi Nomor Surat sesuai format resmi (contoh: <code>GG-SJ-2023-0892</code>) dan tulis Perihal/Judul sesingkat dan sejelas mungkin agar mudah dicari.'
            },
            {
                title: 'Masa Berlaku (Kedaluwarsa)',
                text: 'Aktifkan opsi "Atur Masa Berlaku" jika dokumen berupa kontrak kerja sama, izin lingkungan, atau dokumen legal lainnya yang memiliki masa kedaluwarsa agar sistem dapat memberikan pengingat otomatis.'
            }
        ]
    },
    '/settings': {
        title: 'Panduan Pengaturan',
        sections: [
            {
                title: 'Konfigurasi Aplikasi',
                text: 'Halaman ini memungkinkan Anda menyesuaikan preferensi notifikasi email, pengaturan alur disposisi dokumen otomatis, dan manajemen kategori surat jalan.'
            },
            {
                title: 'Simpan Perubahan',
                text: 'Pastikan klik tombol "Simpan" setelah mengubah konfigurasi agar preferensi sistem Anda diperbarui.'
            }
        ]
    },
    'default': {
        title: 'Panduan Umum Sistem',
        sections: [
            {
                title: 'Alur Kerja Korespondensi',
                text: 'Sistem ini digunakan untuk mencatat dan mendistribusikan surat menyurat di lingkungan Gunung Geulis Farm. Setiap surat masuk/keluar harus didaftarkan melalui menu <strong>Input Baru</strong>.'
            },
            {
                title: 'Navigasi Menu',
                text: 'Gunakan sidebar sebelah kiri untuk berpindah halaman antara Dashboard, Daftar Dokumen, Arsip, Input Dokumen, dan Pengaturan.'
            },
            {
                title: 'Butuh Bantuan?',
                text: 'Jika Anda menemukan masalah teknis, silakan hubungi Tim IT Support Gunung Geulis Farm melalui ekstensi telepon 102.'
            }
        ]
    }
};

const getHelpContent = (url) => {
    if (url === '/dashboard') return helpContents['/dashboard'];
    if (url === '/documents') return helpContents['/documents'];
    if (url === '/create') return helpContents['/create'];
    if (url === '/settings') return helpContents['/settings'];
    if (url.startsWith('/documents/')) {
        return {
            title: 'Panduan Detail Dokumen',
            sections: [
                {
                    title: 'Detail Metadata',
                    text: 'Halaman ini menampilkan seluruh informasi detail dokumen, termasuk riwayat pengunggahan, berkas fisik yang dilampirkan, instansi terkait, dan kepada siapa dokumen didelegasikan.'
                },
                {
                    title: 'Riwayat & Disposisi',
                    text: 'Di bagian bawah, Anda dapat melihat riwayat aktivitas dokumen (kapan diunggah, siapa yang mengubah status) serta catatan disposisi dari kepala divisi.'
                },
                {
                    title: 'Tindakan Cepat',
                    text: 'Anda dapat mengunduh berkas fisik, membagikan tautan dokumen, atau mengubah status dokumen secara langsung dari tombol aksi yang tersedia di bagian atas.'
                }
            ]
        };
    }
    return helpContents['default'];
};

export default function SidebarLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const currentUrl = window.location.pathname;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [helpOpen, setHelpOpen] = useState(false);

    const activeHelp = getHelpContent(currentUrl);
    const sidebarWidth = collapsed ? 64 : 240;

    useEffect(() => {
        setMobileOpen(false);
        setHelpOpen(false);
    }, [currentUrl]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setMobileOpen(false);
                setHelpOpen(false);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    const SidebarContent = () => (
        <div className="flex flex-col h-full">

            {/* ── Header: Logo + Nama + Collapse Button ── */}
            <div className={`flex items-center px-4 pt-5 pb-4 ${collapsed ? 'justify-center' : 'justify-between'}`}>
                {!collapsed && (
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                                <path d="M4 4H16" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                                <path d="M4 8H16" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                                <path d="M4 12H11" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-hanken font-bold text-gray-900 leading-tight truncate">
                                Gunung Geulis
                            </p>
                            <p className="text-[11px] font-hanken text-gray-400 leading-tight">
                                Admin
                            </p>
                        </div>
                    </div>
                )}
                {collapsed && (
                    <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                            <path d="M4 4H16" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                            <path d="M4 8H16" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                            <path d="M4 12H11" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                        </svg>
                    </div>
                )}
                {/* Collapse toggle (desktop only) */}
                {!collapsed && (
                    <button
                        onClick={() => setCollapsed(true)}
                        className="hidden md:flex items-center justify-center w-7 h-7 rounded-md hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 flex-shrink-0"
                        title="Ciutkan sidebar"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6"/>
                            <path d="M9 18l-6-6 6-6"/>
                        </svg>
                    </button>
                )}
            </div>

            {/* Expand button when collapsed */}
            {collapsed && (
                <div className="hidden md:flex justify-center px-2 mb-1">
                    <button
                        onClick={() => setCollapsed(false)}
                        className="w-7 h-7 rounded-md hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 flex items-center justify-center"
                        title="Perluas sidebar"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6"/>
                            <path d="M15 18l6-6-6-6"/>
                        </svg>
                    </button>
                </div>
            )}

            {/* Divider */}
            <div className="mx-4 mb-3" style={{ height: '1px', backgroundColor: '#F1F5F9' }} />

            {/* ── Main Navigation ── */}
            <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
                {mainNavigation.map((item) => {
                    const isActive = currentUrl === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            title={collapsed ? item.name : undefined}
                            className={`
                                relative flex items-center rounded-lg transition-all duration-150 group
                                ${collapsed ? 'justify-center px-0 py-2.5 mx-1' : 'gap-3 px-3 py-2.5'}
                                ${isActive
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                                }
                            `}
                        >
                            {/* Active left border */}
                            {isActive && !collapsed && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-blue-600 rounded-r-full" />
                            )}
                            <item.icon className={`flex-shrink-0 transition-colors ${collapsed ? 'w-5 h-5' : 'w-[18px] h-[18px]'} ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                            {!collapsed && (
                                <span className={`text-sm font-hanken font-medium leading-none truncate ${isActive ? 'text-blue-700 font-semibold' : ''}`}>
                                    {item.name}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* ── Bottom Section: Pengaturan ── */}
            <div className="px-2 pb-2 mt-2">
                <div className="mx-2 mb-2" style={{ height: '1px', backgroundColor: '#F1F5F9' }} />
                {bottomNavigation.map((item) => {
                    const isActive = currentUrl === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            title={collapsed ? item.name : undefined}
                            className={`
                                relative flex items-center rounded-lg transition-all duration-150 group
                                ${collapsed ? 'justify-center px-0 py-2.5 mx-1' : 'gap-3 px-3 py-2.5'}
                                ${isActive
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                                }
                            `}
                        >
                            {isActive && !collapsed && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-blue-600 rounded-r-full" />
                            )}
                            <item.icon className={`flex-shrink-0 transition-colors ${collapsed ? 'w-5 h-5' : 'w-[18px] h-[18px]'} ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                            {!collapsed && (
                                <span className={`text-sm font-hanken font-medium leading-none truncate ${isActive ? 'text-blue-700 font-semibold' : ''}`}>
                                    {item.name}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </div>

            {/* ── User Profile ── */}
            <div className="mx-3 mb-4 mt-1" style={{ height: '1px', backgroundColor: '#F1F5F9' }} />
            <div className={`px-3 pb-4 flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                    {user?.avatar ? (
                        <img
                            src={`/storage/avatars/${user.avatar}`}
                            alt={user.name}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center">
                            <span className="text-blue-700 text-xs font-hanken font-bold">
                                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                            </span>
                        </div>
                    )}
                    {/* Online indicator */}
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                </div>

                {!collapsed && (
                    <>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-hanken font-semibold text-gray-800 leading-tight truncate">
                                {user?.name || 'Admin'}
                            </p>
                            <p className="text-[11px] font-hanken text-gray-400 leading-tight truncate mt-0.5">
                                {user?.email || 'admin@gununggeulis.com'}
                            </p>
                        </div>
                        <button
                            onClick={() => router.post(route('logout'))}
                            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-400 hover:text-red-500 flex-shrink-0"
                            title="Keluar"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                <polyline points="16 17 21 12 16 7"/>
                                <line x1="21" y1="12" x2="9" y2="12"/>
                            </svg>
                        </button>
                    </>
                )}
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-slate-50">

            {/* ── Mobile Overlay ── */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* ── Sidebar Desktop ── */}
            <aside
                className="hidden md:flex flex-col fixed inset-y-0 left-0 z-30 bg-white border-r border-gray-100 transition-all duration-300 ease-in-out"
                style={{ width: `${sidebarWidth}px`, boxShadow: '1px 0 0 0 #F1F5F9' }}
            >
                <SidebarContent />
            </aside>

            {/* ── Sidebar Mobile ── */}
            <aside
                className={`
                    md:hidden fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-gray-100
                    transition-transform duration-300 ease-in-out
                    ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
                style={{ width: '240px', boxShadow: mobileOpen ? '4px 0 24px rgba(0,0,0,0.08)' : 'none' }}
            >
                <SidebarContent />
            </aside>

            {/* ── Main Content ── */}
            <main
                className="flex-1 min-h-screen flex flex-col transition-all duration-300 ease-in-out"
                style={{ marginLeft: `var(--sidebar-w, 0px)` }}
            >
                <style>{`
                    @media (min-width: 768px) { :root { --sidebar-w: ${collapsed ? '64px' : '240px'}; } }
                `}</style>
                {/* Top Bar */}
                <header className="sticky top-0 z-30 h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6">
                    <div className="flex items-center gap-3">
                        {/* Mobile Hamburger */}
                        <button
                            onClick={() => setMobileOpen(true)}
                            className="flex items-center justify-center w-9 h-9 rounded-lg md:hidden hover:bg-gray-50 transition-colors text-gray-500"
                        >
                            <svg width="18" height="14" viewBox="0 0 20 16" fill="none">
                                <path d="M1 1H19M1 8H19M1 15H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </button>
                    </div>

                    <div className="flex items-center gap-1">
                        <button className="p-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-400 hover:text-gray-600">
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                                <path d="M15 7C15 4.23858 12.7614 2 10 2C7.23858 2 5 4.23858 5 7V10L3 13H17L15 10V7Z" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M8 15C8 16.1046 8.89543 17 10 17C11.1046 17 12 16.1046 12 15" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setHelpOpen(true)}
                            className="p-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-400 hover:text-gray-600"
                            title="Panduan Sistem"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M7.5 7.5C7.5 6.11929 8.61929 5 10 5C11.3807 5 12.5 6.11929 12.5 7.5C12.5 8.88071 11.3807 10 10 10V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <circle cx="10" cy="14.5" r="0.75" fill="currentColor" />
                            </svg>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 p-4 md:p-6">
                    {children}
                </div>
            </main>

            {/* ── Help Slide-over Drawer ── */}
            <div className={`fixed inset-0 z-50 overflow-hidden ${helpOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <div className="absolute inset-0 overflow-hidden">
                    <div
                        className={`absolute inset-0 bg-black/25 transition-opacity duration-300 ${helpOpen ? 'opacity-100' : 'opacity-0'}`}
                        onClick={() => setHelpOpen(false)}
                    />
                    <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
                        <div className={`w-screen max-w-md bg-white border-l border-gray-100 shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out ${helpOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                            {/* Drawer Header */}
                            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-blue-600" viewBox="0 0 20 20" fill="none">
                                            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
                                            <path d="M7.5 7.5C7.5 6.11929 8.61929 5 10 5C11.3807 5 12.5 6.11929 12.5 7.5C12.5 8.88071 11.3807 10 10 10V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                            <circle cx="10" cy="14.5" r="0.75" fill="currentColor"/>
                                        </svg>
                                    </div>
                                    <h2 className="text-sm font-hanken font-semibold text-gray-800">
                                        {activeHelp.title}
                                    </h2>
                                </div>
                                <button
                                    onClick={() => setHelpOpen(false)}
                                    className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Drawer Body */}
                            <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-slate-50">
                                {activeHelp.sections.map((section, idx) => (
                                    <div key={idx} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-[10px] font-hanken font-bold text-blue-600">{idx + 1}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-hanken font-semibold text-gray-800 mb-1.5">
                                                    {section.title}
                                                </h3>
                                                <p
                                                    className="text-xs text-gray-500 font-hanken leading-relaxed"
                                                    dangerouslySetInnerHTML={{ __html: section.text }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                                    <h3 className="text-sm font-hanken font-semibold text-gray-800 mb-2">
                                        Butuh Bantuan Lebih Lanjut?
                                    </h3>
                                    <p className="text-xs text-gray-500 font-hanken mb-3 leading-relaxed">
                                        Jika Anda mengalami kendala teknis atau memerlukan hak akses tambahan, silakan hubungi Administrator:
                                    </p>
                                    <div className="rounded-lg border border-gray-100 bg-gray-50 p-3 flex flex-col gap-2.5">
                                        <div className="flex items-center gap-2.5 text-xs text-gray-600 font-hanken">
                                            <span className="w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-500">
                                                <PhoneIcon />
                                            </span>
                                            <span>Ext: <strong className="text-gray-800">102 (IT Support)</strong></span>
                                        </div>
                                        <div className="flex items-center gap-2.5 text-xs text-gray-600 font-hanken">
                                            <span className="w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-500">
                                                <MailIcon2 />
                                            </span>
                                            <span>Email: <strong className="text-gray-800">admin.it@gununggeulis.com</strong></span>
                                        </div>
                                        <div className="flex items-center gap-2.5 text-xs text-gray-600 font-hanken">
                                            <span className="w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-500">
                                                <BuildingIcon />
                                            </span>
                                            <span>Kantor: <strong className="text-gray-800">Gedung Utama Lt. 2</strong></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Drawer Footer */}
                            <div className="p-4 bg-white border-t border-gray-100 flex justify-end">
                                <button
                                    onClick={() => setHelpOpen(false)}
                                    className="px-4 py-2 bg-gray-900 text-white text-xs font-hanken font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    Tutup Panduan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
