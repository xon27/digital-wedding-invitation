import { OUR_STORY } from '../config';

export default function OurStory() {
  return (
    <section className="our-story" id="our-story" aria-labelledby="story-title">
      <div className="our-story-header">
        <span className="our-story-number" aria-hidden="true">01</span>
        <h2 className="our-story-title" id="story-title">Our Story</h2>
        <p className="our-story-intro">A few moments that led us here</p>
      </div>
      <div className="our-story-list">
        {OUR_STORY.map((chapter, i) => (
          <article
            key={chapter.title}
            className="story-chapter story-chapter--no-image"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <span className="story-chapter-step" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <div className="story-chapter-content">
              <h3 className="story-chapter-title">{chapter.title}</h3>
              <p className="story-chapter-text">{chapter.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
