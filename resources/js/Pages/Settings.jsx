import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

const tabs = [
    { id: 'profil', label: 'Profil' },
    { id: 'password', label: 'Password' },
    { id: 'notifikasi', label: 'Notifikasi' },
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
            </div>
        </SidebarLayout>
    );
}
