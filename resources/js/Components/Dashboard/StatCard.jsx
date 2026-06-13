export default function StatCard({ icon, value, label, badge, variant = 'default' }) {
    const bgClass = variant === 'danger'
        ? 'bg-[#FFDAD6] border-[rgba(186,26,26,0.2)]'
        : 'bg-surface border-surface-border';

    const valueClass = variant === 'danger' ? 'text-[#BA1A1A]' : 'text-primary-900';
    const labelClass = variant === 'danger' ? 'text-[#93000A]' : 'text-gray-600';

    return (
        <div className={`rounded-xl border p-6 flex flex-col justify-between ${bgClass}`}>
            <div className="flex items-start justify-between">
                <span className={`${valueClass}`}>{icon}</span>
                {badge && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-mono font-normal bg-accent text-primary-600">
                        {badge}
                    </span>
                )}
                {variant === 'danger' && (
                    <span className="text-[#BA1A1A] font-bold text-lg leading-none">!</span>
                )}
            </div>
            <div className="mt-4">
                <div className={`text-[40px] font-hanken font-bold leading-12 ${valueClass}`}>
                    {value}
                </div>
                <div className={`text-xs font-mono font-medium uppercase tracking-wider mt-1 ${labelClass}`}>
                    {label}
                </div>
            </div>
        </div>
    );
}
