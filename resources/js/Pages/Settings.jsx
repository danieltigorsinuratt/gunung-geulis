import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import { useState, useEffect, useCallback, useRef } from 'react';
import Modal from '@/Components/Modal';
import Toast from '@/Components/Toast';

const tabs = [
    { id: 'profil', label: 'Profil' },
    { id: 'password', label: 'Password' },
    { id: 'notifikasi', label: 'Notifikasi' },
];

function ProfileTab({ user }) {
    const isSuperAdmin = user?.role_type === 'superadmin';
    const fileInputRef = useRef(null);

    const form = useForm({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        jabatan: user?.jabatan || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('avatar', file);

        router.post(route('profile.photo.update'), formData, {
            preserveScroll: true,
        });
    };

    const handlePhotoDelete = () => {
        router.delete(route('profile.photo.delete'), {
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Avatar Section */}
            <div className="bg-white shadow-sm rounded-xl border border-surface-border p-6">
                <label className="block text-xs font-mono font-medium text-gray-600 tracking-wider uppercase mb-4">
                    FOTO PROFIL
                </label>
                <div className="flex items-center gap-6">
                    {user?.avatar ? (
                        <img
                            src={`/storage/avatars/${user.avatar}`}
                            alt="Foto Profil"
                            className="w-20 h-20 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-primary-700 flex items-center justify-center">
                            <span className="text-white text-2xl font-hanken font-bold">
                                {user?.name?.charAt(0) || 'A'}
                            </span>
                        </div>
                    )}
                    <div className="flex flex-col gap-2">
                        <input
                            type="file"
                            accept="image/jpeg,image/png"
                            className="hidden"
                            ref={(el) => { fileInputRef.current = el; }}
                            onChange={handlePhotoUpload}
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 bg-primary-700 rounded-lg text-white text-sm font-hanken font-bold hover:bg-primary-800 transition-colors"
                        >
                            Unggah Foto
                        </button>
                        {user?.avatar && (
                            <button
                                type="button"
                                onClick={handlePhotoDelete}
                                className="px-4 py-2 border border-surface-border rounded-lg text-gray-600 text-sm font-hanken font-bold hover:bg-surface transition-colors"
                            >
                                Hapus Foto
                            </button>
                        )}
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
                            value={form.data.name}
                            onChange={(e) => form.setData('name', e.target.value)}
                            className={`w-full px-4 py-2.5 bg-surface rounded-lg border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700 ${
                                form.errors.name ? 'border-red-400' : 'border-surface-border'
                            }`}
                        />
                        {form.errors.name && <p className="text-xs text-red-500 font-hanken">{form.errors.name}</p>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-hanken font-bold text-gray-900">
                            Email
                            {!isSuperAdmin && (
                                <span className="ml-2 text-xs font-normal text-gray-400">(tidak dapat diubah)</span>
                            )}
                        </label>
                        <input
                            type="email"
                            value={form.data.email}
                            onChange={(e) => form.setData('email', e.target.value)}
                            readOnly={!isSuperAdmin}
                            className={`w-full px-4 py-2.5 rounded-lg border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700 ${
                                isSuperAdmin
                                    ? 'bg-surface border-surface-border'
                                    : 'bg-gray-100 border-gray-200 cursor-not-allowed'
                            } ${form.errors.email ? 'border-red-400' : ''}`}
                        />
                        {form.errors.email && <p className="text-xs text-red-500 font-hanken">{form.errors.email}</p>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-hanken font-bold text-gray-900">
                            Jabatan
                        </label>
                        <input
                            type="text"
                            value={form.data.jabatan}
                            readOnly
                            className="w-full px-4 py-2.5 bg-gray-100 rounded-lg border border-gray-200 text-sm font-hanken text-gray-900 cursor-not-allowed"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-hanken font-bold text-gray-900">
                            No. Telepon
                        </label>
                        <input
                            type="tel"
                            value={form.data.phone}
                            onChange={(e) => form.setData('phone', e.target.value)}
                            placeholder="08xxxxxxxxxx"
                            className={`w-full px-4 py-2.5 bg-surface rounded-lg border text-sm font-hanken text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-700 ${
                                form.errors.phone ? 'border-red-400' : 'border-surface-border'
                            }`}
                        />
                        {form.errors.phone && <p className="text-xs text-red-500 font-hanken">{form.errors.phone}</p>}
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={form.processing}
                    className="px-6 py-2.5 bg-primary-700 rounded-lg text-white text-sm font-hanken font-bold hover:bg-primary-800 disabled:opacity-50 transition-colors flex items-center gap-2"
                >
                    {form.processing && (
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                    )}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M13 3L6 14L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Simpan Profil
                </button>
            </div>
        </form>
    );
}

function PasswordTab() {
    const form = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
                            value={form.data.current_password}
                            onChange={(e) => form.setData('current_password', e.target.value)}
                            placeholder="Masukkan password saat ini"
                            className={`w-full px-4 py-2.5 bg-surface rounded-lg border text-sm font-hanken text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-700 ${
                                form.errors.current_password ? 'border-red-400' : 'border-surface-border'
                            }`}
                        />
                        {form.errors.current_password && <p className="text-xs text-red-500 font-hanken">{form.errors.current_password}</p>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-hanken font-bold text-gray-900">
                            Password Baru
                        </label>
                        <input
                            type="password"
                            value={form.data.password}
                            onChange={(e) => form.setData('password', e.target.value)}
                            placeholder="Minimal 8 karakter"
                            className={`w-full px-4 py-2.5 bg-surface rounded-lg border text-sm font-hanken text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-700 ${
                                form.errors.password ? 'border-red-400' : 'border-surface-border'
                            }`}
                        />
                        {form.errors.password && <p className="text-xs text-red-500 font-hanken">{form.errors.password}</p>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-hanken font-bold text-gray-900">
                            Konfirmasi Password Baru
                        </label>
                        <input
                            type="password"
                            value={form.data.password_confirmation}
                            onChange={(e) => form.setData('password_confirmation', e.target.value)}
                            placeholder="Ulangi password baru"
                            className="w-full px-4 py-2.5 bg-surface rounded-lg border border-surface-border text-sm font-hanken text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-700"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={form.processing}
                    className="px-6 py-2.5 bg-primary-700 rounded-lg text-white text-sm font-hanken font-bold hover:bg-primary-800 disabled:opacity-50 transition-colors flex items-center gap-2"
                >
                    {form.processing && (
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                    )}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect x="3" y="7" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M5 7V5C5 3.34315 6.34315 2 8 2C9.65685 2 11 3.34315 11 5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Perbarui Password
                </button>
            </div>
        </form>
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
    const { auth, flash } = usePage().props;

    // Baca tab dari URL query parameter, default ke 'profil'
    const urlParams = new URLSearchParams(window.location.search);
    const tabFromUrl = urlParams.get('tab');
    const isSuperAdmin = auth?.user?.role_type === 'superadmin';
    const validTabIds = tabs.filter(t => t.id !== 'users' || isSuperAdmin).map(t => t.id);
    const initialTab = validTabIds.includes(tabFromUrl) ? tabFromUrl : 'profil';

    const [activeTab, setActiveTab] = useState(initialTab);
    const [isMounted, setIsMounted] = useState(false);

    // Toast notification state
    const [toast, setToast] = useState(null);

    // Tampilkan toast jika ada flash message
    useEffect(() => {
        if (flash?.success) {
            setToast({ message: flash.success, type: 'success' });
        } else if (flash?.error) {
            setToast({ message: flash.error, type: 'error' });
        }
    }, [flash]);

    const closeToast = useCallback(() => setToast(null), []);

    // Update URL query parameter saat tab berubah (tanpa full reload)
    useEffect(() => {
        // Skip render pertama — URL sudah sesuai dari initial state
        if (!isMounted) {
            setIsMounted(true);
            return;
        }

        const params = new URLSearchParams(window.location.search);
        params.set('tab', activeTab);
        router.get(`/settings?${params.toString()}`, {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    }, [activeTab]);

    return (
        <SidebarLayout>
            <Head title="Pengaturan" />

            {/* Toast Notification */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={closeToast}
                />
            )}

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
                    {tabs.filter(tab => tab.id !== 'users' || auth?.user?.role_type === 'superadmin').map((tab) => (
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
