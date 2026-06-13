import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

const prioritasStyles = {
    URGENT: 'bg-[#FFDAD6] text-[#93000A]',
    TINGGI: 'bg-[#FDF2D0] text-[#8B6914]',
    NORMAL: 'bg-[#DBEAFE] text-[#1D4ED8]',
};

function HistoryIcon({ type }) {
    if (type === 'check') {
        return (
            <svg width="12" height="10" viewBox="0 0 12 10" fill="white">
                <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        );
    }
    if (type === 'edit') {
        return (
            <svg width="11" height="11" viewBox="0 0 11 11" fill="#73796C">
                <path d="M10 1.5L9.5 0.5L8.5 1.5L9.5 2.5L10 1.5ZM0 9.5V11H1.5L8.5 4L7 2.5L0 9.5ZM10 3.5L7.5 1L6 2.5L8.5 5L10 3.5Z" />
            </svg>
        );
    }
    return (
        <svg width="12" height="10" viewBox="0 0 12 10" fill="#73796C">
            <path d="M1 3H11V9C11 9.55228 10.5523 10 10 10H2C1.44772 10 1 9.55228 1 9V3ZM3 1H9V3H3V1Z" />
        </svg>
    );
}

export default function DocumentShow({ document = {} }) {
    const doc = {
        nomor: '',
        judul: '',
        pengirim: '',
        tanggalDiterima: '',
        kategori: '',
        prioritas: 'NORMAL',
        deskripsi: '',
        file: { nama: '', ukuran: '' },
        dokumenTerkait: [],
        lokasiArsip: '',
        riwayat: [],
        ...document
    };
    const [zoom, setZoom] = useState(100);

    return (
        <SidebarLayout>
            <Head title="Detail Dokumen" />

            <div className="max-w-[1440px]">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/documents"
                            className="p-2 rounded-full hover:bg-surface transition-colors"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M12 4L6 10L12 16" stroke="#173901" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>
                        <h1 className="text-2xl font-hanken font-semibold text-primary-900">
                            Detail Dokumen
                        </h1>
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
                </div>

                {/* Document Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex flex-col gap-2">
                        <span className="inline-flex self-start px-3 py-1 bg-accent rounded-full text-xs font-mono font-medium text-primary-600 tracking-wider">
                            {doc.nomor}
                        </span>
                        <h2 className="text-2xl font-hanken font-semibold text-primary-900 leading-9">
                            {doc.judul}
                        </h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-5 py-2.5 rounded-lg border border-primary-700 text-primary-700 text-sm font-hanken hover:bg-primary-700 hover:text-white transition-colors flex items-center gap-2">
                            <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
                                <path d="M1 6H11M11 6L7 2M11 6L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Balas
                        </button>
                        <button className="px-5 py-2.5 rounded-lg border border-primary-700 text-primary-700 text-sm font-hanken hover:bg-primary-700 hover:text-white transition-colors flex items-center gap-2">
                            <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
                                <path d="M1 1H11L14 4V10C14 10.5523 13.5523 11 13 11H1C0.447715 11 0 10.5523 0 10V2C0 1.44772 0.447715 1 1 1Z" stroke="currentColor" strokeWidth="1.5"/>
                                <path d="M11 1V4H14" stroke="currentColor" strokeWidth="1.5"/>
                            </svg>
                            Buat Surat Terkait
                        </button>
                        <button className="px-5 py-2.5 rounded-lg bg-[#8B6914] text-white text-sm font-hanken hover:bg-[#7A5C10] transition-colors flex items-center gap-2">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <rect x="1" y="1" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                                <path d="M4 7.5H11M4 4.5H11M4 10.5H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            Arsipkan
                        </button>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="col-span-1 flex flex-col gap-6">
                        {/* Informasi Detail */}
                        <div className="bg-white rounded-xl border border-surface-border p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                                    <path d="M8 5V5.01M8 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                                <span className="text-xs font-mono font-medium text-gray-400 tracking-wider uppercase">
                                    INFORMASI DETAIL
                                </span>
                            </div>

                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs font-mono font-medium text-gray-400 tracking-wider uppercase">
                                        PENGIRIM
                                    </span>
                                    <span className="text-sm font-hanken font-bold text-primary-900">
                                        {doc.pengirim}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <span className="text-xs font-mono font-medium text-gray-400 tracking-wider uppercase">
                                        TANGGAL DITERIMA
                                    </span>
                                    <span className="text-sm font-hanken text-gray-900">
                                        {doc.tanggalDiterima}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <span className="text-xs font-mono font-medium text-gray-400 tracking-wider uppercase">
                                        KATEGORI
                                    </span>
                                    <span className="text-sm font-hanken text-gray-900">
                                        {doc.kategori}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <span className="text-xs font-mono font-medium text-gray-400 tracking-wider uppercase">
                                        PRIORITAS
                                    </span>
                                    <span className={`inline-flex self-start px-3 py-1 rounded-full text-xs font-hanken font-bold ${prioritasStyles[doc.prioritas] || prioritasStyles.NORMAL}`}>
                                        {doc.prioritas}
                                    </span>
                                </div>

                                <div className="pt-6 border-t border-surface-border flex flex-col gap-2">
                                    <span className="text-xs font-mono font-medium text-gray-400 tracking-wider uppercase">
                                        DESKRIPSI / RINGKASAN
                                    </span>
                                    <p className="text-sm font-hanken text-gray-600 leading-6">
                                        {doc.deskripsi}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Riwayat Aktivitas */}
                        <div className="bg-white rounded-xl border border-surface-border p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                                    <path d="M8 4V8L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                                <span className="text-xs font-mono font-medium text-gray-400 tracking-wider uppercase">
                                    RIWAYAT AKTIVITAS
                                </span>
                            </div>

                            <div className="relative">
                                <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-surface-border" />

                                <div className="flex flex-col gap-8">
                                    {doc.riwayat.map((item, index) => (
                                        <div key={item.id} className="relative pl-10">
                                            <div className={`absolute left-0 top-0 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-white ${
                                                index === 0 ? 'bg-primary-700' : 'bg-surface border-2 border-surface-border'
                                            }`}>
                                                <HistoryIcon type={item.icon} />
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <p className={`text-sm font-hanken font-bold ${
                                                    index === 0 ? 'text-primary-700' : 'text-gray-900'
                                                }`}>
                                                    {item.judul}
                                                </p>
                                                <p className="text-xs font-hanken text-gray-600">
                                                    {item.deskripsi}
                                                </p>
                                                <p className="text-[11px] font-hanken text-gray-400 pt-1">
                                                    {item.waktu}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-span-2 flex flex-col gap-6">
                        {/* PDF Viewer */}
                        <div className="bg-white rounded-xl border border-surface-border overflow-hidden">
                            {/* File Header */}
                            <div className="flex items-center justify-between px-6 py-4 bg-[#ECE8E0] border-b border-surface-border">
                                <div className="flex items-center gap-3">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <rect x="2" y="1" width="16" height="18" rx="2" stroke="#173901" strokeWidth="1.5"/>
                                        <path d="M6 6H14M6 10H14M6 14H10" stroke="#173901" strokeWidth="1.5" strokeLinecap="round"/>
                                    </svg>
                                    <span className="text-sm font-hanken font-bold text-gray-900">
                                        {doc.file?.nama || 'Belum diunggah'}
                                    </span>
                                    {doc.file?.ukuran && (
                                        <span className="text-xs font-hanken text-gray-500">
                                            ({doc.file.ukuran})
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setZoom(Math.max(50, zoom - 10))}
                                        className="p-2 rounded-lg hover:bg-surface transition-colors"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                            <circle cx="8" cy="8" r="6" stroke="#1D1C17" strokeWidth="1.5"/>
                                            <path d="M12.5 12.5L16 16" stroke="#1D1C17" strokeWidth="1.5" strokeLinecap="round"/>
                                            <path d="M6 8H10" stroke="#1D1C17" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => setZoom(Math.min(200, zoom + 10))}
                                        className="p-2 rounded-lg hover:bg-surface transition-colors"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                            <circle cx="8" cy="8" r="6" stroke="#1D1C17" strokeWidth="1.5"/>
                                            <path d="M12.5 12.5L16 16" stroke="#1D1C17" strokeWidth="1.5" strokeLinecap="round"/>
                                            <path d="M6 8H10M8 6V10" stroke="#1D1C17" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                    </button>
                                    <div className="w-px h-6 bg-surface-border mx-1" />
                                    <button className="px-4 py-1.5 bg-primary-900 rounded-lg text-white text-sm font-hanken font-bold hover:bg-primary-800 transition-colors flex items-center gap-2">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M6 1V8M6 8L3 5M6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M1 9V10C1 10.5523 1.44772 11 2 11H10C10.5523 11 11 10.5523 11 10V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                        Unduh
                                    </button>
                                </div>
                            </div>

                            {/* Document Preview */}
                            <div className="bg-[#DED9D2] p-16 flex justify-center overflow-auto" style={{ minHeight: '600px' }}>
                                <div
                                    className="bg-white shadow-2xl p-16 flex flex-col gap-8"
                                    style={{
                                        width: '700px',
                                        minHeight: '1000px',
                                        transform: `scale(${zoom / 100})`,
                                        transformOrigin: 'top center',
                                    }}
                                >
                                    {/* Letter Header */}
                                    <div className="flex justify-between pb-4 border-b-2 border-primary-900">
                                        <div className="w-24 h-24 bg-surface rounded-lg flex items-center justify-center">
                                            <svg width="44" height="34" viewBox="0 0 44 34" fill="none">
                                                <rect width="44" height="34" rx="4" fill="#173901"/>
                                                <rect x="8" y="8" width="28" height="4" rx="1" fill="#B9F38A"/>
                                                <rect x="8" y="15" width="28" height="4" rx="1" fill="#B9F38A"/>
                                                <rect x="8" y="22" width="18" height="4" rx="1" fill="#B9F38A"/>
                                            </svg>
                                        </div>
                                        <div className="text-right flex flex-col items-end">
                                            <p className="text-lg font-hanken font-bold text-primary-900 uppercase">
                                                PEMERINTAH KABUPATEN BOGOR
                                            </p>
                                            <p className="text-xs font-hanken text-gray-900">
                                                Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu
                                            </p>
                                            <p className="text-[10px] font-hanken text-gray-400">
                                                Jl. Tegar Beriman No. 1, Cibinong, Jawa Barat
                                            </p>
                                        </div>
                                    </div>

                                    {/* Letter Title */}
                                    <div className="text-center">
                                        <h3 className="text-xl font-hanken font-bold text-gray-900 underline">
                                            SURAT KEPUTUSAN IZIN PRINSIP
                                        </h3>
                                        <p className="text-sm font-hanken text-gray-900 mt-1">
                                            Nomor: 503/1284-DPMPTSP/X/2023
                                        </p>
                                    </div>

                                    {/* Letter Content */}
                                    <div className="text-sm font-hanken text-gray-900 leading-7 flex flex-col gap-4">
                                        <p>
                                            Berdasarkan permohonan Saudara tertanggal 15 September 2023 perihal permohonan izin prinsip perluasan usaha peternakan unggas di wilayah Sektor B Farm Gunung Geulis, dengan ini disampaikan beberapa hal sebagai berikut:
                                        </p>
                                        <div className="pl-5 flex flex-col gap-3">
                                            <p>
                                                Secara prinsip, pemerintah daerah memberikan persetujuan awal atas rencana perluasan area kandang sebesar 5.000 m2.
                                            </p>
                                            <p>
                                                Saudara diwajibkan untuk segera mengurus dokumen Analisis Mengenai Dampak Lingkungan (AMDAL) atau UKL-UPL dalam kurun waktu paling lama 14 (empat belas) hari kerja.
                                            </p>
                                            <p>
                                                Menjaga koordinasi dengan masyarakat sekitar lokasi pembangunan kandang baru guna menghindari konflik sosial.
                                            </p>
                                        </div>
                                        <p>
                                            Demikian surat ini disampaikan untuk menjadi perhatian dan dapat dipergunakan sebagaimana mestinya.
                                        </p>
                                    </div>

                                    {/* Signature */}
                                    <div className="flex justify-end mt-8">
                                        <div className="text-center">
                                            <p className="text-sm font-hanken text-gray-900">
                                                Bogor, 24 Oktober 2023
                                            </p>
                                            <p className="text-sm font-hanken font-bold text-gray-900 mt-2">
                                                Kepala Dinas,
                                            </p>
                                            <div className="w-32 h-34 bg-surface rounded mt-2 border border-gray-400 flex items-center justify-center">
                                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                    <circle cx="15" cy="15" r="14" stroke="#73796C" strokeWidth="1"/>
                                                    <path d="M10 15L13 18L20 11" stroke="#73796C" strokeWidth="1.5"/>
                                                </svg>
                                            </div>
                                            <p className="text-sm font-hanken font-bold text-gray-900 underline mt-2">
                                                Dr. Ir. Hermawan Syah, M.Si
                                            </p>
                                            <p className="text-xs font-hanken text-gray-900">
                                                NIP. 19720315 199703 1 002
                                            </p>
                                        </div>
                                    </div>

                                    {/* Watermark */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
                                        <div className="text-[120px] font-hanken font-bold text-gray-900 -rotate-45 leading-none">
                                            GUNUNG GEULIS FARM
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Info */}
                        <div className="grid grid-cols-2 gap-6">
                            {/* Dokumen Terkait */}
                            <div className="bg-white rounded-xl border border-surface-border p-6 flex items-center gap-4">
                                <div className="w-12 h-12 bg-table-header rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                                        <path d="M1 5C1 3.89543 1.89543 3 3 3H10L15 8V17C15 18.1046 14.1046 19 13 19H3C1.89543 19 1 18.1046 1 17V5Z" stroke="#173901" strokeWidth="1.5"/>
                                        <path d="M10 3V8H15" stroke="#173901" strokeWidth="1.5"/>
                                    </svg>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-mono text-gray-400">
                                        DOKUMEN TERKAIT ({doc.dokumenTerkait?.length || 0})
                                    </span>
                                    <span className="text-sm font-hanken font-bold text-gray-900">
                                        {doc.dokumenTerkait?.[0]?.nama || 'Tidak ada'}
                                    </span>
                                </div>
                            </div>

                            {/* Lokasi Arsip */}
                            <div className="bg-white rounded-xl border border-surface-border p-6 flex items-center gap-4">
                                <div className="w-12 h-12 bg-table-header rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                                        <rect x="1" y="1" width="18" height="14" rx="2" stroke="#173901" strokeWidth="1.5"/>
                                        <path d="M1 5H19" stroke="#173901" strokeWidth="1.5"/>
                                        <path d="M7 9H13" stroke="#173901" strokeWidth="1.5" strokeLinecap="round"/>
                                    </svg>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-mono text-gray-400">
                                        LOKASI ARSIP
                                    </span>
                                    <span className="text-sm font-hanken font-bold text-gray-900">
                                        {doc.lokasiArsip}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
}
