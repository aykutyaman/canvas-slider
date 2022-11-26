import * as D from '@publitas/domain';
import { reducer } from './reducers';

const canvas = {
  canvas: {
    width: 640,
    height: 400,
  },
} as D.Canvas;

const images = [
  {
    width: 2880,
    height: 1800,
  },
  {
    width: 1500,
    height: 750,
  },
  { width: 1024, height: 768 },
  { width: 853, height: 1280 },
] as Array<HTMLImageElement>;

describe('reducers', () => {
  it('Loading-ImagesLoaded-Idle', () => {
    const given: D.Idle = {
      images: [],
      kind: 'Idle',
    };
    const when: D.ImagesLoaded = {
      kind: 'ImagesLoaded',
      payload: {
        canvas,
        images,
      },
    };
    expect(reducer(given, when)).toMatchSnapshot();
  });
});
