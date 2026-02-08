'use client';

export default function Footer() {
    return (
        <footer className="relative bg-azure-black text-white min-h-screen flex flex-col justify-between p-10 md:p-20 overflow-hidden">

            {/* Tiger Cub Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/tiger-cub-footer.jpg"
                    alt="Luxury Tiger Cub Background"
                    className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                />

                {/* Dark Gradient Overlay for Readability - REDUCED OPACITY */}
                <div className="absolute inset-0 bg-gradient-to-t from-azure-black via-azure-black/30 to-transparent" />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Big Background Text - Lower Opacity */}
            <div className="absolute top-0 left-0 w-full text-[15vw] font-bold text-white/[0.02] leading-none select-none pointer-events-none mix-blend-overlay">
                AZURÉIQ
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10 mt-20">
                <div>
                    <h2 className="text-4xl md:text-5xl font-sans font-light mb-10 tracking-tighter opacity-90">
                        Book your slot<br />
                        <span className="text-gray-500">with total privacy.</span>
                    </h2>
                </div>

                <div className="flex flex-col gap-6 items-start md:items-end text-right">
                    <div className="group">
                        <p className="text-[10px] tracking-[0.2em] text-gray-500 mb-2">FOR INQUIRIES</p>
                        <a href="mailto:dtalnewar@gmail.com" className="text-sm md:text-base font-serif hover:text-azure-gold transition-colors block luxury-hover tracking-widest text-gray-300">
                            DTALNEWAR@GMAIL.COM
                        </a>
                        <a href="tel:+919860486657" className="text-sm md:text-base font-serif text-gray-500 hover:text-white transition-colors block mt-1 luxury-hover tracking-widest">
                            +91 98604 86657
                        </a>
                    </div>

                    <button className="luxury-hover mt-8 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full px-8 py-3 text-xs tracking-[0.2em] flex items-center gap-2 hover:bg-white hover:text-black transition-all">
                        BOOK APPOINTMENT <span className="text-sm">↗</span>
                    </button>
                </div>
            </div>

            <div className="w-full border-t border-white/10 mt-20 pt-10 flex justify-between text-xs text-gray-500 tracking-widest relative">
                <span>©2026 AZURÉIQ. ALL RIGHTS RESERVED</span>

                {/* Absolute Centered Copyright */}
                <span className="absolute left-1/2 -translate-x-1/2 top-10 text-[10px] text-gray-600 font-serif tracking-widest uppercase opacity-80">
                    est. 2026 Azureiq@dhruv.services
                </span>

                <div className="flex gap-6">
                    <span className="hover:text-white cursor-pointer">PRIVACY POLICY</span>
                    <span className="hover:text-white cursor-pointer">MADE BY THE FIRST THE LAST</span>
                </div>
            </div>
        </footer>
    );
}
