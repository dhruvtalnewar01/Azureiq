'use client';

import React, { useEffect, useRef } from 'react';

interface VoiceVisualizerProps {
    isActive: boolean;
    isSpeaking: boolean;
    isListening: boolean;
}

const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({
    isActive,
    isSpeaking,
    isListening
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);
    const phaseRef = useRef(0);
    const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; life: number; maxLife: number }>>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        // Guard against zero dimensions
        if (rect.width <= 0 || rect.height <= 0) return;

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const maxRadius = Math.max(1, Math.min(rect.width, rect.height) / 2 - 4);

        // Initialize particles
        const createParticle = () => {
            const angle = Math.random() * Math.PI * 2;
            const distance = maxRadius * 0.5 + Math.random() * maxRadius * 0.3;
            return {
                x: centerX + Math.cos(angle) * distance,
                y: centerY + Math.sin(angle) * distance,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                life: 0,
                maxLife: 60 + Math.random() * 60
            };
        };

        const animate = () => {
            ctx.clearRect(0, 0, rect.width, rect.height);
            phaseRef.current += isActive ? 0.04 : 0.015;

            // Background gradient orb
            const bgGradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, maxRadius
            );
            bgGradient.addColorStop(0, 'rgba(30, 25, 15, 0.6)');
            bgGradient.addColorStop(0.5, 'rgba(20, 15, 10, 0.4)');
            bgGradient.addColorStop(1, 'rgba(10, 8, 5, 0.2)');

            ctx.beginPath();
            ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2);
            ctx.fillStyle = bgGradient;
            ctx.fill();

            // Outer ethereal glow
            const glowIntensity = isActive ? (isSpeaking ? 0.4 : 0.25) : 0.12;
            const glowGradient = ctx.createRadialGradient(
                centerX, centerY, maxRadius * 0.7,
                centerX, centerY, maxRadius * 1.1
            );
            glowGradient.addColorStop(0, 'rgba(212, 175, 55, 0)');
            glowGradient.addColorStop(0.4, `rgba(212, 175, 55, ${glowIntensity * 0.5})`);
            glowGradient.addColorStop(0.7, `rgba(212, 175, 55, ${glowIntensity * 0.3})`);
            glowGradient.addColorStop(1, 'rgba(212, 175, 55, 0)');

            ctx.beginPath();
            ctx.arc(centerX, centerY, maxRadius * 1.1, 0, Math.PI * 2);
            ctx.fillStyle = glowGradient;
            ctx.fill();

            // Main orb with dynamic color
            const pulseIntensity = isActive ? 0.12 : 0.04;
            const pulseSpeed = isSpeaking ? 10 : (isListening ? 5 : 2);
            const baseRadius = maxRadius * 0.72;
            const pulse = Math.sin(phaseRef.current * pulseSpeed) * (baseRadius * pulseIntensity);
            const currentRadius = baseRadius + pulse;

            // Determine colors based on state
            let primaryColor = { r: 212, g: 175, b: 55 }; // Gold
            let secondaryColor = { r: 139, g: 90, b: 43 }; // Dark gold

            if (isListening) {
                primaryColor = { r: 100, g: 180, b: 255 }; // Blue
                secondaryColor = { r: 60, g: 120, b: 200 };
            }

            const orbGradient = ctx.createRadialGradient(
                centerX - maxRadius * 0.25, centerY - maxRadius * 0.25, 0,
                centerX, centerY, currentRadius
            );

            const alpha = isActive ? 0.9 : 0.7;
            orbGradient.addColorStop(0, `rgba(${primaryColor.r}, ${primaryColor.g}, ${primaryColor.b}, ${alpha})`);
            orbGradient.addColorStop(0.4, `rgba(${primaryColor.r}, ${primaryColor.g}, ${primaryColor.b}, ${alpha * 0.7})`);
            orbGradient.addColorStop(0.7, `rgba(${secondaryColor.r}, ${secondaryColor.g}, ${secondaryColor.b}, ${alpha * 0.5})`);
            orbGradient.addColorStop(1, `rgba(${secondaryColor.r * 0.5}, ${secondaryColor.g * 0.5}, ${secondaryColor.b * 0.5}, ${alpha * 0.3})`);

            ctx.beginPath();
            ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
            ctx.fillStyle = orbGradient;
            ctx.fill();

            // Inner luminous core
            const coreGradient = ctx.createRadialGradient(
                centerX - maxRadius * 0.12, centerY - maxRadius * 0.12, 0,
                centerX, centerY, maxRadius * 0.35
            );
            coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
            coreGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.2)');
            coreGradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.05)');
            coreGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.beginPath();
            ctx.arc(centerX, centerY, maxRadius * 0.35, 0, Math.PI * 2);
            ctx.fillStyle = coreGradient;
            ctx.fill();

            // Active state: Wave rings and particles
            if (isActive && (isSpeaking || isListening)) {
                // Spawn particles
                if (Math.random() < (isSpeaking ? 0.4 : 0.2)) {
                    particlesRef.current.push(createParticle());
                }

                // Limit particles
                if (particlesRef.current.length > 30) {
                    particlesRef.current = particlesRef.current.slice(-30);
                }

                // Update and draw particles
                particlesRef.current = particlesRef.current.filter(p => {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.life++;

                    const lifeRatio = p.life / p.maxLife;
                    const alpha = Math.sin(lifeRatio * Math.PI) * 0.6;
                    const size = 1.5 + (1 - lifeRatio) * 2;

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${primaryColor.r}, ${primaryColor.g}, ${primaryColor.b}, ${alpha})`;
                    ctx.fill();

                    return p.life < p.maxLife;
                });

                // Dynamic wave rings
                const waveCount = isSpeaking ? 4 : 2;
                for (let w = 0; w < waveCount; w++) {
                    const wavePhase = phaseRef.current * (isSpeaking ? 6 : 3) + w * 0.8;
                    const waveRadius = currentRadius * (1.05 + w * 0.12);
                    const waveAlpha = (0.35 - w * 0.08) * (isSpeaking ? 1 : 0.6);

                    ctx.beginPath();
                    for (let i = 0; i <= 360; i += 3) {
                        const angle = (i * Math.PI) / 180;
                        const amplitude = (isSpeaking ? 6 : 3) * (1 - w * 0.2);
                        const noise = Math.sin(i * 0.15 + wavePhase + w * 0.5) * amplitude;
                        const secondaryNoise = Math.sin(i * 0.08 + wavePhase * 0.5) * amplitude * 0.5;
                        const r = waveRadius + noise + secondaryNoise;
                        const x = centerX + Math.cos(angle) * r;
                        const y = centerY + Math.sin(angle) * r;

                        if (i === 0) {
                            ctx.moveTo(x, y);
                        } else {
                            ctx.lineTo(x, y);
                        }
                    }
                    ctx.closePath();
                    ctx.strokeStyle = `rgba(${primaryColor.r}, ${primaryColor.g}, ${primaryColor.b}, ${waveAlpha})`;
                    ctx.lineWidth = 1.5 - w * 0.2;
                    ctx.stroke();
                }
            } else {
                // Clear particles when inactive
                particlesRef.current = [];
            }

            // Top highlight arc (glass effect)
            ctx.beginPath();
            ctx.arc(centerX, centerY - maxRadius * 0.15, maxRadius * 0.55, Math.PI * 1.15, Math.PI * 1.85);
            const highlightGradient = ctx.createLinearGradient(
                centerX - maxRadius * 0.4, centerY - maxRadius * 0.5,
                centerX + maxRadius * 0.4, centerY - maxRadius * 0.2
            );
            highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
            highlightGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
            highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.strokeStyle = highlightGradient;
            ctx.lineWidth = 2;
            ctx.stroke();

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationRef.current);
        };
    }, [isActive, isSpeaking, isListening]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default VoiceVisualizer;
