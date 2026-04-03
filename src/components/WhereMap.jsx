import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MAPS_QUERY } from '../config';

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
const MAPS_EMBED_URL = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;

const HEART_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36"><path fill="#c9a227" stroke="#b8860b" stroke-width="1.2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;

function createHeartIcon() {
  return L.divIcon({
    html: HEART_SVG,
    className: 'where-map-heart-icon',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  });
}

export default function WhereMap() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ok' | 'error'

  useEffect(() => {
    if (!containerRef.current) return;

    const query = MAPS_QUERY.replace(/\+/g, ' ');
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;

    let cancelled = false;
    let map = null;

    fetch(url, {
      headers: { Accept: 'application/json', 'User-Agent': 'WeddingInvitation/1.0' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled || !containerRef.current) return;
        if (!Array.isArray(data) || data.length === 0) {
          setStatus('error');
          return;
        }
        const { lat, lon } = data[0];
        const latNum = parseFloat(lat);
        const lonNum = parseFloat(lon);

        const el = containerRef.current;
        map = L.map(el, {
          center: [latNum, lonNum],
          zoom: 15,
          scrollWheelZoom: true,
          zoomControl: true,
        });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        const marker = L.marker([latNum, lonNum], { icon: createHeartIcon() });
        marker.addTo(map);
        mapRef.current = map;

        // Ensure map fills container after layout
        requestAnimationFrame(() => {
          if (mapRef.current) mapRef.current.invalidateSize();
        });
        setStatus('ok');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  /* When geocoding fails, show Google Maps iframe so a map is always visible */
  if (status === 'error') {
    return (
      <iframe
        src={MAPS_EMBED_URL}
        title="Wedding venue location"
        className="where-map-iframe"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        className="where-map-container"
        style={{ opacity: status === 'ok' ? 1 : 0.6 }}
        aria-hidden="true"
      />
      {status === 'loading' && (
        <div className="where-map-loading" aria-live="polite">
          Loading map…
        </div>
      )}
    </>
  );
}
