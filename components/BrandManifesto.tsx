'use client';
import { motion } from 'framer-motion';

export default function BrandManifesto() {
    return (
        <section className="min-h-[60vh] w-full bg-azure-black flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden">

            {/* Ambient Background Glow (Subtle Blue/Purple) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent opacity-40 pointer-events-none" />

            <div className="max-w-4xl mx-auto z-10">
                {/* Main Cinematic Headline */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-3xl md:text-5xl font-serif font-medium uppercase tracking-widest leading-tight mb-12 bg-gradient-to-r from-white via-blue-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(147,197,253,0.3)]"
                >
                    We are not here to adorn you.
                    <br />
                    <span className="bg-gradient-to-r from-purple-300 via-blue-200 to-white bg-clip-text text-transparent">We are here to ignite you.</span>
                </motion.h2>

                {/* Sub-Text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.8, ease: "linear" }}
                    className="text-blue-100/60 font-sans tracking-[0.3em] text-xs md:text-sm max-w-xl mx-auto uppercase leading-relaxed"
                >
                    We are the light that catches the diamond, the fire that wakes the ruby.
                    <br />
                    We are the untold story waiting against your skin.
                </motion.p>
            </div>

            {/* Decorative Line */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="w-24 h-[1px] bg-gradient-to-r from-transparent via-blue-300 to-transparent mt-20"
            />
        </section>
    );
}
