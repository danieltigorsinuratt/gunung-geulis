import { useEffect, useState } from 'react';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Trigger masuk (animasi slide in)
        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 300); // tunggu animasi selesai
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const isSuccess = type === 'success';

    return (
        <div
            className={`fixed top-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg border transition-all duration-300 ${
                visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            } ${
                isSuccess
                    ? 'bg-white border-green-200'
                    : 'bg-white border-red-200'
            }`}
        >
            {/* Icon */}
            {isSuccess ? (
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8L6.5 11.5L13 4.5" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            ) : (
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 4L12 12M12 4L4 12" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </div>
            )}

            {/* Text */}
            <div>
                <p className={`text-sm font-hanken font-bold ${isSuccess ? 'text-green-800' : 'text-red-800'}`}>
                    {isSuccess ? 'Berhasil' : 'Gagal'}
                </p>
                <p className={`text-xs font-hanken ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                </p>
            </div>

            {/* Close button */}
            <button
                onClick={() => {
                    setVisible(false);
                    setTimeout(onClose, 300);
                }}
                className={`ml-2 p-1 rounded-lg transition-colors ${
                    isSuccess ? 'hover:bg-green-100 text-green-400' : 'hover:bg-red-100 text-red-400'
                }`}
            >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            </button>
        </div>
    );
}
