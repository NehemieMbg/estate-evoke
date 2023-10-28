import { RefObject, useEffect } from 'react';

/**
 * Closes when clicked outside of the reference
 * @param ref - the reference (target) to close
 * @param callback - action to close
 */
export default function useClickOutside(
  ref: RefObject<HTMLDivElement> | null,
  callback: () => void
) {
  const handler = (event: MouseEvent) => {
    // if click happened outside of the div where the ref is used
    if (ref!.current && !ref!.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handler);

    // Clears the event listeners
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });
}
