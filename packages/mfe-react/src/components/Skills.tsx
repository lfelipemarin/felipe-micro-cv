import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { setActiveSection } from '../store/cvSlice';

export default function Skills() {
  const skills = useSelector((state: RootState) => state.cv.skills);
  const dispatch = useDispatch();

  return (
    <section className="mb-10">
      <button
        onClick={() => {
          dispatch(setActiveSection('skills'));
          window.dispatchEvent(
            new CustomEvent('cv:nav:section', {
              detail: { panelId: 'panel-react' },
              bubbles: true,
            })
          );
        }}
        className="w-full text-left mb-6 group"
      >
        <h2 className="font-mono text-xs font-semibold tracking-widest uppercase text-muted flex items-center gap-2 group-hover:text-react transition-colors">
          <span className="w-2 h-2 rounded-full bg-react inline-block shrink-0" />
          Skills
        </h2>
      </button>

      <div className="space-y-4">
        {skills.map((group) => (
          <div key={group.category}>
            <p className="font-mono text-xs text-muted mb-2 uppercase tracking-wider">
              {group.category}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-xs px-3 py-1 rounded-full bg-react/10 text-react border border-react/30 hover:bg-react/20 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
