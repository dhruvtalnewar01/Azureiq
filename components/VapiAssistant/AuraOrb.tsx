'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVapiAssistant } from '@/hooks/useVapiAssistant';
import VoiceVisualizer from './VoiceVisualizer';

const AuraOrb: React.FC = () => {
    const {
        isConnected,
        isListening,
        isSpeaking,
        transcript,
        error,
        startCall,
        endCall
    } = useVapiAssistant();

    const [isExpanded, setIsExpanded] = useState(false);
    const [showTooltip, setShowTooltip] = useState(true);

    // Hide tooltip after first interaction
    useEffect(() => {
        if (isConnected) setShowTooltip(false);
    }, [isConnected]);

    // Auto-hide tooltip after 8 seconds
    useEffect(() => {
        const timer = setTimeout(() => setShowTooltip(false), 8000);
        return () => clearTimeout(timer);
    }, []);

    const handleOrbClick = () => {
        if (isConnected) {
            endCall();
            setIsExpanded(false);
        } else {
            startCall();
            setIsExpanded(true);
        }
    };

    const getStatusText = () => {
        if (error) return 'Connection issue';
        if (isSpeaking) return 'Aura is speaking...';
        if (isListening) return 'Listening to you...';
        if (isConnected) return 'Connected • Speak now';
        return 'Speak with Aura';
    };

    return (
        <>
            {/* Main Orb Button - Fixed Position */}
            <motion.div
                className="fixed bottom-8 right-8 z-50"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6, type: 'spring', stiffness: 200 }}
            >
                {/* Ambient Glow Effect */}
                <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    animate={{
                        boxShadow: isConnected
                            ? isSpeaking
                                ? [
                                    '0 0 30px rgba(212, 175, 55, 0.4), 0 0 60px rgba(212, 175, 55, 0.2), 0 0 90px rgba(212, 175, 55, 0.1)',
                                    '0 0 40px rgba(212, 175, 55, 0.5), 0 0 80px rgba(212, 175, 55, 0.3), 0 0 120px rgba(212, 175, 55, 0.15)',
                                    '0 0 30px rgba(212, 175, 55, 0.4), 0 0 60px rgba(212, 175, 55, 0.2), 0 0 90px rgba(212, 175, 55, 0.1)'
                                ]
                                : isListening
                                    ? [
                                        '0 0 25px rgba(100, 180, 255, 0.4), 0 0 50px rgba(100, 180, 255, 0.2)',
                                        '0 0 35px rgba(100, 180, 255, 0.5), 0 0 70px rgba(100, 180, 255, 0.25)',
                                        '0 0 25px rgba(100, 180, 255, 0.4), 0 0 50px rgba(100, 180, 255, 0.2)'
                                    ]
                                    : '0 0 20px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.15)'
                            : '0 0 15px rgba(212, 175, 55, 0.2), 0 0 30px rgba(212, 175, 55, 0.1)'
                    }}
                    transition={{ duration: isSpeaking ? 0.4 : 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ width: '100%', height: '100%' }}
                />

                {/* Tooltip */}
                <AnimatePresence>
                    {showTooltip && !isConnected && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                            transition={{ type: 'spring', damping: 20 }}
                            className="absolute right-full mr-5 top-1/2 -translate-y-1/2 whitespace-nowrap"
                        >
                            <div className="relative bg-gradient-to-br from-azure-charcoal/98 to-black/95 backdrop-blur-xl border border-azure-gold/30 rounded-xl px-5 py-3 shadow-2xl">
                                {/* Decorative corner accent */}
                                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-azure-gold/40 rounded-tl-xl" />
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-azure-gold/40 rounded-br-xl" />

                                <p className="text-sm text-white/95 font-light tracking-wide">
                                    <span className="text-azure-gold font-medium">Namaste</span>
                                    <span className="mx-2 text-azure-gold/40">•</span>
                                    <span className="text-white/70">Click to speak with</span>
                                    <span className="text-azure-gold ml-1 font-medium">Aura</span>
                                </p>
                            </div>
                            {/* Arrow */}
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                                <div className="w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-azure-charcoal/95" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Orb Container - LARGER SIZE */}
                <motion.button
                    onClick={handleOrbClick}
                    className="relative w-24 h-24 rounded-full overflow-visible cursor-pointer group"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={isConnected ? 'End call with Aura' : 'Start call with Aura'}
                >
                    {/* Outer Ring */}
                    <motion.div
                        className="absolute -inset-1 rounded-full border-2 border-azure-gold/20"
                        animate={{
                            borderColor: isConnected
                                ? ['rgba(212, 175, 55, 0.3)', 'rgba(212, 175, 55, 0.5)', 'rgba(212, 175, 55, 0.3)']
                                : 'rgba(212, 175, 55, 0.2)',
                            rotate: isConnected ? 360 : 0
                        }}
                        transition={{
                            borderColor: { duration: 2, repeat: Infinity },
                            rotate: { duration: 20, repeat: Infinity, ease: 'linear' }
                        }}
                    />

                    {/* Secondary Ring with Dashes */}
                    <motion.div
                        className="absolute -inset-3 rounded-full border border-dashed border-azure-gold/10"
                        animate={{ rotate: isConnected ? -360 : 0 }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Main Visualizer Container */}
                    <div className="absolute inset-0 rounded-full overflow-hidden bg-gradient-to-br from-azure-charcoal/90 to-black/95">
                        <VoiceVisualizer
                            isActive={isConnected}
                            isSpeaking={isSpeaking}
                            isListening={isListening}
                        />
                    </div>

                    {/* Glass Overlay */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none"
                        style={{ clipPath: 'ellipse(100% 50% at 50% 0%)' }} />

                    {/* Center Icon */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center z-10"
                        animate={{
                            scale: isSpeaking ? [1, 1.15, 1] : isListening ? [1, 1.08, 1] : 1
                        }}
                        transition={{
                            repeat: isSpeaking || isListening ? Infinity : 0,
                            duration: isSpeaking ? 0.4 : 0.8
                        }}
                    >
                        {isConnected ? (
                            <div className="relative">
                                <PhoneIcon className="w-8 h-8 text-azure-gold drop-shadow-lg" />
                                {/* Pulse rings when active */}
                                {(isSpeaking || isListening) && (
                                    <>
                                        <motion.div
                                            className="absolute inset-0 -m-2 rounded-full border border-azure-gold/40"
                                            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        />
                                        <motion.div
                                            className="absolute inset-0 -m-2 rounded-full border border-azure-gold/30"
                                            animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                                            transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                                        />
                                    </>
                                )}
                            </div>
                        ) : (
                            <MicrophoneIcon className="w-8 h-8 text-azure-gold drop-shadow-lg group-hover:text-azure-gold/90 transition-colors" />
                        )}
                    </motion.div>

                    {/* Status Indicator Dot */}
                    <motion.div
                        className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-black/50 ${isConnected
                                ? isSpeaking
                                    ? 'bg-azure-gold'
                                    : isListening
                                        ? 'bg-blue-400'
                                        : 'bg-green-400'
                                : 'bg-white/40'
                            }`}
                        animate={isConnected ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </motion.button>
            </motion.div>

            {/* Expanded Panel - Professional Design */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.9 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-36 right-8 z-50 w-96"
                    >
                        {/* Main Card */}
                        <div className="relative bg-gradient-to-br from-[#1a1a1a]/98 via-[#0d0d0d]/98 to-black/98 backdrop-blur-2xl border border-azure-gold/20 rounded-2xl shadow-2xl overflow-hidden">
                            {/* Top Accent Line */}
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-azure-gold/50 to-transparent" />

                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-azure-gold/30 rounded-tl-2xl" />
                            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-azure-gold/30 rounded-br-2xl" />

                            {/* Header */}
                            <div className="relative p-5 border-b border-white/5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        {/* Avatar */}
                                        <motion.div
                                            className="relative w-14 h-14 rounded-full bg-gradient-to-br from-azure-gold via-amber-500 to-amber-700 flex items-center justify-center shadow-lg"
                                            animate={isSpeaking ? {
                                                boxShadow: ['0 0 20px rgba(212, 175, 55, 0.4)', '0 0 40px rgba(212, 175, 55, 0.6)', '0 0 20px rgba(212, 175, 55, 0.4)']
                                            } : {}}
                                            transition={{ duration: 0.5, repeat: Infinity }}
                                        >
                                            <span className="text-xl font-serif font-semibold text-black">A</span>
                                            {/* Online indicator */}
                                            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-black" />
                                        </motion.div>

                                        {/* Info */}
                                        <div>
                                            <h3 className="text-white font-medium tracking-wide text-lg">AURA</h3>
                                            <p className="text-xs text-azure-gold/70 uppercase tracking-[0.2em] font-light">AZURÉIQ Concierge</p>
                                        </div>
                                    </div>

                                    {/* Close Button */}
                                    <button
                                        onClick={() => {
                                            endCall();
                                            setIsExpanded(false);
                                        }}
                                        className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:border-azure-gold/30 group"
                                        aria-label="Close panel"
                                    >
                                        <CloseIcon className="w-5 h-5 text-white/50 group-hover:text-white/80 transition-colors" />
                                    </button>
                                </div>
                            </div>

                            {/* Status Bar */}
                            <div className="px-5 py-3 bg-gradient-to-r from-azure-gold/5 to-transparent border-b border-white/5">
                                <div className="flex items-center gap-3">
                                    {/* Animated Status Dot */}
                                    <div className="relative">
                                        <div className={`w-3 h-3 rounded-full ${isSpeaking
                                                ? 'bg-azure-gold'
                                                : isListening
                                                    ? 'bg-blue-400'
                                                    : isConnected
                                                        ? 'bg-green-400'
                                                        : 'bg-white/30'
                                            }`} />
                                        {(isSpeaking || isListening) && (
                                            <motion.div
                                                className={`absolute inset-0 rounded-full ${isSpeaking ? 'bg-azure-gold' : 'bg-blue-400'}`}
                                                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                                                transition={{ duration: 1, repeat: Infinity }}
                                            />
                                        )}
                                    </div>

                                    <span className={`text-sm font-light tracking-wide ${isSpeaking ? 'text-azure-gold' : isListening ? 'text-blue-300' : 'text-white/70'
                                        }`}>
                                        {getStatusText()}
                                    </span>
                                </div>
                            </div>

                            {/* Transcript Area */}
                            <div className="p-5 min-h-[100px] max-h-[180px] overflow-y-auto">
                                {transcript ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 border border-white/5"
                                    >
                                        <p className="text-white/90 text-sm leading-relaxed font-light">
                                            {transcript}
                                        </p>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-center py-4">
                                        <motion.div
                                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <WaveformIcon className="w-12 h-12 text-azure-gold/30 mb-3" />
                                        </motion.div>
                                        <p className="text-white/40 text-sm font-light">
                                            {isListening ? 'Listening...' : 'Waiting for conversation...'}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Error Message */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="px-5 pb-4"
                                    >
                                        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-3 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                                                <span className="text-red-400 text-sm">!</span>
                                            </div>
                                            <p className="text-red-300/90 text-xs font-light">{error}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Footer */}
                            <div className="px-5 py-4 bg-gradient-to-t from-black/50 to-transparent border-t border-white/5">
                                <p className="text-center text-[11px] text-white/30 uppercase tracking-[0.15em] font-light">
                                    Say <span className="text-azure-gold/60">&ldquo;goodbye&rdquo;</span> to end the call
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

// Icons
const MicrophoneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
    </svg>
);

const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const WaveformIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 12h2v4H3v-4zm4-6h2v16H7V6zm4 3h2v10h-2V9zm4-3h2v16h-2V6zm4 6h2v4h-2v-4z" />
    </svg>
);

export default AuraOrb;
