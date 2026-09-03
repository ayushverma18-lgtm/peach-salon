import React, { useEffect, useRef } from 'react';

// Web Audio API ambient crystal chime synthesizer for a subtle luxury salon atmosphere
export default function useAmbientAudio(isMuted) {
  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isMuted) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const playChime = () => {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContext();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6
        const note = notes[Math.floor(Math.random() * notes.length)];

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.0);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 3.0);
      } catch (err) {
        // audio context autoplay restriction catch
      }
    };

    // Play random soft chime every 8-12 seconds
    timerRef.current = setInterval(() => {
      playChime();
    }, 9000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isMuted]);
}
