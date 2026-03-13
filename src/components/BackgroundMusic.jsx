import { useRef, useState, useCallback, useEffect } from 'react';
import { MEDIA } from '../config';

const DELAY_SECONDS = 3;

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  const startMusic = useCallback(() => {
    const a = audioRef.current;
    if (!a || error || !MEDIA.music) return Promise.reject();
    return a.play().then(() => setPlaying(true));
  }, [error]);

  const startMusicRef = useRef(startMusic);
  startMusicRef.current = startMusic;

  /* After page open/refresh: wait 3 seconds, then start music (no countdown shown) */
  useEffect(() => {
    if (error || !MEDIA.music) return;
    const t = setTimeout(() => {
      startMusicRef.current().catch(() => {});
    }, DELAY_SECONDS * 1000);
    return () => clearTimeout(t);
  }, [error]);

  /* Button: pause when playing, play when paused */
  const toggle = useCallback(() => {
    const a = audioRef.current;
    if (!a || error) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, [playing, error]);

  return (
    <>
      <audio
        ref={audioRef}
        src={MEDIA.music}
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={(e) => {
          setError(true);
          if (e?.target?.error) console.warn('Background music failed:', e.target.src, e.target.error.message || e.target.error.code);
        }}
        aria-label="Background music"
      />
      <div className="music-toggle-wrap">
        {!error && !playing && (
          <span className="music-toggle-hint">Tap to play</span>
        )}
        <button
          type="button"
          className={`music-toggle ${error ? 'music-toggle--error' : ''}`}
          onClick={toggle}
          disabled={error}
          aria-label={error ? 'Music unavailable' : playing ? 'Pause music' : 'Play music'}
          title={error ? 'Add an audio file in public/music/' : playing ? 'Pause' : 'Play'}
        >
          <span className="music-toggle-icon" aria-hidden="true">
            {error ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            ) : playing ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
            )}
          </span>
        </button>
      </div>
    </>
  );
}
