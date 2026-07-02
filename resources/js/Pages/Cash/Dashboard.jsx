import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

function KpiCard({ icon, label, value, prefix = 'Rp ', color = 'text-primary-900' }) {
    const formatted = typeof value === 'number' ? value.toLocaleString('id-ID') : value;
    return (
        <div className="bg-white rounded-xl border border-surface-border p-5 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center">{icon}</div>
            <div>
                <p className={`text-2xl md:text-3xl font-hanken font-bold ${color}`}>{prefix}{formatted}</p>
                <p className="text-[11px] font-mono text-gray-500 uppercase tracking-wider mt-1">{label}</p>
            </div>
        </div>
    );
}

function DonutChart({ data, title, colors }) {
    const total = data.reduce((sum, d) => sum + d.total, 0);
    let acc = 0;
    const radius = 70;
    const cx = 100;
    const cy = 100;

    const segments = data.map((d, i) => {
        const pct = total > 0 ? (d.total / total) * 100 : 0;
        const startA = (acc / 100) * 360;
        acc += pct;
        const endA = (acc / 100) * 360;
        const large = pct > 50 ? 1 : 0;
        const r1 = ((startA - 90) * Math.PI) / 180;
        const r2 = ((endA - 90) * Math.PI) / 180;
        const x1 = cx + radius * Math.cos(r1);
        const y1 = cy + radius * Math.sin(r1);
        const x2 = cx + radius * Math.cos(r2);
        const y2 = cy + radius * Math.sin(r2);
        if (pct === 0) return null;
        return (
            <path key={i} d={`M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2} Z`}
                fill={colors[i % colors.length]} className="hover:opacity-80 transition-opacity cursor-pointer">
                <title>{d.kategori}: Rp {d.total.toLocaleString('id-ID')} ({d.persentase}%)</title>
            </path>
        );
    });

    return (
        <div className="bg-white rounded-xl border border-surface-border p-5">
            <h3 className="text-sm font-hanken font-bold text-gray-900 mb-4">{title}</h3>
            <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                    <svg width="160" height="160" viewBox="0 0 200 200">
                        {segments}
                        <circle cx="100" cy="100" r="45" fill="white" />
                    </svg>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    {data.map((d, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: colors[i % colors.length] }} />
                            <span className="text-xs font-hanken text-gray-600 flex-1">{d.kategori}</span>
                            <span className="text-xs font-mono text-gray-500">{d.persentase}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function LineChart({ data }) {
    const w = 800, h = 250;
    const p = { top: 20, right: 20, bottom: 40, left: 60 };
    const cw = w - p.left - p.right;
    const ch = h - p.top - p.bottom;
    const maxV = Math.max(...data.map(d => Math.max(d.pemasukan, d.pengeluaran, Math.abs(d.saldo))), 1);
    const gx = (i) => p.left + (i / (data.length - 1)) * cw;
    const gy = (v) => p.top + ch - (v / maxV) * ch;

    return (
        <div className="bg-white rounded-xl border border-surface-border p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-hanken font-bold text-gray-900">Cash Flow {new Date().getFullYear()}</h3>
                <div className="flex items-center gap-4 text-xs font-hanken">
                    <span className="flex items-center gap-1.5"><span className="w-3 h-1 rounded bg-[#396A10]" /> Pemasukan</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-1 rounded bg-[#BA1A1A]" /> Pengeluaran</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-1 rounded bg-[#1D4ED8]" /> Saldo</span>
                </div>
            </div>
            <div className="overflow-x-auto">
                <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="w-full">
                    {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => (
                        <line key={i} x1={p.left} y1={p.top + ch * (1 - pct)} x2={w - p.right} y2={p.top + ch * (1 - pct)} stroke="#E5E7EB" strokeWidth="0.5" />
                    ))}
                    {data.map((d, i) => (
                        <text key={i} x={gx(i)} y={h - 10} textAnchor="middle" className="text-[10px] fill-gray-400 font-mono">{d.bulan}</text>
                    ))}
                    <path d={data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${gx(i)} ${gy(d.pemasukan)}`).join(' ')} fill="none" stroke="#396A10" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d={data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${gx(i)} ${gy(d.pengeluaran)}`).join(' ')} fill="none" stroke="#BA1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d={data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${gx(i)} ${gy(Math.abs(d.saldo))}`).join(' ')} fill="none" stroke="#1D4ED8" strokeWidth="2" strokeDasharray="5,5" strokeLinecap="round" strokeLinejoin="round" />
                    {data.map((d, i) => (
                        <g key={i}>
                            <circle cx={gx(i)} cy={gy(d.pemasukan)} r="3" fill="#396A10" />
                            <circle cx={gx(i)} cy={gy(d.pengeluaran)} r="3" fill="#BA1A1A" />
                            <circle cx={gx(i)} cy={gy(Math.abs(d.saldo))} r="3" fill="#1D4ED8" />
                        </g>
                    ))}
                </svg>
            </div>
        </div>
    );
}

function DataTable({ title, columns, data }) {
    return (
        <div className="bg-white rounded-xl border border-surface-border overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-surface-border">
                <h3 className="text-sm font-hanken font-bold text-gray-900">{title}</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b border-surface-border">
                            {columns.map((col, i) => (
                                <th key={i} className="px-4 py-3 text-left text-[10px] font-mono font-medium text-gray-500 uppercase tracking-wider">{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.length === 0 ? (
                            <tr><td colSpan={columns.length} className="px-4 py-8 text-center text-sm text-gray-400">Belum ada data</td></tr>
                        ) : (
                            data.map((row, i) => (
                                <tr key={i} className="hover:bg-gray-50/50">
                                    {Object.values(row).map((val, j) => (
                                        <td key={j} className="px-4 py-3 text-sm font-hanken text-gray-700">{val || '-'}</td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default function CashDashboard({
    saldoKas = 0, totalPemasukan = 0, totalPengeluaran = 0,
    pemasukanBulanIni = 0, pengeluaranBulanIni = 0, selisihKas = 0,
    pendingApproval = 0, invoiceVendor = 0, vendorAktif = 0,
    pembayaranMasuk = 0, piutangBelumLunas = 0,
    distribusiPemasukan = [], distribusiPengeluaran = [], cashFlow = [],
    transaksiTerbaru = [], pemasukanTerbaru = [], pengeluaranTerbaru = [],
    transaksiPerDivisi = {},
    userRole = '', userDivisi = '',
    totalUsers = 0, totalDocuments = 0, totalTransactions = 0, activeUsers = 0,
}) {
    const [activeDivTab, setActiveDivTab] = useState('Tim Logistik');
    const donutColorsP = ['#396A10', '#8B6914', '#1D4ED8', '#7C3AED'];
    const donutColorsK = ['#BA1A1A', '#396A10', '#1D4ED8', '#8B6914', '#6B7280'];
    const formatNominal = (nominal, jenis) => {
        const formatted = 'Rp ' + nominal.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        return jenis === 'pengeluaran' ? `- ${formatted}` : formatted;
    };

    return (
        <SidebarLayout>
            <Head title="Dashboard Pembukuan" />
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-hanken font-semibold text-primary-900">
                        Dashboard Pembukuan
                        {userDivisi && <span className="text-base font-normal text-gray-500 ml-2">- {userDivisi}</span>}
                    </h1>
                    <p className="text-sm font-hanken text-gray-600 mt-1">Monitoring keuangan dan kas Gunung Geulis Farm.</p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {(userRole === 'manager' || userRole === 'manajer' || userRole === 'superadmin') && (
                        <>
                            <KpiCard label="Saldo Kas Saat Ini" value={saldoKas} icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke="#396A10" strokeWidth="1.5"/></svg>} />
                            <KpiCard label="Total Pemasukan" value={totalPemasukan} color="text-[#396A10]" icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2V18M10 2L4 8M10 2L16 8" stroke="#396A10" strokeWidth="1.5" strokeLinecap="round"/></svg>} />
                            <KpiCard label="Total Pengeluaran" value={totalPengeluaran} color="text-[#BA1A1A]" icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 18V2M10 18L4 12M10 18L16 12" stroke="#BA1A1A" strokeWidth="1.5" strokeLinecap="round"/></svg>} />
                            <KpiCard label="Menunggu Approval" value={pendingApproval} color="text-[#1D4ED8]" icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#1D4ED8" strokeWidth="1.5"/><path d="M10 5V10L13 13" stroke="#1D4ED8" strokeWidth="1.5" strokeLinecap="round"/></svg>} />
                        </>
                    )}
                    {userRole === 'admin' && userDivisi === 'Tim Logistik' && (
                        <>
                            <KpiCard label="Total Pengeluaran" value={totalPengeluaran} color="text-[#BA1A1A]" icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 18V2M10 18L4 12M10 18L16 12" stroke="#BA1A1A" strokeWidth="1.5" strokeLinecap="round"/></svg>} />
                            <KpiCard label="Invoice Vendor Pending" value={invoiceVendor} color="text-[#8B6914]" icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke="#8B6914" strokeWidth="1.5"/></svg>} />
                            <KpiCard label="Pengeluaran Bulan Ini" value={pengeluaranBulanIni} color="text-[#396A10]" icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 18V2M10 18L4 12M10 18L16 12" stroke="#396A10" strokeWidth="1.5" strokeLinecap="round"/></svg>} />
                            <KpiCard label="Vendor Aktif" value={vendorAktif} color="text-[#1D4ED8]" icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="4" stroke="#1D4ED8" strokeWidth="1.5"/><path d="M3 18C3 14 6 11 10 11C14 11 17 14 17 18" stroke="#1D4ED8" strokeWidth="1.5"/></svg>} />
                        </>
                    )}
                    {userRole === 'admin' && userDivisi === 'Sekretaris' && (
                        <>
                            <KpiCard label="Total Pemasukan" value={totalPemasukan} color="text-[#396A10]" icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2V18M10 2L4 8M10 2L16 8" stroke="#396A10" strokeWidth="1.5" strokeLinecap="round"/></svg>} />
                            <KpiCard label="Pembayaran Masuk" value={pembayaranMasuk} color="text-[#8B6914]" icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke="#8B6914" strokeWidth="1.5"/></svg>} />
                            <KpiCard label="Pemasukan Bulan Ini" value={pemasukanBulanIni} color="text-[#396A10]" icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2V18M10 2L4 8M10 2L16 8" stroke="#396A10" strokeWidth="1.5" strokeLinecap="round"/></svg>} />
                            <KpiCard label="Piutang Belum Lunas" value={piutangBelumLunas} color="text-[#BA1A1A]" icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#BA1A1A" strokeWidth="1.5"/><path d="M10 5V10L13 13" stroke="#BA1A1A" strokeWidth="1.5" strokeLinecap="round"/></svg>} />
                        </>
                    )}
                    {userRole === 'admin' && userDivisi === 'Tim Legal' && (
                        <>
                            <KpiCard label="Total Transaksi" value={totalTransactions} color="text-[#1D4ED8]" icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="16" rx="2" stroke="#1D4ED8" strokeWidth="1.5"/></svg>} />
                            <KpiCard label="Dokumen Legal" value={totalDocuments} color="text-[#7C3AED]" icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="16" rx="2" stroke="#7C3AED" strokeWidth="1.5"/></svg>} />
                        </>
                    )}
                    {userRole === 'superadmin' && (
                        <>
                            <KpiCard label="Total User" value={totalUsers} color="text-[#7C3AED]" icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="4" stroke="#7C3AED" strokeWidth="1.5"/><path d="M3 18C3 14 6 11 10 11C14 11 17 14 17 18" stroke="#7C3AED" strokeWidth="1.5"/></svg>} />
                            <KpiCard label="Total Transaksi" value={totalTransactions} color="text-[#1D4ED8]" icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="16" rx="2" stroke="#1D4ED8" strokeWidth="1.5"/></svg>} />
                        </>
                    )}
                </div>

                {/* Pemasukan */}
                {(userRole === 'manajer' || userRole === 'superadmin' || (userRole === 'admin' && userDivisi === 'Sekretaris')) && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <DataTable title="Pemasukan Terbaru" columns={['Tanggal', 'No Invoice', 'Pelanggan', 'Kategori', 'Nominal']}
                            data={pemasukanTerbaru.map(p => [p.tanggal, p.referensi, p.pihak, p.kategori, formatNominal(p.nominal, 'pemasukan')])} />
                        <DonutChart title="Distribusi Pemasukan" data={distribusiPemasukan} colors={donutColorsP} />
                    </div>
                )}

                {/* Pengeluaran */}
                {(userRole === 'manajer' || userRole === 'superadmin' || (userRole === 'admin' && userDivisi === 'Tim Logistik')) && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <DonutChart title="Distribusi Pengeluaran" data={distribusiPengeluaran} colors={donutColorsK} />
                        <DataTable title="Pengeluaran Terbaru" columns={['Tanggal', 'No Invoice', 'Vendor', 'Kategori', 'Nominal']}
                            data={pengeluaranTerbaru.map(p => [p.tanggal, p.referensi, p.pihak, p.kategori, formatNominal(p.nominal, 'pengeluaran')])} />
                    </div>
                )}

                {/* Cash Flow */}
                {(userRole === 'manajer' || userRole === 'superadmin') && (
                    <div className="mb-8"><LineChart data={cashFlow} /></div>
                )}

                {/* Transaksi Terbaru */}
                <div className="mb-8">
                    {(userRole === 'manager' || userRole === 'manajer' || userRole === 'superadmin') ? (
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between border-b border-surface-border pb-2">
                                <h3 className="text-base font-hanken font-bold text-gray-900">Transaksi Terbaru Per Divisi</h3>
                                <div className="flex gap-2">
                                    {['Tim Logistik', 'Tim Legal', 'Sekretaris'].map((divName) => (
                                        <button
                                            key={divName}
                                            onClick={() => setActiveDivTab(divName)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-hanken font-medium transition-colors ${
                                                activeDivTab === divName
                                                    ? 'bg-primary-700 text-white'
                                                    : 'bg-white text-gray-600 border border-surface-border hover:bg-gray-100'
                                            }`}
                                        >
                                            {divName}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {(() => {
                                const divData = transaksiPerDivisi[activeDivTab] || [];
                                const totalDivSaldo = divData.filter(t => t.status === 'approved').reduce((acc, t) => {
                                    return t.jenis === 'pemasukan' ? acc + t.nominal : acc - t.nominal;
                                }, 0);
                                const tableData = divData.map(t => [
                                    t.tanggal, 
                                    t.referensi, 
                                    t.jenis === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran', 
                                    t.deskripsi,
                                    t.pihak,
                                    <span className={t.jenis === 'pengeluaran' ? 'text-[#BA1A1A] font-semibold' : 'text-[#396A10] font-semibold'}>
                                        {formatNominal(t.nominal, t.jenis)}
                                    </span>, 
                                    t.status
                                ]);
                                if (divData.length > 0) {
                                    tableData.push([
                                        <strong>Total Sisa Saldo (Disetujui)</strong>,
                                        '',
                                        '',
                                        '',
                                        '',
                                        <strong className={totalDivSaldo >= 0 ? 'text-[#396A10]' : 'text-[#BA1A1A]'}>
                                            {totalDivSaldo >= 0 ? '' : '-' }Rp {Math.abs(totalDivSaldo).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </strong>,
                                        ''
                                    ]);
                                }
                                return (
                                    <DataTable 
                                        title={`Daftar Transaksi - ${activeDivTab}`} 
                                        columns={['Tanggal', 'Referensi', 'Jenis', 'Deskripsi', 'Pihak', 'Nominal', 'Status']}
                                        data={tableData} 
                                    />
                                );
                            })()}
                        </div>
                    ) : (
                        (() => {
                            const totalSaldo = transaksiTerbaru.filter(t => t.status === 'approved').reduce((acc, t) => {
                                return t.jenis === 'pemasukan' ? acc + t.nominal : acc - t.nominal;
                            }, 0);
                            const tableData = transaksiTerbaru.map(t => [
                                t.tanggal, 
                                t.referensi, 
                                t.jenis === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran', 
                                t.deskripsi, 
                                <span className={t.jenis === 'pengeluaran' ? 'text-[#BA1A1A] font-semibold' : 'text-[#396A10] font-semibold'}>
                                    {formatNominal(t.nominal, t.jenis)}
                                </span>, 
                                t.status
                            ]);
                            if (transaksiTerbaru.length > 0) {
                                tableData.push([
                                    <strong>Total Sisa Saldo (Disetujui)</strong>,
                                    '',
                                    '',
                                    '',
                                    <strong className={totalSaldo >= 0 ? 'text-[#396A10]' : 'text-[#BA1A1A]'}>
                                        {totalSaldo >= 0 ? '' : '-' }Rp {Math.abs(totalSaldo).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </strong>,
                                    ''
                                ]);
                            }
                            return (
                                <DataTable 
                                    title="Transaksi Terbaru" 
                                    columns={['Tanggal', 'Referensi', 'Jenis', 'Deskripsi', 'Nominal', 'Status']}
                                    data={tableData} 
                                />
                            );
                        })()
                    )}
                </div>

                {/* Quick Action */}
                {(userRole === 'admin' || userRole === 'superadmin') && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <Link href="/cash/create?jenis=pemasukan" className="bg-white rounded-xl border border-surface-border p-5 hover:shadow-md transition-shadow flex flex-col items-center gap-3 text-center">
                            <div className="w-12 h-12 rounded-xl bg-[#D1FAE5] flex items-center justify-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 4V20M12 4L6 10M12 4L18 10" stroke="#396A10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </div>
                            <span className="text-sm font-hanken font-bold text-gray-900">Tambah Pemasukan</span>
                        </Link>
                        <Link href="/cash/create?jenis=pengeluaran" className="bg-white rounded-xl border border-surface-border p-5 hover:shadow-md transition-shadow flex flex-col items-center gap-3 text-center">
                            <div className="w-12 h-12 rounded-xl bg-[#FFDAD6] flex items-center justify-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 20V4M12 20L6 14M12 20L18 14" stroke="#BA1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </div>
                            <span className="text-sm font-hanken font-bold text-gray-900">Tambah Pengeluaran</span>
                        </Link>
                        <Link href="/cash/ledger" className="bg-white rounded-xl border border-surface-border p-5 hover:shadow-md transition-shadow flex flex-col items-center gap-3 text-center">
                            <div className="w-12 h-12 rounded-xl bg-[#DBEAFE] flex items-center justify-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="2" width="16" height="20" rx="2" stroke="#1D4ED8" strokeWidth="2"/><path d="M8 7H16M8 11H16M8 15H12" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round"/></svg>
                            </div>
                            <span className="text-sm font-hanken font-bold text-gray-900">Lihat Buku Kas</span>
                        </Link>
                        <Link href="/cash/export" className="bg-white rounded-xl border border-surface-border p-5 hover:shadow-md transition-shadow flex flex-col items-center gap-3 text-center">
                            <div className="w-12 h-12 rounded-xl bg-[#F3E8FF] flex items-center justify-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3V15M12 15L8 11M12 15L16 11" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 17V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V17" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round"/></svg>
                            </div>
                            <span className="text-sm font-hanken font-bold text-gray-900">Export Laporan</span>
                        </Link>
                    </div>
                )}
            </div>
        </SidebarLayout>
    );
}
