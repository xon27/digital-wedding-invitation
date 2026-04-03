import { useState, useEffect } from 'react';
import { WEDDING_DATE } from '../config';

function pad(n) {
  return String(n).padStart(2, '0');
}

function getTimeLeft(until) {
  const now = new Date();
  const diff = Math.max(0, until - now);
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((diff % (60 * 1000)) / 1000);
  return { days, hours, minutes, seconds };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(WEDDING_DATE));

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft(getTimeLeft(WEDDING_DATE));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const units = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ];

  return (
    <div className="countdown" aria-label="Countdown to wedding day">
      <p className="countdown-heading">Until we say &ldquo;I do&rdquo;</p>
      <div className="countdown-grid">
        {units.map(({ value, label }) => (
          <div key={label} className="countdown-cell">
            <span className="countdown-value">{pad(value)}</span>
            <span className="countdown-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
