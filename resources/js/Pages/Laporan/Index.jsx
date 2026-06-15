import { Head, router } from '@inertiajs/react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ stats, filters }) {
    const handleFilterChange = (key, value) => {
        router.get('/laporan', {
            ...filters,
            [key]: value,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const getStatusLabel = (status) => {
        const labels = {
            'Pending': 'Pending',
            'Diproses': 'Diproses',
            'Selesai': 'Selesai',
            'Diarsip': 'Diarsip',
            'pending_approval': 'Menunggu Approval',
            'approved': 'Disetujui',
            'rejected': 'Ditolak',
        };
        return labels[status] || status;
    };

    const getStatusColor = (status) => {
        const colors = {
            'Pending': 'bg-yellow-100 text-yellow-800',
            'Diproses': 'bg-blue-100 text-blue-800',
            'Selesai': 'bg-green-100 text-green-800',
            'Diarsip': 'bg-gray-100 text-gray-800',
            'pending_approval': 'bg-orange-100 text-orange-800',
            'approved': 'bg-green-100 text-green-800',
            'rejected': 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getJenisLabel = (jenis) => {
        const labels = {
            masuk: 'Surat Masuk',
            keluar: 'Surat Keluar',
            internal: 'Surat Internal',
            keputusan: 'Surat Keputusan',
        };
        return labels[jenis] || jenis;
    };

    return (
        <SidebarLayout>
            <Head title="Laporan & Rekap" />

            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Laporan & Rekap</h1>
                    <p className="text-sm text-gray-500 mt-1">Statistik dan rekapitulasi data persuratan</p>
                </div>

                {/* Filter Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
                    <div className="flex flex-wrap items-end gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai</label>
                            <TextInput
                                type="date"
                                value={filters.start_date}
                                onChange={(e) => handleFilterChange('start_date', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Akhir</label>
                            <TextInput
                                type="date"
                                value={filters.end_date}
                                onChange={(e) => handleFilterChange('end_date', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Surat</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Selesai</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.by_status?.Selesai || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Pending</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.by_status?.Pending || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Diproses</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.by_status?.Diproses || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* By Jenis */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Berdasarkan Jenis</h3>
                        <div className="space-y-3">
                            {Object.entries(stats.by_jenis || {}).map(([jenis, count]) => (
                                <div key={jenis} className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">{getJenisLabel(jenis)}</span>
                                    <div className="flex items-center gap-3">
                                        <div className="w-32 bg-gray-100 rounded-full h-2">
                                            <div
                                                className="bg-indigo-500 h-2 rounded-full"
                                                style={{ width: `${(count / stats.total) * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-sm font-medium text-gray-900 w-12 text-right">{count}</span>
                                    </div>
                                </div>
                            ))}
                            {Object.keys(stats.by_jenis || {}).length === 0 && (
                                <p className="text-sm text-gray-500 text-center py-4">Tidak ada data</p>
                            )}
                        </div>
                    </div>

                    {/* By Priority */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Berdasarkan Prioritas</h3>
                        <div className="space-y-3">
                            {Object.entries(stats.by_prioritas || {}).map(([prioritas, count]) => (
                                <div key={prioritas} className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">{prioritas}</span>
                                    <div className="flex items-center gap-3">
                                        <div className="w-32 bg-gray-100 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${
                                                    prioritas === 'URGENT' ? 'bg-red-500' : 'bg-green-500'
                                                }`}
                                                style={{ width: `${(count / stats.total) * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-sm font-medium text-gray-900 w-12 text-right">{count}</span>
                                    </div>
                                </div>
                            ))}
                            {Object.keys(stats.by_prioritas || {}).length === 0 && (
                                <p className="text-sm text-gray-500 text-center py-4">Tidak ada data</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Daily Chart (Simple Table) */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Rekap Harian</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Tanggal</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Jumlah Surat</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {stats.daily_count?.map((item) => (
                                    <tr key={item.date} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-900">
                                            {new Date(item.date).toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </td>
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">{item.count}</td>
                                    </tr>
                                ))}
                                {(!stats.daily_count || stats.daily_count.length === 0) && (
                                    <tr>
                                        <td colSpan="2" className="px-4 py-8 text-center text-sm text-gray-500">
                                            Tidak ada data untuk periode ini
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
}
