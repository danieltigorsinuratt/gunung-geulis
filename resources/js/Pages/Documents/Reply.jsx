import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DocumentReply({ document = {}, nomorBalasan = '' }) {
    const { data, setData, post, processing, errors } = useForm({
        nomor_surat: nomorBalasan,
        isi_balasan: '',
        file: null,
    });

    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setData('file', selectedFile);
        }
    };

    const handleRemoveFile = (e) => {
        e.stopPropagation();
        setFile(null);
        setData('file', null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('replies.store', document.id), {
            forceFormData: true,
        });
    };

    return (
        <SidebarLayout>
            <Head title="Balas Dokumen" />

            <div className="max-w-[800px] mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6 md:mb-8">
                    <Link
                        href={`/documents/${document.id}`}
                        className="p-2 rounded-full hover:bg-surface transition-colors"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M12 4L6 10L12 16" stroke="#173901" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Link>
                    <div>
                        <h1 className="text-xl md:text-2xl font-hanken font-semibold text-primary-900 leading-8">
                            Balas Dokumen
                        </h1>
                        <p className="text-sm font-hanken text-gray-600 mt-1">
                            Membalas surat <span className="font-bold text-primary-900">#{document.nomor_surat}</span>
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Info Surat Asal */}
                    <div className="bg-white shadow-sm rounded-xl border border-surface-border p-6">
                        <label className="block text-xs font-mono font-medium text-gray-600 tracking-wider uppercase mb-4">
                            SURAT ASAL
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-hanken text-gray-500">Kepada (Pengirim Asal)</label>
                                <div className="px-4 py-2.5 bg-gray-100 rounded-lg border border-gray-200 text-sm font-hanken font-bold text-gray-900">
                                    {document.pengirim}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-hanken text-gray-500">Nomor Surat Asal</label>
                                <div className="px-4 py-2.5 bg-gray-100 rounded-lg border border-gray-200 text-sm font-hanken text-gray-900">
                                    {document.nomor_surat}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Balasan */}
                    <div className="bg-white shadow-sm rounded-xl border border-surface-border p-6">
                        <label className="block text-xs font-mono font-medium text-gray-600 tracking-wider uppercase mb-4">
                            FORM BALASAN
                        </label>
                        <div className="flex flex-col gap-4">
                            {/* Nomor Surat Balasan */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-hanken font-bold text-gray-900">
                                    Nomor Surat Balasan
                                </label>
                                <input
                                    type="text"
                                    value={data.nomor_surat}
                                    readOnly
                                    className="w-full px-4 py-2.5 bg-gray-100 rounded-lg border border-gray-200 text-sm font-hanken text-gray-900 cursor-not-allowed"
                                />
                            </div>

                            {/* Kepada */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-hanken font-bold text-gray-900">
                                    Kepada
                                </label>
                                <div className="px-4 py-2.5 bg-gray-100 rounded-lg border border-gray-200 text-sm font-hanken font-bold text-primary-900">
                                    {document.pengirim}
                                </div>
                            </div>

                            {/* Isi Balasan */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-hanken font-bold text-gray-900">
                                    Isi Balasan <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={data.isi_balasan}
                                    onChange={(e) => setData('isi_balasan', e.target.value)}
                                    placeholder="Tulis isi balasan di sini..."
                                    rows={8}
                                    className={`w-full px-4 py-2.5 bg-surface rounded-lg border text-sm font-hanken text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-700 resize-none ${
                                        errors.isi_balasan ? 'border-red-400' : 'border-surface-border'
                                    }`}
                                />
                                {errors.isi_balasan && <p className="text-xs text-red-500 font-hanken">{errors.isi_balasan}</p>}
                            </div>

                            {/* Lampiran */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-hanken font-bold text-gray-900">
                                    Lampiran <span className="text-xs font-normal text-gray-400">(opsional)</span>
                                </label>
                                <div
                                    className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors border-surface-border hover:border-primary-700/50"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        className="hidden"
                                        accept=".pdf,.xlsx,.xls,.doc,.docx"
                                        onChange={handleFileSelect}
                                    />
                                    {file ? (
                                        <div className="flex items-center gap-3">
                                            <svg className="w-8 h-8 text-primary-700" viewBox="0 0 24 24" fill="none">
                                                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <div>
                                                <p className="text-sm font-hanken font-bold text-gray-900">{file.name}</p>
                                                <p className="text-xs font-hanken text-gray-500">
                                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                className="text-xs font-hanken text-red-500 hover:underline"
                                                onClick={handleRemoveFile}
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <svg className="w-8 h-8 text-gray-400 mb-2" viewBox="0 0 24 24" fill="none">
                                                <path d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15M17 8L12 3M12 3L7 8M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <p className="text-sm font-hanken text-gray-600">Klik atau seret file ke sini</p>
                                            <p className="text-xs font-hanken text-gray-400">PDF, XLSX, DOC (Maks. 15MB)</p>
                                        </>
                                    )}
                                </div>
                                {errors.file && <p className="text-xs text-red-500 font-hanken">{errors.file}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pb-6">
                        <Link
                            href={`/documents/${document.id}`}
                            className="w-full sm:w-auto px-8 py-3 rounded-lg border border-primary-700 text-primary-700 text-sm font-hanken font-bold hover:bg-primary-700 hover:text-white transition-colors text-center"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-primary-700 shadow-md text-white text-sm font-hanken font-bold hover:bg-primary-800 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                        >
                            {processing && (
                                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                </svg>
                            )}
                            Kirim Balasan
                        </button>
                    </div>
                </form>
            </div>
        </SidebarLayout>
    );
}
