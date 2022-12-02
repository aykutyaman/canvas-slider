import * as D from '@publitas/domain';
import {
  assertNever,
  calculateImage,
  mapDX,
  noop,
  withAlignment,
} from './helpers';

export const loadingImagesLoaded = (
  _state: D.Loading,
  action: D.ImagesLoaded
): D.Idle => ({
  kind: 'Idle',
  images: action.payload.images.map(
    calculateImage(action.payload.canvas.canvas)
  ),
});

export const idleWindowResized = (
  state: D.Idle,
  action: D.WindowResized
): D.Idle => ({
  kind: 'Idle',
  images: state.images
    .map((image) => image.element)
    .map(calculateImage(action.payload.canvas.canvas)),
});

export const idleMouseDown = (
  state: D.Idle,
  action: D.MouseDown
): D.Dragging => ({
  kind: 'Dragging',
  images: state.images,
  pointerx: action.payload.event.clientX,
});

export const draggingMouseUp = (
  state: D.Dragging,
  _action: D.MouseUp
): D.Idle => ({
  kind: 'Idle',
  images: state.images.map((image) => ({
    ...image,
    initialdx: image.dx,
  })),
});

export const draggingMouseMove = (
  state: D.Dragging,
  action: D.MouseMove
): D.Dragging => {
  const { clientX } = action.payload.event;

  const images = withAlignment(
    mapDX(state.images, (image) => image.initialdx + clientX - state.pointerx)
  );

  return {
    ...state,
    images,
  };
};

export const reducer = (state: D.State, action: D.Action): D.State => {
  switch (state.kind) {
    case 'Loading':
      switch (action.kind) {
        case 'ImagesLoaded':
          return loadingImagesLoaded(state, action);
        case 'MouseDown':
        case 'MouseUp':
        case 'MouseMove':
        case 'WindowResized':
          return noop(state, action);
        default:
          return assertNever(action);
      }
    case 'Idle':
      switch (action.kind) {
        case 'MouseDown':
          return idleMouseDown(state, action);
        case 'WindowResized':
          return idleWindowResized(state, action);
        case 'ImagesLoaded':
        case 'MouseUp':
        case 'MouseMove':
          return noop(state, action);
        default:
          return assertNever(action);
      }
    case 'Dragging':
      switch (action.kind) {
        case 'MouseUp':
          return draggingMouseUp(state, action);
        case 'MouseMove':
          return draggingMouseMove(state, action);
        case 'MouseDown':
        case 'ImagesLoaded':
        case 'WindowResized':
          return noop(state, action);
        default:
          return assertNever(action);
      }
    default:
      return assertNever(state);
  }
};
