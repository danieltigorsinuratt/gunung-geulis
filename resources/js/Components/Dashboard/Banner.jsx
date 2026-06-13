export default function Banner() {
    return (
        <div className="relative h-[240px] rounded-2xl overflow-hidden shadow-lg">
            {/* Background image */}
            <img
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1460&h=240&fit=crop"
                alt="Gunung Geulis Farm"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-transparent" />

            {/* Content */}
            <div className="relative h-full flex items-center px-10 max-w-[448px]">
                <div className="flex flex-col gap-2.5">
                    <span className="inline-flex self-start px-3 py-0.5 bg-accent-light rounded-full text-[10px] font-mono font-medium text-primary-900 tracking-wider">
                        Gunung Geulis farm
                    </span>
                    <h3 className="text-2xl font-hanken font-semibold text-white leading-7">
                        Hewan Qurban Berkualitas - Aman, Sehat, Utuh, dan Halal (ASUH).
                    </h3>
                    <p className="text-sm font-hanken text-white/90 leading-5">
                        Sistem persuratan terpadu membantu kita menjaga kepatuhan legalitas dan efisiensi operasional setiap hari.
                    </p>
                </div>
            </div>
        </div>
    );
}
