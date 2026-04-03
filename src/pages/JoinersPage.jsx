import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { fetchJoinersList, removeJoinerFromList, addTestJoinersToStorage } from '../utils/joinersFirestore';
import { IMAGES } from '../config';

const SHOW_GENERATE_TEST_GUESTS = false;

export default function JoinersPage() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await fetchJoinersList();
    setList(data);
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const searchTerm = search.trim().toLowerCase();
  const filtered = searchTerm
    ? list
        .map((j) => ({
          joiner: j,
          match: ((j.name || '') + ' ' + (j.lastname || '')).toLowerCase().includes(searchTerm),
        }))
        .filter((x) => x.match)
    : list.map((j) => ({ joiner: j }));

  const removeJoiner = async (id) => {
    await removeJoinerFromList(id);
    setList((prev) => prev.filter((j) => j.id !== id));
  };

  const clearSearch = () => setSearch('');

  const generateTestGuests = async () => {
    setGenerating(true);
    const testGuests = [
      { name: 'Maria', lastname: 'Santos' },
      { name: 'James', lastname: 'Chen' },
      { name: 'Elena', lastname: 'Rodriguez' },
      { name: 'David', lastname: 'Kim' },
      { name: 'Sophie', lastname: 'Williams' },
    ];
    addTestJoinersToStorage(testGuests);
    const data = await fetchJoinersList();
    setList(data);
    setGenerating(false);
  };

  const countText =
    list.length === 0
      ? '0 guests'
      : searchTerm && list.length > 0
        ? filtered.length === 0
          ? 'No matches'
          : filtered.length === 1
            ? `1 of ${list.length} guest`
            : `${filtered.length} of ${list.length} guests`
        : list.length === 1
          ? '1 guest'
          : `${list.length} guests`;

  const showEmpty = list.length === 0 || (searchTerm && filtered.length === 0);
  const emptyText =
    searchTerm && filtered.length === 0 && list.length > 0
      ? 'No guests match your search.'
      : 'No guests yet.';

  if (loading) {
    return (
      <div className="page page--invitation joiners-page">
        <main className="card card--elegant joiners-card">
          <div className="card-bg" style={{ backgroundImage: `url(${IMAGES.background2})` }} aria-hidden="true" />
          <div className="card-content joiners-content">
            <p className="joiners-loading">Loading guests…</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page page--invitation joiners-page">
      <main className="card card--elegant joiners-card">
        <div className="card-bg" style={{ backgroundImage: `url(${IMAGES.background2})` }} aria-hidden="true" />
        <div className="card-content joiners-content">
          <Link to="/" className="joiners-back">
            ← Back to invitation
          </Link>
          <h1 className="joiners-title">Guest list</h1>
          <p className="joiners-count">{countText}</p>
          <div className="joiners-search-wrap">
            <span className="joiners-search-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </span>
            <input
              type="text"
              className="joiners-search-input"
              placeholder="Search by name..."
              autoComplete="off"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="button"
              className={`joiners-search-clear ${search.trim() ? 'is-visible' : ''}`}
              aria-label="Clear search"
              title="Clear search"
              onClick={clearSearch}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div className="joiners-list-wrap">
            <ul className="joiners-list">
              {filtered.map(({ joiner }) => (
                <li key={joiner.id} className="joiners-list-item">
                  <span className="joiners-joiner-name">
                    {joiner.name || ''} {joiner.lastname || ''}
                  </span>
                  <button
                    type="button"
                    className="joiners-remove"
                    aria-label="Remove guest"
                    onClick={() => removeJoiner(joiner.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <p className="joiners-empty" style={{ display: showEmpty ? 'block' : 'none' }}>
            {emptyText}
          </p>
          {SHOW_GENERATE_TEST_GUESTS && (
            <div className="joiners-test-wrap">
              <button
                type="button"
                className="joiners-generate-btn"
                onClick={generateTestGuests}
                disabled={generating}
              >
                {generating ? 'Adding…' : 'Generate test guests'}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
