'use client';

const tiers = [
    {
        title: "COLLECTOR",
        desc: "Access to seasonal releases and digital previews.",
        price: "ENTRY LEVEL"
    },
    {
        title: "CONNOISSEUR",
        desc: "Private store invitations and bespoke customization.",
        price: "BY APPLICATION"
    },
    {
        title: "LEGACY",
        desc: "Vault access, family heirloom restructuring, and global concierge.",
        price: "INVITATION ONLY"
    }
];

export default function InvestmentTiers() {
    return (
        <section className="py-20 w-full bg-azure-burgundy text-white border-t border-azure-rose/10 relative overflow-hidden">
            {/* Cool ambient glow (Rose) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-azure-rose/5 blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <h2 className="text-2xl md:text-3xl font-serif text-center mb-16 tracking-widest text-azure-platinum drop-shadow-md">
                    PRIVATE STORE ACCESS
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tiers.map((tier, index) => (
                        <div key={index} className="group p-8 py-12 flex flex-col items-center text-center relative overflow-hidden transition-all duration-700 hover:-translate-y-1 cursor-pointer bg-azure-charcoal/30 border border-azure-platinum/10 hover:border-azure-rose/30 shadow-none hover:shadow-[0_0_30px_rgba(235,201,211,0.2)]">

                            {/* Metallic Sheen Sweep Hover Effect (Platinum/Rose) */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-azure-rose/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />

                            <h3 className="relative z-10 text-xl font-serif mb-3 tracking-[0.2em] text-azure-platinum group-hover:text-white transition-colors">{tier.title}</h3>
                            <p className="relative z-10 text-xs text-gray-400 font-sans max-w-xs leading-relaxed mb-8 min-h-[32px] group-hover:text-white transition-colors">
                                {tier.desc}
                            </p>
                            <span className="relative z-10 text-[10px] tracking-widest text-azure-rose border border-azure-rose/20 px-5 py-1.5 rounded-full group-hover:bg-azure-rose group-hover:text-azure-burgundy transition-all duration-500">
                                {tier.price}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
