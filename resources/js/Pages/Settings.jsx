import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

const tabs = [
    { id: 'profil', label: 'Profil' },
    { id: 'password', label: 'Password' },
    { id: 'notifikasi', label: 'Notifikasi' },
    { id: 'users', label: 'Kelola User' },
];

function ProfileTab({ user }) {
    const [form, setForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        role: 'Head of Logistics',
        phone: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Avatar Section */}
            <div className="bg-white shadow-sm rounded-xl border border-surface-border p-6">
                <label className="block text-xs font-mono font-medium text-gray-600 tracking-wider uppercase mb-4">
                    FOTO PROFIL
                </label>
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-primary-700 flex items-center justify-center">
                        <span className="text-white text-2xl font-hanken font-bold">
                            {user?.name?.charAt(0) || 'A'}
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <button className="px-4 py-2 bg-primary-700 rounded-lg text-white text-sm font-hanken font-bold hover:bg-primary-800 transition-colors">
                            Unggah Foto
                        </button>
                        <button className="px-4 py-2 border border-surface-border rounded-lg text-gray-600 text-sm font-hanken font-bold hover:bg-surface transition-colors">
                            Hapus Foto
                        </button>
                    </div>
                </div>
            </div>

            {/* Personal Info */}
            <div className="bg-white shadow-sm rounded-xl border border-surface-border p-6">
                <label className="block text-xs font-mono font-medium text-gray-600 tracking-wider uppercase mb-4">
                    INFORMASI PRIBADI
                </label>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-hanken font-bold text-gray-900">
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-hanken font-bold text-gray-900">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-hanken font-bold text-gray-900">
                            Jabatan
                        </label>
                        <input
                            type="text"
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-hanken font-bold text-gray-900">
                            No. Telepon
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="08xxxxxxxxxx"
                            className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-700"
                        />
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button className="px-6 py-2.5 bg-primary-700 rounded-lg text-white text-sm font-hanken font-bold hover:bg-primary-800 transition-colors flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M13 3L6 14L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Simpan Profil
                </button>
            </div>
        </div>
    );
}

function PasswordTab() {
    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="bg-white shadow-sm rounded-xl border border-surface-border p-6">
                <label className="block text-xs font-mono font-medium text-gray-600 tracking-wider uppercase mb-4">
                    UBAH PASSWORD
                </label>
                <div className="flex flex-col gap-4 max-w-md">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-hanken font-bold text-gray-900">
                            Password Saat Ini
                        </label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={form.currentPassword}
                            onChange={handleChange}
                            placeholder="Masukkan password saat ini"
                            className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-700"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-hanken font-bold text-gray-900">
                            Password Baru
                        </label>
                        <input
                            type="password"
                            name="newPassword"
                            value={form.newPassword}
                            onChange={handleChange}
                            placeholder="Masukkan password baru"
                            className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-700"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-hanken font-bold text-gray-900">
                            Konfirmasi Password Baru
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            placeholder="Ulangi password baru"
                            className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-700"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button className="px-6 py-2.5 bg-primary-700 rounded-lg text-white text-sm font-hanken font-bold hover:bg-primary-800 transition-colors flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect x="3" y="7" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M5 7V5C5 3.34315 6.34315 2 8 2C9.65685 2 11 3.34315 11 5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Perbarui Password
                </button>
            </div>
        </div>
    );
}

function NotificationTab() {
    const [settings, setSettings] = useState({
        emailNotif: true,
        dokumenBaru: true,
        statusUbah: true,
        deadline: true,
        weeklyReport: false,
    });

    const toggle = (key) => {
        setSettings({ ...settings, [key]: !settings[key] });
    };

    const ToggleSwitch = ({ enabled, onToggle }) => (
        <button
            type="button"
            onClick={onToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                enabled ? 'bg-primary-700' : 'bg-surface-border'
            }`}
        >
            <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white border border-gray-300 transition-transform ${
                    enabled ? 'translate-x-5' : 'translate-x-0.5'
                }`}
            />
        </button>
    );

    return (
        <div className="flex flex-col gap-6">
            {/* Email Notifications */}
            <div className="bg-white shadow-sm rounded-xl border border-surface-border p-6">
                <label className="block text-xs font-mono font-medium text-gray-600 tracking-wider uppercase mb-4">
                    NOTIFIKASI EMAIL
                </label>
                <div className="flex items-center justify-between py-3 border-b border-surface-border/30">
                    <div>
                        <p className="text-sm font-hanken font-bold text-gray-900">Aktifkan Notifikasi Email</p>
                        <p className="text-xs font-hanken text-gray-600 mt-0.5">Terima notifikasi melalui email</p>
                    </div>
                    <ToggleSwitch enabled={settings.emailNotif} onToggle={() => toggle('emailNotif')} />
                </div>
            </div>

            {/* Document Notifications */}
            <div className="bg-white shadow-sm rounded-xl border border-surface-border p-6">
                <label className="block text-xs font-mono font-medium text-gray-600 tracking-wider uppercase mb-4">
                    NOTIFIKASI DOKUMEN
                </label>
                <div className="flex flex-col">
                    <div className="flex items-center justify-between py-3 border-b border-surface-border/30">
                        <div>
                            <p className="text-sm font-hanken font-bold text-gray-900">Dokumen Baru Diterima</p>
                            <p className="text-xs font-hanken text-gray-600 mt-0.5">Notifikasi saat ada dokumen baru masuk</p>
                        </div>
                        <ToggleSwitch enabled={settings.dokumenBaru} onToggle={() => toggle('dokumenBaru')} />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-surface-border/30">
                        <div>
                            <p className="text-sm font-hanken font-bold text-gray-900">Perubahan Status Dokumen</p>
                            <p className="text-xs font-hanken text-gray-600 mt-0.5">Notifikasi saat status dokumen berubah</p>
                        </div>
                        <ToggleSwitch enabled={settings.statusUbah} onToggle={() => toggle('statusUbah')} />
                    </div>
                    <div className="flex items-center justify-between py-3">
                        <div>
                            <p className="text-sm font-hanken font-bold text-gray-900">Pengingat Deadline</p>
                            <p className="text-xs font-hanken text-gray-600 mt-0.5">Pengingat sebelum dokumen kedaluwarsa</p>
                        </div>
                        <ToggleSwitch enabled={settings.deadline} onToggle={() => toggle('deadline')} />
                    </div>
                </div>
            </div>

            {/* Report */}
            <div className="bg-white shadow-sm rounded-xl border border-surface-border p-6">
                <label className="block text-xs font-mono font-medium text-gray-600 tracking-wider uppercase mb-4">
                    LAPORAN
                </label>
                <div className="flex items-center justify-between py-3">
                    <div>
                        <p className="text-sm font-hanken font-bold text-gray-900">Laporan Mingguan</p>
                        <p className="text-xs font-hanken text-gray-600 mt-0.5">Terima ringkasan aktivitas mingguan via email</p>
                    </div>
                    <ToggleSwitch enabled={settings.weeklyReport} onToggle={() => toggle('weeklyReport')} />
                </div>
            </div>

            <div className="flex justify-end">
                <button className="px-6 py-2.5 bg-primary-700 rounded-lg text-white text-sm font-hanken font-bold hover:bg-primary-800 transition-colors flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M13 3L6 14L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Simpan Pengaturan
                </button>
            </div>
        </div>
    );
}

const users = [
    { id: 1, nama: 'Supardi', email: 'supardi@gununggeulis.farm', divisi: 'Tim Logistik', role: 'Head of Logistics', status: 'Active', lastActive: '2 jam lalu' },
    { id: 2, nama: 'Andi Saputra', email: 'andi@gununggeulis.farm', divisi: 'Tim Logistik', role: 'Staff Logistik', status: 'Active', lastActive: '15 menit lalu' },
    { id: 3, nama: 'Siti Aminah', email: 'siti@gununggeulis.farm', divisi: 'Tim Legal', role: 'Head of Legal', status: 'Active', lastActive: '1 jam lalu' },
    { id: 4, nama: 'Rizki Pratama', email: 'rizki@gununggeulis.farm', divisi: 'Tim Legal', role: 'Staff Legal', status: 'Active', lastActive: '3 jam lalu' },
    { id: 5, nama: 'Dewi Lestari', email: 'dewi@gununggeulis.farm', divisi: 'Sekretaris', role: 'Sekretaris Utama', status: 'Active', lastActive: '30 menit lalu' },
    { id: 6, nama: 'Budi Santoso', email: 'budi@gununggeulis.farm', divisi: 'Tim Logistik', role: 'Staff Gudang', status: 'Inactive', lastActive: '3 hari lalu' },
    { id: 7, nama: 'Maya Putri', email: 'maya@gununggeulis.farm', divisi: 'Sekretaris', role: 'Admin Staff', status: 'Active', lastActive: '1 jam lalu' },
    { id: 8, nama: 'Hendra Wijaya', email: 'hendra@gununggeulis.farm', divisi: 'Tim Legal', role: 'Staff Legal', status: 'Active', lastActive: '5 jam lalu' },
];

const divisiColors = {
    'Tim Logistik': 'bg-[#DBEAFE] text-[#1D4ED8]',
    'Tim Legal': 'bg-[#FEF3C7] text-[#92400E]',
    'Sekretaris': 'bg-[#D1FAE5] text-[#065F46]',
};

const statusColors = {
    Active: 'bg-accent text-primary-700',
    Inactive: 'bg-gray-100 text-gray-500',
};

function ManageUserTab() {
    const [search, setSearch] = useState('');
    const [filterDivisi, setFilterDivisi] = useState('');

    const filteredUsers = users.filter((user) => {
        const matchSearch = user.nama.toLowerCase().includes(search.toLowerCase()) ||
                           user.email.toLowerCase().includes(search.toLowerCase());
        const matchDivisi = filterDivisi === '' || user.divisi === filterDivisi;
        return matchSearch && matchDivisi;
    });

    const stats = {
        total: users.length,
        logistik: users.filter(u => u.divisi === 'Tim Logistik').length,
        legal: users.filter(u => u.divisi === 'Tim Legal').length,
        sekretaris: users.filter(u => u.divisi === 'Sekretaris').length,
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-surface-border p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary-900/10 flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <circle cx="10" cy="7" r="4" stroke="#173901" strokeWidth="1.5"/>
                                <path d="M3 18C3 14.134 6.13401 11 10 11C13.866 11 17 14.134 17 18" stroke="#173901" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-mono text-gray-500 uppercase">Total User</p>
                            <p className="text-xl font-hanken font-bold text-primary-900">{stats.total}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-surface-border p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#DBEAFE] flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <rect x="3" y="6" width="14" height="11" rx="2" stroke="#1D4ED8" strokeWidth="1.5"/>
                                <path d="M7 6V5C7 3.34315 8.34315 2 10 2C11.6569 2 13 3.34315 13 5V6" stroke="#1D4ED8" strokeWidth="1.5"/>
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-mono text-gray-500 uppercase">Tim Logistik</p>
                            <p className="text-xl font-hanken font-bold text-[#1D4ED8]">{stats.logistik}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-surface-border p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#FEF3C7] flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 2L3 6V14L10 18L17 14V6L10 2Z" stroke="#92400E" strokeWidth="1.5" strokeLinejoin="round"/>
                                <path d="M10 10V18M10 10L3 6M10 10L17 6" stroke="#92400E" strokeWidth="1.5"/>
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-mono text-gray-500 uppercase">Tim Legal</p>
                            <p className="text-xl font-hanken font-bold text-[#92400E]">{stats.legal}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-surface-border p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#D1FAE5] flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M4 4H16V16H4V4Z" stroke="#065F46" strokeWidth="1.5"/>
                                <path d="M8 8H12M8 11H12M8 14H10" stroke="#065F46" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-mono text-gray-500 uppercase">Sekretaris</p>
                            <p className="text-xl font-hanken font-bold text-[#065F46]">{stats.sekretaris}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="bg-white shadow-sm rounded-xl border border-surface-border p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 bg-surface rounded-lg px-4 py-2.5">
                            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 18 18" fill="none">
                                <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M12 12L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Cari nama atau email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-transparent text-sm font-hanken text-gray-900 placeholder-gray-400 outline-none"
                            />
                        </div>
                    </div>
                    <select
                        value={filterDivisi}
                        onChange={(e) => setFilterDivisi(e.target.value)}
                        className="px-4 py-2.5 bg-surface rounded-lg border-0 text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700"
                    >
                        <option value="">Semua Divisi</option>
                        <option value="Tim Logistik">Tim Logistik</option>
                        <option value="Tim Legal">Tim Legal</option>
                        <option value="Sekretaris">Sekretaris</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white shadow-sm rounded-xl border border-surface-border overflow-hidden">
                {/* Table Header - Desktop */}
                <div className="hidden md:block bg-[rgba(200,230,160,0.3)] border-b border-surface-border">
                    <div className="flex items-center">
                        <div className="w-16 px-4 py-4 text-center text-xs font-mono font-medium text-primary-900 tracking-wider">
                            NO
                        </div>
                        <div className="flex-1 px-4 py-4 text-xs font-mono font-medium text-primary-900 tracking-wider">
                            NAMA & EMAIL
                        </div>
                        <div className="w-[180px] px-4 py-4 text-xs font-mono font-medium text-primary-900 tracking-wider">
                            DIVISI
                        </div>
                        <div className="w-[160px] px-4 py-4 text-xs font-mono font-medium text-primary-900 tracking-wider">
                            JABATAN
                        </div>
                        <div className="w-[100px] px-4 py-4 text-xs font-mono font-medium text-primary-900 tracking-wider">
                            STATUS
                        </div>
                        <div className="w-[120px] px-4 py-4 text-xs font-mono font-medium text-primary-900 tracking-wider">
                            AKTIF
                        </div>
                    </div>
                </div>

                {/* Table Body - Desktop */}
                <div className="hidden md:block divide-y divide-surface-border/30">
                    {filteredUsers.map((user, index) => (
                        <div
                            key={user.id}
                            className={`flex items-center hover:bg-surface/30 transition-colors ${
                                index % 2 === 1 ? 'bg-[rgba(200,230,160,0.05)]' : ''
                            }`}
                        >
                            <div className="w-16 px-4 py-4 text-center text-sm font-hanken text-gray-500">
                                {String(index + 1).padStart(2, '0')}
                            </div>
                            <div className="flex-1 px-4 py-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary-700 flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-sm font-hanken font-bold">
                                        {user.nama.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm font-hanken font-bold text-gray-900">{user.nama}</p>
                                    <p className="text-xs font-hanken text-gray-500">{user.email}</p>
                                </div>
                            </div>
                            <div className="w-[180px] px-4 py-4">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-hanken font-bold ${divisiColors[user.divisi]}`}>
                                    {user.divisi}
                                </span>
                            </div>
                            <div className="w-[160px] px-4 py-4 text-sm font-hanken text-gray-900">
                                {user.role}
                            </div>
                            <div className="w-[100px] px-4 py-4">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-hanken font-bold ${statusColors[user.status]}`}>
                                    {user.status}
                                </span>
                            </div>
                            <div className="w-[120px] px-4 py-4 text-xs font-hanken text-gray-500">
                                {user.lastActive}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Cards - Mobile */}
                <div className="md:hidden divide-y divide-surface-border/30">
                    {filteredUsers.map((user) => (
                        <div key={user.id} className="p-4 flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary-700 flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-sm font-hanken font-bold">
                                            {user.nama.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-hanken font-bold text-gray-900">{user.nama}</p>
                                        <p className="text-xs font-hanken text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-[10px] font-hanken font-bold ${statusColors[user.status]}`}>
                                    {user.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 ml-13">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-hanken font-bold ${divisiColors[user.divisi]}`}>
                                    {user.divisi}
                                </span>
                                <span className="text-xs font-hanken text-gray-500">
                                    {user.role}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredUsers.length === 0 && (
                    <div className="p-8 text-center">
                        <p className="text-sm font-hanken text-gray-500">Tidak ada user ditemukan.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Settings() {
    const { auth } = usePage().props;
    const [activeTab, setActiveTab] = useState('profil');

    return (
        <SidebarLayout>
            <Head title="Pengaturan" />

            <div className="max-w-[1024px] mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-hanken font-semibold text-primary-900 leading-8">
                        Pengaturan
                    </h1>
                    <p className="text-sm font-hanken text-gray-600 mt-1">
                        Kelola profil, keamanan, dan preferensi notifikasi Anda.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 mb-6 border-b border-surface-border">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 text-sm font-hanken font-bold transition-colors ${
                                activeTab === tab.id
                                    ? 'text-primary-700 border-b-2 border-primary-700'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'profil' && <ProfileTab user={auth?.user} />}
                {activeTab === 'password' && <PasswordTab />}
                {activeTab === 'notifikasi' && <NotificationTab />}
                {activeTab === 'users' && <ManageUserTab />}
            </div>
        </SidebarLayout>
    );
}
