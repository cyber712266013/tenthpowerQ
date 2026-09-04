import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface EditorialMediaProps {
  src?: string;
  videoUrl?: string;
  alt: string;
  tilt?: number;
  aspectRatio?: string;
  onClick?: () => void;
  hoverLabel?: string;
  priority?: boolean;
  className?: string;
}

export function isDirectVideo(url: string): boolean {
  if (!url) return false;
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url) || url.startsWith("data:video/") || url.startsWith("blob:");
}

export function parseVideoEmbed(url: string): { type: "youtube" | "vimeo" | "file" | "other"; embedUrl: string } {
  if (!url) return { type: "other", embedUrl: "" };
  if (isDirectVideo(url)) return { type: "file", embedUrl: url };

  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return {
      type: "youtube",
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&mute=1&loop=1&playlist=${ytMatch[1]}&rel=0`,
    };
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=1&loop=1&autopause=0`,
    };
  }

  return { type: "other", embedUrl: url };
}

export default function EditorialMedia({
  src,
  videoUrl,
  alt,
  tilt = 0,
  aspectRatio = "aspect-[16/11] md:aspect-[16/10]",
  onClick,
  hoverLabel = "عرض التفاصيل",
  priority = false,
  className = "",
}: EditorialMediaProps) {
  const [isPlayingInline, setIsPlayingInline] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const hasVideo = Boolean(videoUrl && videoUrl.trim().length > 0);
  const videoInfo = hasVideo ? parseVideoEmbed(videoUrl!) : null;
  const isFileVideo = videoInfo?.type === "file";

  // Toggle mute for direct video
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handlePlayEmbed = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlayingInline(true);
  };

  return (
    <motion.div
      className={`editorial-image-frame relative overflow-hidden group cursor-pointer select-none ${className}`}
      style={{ transform: `rotate(${tilt}deg)` }}
      whileHover={{
        rotate: 0,
        scale: 1.015,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={alt}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick?.();
        }
      }}
    >
      <div className={`relative w-full ${aspectRatio} overflow-hidden bg-black/40`}>
        {/* Case 1: Direct video file (.mp4, etc.) -> Ambient looping video */}
        {hasVideo && isFileVideo ? (
          <>
            <video
              ref={videoRef}
              src={videoUrl}
              poster={src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Sound toggle button */}
            <button
              onClick={toggleMute}
              className="absolute top-4 left-4 z-20 w-9 h-9 flex items-center justify-center bg-black/70 backdrop-blur-md text-white/90 hover:text-white hover:bg-[var(--color-accent)] transition-all duration-200 cursor-pointer"
              aria-label={isMuted ? "تشغيل الصوت" : "كتم الصوت"}
              title={isMuted ? "تشغيل الصوت" : "كتم الصوت"}
            >
              {isMuted ? (
                // Muted icon
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                // Sound playing icon
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>

            {/* Video status indicator */}
            <div className="absolute top-4 right-4 z-10 pointer-events-none">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md text-[10px] text-white/90 font-medium tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
                توثيق مرئي
              </span>
            </div>
          </>
        ) : hasVideo && isPlayingInline && videoInfo ? (
          /* Case 2: Embed video actively playing inline */
          <iframe
            src={videoInfo.embedUrl}
            title={alt}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          /* Case 3: Image (or Video poster before inline play) */
          <>
            {src ? (
              <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading={priority ? "eager" : "lazy"}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/30 text-sm">
                القوة العاشرة للمقاولات العامة
              </div>
            )}

            {/* If video exists (YouTube/Vimeo), show refined luxury Play Button */}
            {hasVideo && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <button
                  onClick={handlePlayEmbed}
                  className="w-16 h-16 rounded-full bg-[var(--color-primary)]/85 backdrop-blur-md border border-white/25 text-white flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--color-accent)] cursor-pointer"
                  aria-label="تشغيل الفيديو"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="translate-x-[-1px]">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </button>

                <div className="absolute top-4 right-4 pointer-events-none">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md text-[10px] text-white/90 font-medium tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
                    فيديو توثيقي
                  </span>
                </div>
              </div>
            )}
          </>
        )}

        {/* Subtle dark gradient for high-end editorial contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />

        {/* Floating action pill on hover */}
        <div className="absolute bottom-5 left-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[var(--color-primary)]/90 backdrop-blur-md text-white text-xs font-medium border border-white/20">
            <span>{hoverLabel}</span>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
