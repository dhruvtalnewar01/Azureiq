'use client';
import { motion } from 'framer-motion';

const stones = [
    { name: 'SAPPHIRE', height: 40, delay: 0 },
    { name: 'RUBY', height: 60, delay: 0.2 },
    { name: 'EMERALD', height: 50, delay: 0.4 },
    { name: 'DIAMOND', height: 80, delay: 0.6 },
    { name: 'AZURÉIQ', height: 100, delay: 0.8 },
];

export default function GemstoneRarityGraph() {
    return (
        <section className="min-h-[80vh] w-full bg-azure-black relative flex flex-col items-center justify-center py-20 overflow-hidden">

            {/* Background Elements - Warm Gold Tone (Adjusted for Rose) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-azure-rose/10 via-transparent to-transparent opacity-30" />

            <div className="relative z-10 text-center mb-12 text-azure-platinum">
                <h2 className="text-3xl md:text-5xl font-serif mb-4 tracking-widest shadow-glow drop-shadow-lg">THE RARITY INDEX</h2>
                <p className="text-white/80 font-sans tracking-widest text-xs">SCARCITY DEFINES VALUE</p>
            </div>

            {/* The Graph - Floating Numbers Only */}
            <div className="flex items-end gap-8 md:gap-16 h-80 px-10 max-w-5xl mx-auto w-full justify-center">
                {stones.map((stone) => (
                    <div key={stone.name} className="flex flex-col items-center gap-4 group cursor-pointer w-12 h-full justify-end relative">
                        {/* Floating Counter Number - Animates from bottom to correct height */}
                        <motion.div
                            initial={{ bottom: "0%", opacity: 0 }}
                            whileInView={{ bottom: `${stone.height}%`, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: stone.delay, ease: "easeOut" }}
                            className="absolute flex flex-col items-center"
                        >
                            <span className="text-azure-platinum font-serif text-xl md:text-2xl tracking-widest block drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                                {stone.height}%
                            </span>
                            {/* Subtle glowing dot indicator */}
                            <div className="w-1 h-1 bg-azure-rose rounded-full mt-2 shadow-[0_0_10px_#EBC9D3]" />
                        </motion.div>

                        {/* Label - Fixed at bottom */}
                        <span className="text-[10px] md:text-xs tracking-[0.3em] text-white/50 group-hover:text-azure-platinum transition-colors duration-500 font-medium rotate-0 md:rotate-0 mt-4 absolute -bottom-8">
                            {stone.name}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
