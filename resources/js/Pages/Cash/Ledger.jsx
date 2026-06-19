import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head } from '@inertiajs/react';

export default function Ledger({ ledger = [], userRole = '' }) {
    const fmt = (v) => 'Rp ' + v.toLocaleString('id-ID');

    return (
        <SidebarLayout>
            <Head title="Buku Kas" />

            <div className="max-w-[1200px] mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-hanken font-semibold text-primary-900">Buku Kas</h1>
                    <p className="text-sm font-hanken text-gray-600 mt-1">
                        Rekapan seluruh transaksi yang telah disetujui.
                    </p>
                </div>

                <div className="bg-white rounded-xl border border-surface-border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-surface-border">
                                    <th className="px-4 py-3 text-left text-[10px] font-mono font-medium text-gray-500 uppercase tracking-wider">No</th>
                                    <th className="px-4 py-3 text-left text-[10px] font-mono font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                    <th className="px-4 py-3 text-left text-[10px] font-mono font-medium text-gray-500 uppercase tracking-wider">Referensi</th>
                                    <th className="px-4 py-3 text-left text-[10px] font-mono font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
                                    <th className="px-4 py-3 text-right text-[10px] font-mono font-medium text-gray-500 uppercase tracking-wider">Kas Masuk</th>
                                    <th className="px-4 py-3 text-right text-[10px] font-mono font-medium text-gray-500 uppercase tracking-wider">Kas Keluar</th>
                                    <th className="px-4 py-3 text-right text-[10px] font-mono font-medium text-gray-500 uppercase tracking-wider">Saldo Berjalan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {ledger.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-4 py-12 text-center text-sm text-gray-400">
                                            Belum ada transaksi yang disetujui.
                                        </td>
                                    </tr>
                                ) : (
                                    ledger.map((row, i) => (
                                        <tr key={row.id} className={`hover:bg-gray-50/50 ${i % 2 === 1 ? 'bg-gray-50/30' : ''}`}>
                                            <td className="px-4 py-3 text-sm font-mono text-gray-400">{String(i + 1).padStart(3, '0')}</td>
                                            <td className="px-4 py-3 text-sm font-hanken text-gray-700">{row.tanggal}</td>
                                            <td className="px-4 py-3 text-sm font-mono text-gray-700">{row.referensi}</td>
                                            <td className="px-4 py-3 text-sm font-hanken text-gray-700">{row.deskripsi}</td>
                                            <td className="px-4 py-3 text-sm font-mono text-right text-[#396A10] font-medium">
                                                {row.kas_masuk > 0 ? fmt(row.kas_masuk) : '-'}
                                            </td>
                                            <td className="px-4 py-3 text-sm font-mono text-right text-[#BA1A1A] font-medium">
                                                {row.kas_keluar > 0 ? fmt(row.kas_keluar) : '-'}
                                            </td>
                                            <td className="px-4 py-3 text-sm font-mono text-right font-bold text-primary-900">
                                                {fmt(row.saldo_berjalan)}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                            {ledger.length > 0 && (
                                <tfoot>
                                    <tr className="bg-gray-50 border-t-2 border-surface-border">
                                        <td colSpan="4" className="px-4 py-4 text-sm font-hanken font-bold text-gray-900">Total</td>
                                        <td className="px-4 py-4 text-sm font-mono text-right text-[#396A10] font-bold">
                                            {fmt(ledger.reduce((s, r) => s + r.kas_masuk, 0))}
                                        </td>
                                        <td className="px-4 py-4 text-sm font-mono text-right text-[#BA1A1A] font-bold">
                                            {fmt(ledger.reduce((s, r) => s + r.kas_keluar, 0))}
                                        </td>
                                        <td className="px-4 py-4 text-sm font-mono text-right font-bold text-primary-900">
                                            {ledger.length > 0 ? fmt(ledger[ledger.length - 1].saldo_berjalan) : 'Rp 0'}
                                        </td>
                                    </tr>
                                </tfoot>
                            )}
                        </table>
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
}
