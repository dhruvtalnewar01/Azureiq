'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

const products = [
    {
        id: 1,
        video: '/videos/emerald-necklace.mp4',
        title: "THE EMERALD HERITAGE",
        desc: "Timeless green hues meets royal gold architecture.",
        align: 'left'
    },
    {
        id: 2,
        video: '/videos/diamond-earrings.mp4',
        title: "CELESTIAL DROPS",
        desc: "Precision cut diamonds that capture the starlight.",
        align: 'right'
    },
    {
        id: 3,
        video: '/videos/ruby-necklace.mp4',
        title: "CRIMSON MAJESTY",
        desc: "A passionate embrace of rubies and woven gold.",
        align: 'center'
    }
];

interface ProductItem {
    id: number;
    video: string;
    title: string;
    desc: string;
    align: string;
}

const ProductSection = ({ item }: { item: ProductItem }) => {
    const containerRef = useRef(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const isInView = useInView(containerRef, { margin: "-20% 0px -20% 0px" });



    return (
        <div ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden border-b border-white/5">
            <video
                ref={videoRef}
                autoPlay loop muted playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src={item.video} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/20" />

            <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className={`relative z-10 p-12 max-w-2xl text-center ${item.align === 'left' ? 'mr-auto ml-20 text-left' :
                    item.align === 'right' ? 'ml-auto mr-20 text-right' : 'mx-auto'
                    }`}
            >
                <h3
                    className="text-5xl font-serif text-azure-gold mb-4 drop-shadow-2xl"
                    style={{ textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}
                >
                    {item.title}
                </h3>
                <p
                    className="text-xl font-sans text-gray-100 mb-8 font-light leading-relaxed drop-shadow-xl"
                    style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
                >
                    {item.desc}
                </p>
                <button className="luxury-hover text-sm tracking-[0.3em] text-white border-b border-white/50 pb-2 hover:border-azure-gold hover:text-azure-gold transition-colors">
                    EXPLORE COLLECTION
                </button>
            </motion.div>
        </div>
    )
}

export default function ProductSequence() {
    return (
        <div className="w-full bg-azure-black">
            {products.map((p) => <ProductSection key={p.id} item={p} />)}
        </div>
    );
}
