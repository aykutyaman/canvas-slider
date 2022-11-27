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

const loadingImagesLoadedIdle = () => {
  const given: D.Loading = {
    kind: 'Loading',
  };
  const when = D.imagesLoaded({
    canvas,
    images,
  });
  return reducer(given, when);
};

const idleMouseDownDragging = () => {
  const event = {
    clientX: 325,
  } as MouseEvent;

  const given = loadingImagesLoadedIdle();

  const when = D.mouseDown({
    canvas,
    event,
  });
  return reducer(given, when);
};

describe('reducers', () => {
  it('Loading-ImagesLoaded-Idle', () => {
    const state = loadingImagesLoadedIdle();
    expect(state.kind).toBe('Idle');
    expect(state).toMatchSnapshot();
  });

  it('Idle-MouseDown-Dragging', () => {
    const state = idleMouseDownDragging();
    expect(state.kind).toBe('Dragging');
    expect(state).toMatchSnapshot();
  });

  it('Dragging-MouseUp-Idle', () => {
    const event = {} as MouseEvent;
    const given = idleMouseDownDragging();

    const when = D.mouseUp({
      canvas,
      event,
    });
    const then = reducer(given, when);

    expect(then.kind).toBe('Idle');
    expect(then).toMatchSnapshot();
  });

  it('Dragging-MouseMove-Dragging', () => {
    const event = {
      clientX: 292,
    } as MouseEvent;

    const given = idleMouseDownDragging();

    const when = D.mouseMove({
      canvas,
      event,
    });
    const then = reducer(given, when);

    expect(then.kind).toBe('Dragging');
    expect(then).toMatchSnapshot();
  });
});
