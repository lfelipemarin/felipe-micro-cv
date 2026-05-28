import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { setActiveSection } from '../store/cvSlice';

function fireNavEvent(sectionId: string) {
  window.dispatchEvent(
    new CustomEvent('cv:nav:section', { detail: { panelId: 'panel-react' }, bubbles: true })
  );
}

export default function WorkExperience() {
  const experience = useSelector((state: RootState) => state.cv.experience);
  const dispatch = useDispatch();

  function handleSectionClick() {
    dispatch(setActiveSection('work-experience'));
    fireNavEvent('work-experience');
  }

  return (
    <section className="mb-10">
      <button
        onClick={handleSectionClick}
        className="w-full text-left mb-6 group"
      >
        <h2 className="font-mono text-xs font-semibold tracking-widest uppercase text-muted flex items-center gap-2 group-hover:text-react transition-colors">
          <span className="w-2 h-2 rounded-full bg-react inline-block shrink-0" />
          Work Experience
        </h2>
      </button>

      <div className="space-y-6">
        {experience.map((job, i) => (
          <article
            key={i}
            className="border-l-2 border-border pl-4 hover:border-react transition-colors duration-200"
          >
            <div className="flex justify-between items-start mb-1 gap-4">
              <h3 className="font-syne font-bold text-foreground leading-tight">
                {job.company}
              </h3>
              <span className="font-mono text-xs text-muted shrink-0 tabular-nums">
                {job.period}
              </span>
            </div>
            <p className="text-react text-sm font-medium mb-2">{job.role}</p>
            <ul className="space-y-0.5">
              {job.bullets.map((b, j) => (
                <li key={j} className="text-muted text-sm leading-relaxed flex gap-2">
                  <span className="text-react shrink-0">›</span>
                  {b}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
