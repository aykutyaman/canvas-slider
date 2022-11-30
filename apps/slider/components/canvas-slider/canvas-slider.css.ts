import { style } from '@vanilla-extract/css';
import { sprinkles } from '@publitas/design';

export const container = style([
  sprinkles({
    display: 'flex',
    marginTop: {
      default: '1x',
      sm: '4x',
      md: 'none',
    },
    justifyContent: 'center',
    alignItems: {
      xs: 'flex-start',
      sm: 'center',
    },
  }),
  {
    height: '100%',
  },
]);

export const canvas = style([
  sprinkles({}),
  {
    backgroundColor: 'gray',
  },
]);
