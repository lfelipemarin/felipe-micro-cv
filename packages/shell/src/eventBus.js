/**
 * Lightweight cross-MFE event bus built on window.CustomEvent.
 * Both React and Vue MFEs share this via window — no import needed.
 */

const PREFIX = 'cv';

/** Emit a namespaced event with optional payload. */
export function emit(event, detail) {
  window.dispatchEvent(
    new CustomEvent(`${PREFIX}:${event}`, { detail, bubbles: true })
  );
}

/**
 * Subscribe to a namespaced event.
 * Returns an unsubscribe function — call it to clean up.
 */
export function on(event, callback) {
  const handler = (e) => callback(e.detail);
  window.addEventListener(`${PREFIX}:${event}`, handler);
  return () => window.removeEventListener(`${PREFIX}:${event}`, handler);
}
