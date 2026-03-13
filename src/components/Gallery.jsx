import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { GALLERY_IMAGES } from '../config';

const AUTOSLIDE_INTERVAL_MS = 6500;

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [failedUrls, setFailedUrls] = useState(() => new Set());
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const trackRef = useRef(null);

  const images = GALLERY_IMAGES.filter((src) => !failedUrls.has(src));
  const count = images.length;
  const slides = count > 1 ? [...images, images[0]] : images;
  const slideCount = slides.length;

  const handleError = useCallback((src) => {
    setFailedUrls((prev) => new Set(prev).add(src));
  }, []);

  useEffect(() => {
    setIndex((i) => (count > 0 ? Math.min(i, count - 1) : 0));
  }, [count]);

  const goNext = useCallback(() => {
    if (count <= 1) return;
    setIndex((i) => (i < count ? i + 1 : i));
  }, [count]);

  const handleTransitionEnd = useCallback(() => {
    if (index === count && count > 1) {
      setTransitionEnabled(false);
      setIndex(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitionEnabled(true));
      });
    }
  }, [index, count]);

  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(goNext, AUTOSLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [count, goNext]);

  const displayIndex = index === count ? 0 : index;

  const openGallery = useCallback(() => {
    setGalleryIndex(displayIndex);
    setGalleryOpen(true);
  }, [displayIndex]);

  const closeGallery = useCallback(() => setGalleryOpen(false), []);

  const galleryPrev = useCallback(() => {
    setGalleryIndex((i) => (i > 0 ? i - 1 : count - 1));
  }, [count]);

  const galleryNext = useCallback(() => {
    setGalleryIndex((i) => (i < count - 1 ? i + 1 : 0));
  }, [count]);

  useEffect(() => {
    if (!galleryOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowLeft') galleryPrev();
      if (e.key === 'ArrowRight') galleryNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [galleryOpen, closeGallery, galleryPrev, galleryNext]);

  if (count === 0) return null;

  return (
    <section className="gallery gallery--slider" id="gallery" aria-labelledby="gallery-title">
      <div className="gallery-header">
        <span className="gallery-number" aria-hidden="true">02</span>
        <h2 className="gallery-title" id="gallery-title">Our Moments</h2>
        <p className="gallery-intro">A few of our favourite photos</p>
      </div>

      <div className="gallery-slider">
        <div
          ref={trackRef}
          className="gallery-slider-track"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: transitionEnabled
              ? 'transform 1.4s cubic-bezier(0.33, 1, 0.68, 1)'
              : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
          aria-live="polite"
          aria-atomic="true"
        >
          {slides.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="gallery-slide"
              onClick={(e) => { e.stopPropagation(); openGallery(); }}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openGallery(); } }}
              role="button"
              tabIndex={0}
              aria-label="Open photo gallery"
            >
              <img
                src={src}
                alt=""
                className="gallery-slide-img"
                loading={i < 2 ? 'eager' : 'lazy'}
                onError={() => handleError(src)}
                draggable={false}
              />
            </div>
          ))}
        </div>

        {count > 1 && (
            <div className="gallery-dots" aria-hidden="true">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`gallery-dot ${i === displayIndex ? 'is-active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                  aria-label={`Go to photo ${i + 1}`}
                  aria-current={i === displayIndex ? 'true' : undefined}
                />
              ))}
            </div>
          )}
      </div>

      {/* Gallery lightbox — rendered in portal so it covers the whole screen */}
      {galleryOpen && createPortal(
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
        >
          <div className="gallery-lightbox-backdrop" onClick={closeGallery} aria-hidden="true" />
          <button
            type="button"
            className="gallery-lightbox-close"
            onClick={closeGallery}
            aria-label="Close gallery"
          >
            ×
          </button>
          <button
            type="button"
            className="gallery-lightbox-prev"
            onClick={(e) => { e.stopPropagation(); galleryPrev(); }}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <div className="gallery-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[galleryIndex]}
              alt={`Photo ${galleryIndex + 1} of ${count}`}
              className="gallery-lightbox-img"
            />
            <span className="gallery-lightbox-counter">{galleryIndex + 1} / {count}</span>
          </div>
          <button
            type="button"
            className="gallery-lightbox-next"
            onClick={(e) => { e.stopPropagation(); galleryNext(); }}
            aria-label="Next photo"
          >
            ›
          </button>
        </div>,
        document.body
      )}
    </section>
  );
}
