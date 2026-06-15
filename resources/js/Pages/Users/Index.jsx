import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
import Modal from '@/Components/Modal';
import Toast from '@/Components/Toast';

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

function getLoginDuration(timestamp) {
    if (!timestamp) return '-';
    const now = Math.floor(Date.now() / 1000);
    const diff = now - timestamp;
    if (diff < 60) return 'Baru saja';
    if (diff < 3600) return `${Math.floor(diff / 60)} menit`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam`;
    return `${Math.floor(diff / 86400)} hari`;
}

export default function UsersIndex({ users = [] }) {
    const { flash } = usePage().props;
    const [filterDivisi, setFilterDivisi] = useState('');
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [toast, setToast] = useState(null);

    const addForm = useForm({
        name: '', email: '', password: '', phone: '',
        divisi: 'Tim Logistik', jabatan: '', role_type: 'staff', status: 'Active',
    });

    const editForm = useForm({
        name: '', email: '', password: '', phone: '',
        divisi: 'Tim Logistik', jabatan: '', role_type: 'staff', status: 'Active',
    });

    const deleteForm = useForm({});
    const [showAddPwd, setShowAddPwd] = useState(false);
    const [showEditPwd, setShowEditPwd] = useState(false);

    useEffect(() => {
        if (flash?.success) setToast({ message: flash.success, type: 'success' });
        else if (flash?.error) setToast({ message: flash.error, type: 'error' });
    }, [flash]);

    const closeToast = useCallback(() => setToast(null), []);

    const filteredUsers = users.filter((u) => filterDivisi === '' || u.divisi === filterDivisi);

    const stats = {
        total: users.length,
        logistik: users.filter(u => u.divisi === 'Tim Logistik').length,
        legal: users.filter(u => u.divisi === 'Tim Legal').length,
        sekretaris: users.filter(u => u.divisi === 'Sekretaris').length,
        superadmin: users.filter(u => u.divisi === 'Superadmin').length,
    };

    return (
        <SidebarLayout>
            <Head title="Pengguna & Role" />

            {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}

            <div className="max-w-[1200px] mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-hanken font-semibold text-primary-900">Pengguna & Role</h1>
                    <p className="text-sm font-hanken text-gray-600 mt-1">Kelola akun pengguna dan hak akses sistem.</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                    <div className="bg-white rounded-xl border border-surface-border p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary-900/10 flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="4" stroke="#173901" strokeWidth="1.5"/><path d="M3 18C3 14.134 6.13401 11 10 11C13.866 11 17 14.134 17 18" stroke="#173901" strokeWidth="1.5" strokeLinecap="round"/></svg>
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
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="6" width="14" height="11" rx="2" stroke="#1D4ED8" strokeWidth="1.5"/><path d="M7 6V5C7 3.34315 8.34315 2 10 2C11.6569 2 13 3.34315 13 5V6" stroke="#1D4ED8" strokeWidth="1.5"/></svg>
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
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L3 6V14L10 18L17 14V6L10 2Z" stroke="#92400E" strokeWidth="1.5" strokeLinejoin="round"/><path d="M10 10V18M10 10L3 6M10 10L17 6" stroke="#92400E" strokeWidth="1.5"/></svg>
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
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 4H16V16H4V4Z" stroke="#065F46" strokeWidth="1.5"/><path d="M8 8H12M8 11H12M8 14H10" stroke="#065F46" strokeWidth="1.5" strokeLinecap="round"/></svg>
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
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M9 2L2 5V10C2 14.42 5.42 18 10 19C14.58 18 18 14.42 18 10V5L11 2C10.37 1.73 9.63 1.73 9 2Z" stroke="#6B21A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </div>
                            <div>
                                <p className="text-xs font-mono text-gray-500 uppercase">Superadmin</p>
                                <p className="text-xl font-hanken font-bold text-[#6B21A8]">{stats.superadmin}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white shadow-sm rounded-xl border border-surface-border overflow-hidden">
                    <div className="hidden md:block bg-[rgba(200,230,160,0.3)] border-b border-surface-border">
                        <div className="flex items-center">
                            <div className="w-12 px-4 py-4 text-center text-xs font-mono font-medium text-primary-900 tracking-wider">NO</div>
                            <div className="flex-1 px-4 py-4 text-xs font-mono font-medium text-primary-900 tracking-wider">NAMA & EMAIL</div>
                            <div className="w-[160px] px-4 py-4">
                                <select value={filterDivisi} onChange={(e) => setFilterDivisi(e.target.value)} className="w-full px-2 py-1.5 bg-white rounded border-0 text-[10px] font-mono font-medium text-primary-900 tracking-wider uppercase outline-none cursor-pointer">
                                    <option value="">DIVISI</option>
                                    <option value="Tim Logistik">TIM LOGISTIK</option>
                                    <option value="Tim Legal">TIM LEGAL</option>
                                    <option value="Sekretaris">SEKRETARIS</option>
                                    <option value="Superadmin">SUPERADMIN</option>
                                </select>
                            </div>
                            <div className="w-[120px] px-4 py-4 text-xs font-mono font-medium text-primary-900 tracking-wider">ROLE</div>
                            <div className="w-[140px] px-4 py-4 text-xs font-mono font-medium text-primary-900 tracking-wider">JABATAN</div>
                            <div className="w-[100px] px-4 py-4 text-xs font-mono font-medium text-primary-900 tracking-wider">STATUS</div>
                            <div className="w-[120px] px-4 py-4 flex items-center justify-end gap-2">
                                <button onClick={() => { addForm.reset(); setIsAddOpen(true); }} className="px-3 py-1.5 bg-primary-700 hover:bg-primary-800 text-white rounded text-[10px] font-mono font-medium tracking-wider uppercase transition-colors flex items-center gap-1">
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1V9M1 5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                                    ADD
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block divide-y divide-surface-border/30">
                        {filteredUsers.map((user, index) => (
                            <div key={user.id} className={`flex items-center hover:bg-surface/30 transition-colors ${index % 2 === 1 ? 'bg-[rgba(200,230,160,0.05)]' : ''}`}>
                                <div className="w-12 px-4 py-4 text-center text-sm font-hanken text-gray-500">{String(index + 1).padStart(2, '0')}</div>
                                <div className="flex-1 px-4 py-4 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary-700 flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-sm font-hanken font-bold">{user.nama?.charAt(0)}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-hanken font-bold text-gray-900">{user.nama}</p>
                                        <p className="text-xs font-hanken text-gray-500">{user.email}</p>
                                        <p className="text-[10px] font-hanken text-gray-400">{user.phone || '-'}</p>
                                    </div>
                                </div>
                                <div className="w-[160px] px-4 py-4">
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-hanken font-bold ${divisiColors[user.divisi] || 'bg-gray-100'}`}>{user.divisi || '-'}</span>
                                </div>
                                <div className="w-[120px] px-4 py-4">
                                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-medium ${user.role_type === 'superadmin' ? 'bg-[#F3E8FF] text-[#6B21A8]' : user.role_type === 'manajer' ? 'bg-[#FEF3C7] text-[#92400E]' : 'bg-gray-100 text-gray-600'}`}>
                                        {user.role_type === 'superadmin' ? 'Superadmin' : user.role_type === 'manajer' ? 'Manajer' : 'Staff'}
                                    </span>
                                </div>
                                <div className="w-[140px] px-4 py-4 text-sm font-hanken text-gray-900">{user.role || '-'}</div>
                                <div className="w-[100px] px-4 py-4">
                                    <div className="flex items-center gap-1.5">
                                        <span className={`w-2 h-2 rounded-full ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                        <span className={`text-xs font-hanken font-bold ${user.isOnline ? 'text-green-600' : 'text-gray-400'}`}>{user.isOnline ? 'Online' : 'Offline'}</span>
                                    </div>
                                </div>
                                <div className="w-[120px] px-4 py-4 flex items-center justify-end gap-1">
                                    <button onClick={() => { setSelectedUser(user); editForm.setData({ name: user.nama, email: user.email, password: '', phone: user.phone || '', divisi: user.divisi || 'Tim Logistik', jabatan: user.role, role_type: user.role_type || 'staff', status: user.status }); setIsEditOpen(true); }} className="p-1 rounded hover:bg-surface text-[#8B6914] transition-colors" title="Edit">
                                        <svg width="15" height="15" viewBox="0 0 17 17" fill="none"><path d="M12.5 0L14.5 2L5 11.5H3V9.5L12.5 0ZM0 14H17V17H0V14Z" fill="currentColor"/></svg>
                                    </button>
                                    <button onClick={() => { setSelectedUser(user); setIsDeleteOpen(true); }} className="p-1 rounded hover:bg-surface text-[#BA1A1A] transition-colors" title="Hapus">
                                        <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><path d="M3 6H17M8 6V4C8 3.44772 8.44772 3 9 3H11C11.5523 3 12 3.44772 12 4V6M5 6V16C5 17.1046 5.89543 18 7 18H13C14.1046 18 15 17.1046 15 16V6H5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Mobile */}
                    <div className="md:hidden divide-y divide-surface-border/30">
                        {filteredUsers.map((user) => (
                            <div key={user.id} className="p-4 flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary-700 flex items-center justify-center"><span className="text-white text-sm font-hanken font-bold">{user.nama?.charAt(0)}</span></div>
                                        <div>
                                            <p className="text-sm font-hanken font-bold text-gray-900">{user.nama}</p>
                                            <p className="text-xs font-hanken text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-hanken font-bold ${divisiColors[user.divisi] || 'bg-gray-100'}`}>{user.divisi}</span>
                                </div>
                                <div className="flex items-center justify-between ml-13">
                                    <span className="text-xs font-hanken text-gray-500">{user.role} · {user.role_type}</span>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => { setSelectedUser(user); editForm.setData({ name: user.nama, email: user.email, password: '', phone: user.phone || '', divisi: user.divisi || 'Tim Logistik', jabatan: user.role, role_type: user.role_type || 'staff', status: user.status }); setIsEditOpen(true); }} className="text-[#8B6914] text-xs font-hanken font-bold hover:underline">Edit</button>
                                        <span className="text-gray-300">|</span>
                                        <button onClick={() => { setSelectedUser(user); setIsDeleteOpen(true); }} className="text-[#BA1A1A] text-xs font-hanken font-bold hover:underline">Hapus</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {filteredUsers.length === 0 && <div className="p-8 text-center"><p className="text-sm font-hanken text-gray-500">Tidak ada user ditemukan.</p></div>}
                </div>
            </div>

            {/* Modal Add User */}
            <Modal show={isAddOpen} onClose={() => { setIsAddOpen(false); addForm.reset(); }} maxWidth="md">
                <div className="p-6 bg-[#F8F3EB]">
                    <h2 className="text-lg font-hanken font-bold text-primary-900 mb-4">Tambah Pengguna Baru</h2>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-hanken font-bold text-gray-900">Nama Lengkap</label>
                            <input type="text" value={addForm.data.name} onChange={(e) => addForm.setData('name', e.target.value)} placeholder="Nama lengkap..." className={`w-full px-4 py-2.5 bg-white rounded-lg border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700 ${addForm.errors.name ? 'border-red-400' : 'border-surface-border'}`} />
                            {addForm.errors.name && <p className="text-xs text-red-500">{addForm.errors.name}</p>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-hanken font-bold text-gray-900">Email</label>
                            <input type="email" value={addForm.data.email} onChange={(e) => addForm.setData('email', e.target.value)} placeholder="email@gununggeulis.farm" className={`w-full px-4 py-2.5 bg-white rounded-lg border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700 ${addForm.errors.email ? 'border-red-400' : 'border-surface-border'}`} />
                            {addForm.errors.email && <p className="text-xs text-red-500">{addForm.errors.email}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-hanken font-bold text-gray-900">Divisi</label>
                                <select value={addForm.data.divisi} onChange={(e) => addForm.setData('divisi', e.target.value)} className="w-full px-4 py-2.5 bg-white rounded-lg border border-surface-border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700">
                                    <option value="Tim Logistik">Tim Logistik</option>
                                    <option value="Tim Legal">Tim Legal</option>
                                    <option value="Sekretaris">Sekretaris</option>
                                    <option value="Superadmin">Superadmin</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-hanken font-bold text-gray-900">Role</label>
                                <select value={addForm.data.role_type} onChange={(e) => addForm.setData('role_type', e.target.value)} className="w-full px-4 py-2.5 bg-white rounded-lg border border-surface-border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700">
                                    <option value="staff">Staff</option>
                                    <option value="manajer">Manajer</option>
                                    <option value="superadmin">Superadmin</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-hanken font-bold text-gray-900">Jabatan</label>
                            <input type="text" value={addForm.data.jabatan} onChange={(e) => addForm.setData('jabatan', e.target.value)} placeholder="Contoh: Staff Logistik" className="w-full px-4 py-2.5 bg-white rounded-lg border border-surface-border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-hanken font-bold text-gray-900">Password</label>
                            <div className="relative">
                                <input type={showAddPwd ? 'text' : 'password'} value={addForm.data.password} onChange={(e) => addForm.setData('password', e.target.value)} placeholder="Minimal 8 karakter" className={`w-full px-4 py-2.5 pr-11 bg-white rounded-lg border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700 ${addForm.errors.password ? 'border-red-400' : 'border-surface-border'}`} />
                                <button type="button" onClick={() => setShowAddPwd(!showAddPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showAddPwd ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M1 1l22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> : <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/></svg>}
                                </button>
                            </div>
                            {addForm.errors.password && <p className="text-xs text-red-500">{addForm.errors.password}</p>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-hanken font-bold text-gray-900">No. Telepon</label>
                            <input type="tel" value={addForm.data.phone} onChange={(e) => addForm.setData('phone', e.target.value)} placeholder="08xxxxxxxxxx" className="w-full px-4 py-2.5 bg-white rounded-lg border border-surface-border text-sm font-hanken text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-700" />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <button type="button" onClick={() => { setIsAddOpen(false); addForm.reset(); }} className="px-4 py-2 text-sm font-hanken font-bold text-gray-600 hover:text-gray-900">Batal</button>
                        <button type="button" disabled={addForm.processing} onClick={() => addForm.post(route('users.store'), { onSuccess: () => { setIsAddOpen(false); addForm.reset(); } })} className="px-6 py-2 bg-primary-700 hover:bg-primary-800 disabled:opacity-50 text-white rounded-lg text-sm font-hanken font-bold shadow-sm flex items-center gap-2">
                            {addForm.processing && <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
                            Simpan User
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Modal Edit User */}
            <Modal show={isEditOpen} onClose={() => setIsEditOpen(false)} maxWidth="md">
                <div className="p-6 bg-[#F8F3EB]">
                    <h2 className="text-lg font-hanken font-bold text-primary-900 mb-4">Ubah Informasi Pengguna</h2>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-hanken font-bold text-gray-900">Nama Lengkap</label>
                            <input type="text" value={editForm.data.name} onChange={(e) => editForm.setData('name', e.target.value)} className={`w-full px-4 py-2.5 bg-white rounded-lg border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700 ${editForm.errors.name ? 'border-red-400' : 'border-surface-border'}`} />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-hanken font-bold text-gray-900">Email</label>
                            <input type="email" value={editForm.data.email} onChange={(e) => editForm.setData('email', e.target.value)} className={`w-full px-4 py-2.5 bg-white rounded-lg border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700 ${editForm.errors.email ? 'border-red-400' : 'border-surface-border'}`} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-hanken font-bold text-gray-900">Divisi</label>
                                <select value={editForm.data.divisi} onChange={(e) => editForm.setData('divisi', e.target.value)} className="w-full px-4 py-2.5 bg-white rounded-lg border border-surface-border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700">
                                    <option value="Tim Logistik">Tim Logistik</option>
                                    <option value="Tim Legal">Tim Legal</option>
                                    <option value="Sekretaris">Sekretaris</option>
                                    <option value="Superadmin">Superadmin</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-hanken font-bold text-gray-900">Role</label>
                                <select value={editForm.data.role_type} onChange={(e) => editForm.setData('role_type', e.target.value)} className="w-full px-4 py-2.5 bg-white rounded-lg border border-surface-border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700">
                                    <option value="staff">Staff</option>
                                    <option value="manajer">Manajer</option>
                                    <option value="superadmin">Superadmin</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-hanken font-bold text-gray-900">Jabatan</label>
                            <input type="text" value={editForm.data.jabatan} onChange={(e) => editForm.setData('jabatan', e.target.value)} className="w-full px-4 py-2.5 bg-white rounded-lg border border-surface-border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-hanken font-bold text-gray-900">Status</label>
                            <select value={editForm.data.status} onChange={(e) => editForm.setData('status', e.target.value)} className="w-full px-4 py-2.5 bg-white rounded-lg border border-surface-border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700">
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-hanken font-bold text-gray-900">No. Telepon</label>
                            <input type="tel" value={editForm.data.phone} onChange={(e) => editForm.setData('phone', e.target.value)} placeholder="08xxxxxxxxxx" className="w-full px-4 py-2.5 bg-white rounded-lg border border-surface-border text-sm font-hanken text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-700" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-hanken font-bold text-gray-900">Password Baru <span className="text-xs font-normal text-gray-400">(kosongkan jika tidak diubah)</span></label>
                            <div className="relative">
                                <input type={showEditPwd ? 'text' : 'password'} value={editForm.data.password} onChange={(e) => editForm.setData('password', e.target.value)} placeholder="Minimal 8 karakter" className={`w-full px-4 py-2.5 pr-11 bg-white rounded-lg border text-sm font-hanken text-gray-900 outline-none focus:ring-2 focus:ring-primary-700 ${editForm.errors.password ? 'border-red-400' : 'border-surface-border'}`} />
                                <button type="button" onClick={() => setShowEditPwd(!showEditPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showEditPwd ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M1 1l22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> : <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/></svg>}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <button type="button" onClick={() => setIsEditOpen(false)} className="px-4 py-2 text-sm font-hanken font-bold text-gray-600 hover:text-gray-900">Batal</button>
                        <button type="button" disabled={editForm.processing} onClick={() => editForm.put(route('users.update', selectedUser.id), { onSuccess: () => setIsEditOpen(false) })} className="px-6 py-2 bg-primary-700 hover:bg-primary-800 disabled:opacity-50 text-white rounded-lg text-sm font-hanken font-bold shadow-sm flex items-center gap-2">
                            {editForm.processing && <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
                            Simpan Perubahan
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Modal Delete User */}
            <Modal show={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} maxWidth="sm">
                <div className="p-6 bg-[#F8F3EB]">
                    <h2 className="text-lg font-hanken font-bold text-[#BA1A1A] mb-2">Hapus Pengguna</h2>
                    <p className="text-sm font-hanken text-gray-600 mb-6">Apakah Anda yakin ingin menghapus <strong className="text-gray-900">{selectedUser?.nama}</strong>? Tindakan ini tidak dapat dibatalkan.</p>
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={() => setIsDeleteOpen(false)} className="px-4 py-2 text-sm font-hanken font-bold text-gray-600 hover:text-gray-900">Batal</button>
                        <button type="button" disabled={deleteForm.processing} onClick={() => deleteForm.delete(route('users.destroy', selectedUser.id), { onSuccess: () => setIsDeleteOpen(false) })} className="px-5 py-2 bg-[#BA1A1A] hover:bg-[#A6141A] disabled:opacity-50 text-white rounded-lg text-sm font-hanken font-bold shadow-sm flex items-center gap-2">
                            {deleteForm.processing && <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
                            Hapus User
                        </button>
                    </div>
                </div>
            </Modal>
        </SidebarLayout>
    );
}
