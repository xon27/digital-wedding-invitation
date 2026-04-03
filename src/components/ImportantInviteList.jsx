import { IMPORTANT_INVITE_LIST } from '../config';

export default function ImportantInviteList() {
  if (!IMPORTANT_INVITE_LIST || IMPORTANT_INVITE_LIST.length === 0) return null;

  return (
    <section className="invite-list" id="invite-list" aria-labelledby="invite-list-title">
      <div className="invite-list-header">
        <span className="invite-list-number" aria-hidden="true">03</span>
        <h2 className="invite-list-title" id="invite-list-title">We are honoured</h2>
        <p className="invite-list-intro">To share our day with these dear ones</p>
      </div>
      <ul className="invite-list-names">
        {IMPORTANT_INVITE_LIST.map((name, i) => (
          <li key={i} className="invite-list-item">
            <span className="invite-list-name">{name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
