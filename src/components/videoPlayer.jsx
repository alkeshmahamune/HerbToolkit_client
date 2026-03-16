import React from "react";
import { useVideoPlayer } from "../hooks/useVideoPlayer";

const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
);
const PauseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
);
const VolumeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
);
const MuteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
);
const FullscreenIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
);

export const VideoPlayer = ({ src }) => {
  const { videoRef, wrapRef, playing, muted, progress, volume, fmtTime, current, duration, togglePlay, toggleMute, seek, changeVolume, fullscreen } = useVideoPlayer();

  return (
    <div
      ref={wrapRef}
      className="relative w-full bg-black rounded-2xl overflow-hidden aspect-video cursor-pointer group"
      onClick={togglePlay}
    >
      <video ref={videoRef} src={src} className="w-full h-full object-contain" playsInline preload="metadata" />

      {/* Big play overlay */}
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity">
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl text-orange-600">
            <PlayIcon />
          </div>
        </div>
      )}

      {/* Controls bar */}
      <div
        className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-10 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Progress bar */}
        <div
          className="w-full h-1 bg-white/30 rounded-full cursor-pointer mb-2 hover:h-1.5 transition-all"
          onClick={e => seek(e)}
        >
          <div className="h-full bg-orange-500 rounded-full" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="text-white hover:text-orange-400 transition-colors" onClick={togglePlay}>
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button className="text-white hover:text-orange-400 transition-colors" onClick={toggleMute}>
              {muted ? <MuteIcon /> : <VolumeIcon />}
            </button>
            {/* Volume slider */}
            <div
              className="w-16 h-1 bg-white/30 rounded-full cursor-pointer"
              onClick={e => changeVolume(e)}
            >
              <div className="h-full bg-white rounded-full" style={{ width: `${volume * 100}%` }} />
            </div>
            <span className="text-white text-xs">{fmtTime(current)} / {fmtTime(duration)}</span>
          </div>
          <button className="text-white hover:text-orange-400 transition-colors" onClick={fullscreen}>
            <FullscreenIcon />
          </button>
        </div>
      </div>
    </div>
  );
};