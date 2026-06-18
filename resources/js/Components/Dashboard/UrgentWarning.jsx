import { Link } from '@inertiajs/react';

const borderColor = {
    red: 'border-l-[#BA1A1A]',
    amber: 'border-l-[#8B6914]',
};

const badgeColor = {
    red: 'text-[#BA1A1A]',
    amber: 'text-[#8B6914]',
};

export default function UrgentWarning({ warnings }) {
    return (
        <div className="bg-white rounded-xl border border-surface-border h-full flex flex-col overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-surface-border flex-shrink-0">
                <svg className="w-4 h-5 text-[#BA1A1A]" viewBox="0 0 16 20" fill="none">
                    <path d="M8 1L1 18H15L8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M8 8V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="8" cy="15" r="0.75" fill="currentColor" />
                </svg>
                <h2 className="text-base md:text-lg font-hanken font-semibold text-primary-900">
                    Peringatan Urgent
                </h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                {warnings.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        {warnings.map((warning) => (
                            <div
                                key={warning.id}
                                className={`bg-surface/50 p-4 rounded-lg border-l-4 ${borderColor[warning.color] || borderColor.red} flex flex-col gap-1`}
                            >
                                <div className="flex items-start justify-between">
                                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${badgeColor[warning.color] || badgeColor.red}`}>
                                        {warning.badge}
                                    </span>
                                    <Link
                                        href={`/documents/${warning.id}`}
                                        className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary-700 hover:text-primary-900 transition-colors"
                                    >
                                        Lihat →
                                    </Link>
                                </div>
                                <div className="text-sm font-hanken font-bold text-primary-900">
                                    {warning.title}
                                </div>
                                <div className="text-xs font-hanken text-gray-600">
                                    {warning.description}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center">
                        <p className="text-sm font-hanken text-gray-400">
                            Tidak ada peringatan mendesak saat ini.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
