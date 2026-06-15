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

// Field configuration for each document type
const FIELD_CONFIG = {
    masuk: {
        label: 'Surat Masuk',
        fields: ['file', 'perihal', 'kategori', 'prioritas', 'tanggal', 'pengirim', 'instansi', 'catatan'],
    },
    keluar: {
        label: 'Surat Keluar',
        fields: ['file', 'perihal', 'kategori', 'prioritas', 'tanggal', 'deadline', 'masa_berlaku', 'kepada', 'instansi', 'catatan'],
    },
    internal: {
        label: 'Surat Internal',
        fields: ['file', 'perihal', 'kategori', 'tanggal', 'pengirim', 'kepada', 'catatan', 'ditugaskan_ke'],
    },
    keputusan: {
        label: 'Surat Keputusan',
        fields: ['file', 'perihal', 'kategori', 'tanggal', 'masa_berlaku', 'instansi', 'catatan'],
    },
};

const KATEGORI_OPTIONS = [
    { value: 'surat-jalan', label: 'Surat Jalan' },
    { value: 'invois', label: 'Invois' },
    { value: 'laporan', label: 'Laporan' },
    { value: 'izin', label: 'Izin' },
    { value: 'memo', label: 'Memo' },
    { value: 'kontrak', label: 'Kontrak' },
    { value: 'lainnya', label: 'Lainnya' },
];

const PRIORITAS_OPTIONS = [
    { value: 'NORMAL', label: 'NORMAL' },
    { value: 'TINGGI', label: 'TINGGI' },
    { value: 'URGENT', label: 'URGENT' },
];

export default function DocumentCreate({ usersByDivisi = {} }) {
    const [selectedType, setSelectedType] = useState('keluar');

    const { data, setData, post, processing, errors } = useForm({
        perihal: '',
        jenis_dokumen: 'keluar',
        kategori: '',
        instansi: '',
        kategori_lainnya: '',
        pengirim: '',
        kepada: '',
        ditugaskan_ke: '',
        catatan: '',
        tanggal_dokumen: '',
        batas_waktu: '',
        masa_berlaku: false,
        prioritas: 'NORMAL',
        file: null,
    });

    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [fileError, setFileError] = useState('');
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
        if (name === 'ditugaskan_ke') {
            setData('pengirim', '');
            setData('kepada', '');
        }
    };

    const handleToggle = () => {
        setData('masa_berlaku', !data.masa_berlaku);
    };

    const handleTypeSelect = (type) => {
        setSelectedType(type);
        setData('jenis_dokumen', type);
    };

    const validateFile = (f) => {
        if (!f) return false;
        const ext = '.' + f.name.split('.').pop().toLowerCase();
        if (!ALLOWED_EXTENSIONS.includes(ext)) {
            setFileError('Format file tidak didukung. Hanya PDF, XLSX, atau XLS.');
            return false;
        }
        if (!ALLOWED_TYPES.includes(f.type)) {
            setFileError('Format file tidak didukung. Hanya PDF, XLSX, atau XLS.');
            return false;
        }
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

    const currentFields = FIELD_CONFIG[selectedType]?.fields || [];
    const showField = (field) => currentFields.includes(field);

    return (
        <SidebarLayout>
            <Head title="Input Dokumen Baru" />

            <div className="max-w-[1200px] mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Input Dokumen Baru</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Silakan lengkapi formulir di bawah untuk mendaftarkan korespondensi atau dokumen baru ke dalam sistem.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Jenis Surat Selection */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <label className="block text-xs font-mono font-medium text-gray-500 tracking-wider uppercase mb-4">
                            JENIS SURAT
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {Object.entries(FIELD_CONFIG).map(([type, config]) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => handleTypeSelect(type)}
                                    className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                                        selectedType === type
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                    }`}
                                >
                                    {config.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column - File Upload */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <label className="block text-xs font-mono font-medium text-gray-500 tracking-wider uppercase mb-4">
                                SCAN / FOTO DOKUMEN
                            </label>
                            <div
                                className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors min-h-[200px] ${
                                    isDragging
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
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
                                        <svg className="w-12 h-12 text-green-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                        <button
                                            type="button"
                                            className="mt-3 text-xs text-red-500 hover:text-red-700 font-medium"
                                            onClick={handleRemoveFile}
                                        >
                                            Hapus file
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <p className="text-sm font-medium text-gray-900">Klik atau Seret File</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Format PDF, JPG, PNG, atau DOCX (Maks. 10MB)
                                        </p>
                                    </>
                                )}
                            </div>
                            {fileError && <p className="mt-2 text-xs text-red-500">{fileError}</p>}
                            {errors.file && <p className="mt-2 text-xs text-red-500">{errors.file}</p>}
                        </div>

                        {/* Right Column - Informasi Utama */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <label className="block text-xs font-mono font-medium text-gray-500 tracking-wider uppercase mb-4">
                                INFORMASI UTAMA
                            </label>
                            <div className="flex flex-col gap-4">
                                {/* Perihal/Judul */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Perihal / Judul <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="perihal"
                                        value={data.perihal}
                                        onChange={handleChange}
                                        placeholder="Ringkasan isi dokumen..."
                                        className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                                            errors.perihal ? 'border-red-400' : 'border-gray-200'
                                        }`}
                                        required
                                    />
                                    {errors.perihal && <p className="mt-1 text-xs text-red-500">{errors.perihal}</p>}
                                </div>

                                {/* Kategori */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Kategori <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="kategori"
                                        value={data.kategori}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        required
                                    >
                                        <option value="">Pilih Kategori</option>
                                        {KATEGORI_OPTIONS.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                    {data.kategori === 'lainnya' && (
                                        <input
                                            type="text"
                                            name="kategori_lainnya"
                                            value={data.kategori_lainnya || ''}
                                            onChange={handleChange}
                                            placeholder="Tulis kategori..."
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mt-2"
                                        />
                                    )}
                                </div>

                                {/* Prioritas - Button Selection */}
                                {showField('prioritas') && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Prioritas
                                        </label>
                                        <div className="flex gap-2">
                                            {PRIORITAS_OPTIONS.map(opt => (
                                                <button
                                                    key={opt.value}
                                                    type="button"
                                                    onClick={() => setData('prioritas', opt.value)}
                                                    className={`flex-1 px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
                                                        data.prioritas === opt.value
                                                            ? opt.value === 'URGENT'
                                                                ? 'border-red-500 bg-red-50 text-red-700'
                                                                : opt.value === 'TINGGI'
                                                                ? 'border-orange-500 bg-orange-50 text-orange-700'
                                                                : 'border-blue-500 bg-blue-50 text-blue-700'
                                                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                                    }`}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Penerima */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <label className="block text-xs font-mono font-medium text-gray-500 tracking-wider uppercase mb-4">
                                PENERIMA
                            </label>
                            <div className="flex flex-col gap-4">
                                {/* Kepada - for keluar & internal */}
                                {showField('kepada') && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Kepada (Penerima) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="kepada"
                                            value={data.kepada}
                                            onChange={handleChange}
                                            placeholder="Nama individu atau instansi penerima"
                                            className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                                                errors.kepada ? 'border-red-400' : 'border-gray-200'
                                            }`}
                                            required
                                        />
                                        {errors.kepada && <p className="mt-1 text-xs text-red-500">{errors.kepada}</p>}
                                    </div>
                                )}

                                {/* Pengirim - for masuk & internal */}
                                {showField('pengirim') && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Pengirim <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="pengirim"
                                            value={data.pengirim}
                                            onChange={handleChange}
                                            placeholder="Nama pengirim"
                                            className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                                                errors.pengirim ? 'border-red-400' : 'border-gray-200'
                                            }`}
                                            required
                                        />
                                        {errors.pengirim && <p className="mt-1 text-xs text-red-500">{errors.pengirim}</p>}
                                    </div>
                                )}

                                {/* Tanggal Surat */}
                                {showField('tanggal') && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tanggal Surat <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="tanggal_dokumen"
                                            value={data.tanggal_dokumen}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                                                errors.tanggal_dokumen ? 'border-red-400' : 'border-gray-200'
                                            }`}
                                            required
                                        />
                                        {errors.tanggal_dokumen && <p className="mt-1 text-xs text-red-500">{errors.tanggal_dokumen}</p>}
                                    </div>
                                )}

                                {/* Instansi - for masuk, keluar & keputusan */}
                                {showField('instansi') && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Instansi
                                        </label>
                                        <input
                                            type="text"
                                            name="instansi"
                                            value={data.instansi}
                                            onChange={handleChange}
                                            placeholder="Nama organisasi/instansi"
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Side - Deadline & Masa Berlaku */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <div className="flex flex-col gap-4">
                                {/* Deadline - only for keluar */}
                                {showField('deadline') && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Batas Waktu (Deadline)
                                        </label>
                                        <input
                                            type="datetime-local"
                                            name="batas_waktu"
                                            value={data.batas_waktu}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        />
                                    </div>
                                )}

                                {/* Masa Berlaku - for keluar & keputusan */}
                                {showField('masa_berlaku') && (
                                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">Atur Masa Berlaku</p>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    Aktifkan jika dokumen memiliki tanggal kadaluarsa
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleToggle}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                    data.masa_berlaku ? 'bg-blue-600' : 'bg-gray-300'
                                                }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                        data.masa_berlaku ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Ditugaskan Ke - only for internal */}
                                {showField('ditugaskan_ke') && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Ditugaskan Ke <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="ditugaskan_ke"
                                            value={data.ditugaskan_ke}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                                                errors.ditugaskan_ke ? 'border-red-400' : 'border-gray-200'
                                            }`}
                                            required
                                        >
                                            <option value="">Pilih Divisi</option>
                                            <option value="Tim Logistik">Tim Logistik</option>
                                            <option value="Tim Legal">Tim Legal</option>
                                            <option value="Sekretaris">Sekretaris</option>
                                        </select>
                                        {errors.ditugaskan_ke && <p className="mt-1 text-xs text-red-500">{errors.ditugaskan_ke}</p>}
                                    </div>
                                )}

                                {/* Catatan */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Catatan
                                    </label>
                                    <textarea
                                        name="catatan"
                                        value={data.catatan}
                                        onChange={handleChange}
                                        placeholder="Keterangan tambahan jika diperlukan..."
                                        rows={3}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-3 pb-6">
                        <Link
                            href="/documents"
                            className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2"
                        >
                            {processing && (
                                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
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
