import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function Index({ templates }) {
    const [showModal, setShowModal] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState(null);
    const [form, setForm] = useState({
        name: '',
        jenis: 'masuk',
        content: '',
    });
    const [errors, setErrors] = useState({});

    const openCreateModal = () => {
        setEditingTemplate(null);
        setForm({ name: '', jenis: 'masuk', content: '' });
        setErrors({});
        setShowModal(true);
    };

    const openEditModal = (template) => {
        setEditingTemplate(template);
        setForm({
            name: template.name,
            jenis: template.jenis,
            content: template.content || '',
        });
        setErrors({});
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingTemplate(null);
        setForm({ name: '', jenis: 'masuk', content: '' });
        setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingTemplate) {
            router.put(`/templates/${editingTemplate.id}`, form, {
                onSuccess: () => closeModal(),
                onError: (errors) => setErrors(errors),
            });
        } else {
            router.post('/templates', form, {
                onSuccess: () => closeModal(),
                onError: (errors) => setErrors(errors),
            });
        }
    };

    const handleDelete = (template) => {
        if (confirm('Yakin ingin menghapus template ini?')) {
            router.delete(`/templates/${template.id}`);
        }
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

    const getJenisBadgeColor = (jenis) => {
        const colors = {
            masuk: 'bg-blue-100 text-blue-800',
            keluar: 'bg-green-100 text-green-800',
            internal: 'bg-purple-100 text-purple-800',
            keputusan: 'bg-orange-100 text-orange-800',
        };
        return colors[jenis] || 'bg-gray-100 text-gray-800';
    };

    return (
        <SidebarLayout>
            <Head title="Template Surat" />

            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Template Surat</h1>
                        <p className="text-sm text-gray-500 mt-1">Kelola template untuk berbagai jenis surat</p>
                    </div>
                    <PrimaryButton onClick={openCreateModal}>
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Tambah Template
                    </PrimaryButton>
                </div>

                {/* Templates List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    {templates.length === 0 ? (
                        <div className="p-12 text-center">
                            <svg className="w-12 h-12 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="mt-4 text-gray-500">Belum ada template</p>
                            <p className="text-sm text-gray-400 mt-1">Klik "Tambah Template" untuk membuat template baru</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama Template</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Jenis</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Dibuat Oleh</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tanggal</th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {templates.map((template) => (
                                        <tr key={template.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">{template.name}</div>
                                                {template.content && (
                                                    <div className="text-sm text-gray-500 mt-1 line-clamp-1">{template.content}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getJenisBadgeColor(template.jenis)}`}>
                                                    {getJenisLabel(template.jenis)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {template.creator?.name || '-'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(template.created_at).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => openEditModal(template)}
                                                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(template)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Create/Edit Modal */}
            <Modal show={showModal} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        {editingTemplate ? 'Edit Template' : 'Tambah Template Baru'}
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <InputLabel htmlFor="name" value="Nama Template" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="jenis" value="Jenis Surat" />
                                <select
                                    id="jenis"
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    value={form.jenis}
                                    onChange={(e) => setForm({ ...form, jenis: e.target.value })}
                                    required
                                >
                                    <option value="masuk">Surat Masuk</option>
                                    <option value="keluar">Surat Keluar</option>
                                    <option value="internal">Surat Internal</option>
                                    <option value="keputusan">Surat Keputusan</option>
                                </select>
                                <InputError message={errors.jenis} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="content" value="Konten Template" />
                                <textarea
                                    id="content"
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    rows={6}
                                    value={form.content}
                                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                                    placeholder="Isi template surat..."
                                />
                                <InputError message={errors.content} className="mt-2" />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <SecondaryButton type="button" onClick={closeModal}>
                                Batal
                            </SecondaryButton>
                            <PrimaryButton type="submit">
                                {editingTemplate ? 'Simpan Perubahan' : 'Tambah Template'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </SidebarLayout>
    );
}
