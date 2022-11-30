import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';

export const breakpoint = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;
export type Breakpoint = keyof typeof breakpoint;
export const breakpointNames = Object.keys(breakpoint) as Breakpoint[];

type Media = {
  '@media': string;
};

type T = Record<Breakpoint, Media>;

export const breakpoints = breakpointNames.reduce<T>((acc, br) => {
  return {
    ...acc,
    [br]: { '@media': `screen and (min-width: ${breakpoint[br]}px)` },
  };
}, {} as T);

const responsiveProperties = defineProperties({
  conditions: {
    default: {},
    ...breakpoints,
  },
  defaultCondition: 'default',
  properties: {
    display: [
      'block',
      'inline',
      'inline-block',
      'flex',
      'inline-flex',
      'grid',
      'inline-grid',
      'flow-root',
      'contents',
    ],
  },
});

export const sprinkles = createSprinkles(responsiveProperties);
