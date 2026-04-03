import { useState, useEffect, useCallback } from 'react';
import { getJoiners, setJoiners } from '../utils/storage';
import { addJoinersToList } from '../utils/joinersFirestore';
import { IMAGES, MAPS_QUERY, DRESS_CODE, WEDDING_COLORS, WEDDING_COLOR_PALETTE, WIFE_NAME, HUSBAND_NAME, RSVP_PROMPT, WEDDING_DATE_LABEL, WEDDING_TIME_LABEL, VENUE_NAME, VENUE_ADDRESS, CEREMONY_TIME, RECEPTION_TIME, PARKING_INFO, ACCOMMODATIONS, SPECIAL_NOTES, FAQ } from '../config';
import Countdown from '../components/Countdown';
import OurStory from '../components/OurStory';
import Gallery from '../components/Gallery';
import VideoSection from '../components/VideoSection';
import ImportantInviteList from '../components/ImportantInviteList';
import J1Section from '../components/J1Section';
import InViewSection from '../components/InViewSection';

function HeroImage({ src }) {
  const [error, setError] = useState(false);
  if (error) return <div className="hero-image hero-image--placeholder" aria-hidden="true" />;
  return <img src={src} alt="" className="hero-image" onError={() => setError(true)} />;
}

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

export default function Invitation() {
  const [joiners, setJoinersState] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);

  const loadJoiners = useCallback(() => {
    setJoinersState(getJoiners());
  }, []);

  useEffect(() => {
    loadJoiners();
  }, [loadJoiners]);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && modalOpen) setModalOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [modalOpen]);

  const joinEnabled = name.trim() && lastname.trim();
  const sendEnabled = joiners.length > 0;

  const handleJoin = (e) => {
    e?.preventDefault();
    const n = name.trim();
    const l = lastname.trim();
    if (!n || !l) return;
    const next = [...joiners, { name: n, lastname: l }];
    setJoiners(next);
    setJoinersState(next);
    setName('');
    setLastname('');
  };

  const handleSend = async () => {
    if (joiners.length === 0) return;
    await addJoinersToList(joiners);
    setJoiners([]);
    setJoinersState([]);
    setSuccessMessage(joiners.length);
    setModalOpen(false);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className="page page--invitation">
      <header className="hero">
        <div className="hero-image-wrap">
          <HeroImage src={IMAGES.hero} />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <p className="hero-badge">We're Getting Married</p>
          <p className="hero-names">{WIFE_NAME} &amp; {HUSBAND_NAME}</p>
          <p className="hero-title-script">we begin forever</p>
          <div className="hero-line" aria-hidden="true" />
          <p className="hero-date">{WEDDING_DATE_LABEL}</p>
          <p className="hero-subtitle">You're cordially invited to celebrate with us</p>
        </div>
      </header>

      <main className="card card--elegant">
        <div
          className="card-bg"
          style={{ backgroundImage: `url(${IMAGES.background2})` }}
          aria-hidden="true"
        />
        <div className="card-content">
        <InViewSection>
          <OurStory />
        </InViewSection>

        <InViewSection>
          <Gallery />
        </InViewSection>

        <InViewSection>
          <J1Section />
        </InViewSection>

        <InViewSection>
          <VideoSection />
        </InViewSection>

        <InViewSection>
          <Countdown />
        </InViewSection>

        <div className="details-wrap details-wrap--elegant">
          <InViewSection>
          <section className="panel panel--elegant panel--when">
            <h2 className="panel-heading">When</h2>
            <p className="panel-when-date"><strong>{WEDDING_DATE_LABEL}</strong></p>
            {(CEREMONY_TIME || RECEPTION_TIME) ? (
              <>
                {CEREMONY_TIME && <p className="panel-when-time">{CEREMONY_TIME}</p>}
                {RECEPTION_TIME && <p className="panel-when-time">{RECEPTION_TIME}</p>}
              </>
            ) : (
              <p className="panel-when-time">{WEDDING_TIME_LABEL}</p>
            )}
          </section>
          </InViewSection>

          <InViewSection>
          <section className="panel panel--elegant panel--dress-code">
            <h2 className="panel-heading">Dress code</h2>
            <p className="panel-dress-code-value">{DRESS_CODE}</p>
            {IMAGES.codedress && (
              <div className="panel-dress-code-image-wrap">
                <img src={IMAGES.codedress} alt="" className="panel-dress-code-image" />
              </div>
            )}
            <p className="panel-colors-value">{WEDDING_COLORS}</p>
            {WEDDING_COLOR_PALETTE.length > 0 && (
              <div className="panel-colors-swatches" aria-hidden="true">
                {WEDDING_COLOR_PALETTE.map((hex, i) => (
                  <span
                    key={i}
                    className="panel-colors-swatch"
                    style={{ backgroundColor: hex }}
                    title={hex}
                  />
                ))}
              </div>
            )}
          </section>
          </InViewSection>

          <InViewSection>
          <section className="panel panel--elegant">
            <h2 className="panel-heading">Where</h2>
            <div className="where-map-wrap">
              <img
                src={IMAGES.weddingplace1}
                alt="Wedding venue"
                className="where-venue-image"
              />
            </div>
            <a href={MAPS_URL} className="panel-link">
              <p><strong>{VENUE_NAME}</strong></p>
              <p>{VENUE_ADDRESS} — Get directions →</p>
            </a>
          </section>
          </InViewSection>

          {(PARKING_INFO || ACCOMMODATIONS || SPECIAL_NOTES) && (
          <InViewSection>
            <section className="panel panel--elegant panel--important-details">
              <h2 className="panel-heading">Important details</h2>
              {PARKING_INFO && <p className="panel-detail-line"><strong>Parking:</strong> {PARKING_INFO}</p>}
              {ACCOMMODATIONS && <p className="panel-detail-line"><strong>Accommodations:</strong> {ACCOMMODATIONS}</p>}
              {SPECIAL_NOTES && <p className="panel-detail-line">{SPECIAL_NOTES}</p>}
            </section>
          </InViewSection>
          )}
        </div>

        {FAQ && FAQ.length > 0 && (
        <InViewSection>
          <section className="faq-section panel panel--elegant" id="faq" aria-labelledby="faq-title">
            <h2 className="panel-heading" id="faq-title">FAQ</h2>
            <div className="faq-list">
              {FAQ.map((item, i) => (
                <div key={i} className="faq-item">
                  <p className="faq-q">{item.q}</p>
                  <p className="faq-a">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </InViewSection>
        )}

        <InViewSection>
          <ImportantInviteList />
        </InViewSection>

        <section className="rsvp-section rsvp-section--elegant" id="rsvp">
          <p className="rsvp-prompt">{RSVP_PROMPT}</p>
          <button
            type="button"
            className="btn-rsvp btn-rsvp--elegant"
            onClick={() => setModalOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={modalOpen}
          >
            RSVP
          </button>

          <div
            className={`rsvp-modal ${modalOpen ? 'is-open' : ''}`}
            id="rsvp-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rsvp-modal-title"
            aria-hidden={!modalOpen}
          >
            <div className="rsvp-modal-backdrop" onClick={closeModal} />
            <div className="rsvp-modal-content rsvp-modal-content--elegant">
              <button type="button" className="rsvp-modal-close" onClick={closeModal} aria-label="Close">
                ×
              </button>
              <h2 className="rsvp-modal-title" id="rsvp-modal-title">RSVP</h2>
              <form className="rsvp-form" onSubmit={handleJoin} noValidate>
                <div className="rsvp-field">
                  <label className="rsvp-label" htmlFor="rsvp-name">Name</label>
                  <input
                    type="text"
                    id="rsvp-name"
                    className="rsvp-input"
                    placeholder="First name"
                    autoComplete="given-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="rsvp-field">
                  <label className="rsvp-label" htmlFor="rsvp-lastname">Last name</label>
                  <input
                    type="text"
                    id="rsvp-lastname"
                    className="rsvp-input"
                    placeholder="Last name"
                    autoComplete="family-name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
                <div className="rsvp-buttons">
                  <button
                    type="button"
                    className="btn-rsvp btn-rsvp-join"
                    disabled={!joinEnabled}
                    onClick={handleJoin}
                  >
                    Attend
                  </button>
                  <button
                    type="button"
                    className="btn-rsvp btn-rsvp-send"
                    disabled={!sendEnabled}
                    onClick={handleSend}
                  >
                    Submit
                  </button>
                </div>
              </form>
              <div className="rsvp-modal-joiners">
                <h3 className="joiners-title">Guests</h3>
                <ul className="joiners-list">
                  {joiners.map((j, i) => (
                    <li key={i} className="joiner-item">
                      {j.name} {j.lastname}
                    </li>
                  ))}
                </ul>
                <p className="joiners-empty" style={{ display: joiners.length ? 'none' : 'block' }}>
                  No guests added yet.
                </p>
              </div>
            </div>
          </div>

          {successMessage != null && (
            <p className="rsvp-success" role="status" aria-live="polite">
              You successfully sent {successMessage} {successMessage === 1 ? 'guest' : 'guests'}.
            </p>
          )}
        </section>
        </div>
      </main>
    </div>
  );
}
