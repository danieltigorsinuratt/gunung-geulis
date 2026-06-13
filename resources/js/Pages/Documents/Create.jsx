import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, Link } from '@inertiajs/react';
import { useState, useRef } from 'react';

export default function DocumentCreate() {
    const [form, setForm] = useState({
        nomor: '',
        perihal: '',
        jenis: '',
        instansi: '',
        pengirim: '',
        ditugaskanKe: '',
        catatan: '',
        tanggalDokumen: '',
        batasWaktu: '',
        masaBerlaku: false,
    });

    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleToggle = () => {
        setForm({ ...form, masaBerlaku: !form.masaBerlaku });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
        }
    };

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Hardcoded for prototype
        console.log('Form submitted:', form, file);
        alert('Dokumen berhasil disimpan! (Prototype)');
    };

    return (
        <SidebarLayout>
            <Head title="Input Baru" />

            <div className="max-w-[1024px] mx-auto">
                {/* Header */}
                <div className="mb-6 md:mb-8">
                    <h1 className="text-xl md:text-2xl font-hanken font-semibold text-primary-900 leading-8">
                        Input Dokumen Baru
                    </h1>
                    <p className="text-sm font-hanken text-gray-600 mt-1">
                        Silakan lengkapi formulir di bawah untuk mendaftarkan korespondensi atau dokumen baru ke dalam sistem.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8">
                    {/* Top Section: Upload + Info Utama */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* File Upload */}
                        <div className="bg-white shadow-sm rounded-xl border border-surface-border p-4 md:p-6">
                            <label className="block text-xs font-mono font-medium text-gray-600 tracking-wider uppercase mb-4">
                                SCAN / FOTO DOKUMEN
                            </label>
                            <div
                                className={`border-2 border-dashed rounded-lg p-6 md:p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                                    isDragging
                                        ? 'border-primary-700 bg-primary-700/5'
                                        : 'border-surface-border hover:border-primary-700/50'
                                }`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    className="hidden"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={handleFileSelect}
                                />
                                {file ? (
                                    <div className="text-center">
                                        <svg className="w-10 h-10 text-primary-700 mx-auto mb-2" viewBox="0 0 24 24" fill="none">
                                            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <p className="text-sm font-hanken font-bold text-gray-900">{file.name}</p>
                                        <p className="text-xs font-hanken text-gray-500 mt-1">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                        <button
                                            type="button"
                                            className="mt-2 text-xs font-hanken text-red-500 hover:underline"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setFile(null);
                                            }}
                                        >
                                            Hapus file
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <svg className="w-11 h-8 text-primary-900 mb-3 md:mb-4" viewBox="0 0 44 32" fill="none">
                                            <path d="M22 20V4M22 4L14 12M22 4L30 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M4 22V26C4 28.2091 5.79086 30 8 30H36C38.2091 30 40 28.2091 40 26V22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <p className="text-sm md:text-base font-hanken font-bold text-gray-900">
                                            Klik atau Seret File
                                        </p>
                                        <p className="text-xs md:text-sm font-hanken text-gray-600 mt-1 md:mt-2">
                                            Format PDF, JPG, atau PNG (Maks. 10MB)
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Informasi Utama */}
                        <div className="bg-white shadow-sm rounded-xl border border-surface-border p-6">
                            <label className="block text-xs font-mono font-medium text-gray-600 tracking-wider uppercase mb-4">
                                INFORMASI UTAMA
                            </label>
                            <div className="flex flex-col gap-4">
                                {/* Nomor Surat */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-hanken font-bold text-gray-900">
                                        Nomor Surat / Dokumen
                                    </label>
                                    <input
                                        type="text"
                                        name="nomor"
                                        value={form.nomor}
                                        onChange={handleChange}
                                        placeholder="Contoh: 001/GGF/ADM/2023"
                                        className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-700"
                                    />
                                </div>

                                {/* Perihal */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-hanken font-bold text-gray-900">
                                        Perihal / Judul
                                    </label>
                                    <input
                                        type="text"
                                        name="perihal"
                                        value={form.perihal}
                                        onChange={handleChange}
                                        placeholder="Ringkasan isi dokumen..."
                                        className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-700"
                                    />
                                </div>

                                {/* Jenis & Instansi */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-hanken font-bold text-gray-900">
                                            Jenis Dokumen
                                        </label>
                                        <select
                                            name="jenis"
                                            value={form.jenis}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700"
                                        >
                                            <option value="">Pilih Jenis</option>
                                            <option value="surat-jalan">Surat Jalan</option>
                                            <option value="invois">Invois</option>
                                            <option value="laporan">Laporan</option>
                                            <option value="izin">Izin</option>
                                            <option value="memo">Memo</option>
                                            <option value="kontrak">Kontrak</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-hanken font-bold text-gray-900">
                                            Instansi Terkait
                                        </label>
                                        <input
                                            type="text"
                                            name="instansi"
                                            value={form.instansi}
                                            onChange={handleChange}
                                            placeholder="Nama organisasi/instansi"
                                            className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-700"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section: Pengirim + Tanggal */}
                    <div className="bg-white shadow-sm rounded-xl border border-surface-border p-4 md:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {/* Pengirim & Penugasan */}
                            <div>
                                <label className="block text-xs font-mono font-medium text-gray-600 tracking-wider uppercase mb-4">
                                    PENGIRIM & PENUGASAN
                                </label>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-hanken font-bold text-gray-900">
                                            Pengirim / Penerima
                                        </label>
                                        <input
                                            type="text"
                                            name="pengirim"
                                            value={form.pengirim}
                                            onChange={handleChange}
                                            placeholder="Nama individu"
                                            className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-700"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-hanken font-bold text-gray-900">
                                            Ditugaskan Ke
                                        </label>
                                        <select
                                            name="ditugaskanKe"
                                            value={form.ditugaskanKe}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700"
                                        >
                                            <option value="">Pilih Staf / Unit</option>
                                            <option value="kepala-bidang">Kepala Bidang</option>
                                            <option value="admin">Admin</option>
                                            <option value="keuangan">Keuangan</option>
                                            <option value="hrd">HRD</option>
                                            <option value="operasional">Operasional</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-hanken font-bold text-gray-900">
                                            Catatan Tambahan
                                        </label>
                                        <textarea
                                            name="catatan"
                                            value={form.catatan}
                                            onChange={handleChange}
                                            placeholder="Keterangan tambahan jika diperlukan..."
                                            rows={4}
                                            className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-700 resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Tanggal & Validitas */}
                            <div>
                                <label className="block text-xs font-mono font-medium text-gray-600 tracking-wider uppercase mb-4">
                                    TANGGAL & VALIDITAS
                                </label>
                                <div className="flex flex-col gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-sm font-hanken font-bold text-gray-900">
                                                Tanggal Dokumen
                                            </label>
                                            <input
                                                type="date"
                                                name="tanggalDokumen"
                                                value={form.tanggalDokumen}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-sm font-hanken font-bold text-gray-900">
                                                Batas Waktu (Deadline)
                                            </label>
                                            <input
                                                type="date"
                                                name="batasWaktu"
                                                value={form.batasWaktu}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700"
                                            />
                                        </div>
                                    </div>

                                    {/* Masa Berlaku Toggle */}
                                    <div className="bg-surface rounded-lg border border-surface-border/50 p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-hanken font-bold text-gray-900">
                                                    Atur Masa Berlaku
                                                </p>
                                                <p className="text-xs font-hanken text-gray-600 mt-0.5">
                                                    Aktifkan jika dokumen memiliki tanggal kadaluarsa
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleToggle}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                    form.masaBerlaku ? 'bg-primary-700' : 'bg-surface-border'
                                                }`}
                                            >
                                                <span
                                                    className={`inline-block h-5 w-5 transform rounded-full bg-white border border-gray-300 transition-transform ${
                                                        form.masaBerlaku ? 'translate-x-5' : 'translate-x-0.5'
                                                    }`}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pb-6 md:pb-8">
                        <Link
                            href="/documents"
                            className="w-full sm:w-auto px-8 py-3 rounded-lg border border-primary-700 text-primary-700 text-sm md:text-base font-hanken font-bold hover:bg-primary-700 hover:text-white transition-colors text-center"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-primary-700 shadow-md text-white text-sm md:text-base font-hanken font-bold hover:bg-primary-800 transition-colors flex items-center justify-center gap-2"
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M14 6L7 13L4 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <rect x="1" y="1" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                            Simpan Dokumen
                        </button>
                    </div>
                </form>
            </div>
        </SidebarLayout>
    );
}
