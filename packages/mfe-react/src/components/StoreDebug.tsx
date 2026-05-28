import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export default function StoreDebug() {
  const state = useSelector((s: RootState) => s);

  return (
    <details className="mt-10 border border-border rounded-lg overflow-hidden">
      <summary className="px-4 py-3 bg-surface cursor-pointer flex items-center gap-2 select-none hover:bg-border/50 transition-colors list-none">
        <span className="font-mono text-xs font-bold text-react">[Redux Store]</span>
        <span className="font-mono text-xs text-muted ml-auto">▾ live state</span>
      </summary>
      <pre className="p-4 bg-[#0a0a0d] font-mono text-xs text-muted/80 overflow-auto max-h-72 leading-relaxed whitespace-pre-wrap break-all">
        {JSON.stringify(state, null, 2)}
      </pre>
    </details>
  );
}
