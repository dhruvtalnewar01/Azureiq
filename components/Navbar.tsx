'use client';
import { motion } from 'framer-motion';
import React from 'react';

export default function Navbar() {
    return (
        <nav className="absolute top-0 w-full z-50 flex justify-center items-center py-4 text-white bg-transparent mix-blend-difference">
            {/* Navigation Links - Minimal */}
            <div className="absolute left-10 hidden md:flex gap-8 text-xs tracking-[0.2em] font-medium">
                <a href="#" className="hover:text-azure-gold transition-colors flex items-center gap-2 group">
                    HIGH JEWELRY
                    <span className="w-1 h-1 bg-azure-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#" className="hover:text-azure-gold transition-colors flex items-center gap-2 group">
                    COLLECTIONS
                    <span className="w-1 h-1 bg-azure-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
            </div>

            {/* CENTERED LOGO - Motion Animation */}
            <div className="relative group cursor-pointer w-96 h-32 flex justify-center items-center">
                <h1 className="text-4xl font-serif tracking-widest text-center relative z-10 mix-blend-overlay opacity-90">
                    AZURÉIQ
                </h1>

                {/* Panther Cub Reveal Overlay */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 z-20 pointer-events-none mix-blend-screen"
                >
                    <video
                        autoPlay loop muted playsInline
                        className="w-full h-full object-cover opacity-80 grayscale contrast-125"
                    >
                        <source src="/videos/panther-cub-reveal.webm" type="video/webm" />
                    </video>
                </motion.div>
            </div>

            {/* Right Icons */}
            <div className="absolute right-10 flex gap-6">
                {/* Icons for User, Heart, Bag (No Search Bar) */}
                <span className="text-sm tracking-widest cursor-pointer hover:text-azure-gold">ACCOUNT</span>
                <span className="text-sm tracking-widest cursor-pointer hover:text-azure-gold">BAG</span>
            </div>
        </nav>
    );
}
