import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useRef } from 'react';

const ALLOWED_TYPES = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
];
const ALLOWED_EXTENSIONS = ['.pdf', '.xlsx', '.xls'];
const MAX_SIZE_MB = 15;

export default function DocumentCreate({ usersByDivisi = {} }) {
    const { data, setData, post, processing, errors } = useForm({
        nomor_surat: '',
        perihal: '',
        jenis: '',
        instansi: '',
        jenis_lainnya: '',
        penerima: '',
        ditugaskan_ke: '',
        catatan: '',
        tanggal_dokumen: '',
        batas_waktu: '',
        masa_berlaku: false,
        file: null,
    });

    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [fileError, setFileError] = useState('');
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
        // Reset penerima saat divisi berubah
        if (name === 'ditugaskan_ke') {
            setData('penerima', '');
        }
    };

    const handleToggle = () => {
        setData('masa_berlaku', !data.masa_berlaku);
    };

    // Validasi file: PDF/Excel, max 15MB
    const validateFile = (f) => {
        if (!f) return false;

        // Cek ekstensi
        const ext = '.' + f.name.split('.').pop().toLowerCase();
        if (!ALLOWED_EXTENSIONS.includes(ext)) {
            setFileError('Format file tidak didukung. Hanya PDF, XLSX, atau XLS.');
            return false;
        }

        // Cek MIME type
        if (!ALLOWED_TYPES.includes(f.type)) {
            setFileError('Format file tidak didukung. Hanya PDF, XLSX, atau XLS.');
            return false;
        }

        // Cek ukuran (max 15MB)
        if (f.size > MAX_SIZE_MB * 1024 * 1024) {
            setFileError(`Ukuran file melebihi ${MAX_SIZE_MB}MB.`);
            return false;
        }

        setFileError('');
        return true;
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
        if (droppedFile && validateFile(droppedFile)) {
            setFile(droppedFile);
            setData('file', droppedFile);
        }
    };

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && validateFile(selectedFile)) {
            setFile(selectedFile);
            setData('file', selectedFile);
        }
    };

    const handleRemoveFile = (e) => {
        e.stopPropagation();
        setFile(null);
        setData('file', null);
        setFileError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('documents.store'), {
            forceFormData: true,
        });
    };

    return (
        <SidebarLayout>
            <Head title="Input Dokumen" />

            <div className="max-w-[1024px] mx-auto">
                {/* Header */}
                <div className="mb-6 md:mb-8">
                    <h1 className="text-xl md:text-2xl font-hanken font-semibold text-primary-900 leading-8">
                        Input Dokumen
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
                                    accept=".pdf,.xlsx,.xls"
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
                                            onClick={handleRemoveFile}
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
                                            Format PDF, XLSX, atau XLS (Maks. 15MB)
                                        </p>
                                    </>
                                )}
                            </div>
                            {/* Error: file client-side */}
                            {fileError && (
                                <p className="mt-2 text-xs text-red-500 font-hanken">{fileError}</p>
                            )}
                            {/* Error: file server-side */}
                            {errors.file && (
                                <p className="mt-2 text-xs text-red-500 font-hanken">{errors.file}</p>
                            )}
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
                                        name="nomor_surat"
                                        value={data.nomor_surat}
                                        onChange={handleChange}
                                        placeholder="Contoh: 001/GGF/ADM/2023"
                                        className={`w-full px-4 py-2.5 bg-surface rounded-lg border text-sm font-hanken text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-700 ${
                                            errors.nomor_surat ? 'border-red-400' : 'border-surface-border'
                                        }`}
                                    />
                                    {errors.nomor_surat && <p className="text-xs text-red-500 font-hanken">{errors.nomor_surat}</p>}
                                </div>

                                {/* Perihal */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-hanken font-bold text-gray-900">
                                        Perihal / Judul
                                    </label>
                                    <input
                                        type="text"
                                        name="perihal"
                                        value={data.perihal}
                                        onChange={handleChange}
                                        placeholder="Ringkasan isi dokumen..."
                                        className={`w-full px-4 py-2.5 bg-surface rounded-lg border text-sm font-hanken text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-700 ${
                                            errors.perihal ? 'border-red-400' : 'border-surface-border'
                                        }`}
                                    />
                                    {errors.perihal && <p className="text-xs text-red-500 font-hanken">{errors.perihal}</p>}
                                </div>

                                {/* Jenis & Instansi */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-hanken font-bold text-gray-900">
                                            Jenis Dokumen
                                        </label>
                                        <select
                                            name="jenis"
                                            value={data.jenis}
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
                                            <option value="lainnya">Lainnya</option>
                                        </select>
                                        {data.jenis === 'lainnya' && (
                                            <input
                                                type="text"
                                                name="jenis_lainnya"
                                                value={data.jenis_lainnya || ''}
                                                onChange={handleChange}
                                                placeholder="Tulis jenis dokumen..."
                                                className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-700 mt-2"
                                            />
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-hanken font-bold text-gray-900">
                                            Instansi Terkait
                                        </label>
                                        <input
                                            type="text"
                                            name="instansi"
                                            value={data.instansi}
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
                            {/* Penerima & Penugasan */}
                            <div>
                                <label className="block text-xs font-mono font-medium text-gray-600 tracking-wider uppercase mb-4">
                                    PENERIMA & PENUGASAN
                                </label>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-hanken font-bold text-gray-900">
                                            Penerima <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="penerima"
                                            value={data.penerima}
                                            onChange={handleChange}
                                            disabled={!data.ditugaskan_ke}
                                            className={`w-full px-4 py-2.5 bg-surface rounded-lg border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700 ${
                                                !data.ditugaskan_ke ? 'opacity-50 cursor-not-allowed' : ''
                                            } ${errors.penerima ? 'border-red-400' : 'border-surface-border'}`}
                                        >
                                            <option value="">
                                                {data.ditugaskan_ke ? 'Pilih Penerima' : 'Pilih Divisi Terlebih Dahulu'}
                                            </option>
                                            {(usersByDivisi[data.ditugaskan_ke] || []).map((user) => (
                                                <option key={user.id} value={user.name}>
                                                    {user.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.penerima && <p className="text-xs text-red-500 font-hanken">{errors.penerima}</p>}
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-hanken font-bold text-gray-900">
                                            Ditugaskan Ke <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="ditugaskan_ke"
                                            value={data.ditugaskan_ke}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2.5 bg-surface rounded-lg border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700 ${
                                                errors.ditugaskan_ke ? 'border-red-400' : 'border-surface-border'
                                            }`}
                                        >
                                            <option value="">Pilih Divisi</option>
                                            <option value="Tim Logistik">Tim Logistik</option>
                                            <option value="Tim Legal">Tim Legal</option>
                                            <option value="Sekretaris">Sekretaris</option>
                                            <option value="Superadmin">Superadmin</option>
                                        </select>
                                        {errors.ditugaskan_ke && <p className="text-xs text-red-500 font-hanken">{errors.ditugaskan_ke}</p>}
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-hanken font-bold text-gray-900">
                                            Catatan Tambahan
                                        </label>
                                        <textarea
                                            name="catatan"
                                            value={data.catatan}
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
                                                name="tanggal_dokumen"
                                                value={data.tanggal_dokumen}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-sm font-hanken font-bold text-gray-900">
                                                Batas Waktu (Deadline)
                                                {data.masa_berlaku && <span className="text-red-500 ml-1">*</span>}
                                            </label>
                                            <input
                                                type="datetime-local"
                                                name="batas_waktu"
                                                value={data.batas_waktu}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2.5 bg-surface rounded-lg border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700 ${
                                                    errors.batas_waktu ? 'border-red-400' : 'border-surface-border'
                                                }`}
                                            />
                                            {errors.batas_waktu && <p className="text-xs text-red-500 font-hanken">{errors.batas_waktu}</p>}
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
                                                    data.masa_berlaku ? 'bg-primary-700' : 'bg-surface-border'
                                                }`}
                                            >
                                                <span
                                                    className={`inline-block h-5 w-5 transform rounded-full bg-white border border-gray-300 transition-transform ${
                                                        data.masa_berlaku ? 'translate-x-5' : 'translate-x-0.5'
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
                            disabled={processing}
                            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-primary-700 shadow-md text-white text-sm md:text-base font-hanken font-bold hover:bg-primary-800 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                        >
                            {processing && (
                                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                </svg>
                            )}
                            Simpan Dokumen
                        </button>
                    </div>
                </form>
            </div>
        </SidebarLayout>
    );
}
