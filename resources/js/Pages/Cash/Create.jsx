import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useRef } from 'react';

const terbilang = (cleanVal) => {
    if (cleanVal === 0) return '';
    const huruf = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"];
    let temp = "";
    if (cleanVal < 12) {
        temp = " " + huruf[cleanVal];
    } else if (cleanVal < 20) {
        temp = terbilang(cleanVal - 10) + " belas";
    } else if (cleanVal < 100) {
        temp = terbilang(Math.floor(cleanVal / 10)) + " puluh" + terbilang(cleanVal % 10);
    } else if (cleanVal < 200) {
        temp = " seratus" + terbilang(cleanVal - 100);
    } else if (cleanVal < 1000) {
        temp = terbilang(Math.floor(cleanVal / 100)) + " ratus" + terbilang(cleanVal % 100);
    } else if (cleanVal < 2000) {
        temp = " seribu" + terbilang(cleanVal - 1000);
    } else if (cleanVal < 1000000) {
        temp = terbilang(Math.floor(cleanVal / 1000)) + " ribu" + terbilang(cleanVal % 1000);
    } else if (cleanVal < 1000000000) {
        temp = terbilang(Math.floor(cleanVal / 1000000)) + " juta" + terbilang(cleanVal % 1000000);
    } else if (cleanVal < 1000000000000) {
        temp = terbilang(Math.floor(cleanVal / 1000000000)) + " milyar" + terbilang(cleanVal % 1000000000);
    } else if (cleanVal < 1000000000000000) {
        temp = terbilang(Math.floor(cleanVal / 1000000000000)) + " trilyun" + terbilang(cleanVal % 1000000000000);
    }
    return temp;
};

const getTerbilangRupiah = (nilai) => {
    const cleanVal = parseInt(String(nilai).replace(/\D/g, '')) || 0;
    const hasil = terbilang(cleanVal).trim();
    if (!hasil) return '';
    return hasil.charAt(0).toUpperCase() + hasil.slice(1) + " rupiah";
};

const formatRupiah = (angkaStr) => {
    if (!angkaStr) return '';
    const clean = String(angkaStr).replace(/\D/g, '');
    if (!clean) return '';
    return clean.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export default function CashCreate({ jenis: initialJenis = '' }) {
    const { data, setData, post, processing, errors } = useForm({
        jenis: initialJenis || 'pemasukan',
        referensi: '',
        deskripsi: '',
        kategori: '',
        nominal: '',
        metode_bayar: '',
        pihak: '',
        tanggal: new Date().toISOString().split('T')[0],
        surat_referensi: '',
        catatan: '',
        file_bukti: null,
    });

    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [displayNominal, setDisplayNominal] = useState('');
    const fileRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleNominalChange = (e) => {
        const { value } = e.target;
        const formatted = formatRupiah(value);
        setDisplayNominal(formatted);
        setData('nominal', value.replace(/\D/g, ''));
    };

    const handleFileSelect = (e) => {
        const f = e.target.files[0];
        if (f) {
            setFile(f);
            setData('file_bukti', f);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const f = e.dataTransfer.files[0];
        if (f) {
            setFile(f);
            setData('file_bukti', f);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('cash.store'), { forceFormData: true });
    };

    const kategoriOptions = data.jenis === 'pemasukan'
        ? ['Penjualan Hewan Qurban', 'Pelunasan Invoice', 'Pembayaran DP', 'Pendapatan Lainnya']
        : ['Pembelian Pakan', 'Operasional', 'Transportasi', 'Gaji', 'Perawatan Ternak', 'Lainnya'];

    return (
        <SidebarLayout>
            <Head title="Tambah Transaksi" />

            <div className="max-w-[800px] mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-hanken font-semibold text-primary-900">
                        Tambah {data.jenis === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'}
                    </h1>
                    <p className="text-sm font-hanken text-gray-600 mt-1">
                        Isi form berikut untuk mencatat transaksi baru.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Jenis Transaksi */}
                    <div className="bg-white rounded-xl border border-surface-border p-6">
                        <label className="block text-xs font-mono font-medium text-gray-600 tracking-wider uppercase mb-4">JENIS TRANSAKSI</label>
                        <div className="flex gap-4">
                            <button type="button" onClick={() => { setData('jenis', 'pemasukan'); setDisplayNominal(''); setData('nominal', ''); }} className={`flex-1 py-3 rounded-xl border-2 text-center font-hanken font-bold transition-all ${data.jenis === 'pemasukan' ? 'border-[#396A10] bg-[#396A10]/5 text-[#396A10]' : 'border-surface-border text-gray-500 hover:border-gray-400'}`}>
                                Pemasukan
                            </button>
                            <button type="button" onClick={() => { setData('jenis', 'pengeluaran'); setDisplayNominal(''); setData('nominal', ''); }} className={`flex-1 py-3 rounded-xl border-2 text-center font-hanken font-bold transition-all ${data.jenis === 'pengeluaran' ? 'border-[#BA1A1A] bg-[#BA1A1A]/5 text-[#BA1A1A]' : 'border-surface-border text-gray-500 hover:border-gray-400'}`}>
                                Pengeluaran
                            </button>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="bg-white rounded-xl border border-surface-border p-6">
                        <label className="block text-xs font-mono font-medium text-gray-600 tracking-wider uppercase mb-4">INFORMASI TRANSAKSI</label>
                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-hanken font-bold text-gray-900">Tanggal</label>
                                    <input type="date" name="tanggal" value={data.tanggal} onChange={handleChange} className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-hanken font-bold text-gray-900">No. Invoice / Referensi</label>
                                    <input type="text" name="referensi" value={data.referensi} onChange={handleChange} placeholder="Contoh: INV-2026-001" className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-700" />
                                    {errors.referensi && <p className="text-xs text-red-500">{errors.referensi}</p>}
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-hanken font-bold text-gray-900">
                                    {data.jenis === 'pemasukan' ? 'Nama Pelanggan' : 'Nama Vendor'}
                                </label>
                                <input type="text" name="pihak" value={data.pihak} onChange={handleChange} placeholder={data.jenis === 'pemasukan' ? 'Nama pelanggan' : 'Nama vendor'} className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-700" />
                                {errors.pihak && <p className="text-xs text-red-500">{errors.pihak}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-hanken font-bold text-gray-900">Kategori</label>
                                    <select name="kategori" value={data.kategori} onChange={handleChange} className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700">
                                        <option value="">Pilih Kategori</option>
                                        {kategoriOptions.map(k => <option key={k} value={k}>{k}</option>)}
                                    </select>
                                    {errors.kategori && <p className="text-xs text-red-500">{errors.kategori}</p>}
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-hanken font-bold text-gray-900">Nominal</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-3 text-sm font-hanken text-gray-400">Rp</span>
                                        <input 
                                            type="text" 
                                            name="nominal_display" 
                                            value={displayNominal} 
                                            onChange={handleNominalChange} 
                                            placeholder="0" 
                                            className="w-full pl-10 pr-14 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-700" 
                                        />
                                        <span className="absolute right-4 top-3 text-sm font-hanken text-gray-400 font-semibold">,00</span>
                                    </div>
                                    {data.nominal && (
                                        <p className="text-xs font-hanken text-[#396A10] italic mt-1 font-semibold">
                                            Terbilang: {getTerbilangRupiah(data.nominal)}
                                        </p>
                                    )}
                                    {errors.nominal && <p className="text-xs text-red-500">{errors.nominal}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-hanken font-bold text-gray-900">Metode Pembayaran</label>
                                    <select name="metode_bayar" value={data.metode_bayar} onChange={handleChange} className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700">
                                        <option value="">Pilih Metode</option>
                                        <option value="Transfer Bank">Transfer Bank</option>
                                        <option value="Tunai">Tunai</option>
                                        <option value="Cek">Cek</option>
                                        <option value="QRIS">QRIS</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-hanken font-bold text-gray-900">Surat Referensi (Opsional)</label>
                                    <input type="text" name="surat_referensi" value={data.surat_referensi} onChange={handleChange} placeholder="Nomor surat terkait" className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-700" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-hanken font-bold text-gray-900">Deskripsi</label>
                                <input type="text" name="deskripsi" value={data.deskripsi} onChange={handleChange} placeholder="Deskripsi singkat transaksi" className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-700" />
                                {errors.deskripsi && <p className="text-xs text-red-500">{errors.deskripsi}</p>}
                            </div>

                            {/* Upload Bukti */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-hanken font-bold text-gray-900">Bukti Pembayaran / Invoice</label>
                                <div
                                    className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${isDragging ? 'border-primary-700 bg-primary-700/5' : 'border-surface-border hover:border-primary-700/50'}`}
                                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                    onDragLeave={() => setIsDragging(false)}
                                    onDrop={handleDrop}
                                    onClick={() => fileRef.current?.click()}
                                >
                                    <input ref={fileRef} type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileSelect} />
                                    {file ? (
                                        <div className="text-center">
                                            <p className="text-sm font-hanken font-bold text-gray-900">{file.name}</p>
                                            <p className="text-xs font-hanken text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                    ) : (
                                        <>
                                            <svg className="w-8 h-6 text-primary-900 mb-2" viewBox="0 0 44 32" fill="none">
                                                <path d="M22 20V4M22 4L14 12M22 4L30 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M4 22V26C4 28.2 5.8 30 8 30H36C38.2 30 40 28.2 40 26V22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <p className="text-sm font-hanken font-bold text-gray-900">Klik atau Seret File</p>
                                            <p className="text-xs font-hanken text-gray-500">PDF, JPG, atau PNG (Maks. 10MB)</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-hanken font-bold text-gray-900">Catatan</label>
                                <textarea name="catatan" value={data.catatan} onChange={handleChange} placeholder="Catatan tambahan..." rows={3} className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-700 resize-none" />
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-end gap-3 pb-8">
                        <Link href="/cash" className="px-8 py-3 rounded-lg border border-primary-700 text-primary-700 text-sm font-hanken font-bold hover:bg-primary-700 hover:text-white transition-colors">Batal</Link>
                        <button type="submit" disabled={processing} className="px-8 py-3 rounded-lg bg-primary-700 shadow-md text-white text-sm font-hanken font-bold hover:bg-primary-800 transition-colors flex items-center gap-2 disabled:opacity-50">
                            {processing && <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"/></svg>}
                            Simpan Transaksi
                        </button>
                    </div>
                </form>
            </div>
        </SidebarLayout>
    );
}
