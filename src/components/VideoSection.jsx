import { useRef, useEffect, useState } from 'react';
import { VIDEO_SOURCES } from '../config';

export default function VideoSection() {
  const videoRef = useRef(null);
  const [error, setError] = useState(false);
  const [index, setIndex] = useState(0);

  const sources = VIDEO_SOURCES || [];
  const currentSrc = sources.length > 0 ? sources[index] : null;

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !currentSrc) return;
    const handleError = () => setError(true);
    const handleEnded = () => {
      if (sources.length <= 1) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        setIndex((i) => (i + 1) % sources.length);
      }
    };
    v.addEventListener('error', handleError);
    v.addEventListener('ended', handleEnded);
    return () => {
      v.removeEventListener('error', handleError);
      v.removeEventListener('ended', handleEnded);
    };
  }, [currentSrc, sources.length]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !currentSrc) return;
    v.src = currentSrc;
    v.load();
    const playWhenReady = () => {
      v.play().catch(() => {});
    };
    v.addEventListener('canplay', playWhenReady);
    playWhenReady();
    return () => v.removeEventListener('canplay', playWhenReady);
  }, [currentSrc]);

  const showPlaceholder = error || sources.length === 0;

  return (
    <section className="video-section" id="video" aria-label="Wedding video">
      <div className="video-section-inner">
        {showPlaceholder ? (
          <div className="video-section-placeholder">
            <p className="video-section-placeholder-text">Add your videos</p>
            <p className="video-section-placeholder-hint">
              Place video files in <strong>public/video/</strong> and list them in <strong>src/config.js</strong> as VIDEO_FILES
            </p>
          </div>
        ) : (
          <video
            ref={videoRef}
            className="video-section-media"
            src={currentSrc}
            autoPlay
            muted
            playsInline
            aria-label="Wedding video"
            title=""
          />
        )}
        <div className="video-section-overlay" aria-hidden="true" />
      </div>
    </section>
  );
}
