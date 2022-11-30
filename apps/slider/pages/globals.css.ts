import { globalStyle } from '@vanilla-extract/css';

globalStyle('*, ::before, ::after', {
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  borderWidth: 0,
  borderStyle: 'solid',
});

globalStyle('body', {
  margin: 0,
});

globalStyle('html, body, #__next, .app', {
  width: '100%',
  height: '100%',
});
