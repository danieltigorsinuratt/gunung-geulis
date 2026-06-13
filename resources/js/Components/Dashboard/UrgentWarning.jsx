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
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <svg className="w-4 h-5 text-[#BA1A1A]" viewBox="0 0 16 20" fill="none">
                    <path d="M8 1L1 18H15L8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M8 8V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="8" cy="15" r="0.75" fill="currentColor" />
                </svg>
                <h2 className="text-xl font-hanken font-semibold text-primary-900">
                    Peringatan Urgent
                </h2>
            </div>
            <div className="flex flex-col gap-3">
                {warnings.length === 0 ? (
                    <div className="bg-white p-4 shadow-sm rounded-xl border border-surface-border text-center text-xs font-hanken text-gray-500">
                        Tidak ada peringatan mendesak saat ini.
                    </div>
                ) : (
                    warnings.map((warning) => (
                        <div
                            key={warning.id}
                            className={`bg-white p-4 shadow-sm rounded-r-xl border-l-4 ${borderColor[warning.color] || borderColor.red} flex flex-col gap-1`}
                        >
                            <div className="flex items-start justify-between">
                                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${badgeColor[warning.color] || badgeColor.red}`}>
                                    {warning.badge}
                                </span>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                                        <path d="M1 11L11 1M1 1L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>
                            <div className="text-sm font-hanken font-bold text-primary-900">
                                {warning.title}
                            </div>
                            <div className="text-xs font-hanken text-gray-600">
                                {warning.description}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
