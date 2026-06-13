import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: DashboardIcon },
    { name: 'Daftar Dokumen', href: '/documents', icon: DocumentIcon },
    { name: 'Input Baru', href: '/create', icon: PlusIcon },
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

function LogoIcon() {
    return (
        <svg width="22" height="17" viewBox="0 0 22 17" fill="none">
            <rect width="22" height="17" rx="2" fill="#173901" />
            <rect x="3" y="4" width="16" height="2" rx="1" fill="#B9F38A" />
            <rect x="3" y="8" width="16" height="2" rx="1" fill="#B9F38A" />
            <rect x="3" y="12" width="10" height="2" rx="1" fill="#B9F38A" />
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
        title: 'Panduan Input Dokumen Baru',
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
    '/profile': {
        title: 'Panduan Profil Pengguna',
        sections: [
            {
                title: 'Informasi Akun',
                text: 'Perbarui nama lengkap, alamat email, atau jabatan Anda di Gunung Geulis Farm.'
            },
            {
                title: 'Keamanan & Sandi',
                text: 'Ganti kata sandi secara berkala untuk menjaga keamanan akun administrasi Anda. Gunakan kombinasi huruf besar, kecil, angka, dan simbol.'
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
                text: 'Gunakan sidebar sebelah kiri untuk berpindah halaman antara Dashboard, Daftar Dokumen, Input Baru, dan Pengaturan.'
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
    if (url === '/profile') return helpContents['/profile'];
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
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [helpOpen, setHelpOpen] = useState(false);

    const activeHelp = getHelpContent(currentUrl);

    // Close sidebar and help drawer on route change
    useEffect(() => {
        setSidebarOpen(false);
        setHelpOpen(false);
    }, [currentUrl]);

    // Close sidebar and help drawer on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setSidebarOpen(false);
                setHelpOpen(false);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    return (
        <div className="flex min-h-screen bg-[#F2F8EA]">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-[220px] bg-gradient-to-b from-primary-900 to-primary-800 flex flex-col overflow-hidden
                transition-transform duration-300 ease-in-out
                md:translate-x-0
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Logo */}
                <div className="px-6 pt-6 pb-10">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-9 h-10 bg-accent-light rounded-lg">
                            <LogoIcon />
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
                        const isActive = currentUrl === item.href;
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
            <main className="flex-1 md:ml-[220px] min-h-screen flex flex-col">
                {/* Top Bar */}
                <header className="sticky top-0 z-30 h-16 bg-[#FEF9F1] border-b border-surface-border flex items-center justify-between px-4 md:px-6">
                    <div className="flex items-center gap-3">
                        {/* Mobile Hamburger Button */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="flex items-center justify-center w-10 h-10 rounded-lg md:hidden hover:bg-surface transition-colors"
                        >
                            <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                                <path d="M1 1H19M1 8H19M1 15H19" stroke="#173901" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </button>

                        {/* Search */}
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
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        <button className="p-2 rounded-full hover:bg-surface transition-colors">
                            <svg className="w-5 h-5 text-primary-900" viewBox="0 0 20 20" fill="none">
                                <path d="M15 7C15 4.23858 12.7614 2 10 2C7.23858 2 5 4.23858 5 7V10L3 13H17L15 10V7Z" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M8 15C8 16.1046 8.89543 17 10 17C11.1046 17 12 16.1046 12 15" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </button>
                        <button 
                            onClick={() => setHelpOpen(true)}
                            className="p-2 rounded-full hover:bg-surface transition-colors"
                            title="Panduan Sistem / Bantuan"
                        >
                            <svg className="w-5 h-5 text-primary-900" viewBox="0 0 20 20" fill="none">
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

            {/* Help Slide-over Drawer */}
            <div className={`fixed inset-0 z-50 overflow-hidden ${helpOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <div className="absolute inset-0 overflow-hidden">
                    {/* Backdrop */}
                    <div 
                        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${helpOpen ? 'opacity-100' : 'opacity-0'}`} 
                        onClick={() => setHelpOpen(false)}
                    />
                    
                    {/* Drawer Content */}
                    <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
                        <div className={`w-screen max-w-md bg-[#F2F8EA] border-l border-surface-border shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${helpOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                            {/* Header */}
                            <div className="px-6 py-5 bg-gradient-to-r from-primary-900 to-primary-800 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-accent-light" viewBox="0 0 20 20" fill="none">
                                        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
                                        <path d="M7.5 7.5C7.5 6.11929 8.61929 5 10 5C11.3807 5 12.5 6.11929 12.5 7.5C12.5 8.88071 11.3807 10 10 10V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                        <circle cx="10" cy="14.5" r="0.75" fill="currentColor"/>
                                    </svg>
                                    <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                                        {activeHelp.title}
                                    </h2>
                                </div>
                                <button 
                                    onClick={() => setHelpOpen(false)}
                                    className="p-1 rounded text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            {/* Body */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {activeHelp.sections.map((section, idx) => (
                                    <div key={idx} className="bg-white rounded-xl border border-surface-border p-4 shadow-sm">
                                        <h3 className="text-sm font-hanken font-bold text-primary-900 mb-2">
                                            {idx + 1}. {section.title}
                                        </h3>
                                        <p 
                                            className="text-xs text-gray-600 font-hanken leading-relaxed" 
                                            dangerouslySetInnerHTML={{ __html: section.text }} 
                                        />
                                    </div>
                                ))}
                                
                                <div className="bg-white rounded-xl border border-surface-border p-4 shadow-sm">
                                    <h3 className="text-sm font-hanken font-bold text-primary-900 mb-2">
                                        Butuh Bantuan Lebih Lanjut?
                                    </h3>
                                    <p className="text-xs text-gray-600 font-hanken mb-3">
                                        Jika Anda mengalami kendala teknis atau memerlukan hak akses tambahan, silakan hubungi tim Administrator:
                                    </p>
                                    <div className="bg-[#FEF9F1] rounded-lg border border-surface-border/50 p-3 flex flex-col gap-1.5 text-xs text-gray-700 font-mono">
                                        <div>📞 Ext: <span className="font-bold text-primary-900">102 (IT Support)</span></div>
                                        <div>📧 Email: <span className="font-bold text-primary-900">admin.it@gununggeulis.com</span></div>
                                        <div>📍 Kantor: <span className="font-bold text-primary-900">Gedung Utama Lt. 2</span></div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Footer */}
                            <div className="p-4 bg-white border-t border-surface-border flex justify-end">
                                <button 
                                    onClick={() => setHelpOpen(false)}
                                    className="px-4 py-2 bg-primary-700 text-white text-xs font-mono font-medium tracking-wider hover:bg-primary-800 rounded-lg transition-colors"
                                >
                                    TUTUP PANDUAN
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
