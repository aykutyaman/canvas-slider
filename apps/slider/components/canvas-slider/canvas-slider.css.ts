import { style } from '@vanilla-extract/css';
import { sprinkles } from '@publitas/design';

export const container = style([
  sprinkles({
    display: 'flex',
  }),
  {
    backgroundColor: 'gray',
  },
]);
