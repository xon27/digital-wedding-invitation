import { useState } from 'react';
import { IMAGES } from '../config';

export default function J1Section() {
  const [error, setError] = useState(false);

  return (
    <section className="j1-section" aria-label="Jane & John">
      {error ? (
        <div className="j1-section-placeholder">
          <p className="j1-section-placeholder-text">Jane & John</p>
          <p className="j1-section-placeholder-hint">Put jane-and-john.png in public/w/</p>
        </div>
      ) : (
        <img
          src={IMAGES.janeJohn}
          alt="Jane & John"
          className="j1-section-image"
          loading="eager"
          onError={() => setError(true)}
        />
      )}
    </section>
  );
}
