import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, Link, router } from '@inertiajs/react';

const typeStyles = {
    approved: { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: '✓', label: 'Disetujui' },
    rejected: { bg: 'bg-red-100', text: 'text-red-700', icon: '✕', label: 'Ditolak' },
    approval_submitted: { bg: 'bg-amber-100', text: 'text-amber-700', icon: '⏳', label: 'Menunggu' },
    disposition: { bg: 'bg-blue-100', text: 'text-blue-700', icon: '→', label: 'Disposisi' },
};

function NotificationIcon({ type }) {
    const style = typeStyles[type] || { bg: 'bg-gray-100', text: 'text-gray-600', icon: '•' };
    return (
        <span className={`w-8 h-8 rounded-full ${style.bg} ${style.text} flex items-center justify-center text-sm font-bold flex-shrink-0`}>
            {style.icon}
        </span>
    );
}

export default function NotificationIndex({ notifications = {} }) {
    const data = notifications.data || [];
    const markAllAsRead = () => {
        router.patch('/notifications/read-all', {}, { preserveState: true });
    };

    const markAsRead = (id) => {
        router.patch(`/notifications/${id}/read`, {}, { preserveState: true });
    };

    return (
        <SidebarLayout>
            <Head title="Notifikasi" />

            <div className="max-w-[800px] mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Notifikasi</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {notifications.total || 0} notifikasi
                        </p>
                    </div>
                    {data.some(n => !n.read_at) && (
                        <button
                            onClick={markAllAsRead}
                            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            Tandai semua dibaca
                        </button>
                    )}
                </div>

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    {data.length === 0 ? (
                        <div className="p-12 text-center">
                            <svg className="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <p className="text-gray-500">Tidak ada notifikasi</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {data.map((notification) => {
                                const style = typeStyles[notification.type] || { bg: 'bg-gray-100', text: 'text-gray-600' };
                                return (
                                    <div
                                        key={notification.id}
                                        className={`p-4 hover:bg-gray-50 transition-colors ${
                                            !notification.read_at ? 'bg-blue-50/50' : ''
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <NotificationIcon type={notification.type} />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <h3 className={`text-sm font-medium ${!notification.read_at ? 'text-gray-900' : 'text-gray-700'}`}>
                                                        {notification.title}
                                                    </h3>
                                                    {!notification.read_at && (
                                                        <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600 mt-0.5">
                                                    {notification.message}
                                                </p>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <span className="text-xs text-gray-400">
                                                        {new Date(notification.created_at).toLocaleString('id-ID')}
                                                    </span>
                                                    {notification.link && (
                                                        <Link
                                                            href={notification.link}
                                                            onClick={() => !notification.read_at && markAsRead(notification.id)}
                                                            className="text-xs font-medium text-blue-600 hover:text-blue-700"
                                                        >
                                                            Lihat →
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </SidebarLayout>
    );
}
