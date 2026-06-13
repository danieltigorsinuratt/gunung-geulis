const iconBg = {
    green: 'bg-primary-700',
    blue: 'bg-[#1D4ED8]',
    lightgreen: 'bg-accent',
};

const iconColor = {
    green: 'text-white',
    blue: 'text-white',
    lightgreen: 'text-primary-700',
};

function UploadIcon() {
    return (
        <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
            <path d="M5 0L0 5H3V12H7V5H10L5 0Z" />
        </svg>
    );
}

function EditIcon() {
    return (
        <svg width="11" height="11" viewBox="0 0 11 11" fill="currentColor">
            <path d="M10 1.5L9.5 0.5L8.5 1.5L9.5 2.5L10 1.5ZM0 9.5V11H1.5L8.5 4L7 2.5L0 9.5ZM10 3.5L7.5 1L6 2.5L8.5 5L10 3.5Z" />
        </svg>
    );
}

function MailIcon() {
    return (
        <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor">
            <path d="M0 0H12V8H0V0ZM1 2L6 6L11 2V8H1V2Z" />
        </svg>
    );
}

const iconMap = {
    upload: UploadIcon,
    edit: EditIcon,
    mail: MailIcon,
};

export default function ActivityFeed({ activities }) {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-hanken font-semibold text-primary-900">
                Aktivitas Terbaru
            </h2>
            <div className="bg-white rounded-xl border border-surface-border p-5">
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-surface" />

                    <div className="flex flex-col gap-6">
                        {activities.length === 0 ? (
                            <div className="text-center text-xs font-hanken text-gray-500 py-4">
                                Belum ada aktivitas hari ini.
                            </div>
                        ) : (
                            activities.map((activity) => {
                                const IconComponent = iconMap[activity.icon] || UploadIcon;
                                return (
                                    <div key={activity.id} className="relative pl-8">
                                        {/* Icon dot */}
                                        <div className={`absolute left-0 top-1 w-6 h-6 rounded-full ${iconBg[activity.color] || iconBg.green} flex items-center justify-center ring-4 ring-white`}>
                                            <span className={iconColor[activity.color] || iconColor.green}>
                                                <IconComponent />
                                            </span>
                                        </div>

                                        <div className="flex flex-col gap-0.5">
                                            <div className="text-sm font-hanken font-bold text-primary-900">
                                                {activity.title}
                                            </div>
                                            <div className="text-xs font-hanken text-gray-600">
                                                {activity.description}
                                            </div>
                                            <div className="text-[10px] font-mono text-gray-400">
                                                {activity.time}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
