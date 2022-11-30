import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';
import { vars } from './vars.css';

const flexAlignment = ['flex-start', 'center', 'flex-end', 'stretch'] as const;

export const breakpoint = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
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
    alignItems: flexAlignment,
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
    flexDirection: ['row', 'column', 'row-reverse', 'column-reverse'],
    justifyContent: flexAlignment,
    marginBottom: vars.space,
    marginLeft: vars.space,
    marginRight: vars.space,
    marginTop: vars.space,
    paddingTop: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space,
  },
  shorthands: {
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
  },
});

export const sprinkles = createSprinkles(responsiveProperties);
