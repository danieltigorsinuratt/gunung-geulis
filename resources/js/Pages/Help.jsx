import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const steps = [
    {
        id: 1,
        title: 'Dashboard',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="13" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="3" y="13" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="13" y="13" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2"/>
            </svg>
        ),
        description: 'Halaman utama yang menampilkan ringkasan operasional persuratan.',
        items: [
            'Lihat total dokumen, belum dibalas, segera kedaluwarsa, dan aktivitas hari ini',
            'Pantau dokumen terbaru yang masuk',
            'Cek peringatan urgent untuk dokumen yang segera kedaluwarsa',
            'Lihat aktivitas terbaru dari tim',
        ],
    },
    {
        id: 2,
        title: 'Daftar Dokumen',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 7C3 5.89543 3.89543 5 5 5H14L20 11V19C20 20.1046 19.1046 21 18 21H5C3.89543 21 3 20.1046 3 19V7Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M14 5V11H20" stroke="currentColor" strokeWidth="2"/>
            </svg>
        ),
        description: 'Kelola dan telusuri seluruh dokumen administrasi operasional farm.',
        items: [
            'Gunakan filter untuk mencari dokumen berdasarkan jenis, status, periode, atau lokasi',
            'Klik ikon mata untuk melihat detail dokumen',
            'Klik ikon pensil untuk mengedit informasi dokumen',
            'Klik ikon unduh untuk mengunduh lampiran dokumen',
        ],
    },
    {
        id: 3,
        title: 'Input Dokumen Baru',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
        ),
        description: 'Daftarkan korespondensi atau dokumen baru ke dalam sistem.',
        items: [
            'Unggah scan atau foto dokumen (PDF, JPG, atau PNG, maks. 10MB)',
            'Isi nomor surat/dokumen sesuai format yang berlaku',
            'Tentukan jenis dokumen dan instansi terkait',
            'Tetapkan pengirim, penugasan, dan batas waktu jika diperlukan',
        ],
    },
    {
        id: 4,
        title: 'Detail Dokumen',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
        ),
        description: 'Lihat informasi lengkap dan riwayat aktivitas dokumen.',
        items: [
            'Lihat informasi detail: pengirim, tanggal, kategori, prioritas, dan deskripsi',
            'Pratinjau dokumen langsung di halaman',
            'Balas surat atau buat surat terkait',
            'Arsipkan dokumen yang sudah selesai diproses',
            'Lihat riwayat aktivitas perubahan status dokumen',
        ],
    },
    {
        id: 5,
        title: 'Pengaturan',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                <path d="M19.4 15C19.1 15.6 19.2 16.3 19.7 16.8L19.8 16.9C20.2 17.3 20.2 17.9 19.8 18.3L18 20.1C17.6 20.5 17 20.5 16.6 20.1L16.4 19.9C15.9 19.4 15.2 19.3 14.6 19.6L14 19.8C13.4 20 12.6 20 12 20C11.4 20 10.6 20 10 19.8L9.4 19.6C8.8 19.3 8.1 19.4 7.6 19.9L7.4 20.1C7 20.5 6.4 20.5 6 20.1L4.2 18.3C3.8 17.9 3.8 17.3 4.2 16.9L4.3 16.8C4.8 16.3 4.9 15.6 4.6 15L4.2 14.4C3.8 13.8 3.8 13 4.2 12.4L4.6 11.8C4.9 11.2 4.8 10.5 4.3 10L4.2 9.9C3.8 9.5 3.8 8.9 4.2 8.5L6 6.7C6.4 6.3 7 6.3 7.4 6.7L7.6 6.9C8.1 7.4 8.8 7.5 9.4 7.2L10 7C10.6 6.8 11.4 6.8 12 7C12.6 7 13.4 7 14 7.2L14.6 7.4C15.2 7.7 15.9 7.6 16.4 7.1L16.6 6.9C17 6.5 17.6 6.5 18 6.9L19.8 8.7C20.2 9.1 20.2 9.7 19.8 10.1L19.7 10.2C19.2 10.7 19.1 11.4 19.4 12L19.8 12.6C20.2 13.2 20.2 14 19.8 14.6L19.4 15Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
        ),
        description: 'Kelola profil, keamanan, dan preferensi notifikasi Anda.',
        items: [
            'Perbarui foto profil dan informasi pribadi',
            'Ubah password untuk keamanan akun',
            'Atur notifikasi email sesuai kebutuhan',
            'Aktifkan atau nonaktifkan laporan mingguan',
        ],
    },
];

const tips = [
    {
        title: 'Pencarian Cepat',
        description: 'Gunakan kolom pencarian di bagian atas untuk menemukan dokumen berdasarkan nomor surat atau perihal.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="#396A10" strokeWidth="2"/>
                <path d="M16 16L20 20" stroke="#396A10" strokeWidth="2" strokeLinecap="round"/>
            </svg>
        ),
    },
    {
        title: 'Filter Dokumen',
        description: 'Manfaatkan filter di halaman Daftar Dokumen untuk menyaring dokumen berdasarkan jenis, status, periode, atau lokasi.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 6H21M7 12H17M10 18H14" stroke="#396A10" strokeWidth="2" strokeLinecap="round"/>
            </svg>
        ),
    },
    {
        title: 'Pengingat Deadline',
        description: 'Aktifkan notifikasi pengingat deadline di Pengaturan agar tidak ketinggalan batas waktu dokumen penting.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#396A10" strokeWidth="2"/>
                <path d="M12 7V12L15 15" stroke="#396A10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        ),
    },
    {
        title: 'Arsip Digital',
        description: 'Semua dokumen tersimpan aman secara digital. Gunakan fitur unduh untuk mengakses dokumen kapan saja.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 4C4 2.89543 4.89543 2 6 2H14L20 8V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4Z" stroke="#396A10" strokeWidth="2"/>
                <path d="M14 2V8H20" stroke="#396A10" strokeWidth="2"/>
                <path d="M12 11V17M12 17L9 14M12 17L15 14" stroke="#396A10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        ),
    },
];

export default function Help() {
    const [expandedStep, setExpandedStep] = useState(1);

    return (
        <SidebarLayout>
            <Head title="Cara Penggunaan" />

            <div className="max-w-[1024px] mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-xl md:text-2xl font-hanken font-semibold text-primary-900 leading-8">
                        Cara Penggunaan
                    </h1>
                    <p className="text-sm md:text-base font-hanken text-gray-600 mt-1">
                        Panduan lengkap menggunakan Sistem Persuratan Gunung Geulis Farm.
                    </p>
                </div>

                {/* Quick Tips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {tips.map((tip, index) => (
                        <div key={index} className="bg-white rounded-xl border border-surface-border p-4 flex flex-col gap-2">
                            <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center">
                                {tip.icon}
                            </div>
                            <h3 className="text-sm font-hanken font-bold text-primary-900">
                                {tip.title}
                            </h3>
                            <p className="text-xs font-hanken text-gray-600 leading-relaxed">
                                {tip.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Steps */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-hanken font-semibold text-primary-900">
                        Panduan Langkah demi Langkah
                    </h2>

                    <div className="flex flex-col gap-3">
                        {steps.map((step) => (
                            <div
                                key={step.id}
                                className={`bg-white rounded-xl border transition-all ${
                                    expandedStep === step.id
                                        ? 'border-primary-700 shadow-sm'
                                        : 'border-surface-border hover:border-primary-700/50'
                                }`}
                            >
                                <button
                                    onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                                    className="w-full flex items-center gap-4 p-4 md:p-5 text-left"
                                >
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                        expandedStep === step.id
                                            ? 'bg-primary-700 text-white'
                                            : 'bg-surface text-primary-900'
                                    }`}>
                                        {step.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-mono font-medium text-gray-400 tracking-wider">
                                                LANGKAH {step.id}
                                            </span>
                                        </div>
                                        <h3 className="text-sm md:text-base font-hanken font-bold text-gray-900">
                                            {step.title}
                                        </h3>
                                    </div>
                                    <svg
                                        className={`w-5 h-5 text-gray-400 transition-transform ${
                                            expandedStep === step.id ? 'rotate-180' : ''
                                        }`}
                                        viewBox="0 0 20 20"
                                        fill="none"
                                    >
                                        <path d="M5 8L10 13L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>

                                {expandedStep === step.id && (
                                    <div className="px-4 md:px-5 pb-4 md:pb-5 pt-0">
                                        <div className="border-t border-surface-border pt-4">
                                            <p className="text-sm font-hanken text-gray-600 mb-4">
                                                {step.description}
                                            </p>
                                            <ul className="flex flex-col gap-2">
                                                {step.items.map((item, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <svg className="w-4 h-4 text-primary-700 mt-0.5 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                                                            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                                                            <path d="M5.5 8L7 9.5L10.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                        <span className="text-sm font-hanken text-gray-700">
                                                            {item}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Support */}
                <div className="mt-8 bg-primary-900 rounded-xl p-6 text-white">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-base font-hanken font-bold">
                                Butuh bantuan lebih lanjut?
                            </h3>
                            <p className="text-sm font-hanken text-white/80 mt-1">
                                Hubungi tim IT support untuk bantuan teknis atau saran pengembangan.
                            </p>
                        </div>
                        <button className="px-6 py-2.5 bg-white text-primary-900 rounded-lg text-sm font-hanken font-bold hover:bg-white/90 transition-colors flex items-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M2 4L8 9L14 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <rect x="1" y="3" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                            </svg>
                            Hubungi Support
                        </button>
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
}
