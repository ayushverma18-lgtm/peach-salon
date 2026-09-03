import React, { useRef, useState } from 'react';
import { Play, Pause, Film, Sparkles } from 'lucide-react';

export default function VideoPlayer({ videoUrl, posterUrl, title, badge = "10s 4K Video Reel" }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasError, setHasError] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative aspect-[4/5] sm:aspect-[16/11] rounded-2xl overflow-hidden border border-[#D4AF37]/35 shadow-2xl group bg-[#161210]">
      {/* Background Video */}
      {!hasError ? (
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterUrl}
          autoPlay
          loop
          muted
          playsInline
          onError={() => setHasError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      ) : (
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      )}

      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0A] via-transparent to-black/30 pointer-events-none" />

      {/* Top Badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#0D0B0A]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#D4AF37]/30 text-[10px] font-modern uppercase tracking-widest text-[#F3E5AB]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#EE9A70] animate-pulse" />
        <Film className="w-3 h-3 text-[#EE9A70]" />
        {badge}
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0D0B0A]/70 hover:bg-[#EE9A70] text-[#FBF3EC] hover:text-[#0D0B0A] flex items-center justify-center backdrop-blur-md border border-[#D4AF37]/30 transition-all cursor-pointer shadow-lg"
        title={isPlaying ? "Pause Video" : "Play Video"}
      >
        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
      </button>

      {/* Bottom Title Pill */}
      {title && (
        <div className="absolute bottom-4 left-4 right-4 bg-[#1A1412]/90 backdrop-blur-md p-3.5 rounded-xl border border-[#D4AF37]/30 flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <span className="text-[10px] font-modern uppercase tracking-wider text-[#EE9A70] font-semibold block">
              AI Production Motion
            </span>
            <p className="font-serif text-xs sm:text-sm text-[#FBF3EC] truncate font-medium">
              {title}
            </p>
          </div>
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
        </div>
      )}
    </div>
  );
}
