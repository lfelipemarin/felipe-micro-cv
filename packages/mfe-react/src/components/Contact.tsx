import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const ICONS: Record<string, string> = {
  email:     '✉',
  phone:     '☎',
  linkedin:  '⟢',
  github:    '⌥',
  portfolio: '◈',
};

export default function Contact() {
  const contact = useSelector((state: RootState) => state.cv.contact);

  return (
    <section className="mb-10">
      <h2 className="font-mono text-xs font-semibold tracking-widest uppercase text-muted mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-react inline-block shrink-0" />
        Contact
      </h2>

      <div className="space-y-3">
        {(Object.entries(contact) as [string, string][]).map(([key, value]) => {
          const isUrl = value.startsWith('http');
          const isEmail = value.includes('@');
          const href = isUrl ? value : isEmail ? `mailto:${value}` : undefined;
          const displayValue = value
            .replace('https://', '')
            .replace('http://', '');

          return (
            <div key={key} className="flex items-center gap-3">
              <span className="font-mono text-react text-sm w-5 shrink-0">
                {ICONS[key] ?? '·'}
              </span>
              <span className="font-mono text-xs text-muted uppercase tracking-wider w-20 shrink-0">
                {key}
              </span>
              {href ? (
                <a
                  href={href}
                  target={isUrl ? '_blank' : undefined}
                  rel={isUrl ? 'noopener noreferrer' : undefined}
                  className="text-foreground text-sm hover:text-react transition-colors truncate"
                >
                  {displayValue}
                </a>
              ) : (
                <span className="text-foreground text-sm">{value}</span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
