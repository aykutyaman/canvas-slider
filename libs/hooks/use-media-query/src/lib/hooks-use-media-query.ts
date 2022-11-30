import { useEffect, useState } from 'react';
import { breakpoints, Breakpoint } from '@publitas/design';

export const useMediaQuery = (screen: Breakpoint) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const query = breakpoints[screen]['@media'];
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, screen]);

  return matches;
};
