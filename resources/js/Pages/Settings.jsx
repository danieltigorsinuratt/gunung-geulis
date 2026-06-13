import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import { useState, useEffect, useCallback, useRef } from 'react';
import Modal from '@/Components/Modal';
import Toast from '@/Components/Toast';

const tabs = [
    { id: 'profil', label: 'Profil' },
    { id: 'password', label: 'Password' },
    { id: 'notifikasi', label: 'Notifikasi' },
    { id: 'users', label: 'Kelola User' },
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

const divisiColors = {
    'Tim Logistik': 'bg-[#DBEAFE] text-[#1D4ED8]',
    'Tim Legal': 'bg-[#FEF3C7] text-[#92400E]',
    'Sekretaris': 'bg-[#D1FAE5] text-[#065F46]',
    'Superadmin': 'bg-[#F3E8FF] text-[#6B21A8]',
};

const statusColors = {
    Active: 'bg-accent text-primary-700',
    Inactive: 'bg-gray-100 text-gray-500',
};

// Helper: hitung durasi login dari timestamp
function getLoginDuration(timestamp) {
    if (!timestamp) return '-';
    const now = Math.floor(Date.now() / 1000);
    const diff = now - timestamp;
    if (diff < 60) return 'Baru saja';
    if (diff < 3600) return `${Math.floor(diff / 60)} menit`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam`;
    return `${Math.floor(diff / 86400)} hari`;
}

function ManageUserTab({ users = [] }) {
    const [filterDivisi, setFilterDivisi] = useState('');

    // Modals visibility states
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Inertia form for adding user
    const addForm = useForm({
        name: '',
        email: '',
        password: '',
        divisi: 'Tim Logistik',
        jabatan: '',
        status: 'Active',
    });

    // Inertia form for editing user
    const editForm = useForm({
        name: '',
        email: '',
        password: '',
        divisi: 'Tim Logistik',
        jabatan: '',
        status: 'Active',
    });

    // Inertia form for deleting user
    const deleteForm = useForm({});

    // show/hide password state
    const [showAddPwd, setShowAddPwd] = useState(false);
    const [showEditPwd, setShowEditPwd] = useState(false);

    const filteredUsers = users.filter((user) => {
        const matchDivisi = filterDivisi === '' || user.divisi === filterDivisi;
        return matchDivisi;
    });

    const stats = {
        total: users.length,
        logistik: users.filter(u => u.divisi === 'Tim Logistik').length,
        legal: users.filter(u => u.divisi === 'Tim Legal').length,
        sekretaris: users.filter(u => u.divisi === 'Sekretaris').length,
        superadmin: users.filter(u => u.divisi === 'Superadmin').length,
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
                <div className="bg-white rounded-xl border border-surface-border p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#F3E8FF] flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M9 2L2 5V10C2 14.42 5.42 18 10 19C14.58 18 18 14.42 18 10V5L11 2C10.37 1.73 9.63 1.73 9 2Z" stroke="#6B21A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-mono text-gray-500 uppercase">Superadmin</p>
                            <p className="text-xl font-hanken font-bold text-[#6B21A8]">{stats.superadmin}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white shadow-sm rounded-xl border border-surface-border overflow-hidden">
                {/* Table Header - Desktop */}
                <div className="hidden md:block bg-[rgba(200,230,160,0.3)] border-b border-surface-border">
                    <div className="flex items-center">
                        <div className="w-12 px-4 py-4 text-center text-xs font-mono font-medium text-primary-900 tracking-wider">
                            NO
                        </div>
                        <div className="flex-1 px-4 py-4 text-xs font-mono font-medium text-primary-900 tracking-wider">
                            NAMA & EMAIL
                        </div>
                        <div className="w-[160px] px-4 py-4">
                            <select
                                value={filterDivisi}
                                onChange={(e) => setFilterDivisi(e.target.value)}
                                className="w-full px-2 py-1.5 bg-white rounded border-0 text-[10px] font-mono font-medium text-primary-900 tracking-wider uppercase outline-none cursor-pointer"
                            >
                                <option value="">DIVISI</option>
                                <option value="Tim Logistik">TIM LOGISTIK</option>
                                <option value="Tim Legal">TIM LEGAL</option>
                                <option value="Sekretaris">SEKRETARIS</option>
                                <option value="Superadmin">SUPERADMIN</option>
                            </select>
                        </div>
                        <div className="w-[140px] px-4 py-4 text-xs font-mono font-medium text-primary-900 tracking-wider">
                            JABATAN
                        </div>
                        <div className="w-[100px] px-4 py-4 text-xs font-mono font-medium text-primary-900 tracking-wider">
                            STATUS
                        </div>
                        <div className="w-[100px] px-4 py-4 text-xs font-mono font-medium text-primary-900 tracking-wider">
                            LOGIN
                        </div>
                        <div className="w-[120px] px-4 py-4 flex items-center justify-end gap-2">
                            <button
                                onClick={() => {
                                    addForm.reset();
                                    setIsAddOpen(true);
                                }}
                                className="px-3 py-1.5 bg-primary-700 hover:bg-primary-800 text-white rounded text-[10px] font-mono font-medium tracking-wider uppercase transition-colors flex items-center gap-1"
                            >
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <path d="M5 1V9M1 5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                ADD
                            </button>
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
                            <div className="w-12 px-4 py-4 text-center text-sm font-hanken text-gray-500">
                                {String(index + 1).padStart(2, '0')}
                            </div>
                            <div className="flex-1 px-4 py-4 flex items-center gap-3">
                                {user.avatar ? (
                                    <img
                                        src={`/storage/avatars/${user.avatar}`}
                                        alt={user.nama}
                                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-primary-700 flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-sm font-hanken font-bold">
                                            {user.nama.charAt(0)}
                                        </span>
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm font-hanken font-bold text-gray-900">{user.nama}</p>
                                    <p className="text-xs font-hanken text-gray-500">{user.email}</p>
                                    <p className="text-[10px] font-hanken text-gray-400">{user.phone || '-'}</p>
                                </div>
                            </div>
                            <div className="w-[160px] px-4 py-4">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-hanken font-bold ${divisiColors[user.divisi] || 'bg-gray-100'}`}>
                                    {user.divisi || '-'}
                                </span>
                            </div>
                            <div className="w-[140px] px-4 py-4 text-sm font-hanken text-gray-900">
                                {user.role || '-'}
                            </div>
                            <div className="w-[100px] px-4 py-4">
                                <div className="flex items-center gap-1.5">
                                    <span className={`w-2 h-2 rounded-full ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                    <span className={`text-xs font-hanken font-bold ${user.isOnline ? 'text-green-600' : 'text-gray-400'}`}>
                                        {user.isOnline ? 'Online' : 'Offline'}
                                    </span>
                                </div>
                            </div>
                            <div className="w-[100px] px-4 py-4 text-xs font-hanken text-gray-500">
                                {user.isOnline ? getLoginDuration(user.lastLoginAt) : '-'}
                            </div>
                            <div className="w-[120px] px-4 py-4 flex items-center justify-end gap-1">
                                <button
                                    onClick={() => {
                                        setSelectedUser(user);
                                        const isDivisiValid = ['Tim Logistik', 'Tim Legal', 'Sekretaris', 'Superadmin'].includes(user.divisi);
                                        editForm.setData({
                                            name: user.nama,
                                            email: user.email,
                                            password: '',
                                            divisi: isDivisiValid ? user.divisi : 'Tim Logistik',
                                            jabatan: user.role,
                                            status: user.status
                                        });
                                        setIsEditOpen(true);
                                    }}
                                    className="p-1 rounded hover:bg-surface text-[#8B6914] transition-colors" 
                                    title="Edit User"
                                >
                                    <svg width="15" height="15" viewBox="0 0 17 17" fill="none">
                                        <path d="M12.5 0L14.5 2L5 11.5H3V9.5L12.5 0ZM0 14H17V17H0V14Z" fill="currentColor"/>
                                    </svg>
                                </button>
                                <button 
                                    onClick={() => {
                                        setSelectedUser(user);
                                        setIsDeleteOpen(true);
                                    }}
                                    className="p-1 rounded hover:bg-surface text-[#BA1A1A] transition-colors" 
                                    title="Hapus User"
                                >
                                    <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
                                        <path d="M3 6H17M8 6V4C8 3.44772 8.44772 3 9 3H11C11.5523 3 12 3.44772 12 4V6M5 6V16C5 17.1046 5.89543 18 7 18H13C14.1046 18 15 17.1046 15 16V6H5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
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
                                        <p className="text-[10px] font-hanken text-gray-400">{user.phone || '-'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className={`w-1.5 h-1.5 rounded-full ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                    <span className={`text-[10px] font-hanken font-bold ${user.isOnline ? 'text-green-600' : 'text-gray-400'}`}>
                                        {user.isOnline ? 'Online' : 'Offline'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between ml-13">
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-hanken font-bold ${divisiColors[user.divisi] || 'bg-gray-100'}`}>
                                        {user.divisi}
                                    </span>
                                    <span className="text-xs font-hanken text-gray-500">
                                        {user.role}
                                    </span>
                                    {user.isOnline && (
                                        <span className="text-[10px] font-hanken text-gray-400">
                                            · {getLoginDuration(user.lastLoginAt)}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => {
                                            setSelectedUser(user);
                                            const isDivisiValid = ['Tim Logistik', 'Tim Legal', 'Sekretaris', 'Superadmin'].includes(user.divisi);
                                            editForm.setData({
                                                name: user.nama,
                                                email: user.email,
                                                password: '',
                                                divisi: isDivisiValid ? user.divisi : 'Tim Logistik',
                                                jabatan: user.role,
                                                status: user.status
                                            });
                                            setIsEditOpen(true);
                                        }}
                                        className="text-[#8B6914] text-xs font-hanken font-bold hover:underline" 
                                        title="Edit User"
                                    >
                                        Edit
                                    </button>
                                    <span className="text-gray-300">|</span>
                                    <button 
                                        onClick={() => {
                                            setSelectedUser(user);
                                            setIsDeleteOpen(true);
                                        }}
                                        className="text-[#BA1A1A] text-xs font-hanken font-bold hover:underline" 
                                        title="Hapus User"
                                    >
                                        Hapus
                                    </button>
                                </div>
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

            {/* Modal Tambah User */}
            <Modal show={isAddOpen} onClose={() => { setIsAddOpen(false); addForm.reset(); }} maxWidth="md">
                <div className="p-6 bg-[#F8F3EB]">
                    <h2 className="text-lg font-hanken font-bold text-primary-900 mb-4">
                        Tambah Pengguna Baru
                    </h2>


                    <div className="flex flex-col gap-4">
                        {/* Nama */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-hanken font-bold text-gray-900">Nama Lengkap</label>
                            <input
                                type="text"
                                value={addForm.data.name}
                                onChange={(e) => addForm.setData('name', e.target.value)}
                                placeholder="Nama lengkap user..."
                                className={`w-full px-4 py-2.5 bg-white rounded-lg border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700 ${
                                    addForm.errors.name ? 'border-red-400' : 'border-surface-border'
                                }`}
                            />
                            {addForm.errors.name && <p className="text-xs text-red-500 font-hanken">{addForm.errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-hanken font-bold text-gray-900">Email</label>
                            <input
                                type="email"
                                value={addForm.data.email}
                                onChange={(e) => addForm.setData('email', e.target.value)}
                                placeholder="email@gununggeulis.farm"
                                className={`w-full px-4 py-2.5 bg-white rounded-lg border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700 ${
                                    addForm.errors.email ? 'border-red-400' : 'border-surface-border'
                                }`}
                            />
                            {addForm.errors.email && <p className="text-xs text-red-500 font-hanken">{addForm.errors.email}</p>}
                        </div>

                        {/* Divisi & Jabatan */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-hanken font-bold text-gray-900">Divisi</label>
                                <select
                                    value={addForm.data.divisi}
                                    onChange={(e) => addForm.setData('divisi', e.target.value)}
                                    className={`w-full px-4 py-2.5 bg-white rounded-lg border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700 ${
                                        addForm.errors.divisi ? 'border-red-400' : 'border-surface-border'
                                    }`}
                                >
                                    <option value="Tim Logistik">Tim Logistik</option>
                                    <option value="Tim Legal">Tim Legal</option>
                                    <option value="Sekretaris">Sekretaris</option>
                                    <option value="Superadmin">Superadmin</option>
                                </select>
                                {addForm.errors.divisi && <p className="text-xs text-red-500 font-hanken">{addForm.errors.divisi}</p>}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-hanken font-bold text-gray-900">Jabatan</label>
                                <input
                                    type="text"
                                    value={addForm.data.jabatan}
                                    onChange={(e) => addForm.setData('jabatan', e.target.value)}
                                    placeholder="Contoh: Staff Logistik"
                                    className={`w-full px-4 py-2.5 bg-white rounded-lg border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700 ${
                                        addForm.errors.jabatan ? 'border-red-400' : 'border-surface-border'
                                    }`}
                                />
                                {addForm.errors.jabatan && <p className="text-xs text-red-500 font-hanken">{addForm.errors.jabatan}</p>}
                            </div>
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-hanken font-bold text-gray-900">Password</label>
                            <div className="relative">
                                <input
                                    type={showAddPwd ? 'text' : 'password'}
                                    value={addForm.data.password}
                                    onChange={(e) => addForm.setData('password', e.target.value)}
                                    placeholder="Minimal 8 karakter"
                                    className={`w-full px-4 py-2.5 pr-11 bg-white rounded-lg border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700 ${
                                        addForm.errors.password ? 'border-red-400' : 'border-surface-border'
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowAddPwd(!showAddPwd)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showAddPwd ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                            <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                            <path d="M1 1l22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                            <path d="M10.73 10.73A3 3 0 0013.27 13.27" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                            <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" stroke="currentColor" strokeWidth="2"/>
                                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {addForm.errors.password && <p className="text-xs text-red-500 font-hanken">{addForm.errors.password}</p>}
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => { setIsAddOpen(false); addForm.reset(); }}
                            className="px-4 py-2 text-sm font-hanken font-bold text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            disabled={addForm.processing}
                            onClick={() => {
                                addForm.post(route('users.store'), {
                                    onSuccess: () => { setIsAddOpen(false); addForm.reset(); },
                                });
                            }}
                            className="px-6 py-2 bg-primary-700 hover:bg-primary-800 disabled:opacity-50 text-white rounded-lg text-sm font-hanken font-bold transition-colors shadow-sm flex items-center gap-2"
                        >
                            {addForm.processing && (
                                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                </svg>
                            )}
                            Simpan User
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Modal Edit User */}
            <Modal show={isEditOpen} onClose={() => setIsEditOpen(false)} maxWidth="md">
                <div className="p-6 bg-[#F8F3EB]">
                    <h2 className="text-lg font-hanken font-bold text-primary-900 mb-4">
                        Ubah Informasi Pengguna
                    </h2>

                    <div className="flex flex-col gap-4">
                        {/* Nama */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-hanken font-bold text-gray-900">Nama Lengkap</label>
                            <input
                                type="text"
                                value={editForm.data.name}
                                onChange={(e) => editForm.setData('name', e.target.value)}
                                className={`w-full px-4 py-2.5 bg-white rounded-lg border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700 ${
                                    editForm.errors.name ? 'border-red-400' : 'border-surface-border'
                                }`}
                            />
                            {editForm.errors.name && <p className="text-xs text-red-500 font-hanken">{editForm.errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-hanken font-bold text-gray-900">Email</label>
                            <input
                                type="email"
                                value={editForm.data.email}
                                onChange={(e) => editForm.setData('email', e.target.value)}
                                className={`w-full px-4 py-2.5 bg-white rounded-lg border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700 ${
                                    editForm.errors.email ? 'border-red-400' : 'border-surface-border'
                                }`}
                            />
                            {editForm.errors.email && <p className="text-xs text-red-500 font-hanken">{editForm.errors.email}</p>}
                        </div>

                        {/* Divisi & Jabatan */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-hanken font-bold text-gray-900">Divisi</label>
                                <select
                                    value={editForm.data.divisi}
                                    onChange={(e) => editForm.setData('divisi', e.target.value)}
                                    className={`w-full px-4 py-2.5 bg-white rounded-lg border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700 ${
                                        editForm.errors.divisi ? 'border-red-400' : 'border-surface-border'
                                    }`}
                                >
                                    <option value="Tim Logistik">Tim Logistik</option>
                                    <option value="Tim Legal">Tim Legal</option>
                                    <option value="Sekretaris">Sekretaris</option>
                                    <option value="Superadmin">Superadmin</option>
                                </select>
                                {editForm.errors.divisi && <p className="text-xs text-red-500 font-hanken">{editForm.errors.divisi}</p>}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-hanken font-bold text-gray-900">Jabatan</label>
                                <input
                                    type="text"
                                    value={editForm.data.jabatan}
                                    onChange={(e) => editForm.setData('jabatan', e.target.value)}
                                    className={`w-full px-4 py-2.5 bg-white rounded-lg border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700 ${
                                        editForm.errors.jabatan ? 'border-red-400' : 'border-surface-border'
                                    }`}
                                />
                                {editForm.errors.jabatan && <p className="text-xs text-red-500 font-hanken">{editForm.errors.jabatan}</p>}
                            </div>
                        </div>

                        {/* Status */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-hanken font-bold text-gray-900">Status</label>
                            <select
                                value={editForm.data.status}
                                onChange={(e) => editForm.setData('status', e.target.value)}
                                className="w-full px-4 py-2.5 bg-white rounded-lg border border-surface-border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        {/* Password Baru (opsional) */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-hanken font-bold text-gray-900">
                                Password Baru
                                <span className="ml-2 text-xs font-normal text-gray-400">(kosongkan jika tidak diubah)</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showEditPwd ? 'text' : 'password'}
                                    value={editForm.data.password}
                                    onChange={(e) => editForm.setData('password', e.target.value)}
                                    placeholder="Minimal 8 karakter"
                                    className={`w-full px-4 py-2.5 pr-11 bg-white rounded-lg border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700 ${
                                        editForm.errors.password ? 'border-red-400' : 'border-surface-border'
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowEditPwd(!showEditPwd)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showEditPwd ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                            <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                            <path d="M1 1l22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                            <path d="M10.73 10.73A3 3 0 0013.27 13.27" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                            <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" stroke="currentColor" strokeWidth="2"/>
                                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {editForm.errors.password && <p className="text-xs text-red-500 font-hanken">{editForm.errors.password}</p>}
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => setIsEditOpen(false)}
                            className="px-4 py-2 text-sm font-hanken font-bold text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            disabled={editForm.processing}
                            onClick={() => {
                                editForm.put(route('users.update', selectedUser.id), {
                                    onSuccess: () => setIsEditOpen(false),
                                });
                            }}
                            className="px-6 py-2 bg-primary-700 hover:bg-primary-800 disabled:opacity-50 text-white rounded-lg text-sm font-hanken font-bold transition-colors shadow-sm flex items-center gap-2"
                        >
                            {editForm.processing && (
                                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                </svg>
                            )}
                            Simpan Perubahan
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Modal Konfirmasi Hapus User */}
            <Modal show={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} maxWidth="sm">
                <div className="p-6 bg-[#F8F3EB]">
                    <h2 className="text-lg font-hanken font-bold text-[#BA1A1A] mb-2">
                        Hapus Pengguna
                    </h2>
                    <p className="text-sm font-hanken text-gray-600 mb-6">
                        Apakah Anda yakin ingin menghapus pengguna <strong className="text-gray-900">{selectedUser?.nama}</strong>? Tindakan ini tidak dapat dibatalkan.
                    </p>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => setIsDeleteOpen(false)}
                            className="px-4 py-2 text-sm font-hanken font-bold text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            disabled={deleteForm.processing}
                            onClick={() => {
                                deleteForm.delete(route('users.destroy', selectedUser.id), {
                                    onSuccess: () => setIsDeleteOpen(false),
                                });
                            }}
                            className="px-5 py-2 bg-[#BA1A1A] hover:bg-[#A6141A] disabled:opacity-50 text-white rounded-lg text-sm font-hanken font-bold transition-colors shadow-sm flex items-center gap-2"
                        >
                            {deleteForm.processing && (
                                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                </svg>
                            )}
                            Hapus User
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default function Settings({ users = [] }) {
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
                {activeTab === 'users' && isSuperAdmin && <ManageUserTab users={users} />}
            </div>
        </SidebarLayout>
    );
}
