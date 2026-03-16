import { useEffect, useRef, useState } from "react";

export function useVideoPlayer() {
  const videoRef = useRef(null);
  const wrapRef  = useRef(null);
  const [playing,  setPlaying]  = useState(false);
  const [muted,    setMuted]    = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume,   setVolume]   = useState(0.8);
  const [duration, setDuration] = useState(0);
  const [current,  setCurrent]  = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.volume = volume;
    const onMeta  = () => setDuration(v.duration);
    const onTime  = () => { setCurrent(v.currentTime); setProgress((v.currentTime / v.duration) * 100 || 0); };
    const onEnded = () => setPlaying(false);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("timeupdate",     onTime);
    v.addEventListener("ended",          onEnded);
    return () => { v.removeEventListener("loadedmetadata", onMeta); v.removeEventListener("timeupdate", onTime); v.removeEventListener("ended", onEnded); };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const seek = (e, el) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const r = (el || e.currentTarget).getBoundingClientRect();
    v.currentTime = ((e.clientX - r.left) / r.width) * duration;
  };

  const changeVolume = (e, el) => {
    const v = videoRef.current;
    if (!v) return;
    const r = (el || e.currentTarget).getBoundingClientRect();
    const vol = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    v.volume = vol;
    setVolume(vol);
  };

  const fullscreen = () => {
    const w = wrapRef.current;
    if (!w) return;
    if (w.requestFullscreen)       w.requestFullscreen();
    else if (w.webkitRequestFullscreen) w.webkitRequestFullscreen();
  };

  const fmtTime = (s) => {
    const m = Math.floor(s / 60), sc = Math.floor(s % 60);
    return `${m}:${sc < 10 ? "0" : ""}${sc}`;
  };

  return { videoRef, wrapRef, playing, muted, progress, volume, duration, current, fmtTime, togglePlay, toggleMute, seek, changeVolume, fullscreen };
}