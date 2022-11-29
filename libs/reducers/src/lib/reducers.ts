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
  const images: Array<D.Image> = action.payload.images.map((img, i, arr) => {
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;

    const ratio = Math.min(hRatio, vRatio);

    const scaledImageWidth = img.width * ratio;
    const emptySpaceX = canvas.width - scaledImageWidth;
    const centerShiftX = emptySpaceX / 2;

    const scaledImageHeight = img.height * ratio;
    const emptySpaceY = canvas.height - scaledImageHeight;
    const centerShiftY = emptySpaceY / 2;

    /*
      If the with of the image fits perfectly into the canvas the centerShiftX will
      be zero. we move each image to the right multiplying the width
      of the canvas with the current image's iteration index.
     */
    const dx = centerShiftX + i * canvas.width;

    const rdx = -(
      centerShiftX +
      (arr.length - 1 - i) * canvas.width -
      centerShiftX
    );

    return {
      element: img,
      sx: 0,
      sy: 0,
      sWidth: img.width,
      sHeight: img.height,
      dx,
      dy: centerShiftY,
      dWidth: scaledImageWidth,
      dHeight: scaledImageHeight,
      initialdx: dx,
      leftalignedx: dx,
      rightalignedx: rdx,
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
  pointerx: _action.payload.event.clientX,
});

export const draggingMouseUp = (
  state: D.Dragging,
  _action: D.MouseUp
): D.Idle => ({
  kind: 'Idle',
  images: state.images.map((image) => {
    return {
      ...image,
      initialdx: image.dx,
    };
  }),
});

export const draggingMouseMove = (
  state: D.Dragging,
  action: D.MouseMove
): D.Dragging => {
  const clientX = action.payload.event.clientX;

  const images = state.images.map((image) => {
    return {
      ...image,
      dx: image.initialdx + clientX - state.pointerx,
    };
  });

  const minMax = images.reduce(
    ([min, max], image) => {
      return [image.dx < min ? image.dx : min, image.dx > max ? image.dx : max];
    },
    [+Infinity, -Infinity]
  );

  if (minMax[0] > 0) {
    const images = state.images.map((image) => {
      return {
        ...image,
        dx: image.leftalignedx,
      };
    });
    return {
      ...state,
      images,
    };
  }

  if (minMax[1] < 0) {
    const images = state.images.map((image) => {
      return {
        ...image,
        dx: image.rightalignedx,
      };
    });
    return {
      ...state,
      images,
    };
  }

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
          return noop(state, action);
        default:
          return assertNever(action);
      }
    case 'Idle':
      switch (action.kind) {
        case 'MouseDown':
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
          return draggingMouseUp(state, action);
        case 'MouseMove':
          return draggingMouseMove(state, action);
        case 'MouseDown':
        case 'ImagesLoaded':
          return noop(state, action);
        default:
          return assertNever(action);
      }
    default:
      return assertNever(state);
  }
};
