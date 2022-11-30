import { useEffect, useState } from 'react';

export function hooksUseMediaQuery(): string {
  return 'hooks-use-media-query';
}

export const sizes = {
  xs: 0,
  sm: '600px',
  md: '900px',
  lg: '1200px',
};

export const useMediaQuery = (screen: keyof typeof sizes) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const query = `(min-width: ${sizes[screen]})`;
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
