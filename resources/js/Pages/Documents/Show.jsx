import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, Link, router } from '@inertiajs/react';
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

function FileIcon() {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="4" y="2" width="40" height="44" rx="4" stroke="#173901" strokeWidth="2"/>
            <path d="M14 16H34M14 24H34M14 32H26" stroke="#173901" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    );
}

function ExcelIcon() {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="4" y="2" width="40" height="44" rx="4" stroke="#173901" strokeWidth="2"/>
            <path d="M14 14H34V34H14V14Z" stroke="#173901" strokeWidth="2"/>
            <path d="M14 22H34M14 30H34M22 14V34M30 14V34" stroke="#173901" strokeWidth="1.5"/>
        </svg>
    );
}

export default function DocumentShow({ document = {}, canReply = false, userDivisi = '' }) {
    const isArchived = document.isArchived || false;
    const doc = {
        nomor: '',
        judul: '',
        pengirim: '',
        tanggalDiterima: '',
        kategori: '',
        prioritas: 'NORMAL',
        deskripsi: '',
        file: { nama: '', ukuran: '', url: null },
        lokasiArsip: '',
        riwayat: [],
        ...document
    };

    const isPdf = doc.file?.nama?.toLowerCase().endsWith('.pdf');
    const isExcel = doc.file?.nama?.toLowerCase().match(/\.(xlsx|xls)$/);

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
                        {canReply && (
                            <>
                                <button className="px-5 py-2.5 rounded-lg border border-primary-700 text-primary-700 text-sm font-hanken hover:bg-primary-700 hover:text-white transition-colors flex items-center gap-2">
                                    <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
                                        <path d="M1 6H11M11 6L7 2M11 6L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Balas
                                </button>
                                <button className="px-5 py-2.5 rounded-lg border border-primary-700 text-primary-700 text-sm font-hanken hover:bg-primary-700 hover:text-white transition-colors flex items-center gap-2">
                                    <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
                                        <path d="M1 1H11L14 4V10C14 10.5523 13.5523 11 13 11H1C0.447715 11 0 10.5523 0 10V2C0 1.44772 0 1.44772 0 1 1Z" stroke="currentColor" strokeWidth="1.5"/>
                                        <path d="M11 1V4H14" stroke="currentColor" strokeWidth="1.5"/>
                                    </svg>
                                    Buat Surat Terkait
                                </button>
                                <button
                                    onClick={() => {
                                        if (isArchived) {
                                            if (confirm('Yakin ingin mengembalikan dokumen ini ke daftar dokumen?')) {
                                                router.post(`/documents/${doc.id}/restore`, {}, {
                                                    onSuccess: () => router.visit('/documents-arsip'),
                                                });
                                            }
                                        } else {
                                            if (confirm('Yakin ingin mengarsipkan dokumen ini?')) {
                                                router.post(`/documents/${doc.id}/archive`, {}, {
                                                    onSuccess: () => router.visit('/documents'),
                                                });
                                            }
                                        }
                                    }}
                                    className={`px-5 py-2.5 rounded-lg text-white text-sm font-hanken transition-colors flex items-center gap-2 ${
                                        isArchived
                                            ? 'bg-primary-700 hover:bg-primary-800'
                                            : 'bg-[#8B6914] hover:bg-[#7A5C10]'
                                    }`}
                                >
                                    {isArchived ? (
                                        <>
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                                <path d="M13 3L6 14L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            Simpan
                                        </>
                                    ) : (
                                        <>
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                                <rect x="1" y="1" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                                                <path d="M4 7.5H11M4 4.5H11M4 10.5H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                            </svg>
                                            Arsipkan
                                        </>
                                    )}
                                </button>
                            </>
                        )}
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
                                        STATUS
                                    </span>
                                    <span className={`inline-flex self-start px-3 py-1 rounded-full text-xs font-hanken font-bold ${
                                        doc.status === 'Selesai' ? 'bg-accent text-primary-700' :
                                        doc.status === 'Pending' ? 'bg-[#FDF2D0] text-[#8B6914]' :
                                        doc.status === 'Urgent' ? 'bg-[#FFDAD6] text-[#B91C1C]' :
                                        'bg-[#DBEAFE] text-[#1D4ED8]'
                                    }`}>
                                        {doc.status}
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
                        {/* File Viewer */}
                        <div className="bg-white rounded-xl border border-surface-border overflow-hidden">
                            {/* File Header */}
                            <div className="flex items-center justify-between px-6 py-4 bg-[#ECE8E0] border-b border-surface-border">
                                <div className="flex items-center gap-3">
                                    {isExcel ? <ExcelIcon /> : <FileIcon />}
                                    <div className="flex flex-col">
                                        <span className="text-sm font-hanken font-bold text-gray-900">
                                            {doc.file?.nama || 'Belum diunggah'}
                                        </span>
                                        {doc.file?.ukuran && (
                                            <span className="text-xs font-hanken text-gray-500">
                                                {doc.file.ukuran}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {doc.file?.url && (
                                    <a
                                        href={doc.file.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-1.5 bg-primary-900 rounded-lg text-white text-sm font-hanken font-bold hover:bg-primary-800 transition-colors flex items-center gap-2"
                                    >
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M6 1V8M6 8L3 5M6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M1 9V10C1 10.5523 1.44772 11 2 11H10C10.5523 11 11 10.5523 11 10V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                        Unduh
                                    </a>
                                )}
                            </div>

                            {/* File Content */}
                            <div className="bg-[#DED9D2] flex justify-center items-stretch overflow-auto" style={{ minHeight: '700px' }}>
                                {doc.file?.url ? (
                                    isPdf ? (
                                        // PDF Preview - full inline tanpa sidebar
                                        <iframe
                                            src={`${doc.file.url}#toolbar=0&navpanes=0&scrollbar=1&view=fitH`}
                                            className="w-full bg-white border-0"
                                            style={{ minHeight: '700px', height: '100%' }}
                                            title="PDF Preview"
                                        />
                                    ) : isExcel ? (
                                        // Excel - tampilkan info file
                                        <div className="bg-white rounded-xl p-12 flex flex-col items-center gap-4 text-center">
                                            <ExcelIcon />
                                            <p className="text-lg font-hanken font-bold text-primary-900">
                                                {doc.file.nama}
                                            </p>
                                            <p className="text-sm font-hanken text-gray-500">
                                                File Excel tidak dapat ditampilkan langsung di browser.
                                            </p>
                                            <p className="text-xs font-hanken text-gray-400">
                                                Ukuran: {doc.file.ukuran}
                                            </p>
                                            <a
                                                href={doc.file.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-4 px-6 py-2.5 bg-primary-700 rounded-lg text-white text-sm font-hanken font-bold hover:bg-primary-800 transition-colors flex items-center gap-2"
                                            >
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                    <path d="M6 1V8M6 8L3 5M6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M1 9V10C1 10.5523 1.44772 11 2 11H10C10.5523 11 11 10.5523 11 10V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                </svg>
                                                Buka & Unduh File
                                            </a>
                                        </div>
                                    ) : (
                                        // Unknown file type
                                        <div className="bg-white rounded-xl p-12 flex flex-col items-center gap-4 text-center">
                                            <FileIcon />
                                            <p className="text-lg font-hanken font-bold text-primary-900">
                                                {doc.file.nama}
                                            </p>
                                            <p className="text-sm font-hanken text-gray-500">
                                                Format file tidak dapat ditampilkan.
                                            </p>
                                        </div>
                                    )
                                ) : (
                                    <div className="bg-white rounded-xl p-12 flex flex-col items-center gap-4 text-center">
                                        <FileIcon />
                                        <p className="text-sm font-hanken text-gray-500">
                                            Belum ada file yang diunggah.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Bottom Info */}
                        <div className="grid grid-cols-2 gap-6">
                            {/* Divisi Tujuan */}
                            <div className="bg-white rounded-xl border border-surface-border p-6 flex items-center gap-4">
                                <div className="w-12 h-12 bg-table-header rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                                        <path d="M1 5C1 3.89543 1.89543 3 3 3H10L15 8V17C15 18.1046 14.1046 19 13 19H3C1.89543 19 1 18.1046 1 17V5Z" stroke="#173901" strokeWidth="1.5"/>
                                        <path d="M10 3V8H15" stroke="#173901" strokeWidth="1.5"/>
                                    </svg>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-mono text-gray-400">
                                        DITUGASKAN KE
                                    </span>
                                    <span className="text-sm font-hanken font-bold text-gray-900">
                                        {doc.lokasiArsip || '-'}
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
                                        DIBUAT OLEH
                                    </span>
                                    <span className="text-sm font-hanken font-bold text-gray-900">
                                        {doc.createdBy || '-'}
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
