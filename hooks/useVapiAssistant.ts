'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Vapi from '@vapi-ai/web';

interface VapiState {
    isConnected: boolean;
    isListening: boolean;
    isSpeaking: boolean;
    transcript: string;
    error: string | null;
}

interface VapiMessage {
    type: string;
    transcript?: string;
    role?: string;
}

interface VapiError {
    message?: string;
}

const VAPI_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || '';
const ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || '077243aa-77e8-40bc-ac95-3d241f589c55';

export const useVapiAssistant = () => {
    const vapiRef = useRef<Vapi | null>(null);
    const [state, setState] = useState<VapiState>({
        isConnected: false,
        isListening: false,
        isSpeaking: false,
        transcript: '',
        error: null,
    });

    useEffect(() => {
        if (!VAPI_PUBLIC_KEY) {
            setState(prev => ({ ...prev, error: 'VAPI Public Key not configured' }));
            return;
        }

        // Initialize VAPI
        vapiRef.current = new Vapi(VAPI_PUBLIC_KEY);
        const vapi = vapiRef.current;

        // Event Listeners
        vapi.on('call-start', () => {
            setState(prev => ({ ...prev, isConnected: true, error: null }));
        });

        vapi.on('call-end', () => {
            setState(prev => ({
                ...prev,
                isConnected: false,
                isListening: false,
                isSpeaking: false
            }));
        });

        vapi.on('speech-start', () => {
            setState(prev => ({ ...prev, isSpeaking: true, isListening: false }));
        });

        vapi.on('speech-end', () => {
            setState(prev => ({ ...prev, isSpeaking: false }));
        });

        vapi.on('message', (message: VapiMessage) => {
            if (message.type === 'transcript') {
                setState(prev => ({
                    ...prev,
                    transcript: message.transcript || '',
                    isListening: message.role === 'user',
                    isSpeaking: message.role === 'assistant'
                }));
            }
        });

        vapi.on('error', (error: VapiError) => {
            console.error('VAPI Error:', error);
            if (error && error.message) {
                setState(prev => ({ ...prev, error: error.message || 'Connection error' }));
            }
        });

        return () => {
            vapiRef.current?.stop();
        };
    }, []);

    const startCall = useCallback(async () => {
        if (!vapiRef.current) return;

        try {
            setState(prev => ({ ...prev, error: null }));
            await vapiRef.current.start(ASSISTANT_ID);
        } catch (error) {
            console.error('Failed to start call:', error);
            setState(prev => ({
                ...prev,
                error: error instanceof Error ? error.message : 'Failed to start call'
            }));
        }
    }, []);

    const endCall = useCallback(() => {
        vapiRef.current?.stop();
    }, []);

    const toggleMute = useCallback(() => {
        if (!vapiRef.current) return false;
        try {
            const isMuted = vapiRef.current.isMuted();
            vapiRef.current.setMuted(!isMuted);
            return !isMuted;
        } catch {
            return false;
        }
    }, []);

    return {
        ...state,
        startCall,
        endCall,
        toggleMute,
    };
};
