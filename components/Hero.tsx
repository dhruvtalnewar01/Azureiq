'use client';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            <video
                autoPlay loop muted playsInline
                className="absolute top-0 left-0 w-full h-full object-cover opacity-90"
            >
                <source src="/videos/hero-ring.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" /> {/* Subtle texture */}

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                className="relative z-10 flex flex-col items-center justify-end h-full pb-32 text-center"
            >
                <h2 className="text-5xl md:text-7xl font-serif text-white mb-4 tracking-wider">
                    ETERNAL BRILLIANCE
                </h2>
                <button className="luxury-hover px-10 py-3 border border-white/30 backdrop-blur-sm text-sm tracking-[0.3em] uppercase bg-black/20 text-white">
                    Discover the Collection
                </button>
            </motion.div>
        </section>
    );
}
