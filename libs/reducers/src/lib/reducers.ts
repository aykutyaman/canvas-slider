import * as D from '@publitas/domain';

const assertNever = (value: never): never => {
  throw new Error('This value should be nnreacable' + value);
};
const noop = (state: D.State, _action: D.Action): D.State => {
  // console.log(`noop for: ${state.type} - ${_action.type}`);
  return state;
};

export const loadingImagesLoaded = (
  _state: D.Loading,
  action: D.ImagesLoaded
): D.Idle => {
  const ctx = action.payload.canvas; // ctx.canvas;
  const canvas = ctx.canvas;
  const images: Array<D.Image> = action.payload.images.map((img, i) => {
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.min(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    return {
      element: img,
      sx: 0,
      sy: 0,
      sWidth: img.width,
      sHeight: img.height,
      dx: centerShift_x + i * canvas.width,
      dy: centerShift_y,
      dWidth: img.width * ratio,
      dHeight: img.height * ratio,
    };
  });

  return {
    kind: 'Idle',
    images,
  };
};

export const idleMouseDown = (
  state: D.Idle,
  _action: D.MouseDown
): D.Dragging => ({
  kind: 'Dragging',
  images: state.images,
});

export const draggingMouseUp = (
  state: D.Dragging,
  _action: D.MouseUp
): D.Idle => ({
  kind: 'Idle',
  images: state.images,
});

export const reducer = (state: D.State, action: D.Action): D.State => {
  switch (state.kind) {
    case 'Loading':
      switch (action.kind) {
        case 'ImagesLoaded':
          return loadingImagesLoaded(state, action);
        case 'MouseDown':
        case 'MouseUp':
        case 'MouseMove':
          return noop(state, action);
        default:
          return assertNever(action);
      }
    case 'Idle':
      switch (action.kind) {
        case 'MouseDown':
          console.log('MouseDown');
          return idleMouseDown(state, action);
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
          console.log('MOUSEUP');
          return draggingMouseUp(state, action);
        case 'MouseDown':
        case 'MouseMove':
        case 'ImagesLoaded':
          return noop(state, action);
        default:
          return assertNever(action);
      }
    default:
      return assertNever(state);
  }
};
