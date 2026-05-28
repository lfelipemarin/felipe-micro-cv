import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './store';
import { setActiveSection, toggleTheme, incrementDispatches } from './store/cvSlice';
import type { Experience, SkillGroup, Contact } from './store/cvSlice';

type Tab = 'experience' | 'skills' | 'contact';
const TABS: Tab[] = ['experience', 'skills', 'contact'];
const THEMES = ['dark', 'light', 'system'];

function emit(event: string, detail?: unknown) {
  window.dispatchEvent(new CustomEvent(`cv:${event}`, { detail, bubbles: true }));
}

export default function App() {
  const dispatch = useDispatch();
  const state = useSelector((s: RootState) => s.cv);
  const [tab, setTab] = useState<Tab>('experience');

  // Listen for shell-dispatched actions
  useEffect(() => {
    const handler = (e: Event) => {
      const { action, payload } = (e as CustomEvent<{ action: string; payload?: string }>).detail;
      dispatch(incrementDispatches());

      if (action === 'SET_ACTIVE_SECTION' && payload && TABS.includes(payload as Tab)) {
        const t = payload as Tab;
        setTab(t);
        dispatch(setActiveSection(t));
        emit('react-action', { result: `SET_ACTIVE_SECTION → "${payload}"` });
      } else if (action === 'TOGGLE_THEME') {
        dispatch(toggleTheme());
        const next = THEMES[(state.themeIdx + 1) % THEMES.length];
        emit('react-action', { result: `TOGGLE_THEME → "${next}"` });
      } else if (action === 'PING_MFE') {
        emit('react-action', { result: 'PING_MFE → dispatched' });
        emit('ping-vue');
      }
    };
    window.addEventListener('cv:shell-react', handler);
    return () => window.removeEventListener('cv:shell-react', handler);
  }, [dispatch, state.themeIdx]);

  function switchTab(t: Tab) {
    setTab(t);
    dispatch(setActiveSection(t));
  }

  return (
    <div className="mfe-root">
      {/* Panel header */}
      <div className="panel-header">
        <span className="panel-title">
          <span className="panel-dot" />
          mfe-react / src / App.tsx
        </span>
        <div className="tech-badges">
          <span className="tech-badge tb-react">React 19</span>
          <span className="tech-badge tb-redux">Redux</span>
          <span className="tech-badge tb-vite">Vite</span>
        </div>
      </div>

      {/* Redux store block */}
      <div className="store-block">
        <div className="store-label redux-label">▸ redux store state</div>
        <div className="store-row">
          <span className="store-key">activeSection</span>
          <span className="store-val section-r">{tab}</span>
        </div>
        <div className="store-row">
          <span className="store-key">theme</span>
          <span className="store-val active">{state.theme}</span>
        </div>
        <div className="store-row">
          <span className="store-key">mfeConnected</span>
          <span className="store-val active">true</span>
        </div>
        <div className="store-row">
          <span className="store-key">dispatches</span>
          <span className="store-val">{state.dispatches}</span>
        </div>
      </div>

      {/* Nav tabs */}
      <div className="nav-tabs">
        {TABS.map((t) => (
          <button
            key={t}
            className={`nav-tab${tab === t ? ' active-react' : ''}`}
            onClick={() => switchTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Section content */}
      <div className="cv-section">
        {tab === 'experience' && <ExperienceSection items={state.experience} />}
        {tab === 'skills'     && <SkillsSection groups={state.skills} />}
        {tab === 'contact'    && <ContactSection data={state.contact} />}
      </div>
    </div>
  );
}

/* ─── Experience ─────────────────────────────────────────── */
function ExperienceSection({ items }: { items: Experience[] }) {
  return (
    <>
      <div className="section-label-inner">work experience</div>
      {items.map((item) => (
        <div className="exp-item" key={item.company}>
          <div className="exp-title">
            {item.role} <span className="exp-dot">·</span> {item.company}
          </div>
          <div className="exp-meta">{item.period}</div>
          <ul className="exp-bullets">
            {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>
      ))}
    </>
  );
}

/* ─── Skills ─────────────────────────────────────────────── */
function SkillsSection({ groups }: { groups: SkillGroup[] }) {
  return (
    <>
      <div className="section-label-inner">technical skills</div>
      {groups.map((g) => (
        <div className="skill-group" key={g.category}>
          <div className="skill-group-label">{g.comment}</div>
          <div className="skill-grid">
            {g.items.map((item) => (
              <span
                key={item.label}
                className={`skill-chip${item.highlight ? ` hl-${item.highlight}` : ''}`}
              >
                {item.label}
              </span>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

/* ─── Contact ────────────────────────────────────────────── */
function ContactSection({ data }: { data: Contact }) {
  return (
    <>
      <div className="section-label-inner">contact</div>
      <div className="contact-row">
        <span className="contact-icon">@</span>
        <span>{data.email}</span>
      </div>
      <div className="contact-row">
        <span className="contact-icon">📱</span>
        <span>{data.phone}</span>
      </div>
      <div className="contact-row">
        <span className="contact-icon">in</span>
        <a href={data.linkedin} target="_blank" rel="noopener" className="contact-link">
          linkedin.com/in/fmv85
        </a>
      </div>
      <div className="contact-row">
        <span className="contact-icon">⌥</span>
        <a href={data.github} target="_blank" rel="noopener" className="contact-link">
          github.com/lfelipemarin
        </a>
      </div>
      <div className="contact-row">
        <span className="contact-icon">↗</span>
        <a href={data.portfolio} target="_blank" rel="noopener" className="contact-link">
          portfolio
        </a>
      </div>
    </>
  );
}
