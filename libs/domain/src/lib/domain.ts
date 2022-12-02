export type Canvas = CanvasRenderingContext2D;

export type Image = {
  element: HTMLImageElement;
  sx: number;
  sy: number;
  sWidth: number;
  sHeight: number;
  dx: number;
  dy: number;
  dWidth: number;
  dHeight: number;
  /*
    - it's the initial image dx, when the user starts moving
    the images. It's changed only with mouseup event. When the mouseup
    event will be fired it'll be updated with the current dx of the
    image.
   */
  initialdx: number;
  leftalignedx: number;
  rightalignedx: number;
  centerShiftX: number;
};

export type Images = {
  images: Array<Image>;
};

export type Loading = {
  kind: 'Loading';
};

export type Idle = {
  kind: 'Idle';
} & Images;

export type Dragging = {
  kind: 'Dragging';
  /*
    This position will be set with mouse down event. It'll be used in
    combination with initialdx of the image to make the calculation
    of the image dx idempotent. So, dispatching the dragging event
    multiple times with the same input will result the same state.
   */
  pointerx: number;
} & Images;

export type State = Loading | Idle | Dragging;

export const initialState: State = {
  kind: 'Loading',
};

// actions
export type MouseDown = {
  kind: 'MouseDown';
  payload: {
    event: MouseEvent;
    canvas: Canvas;
  };
};

export type MouseUp = {
  kind: 'MouseUp';
  payload: {
    event: MouseEvent;
    canvas: Canvas;
  };
};

export type MouseMove = {
  kind: 'MouseMove';
  payload: {
    event: MouseEvent;
    canvas: Canvas;
  };
};

export type ImagesPayload = {
  images: Array<HTMLImageElement>;
  canvas: Canvas;
};

export type ImagesLoaded = {
  kind: 'ImagesLoaded';
  payload: ImagesPayload;
};

export type WindowResized = {
  kind: 'WindowResized';
  payload: Omit<ImagesPayload, 'images'>;
};

export type Action =
  | MouseDown
  | MouseUp
  | MouseMove
  | ImagesLoaded
  | WindowResized;

// Action creators
export type MousePayload = {
  event: MouseEvent;
  canvas: Canvas;
};
export const mouseDown = (payload: MousePayload): MouseDown => ({
  kind: 'MouseDown',
  payload,
});
export const mouseUp = (payload: MousePayload): MouseUp => ({
  kind: 'MouseUp',
  payload,
});
export const mouseMove = (payload: MousePayload): MouseMove => ({
  kind: 'MouseMove',
  payload,
});
export const imagesLoaded = (payload: ImagesPayload): ImagesLoaded => ({
  kind: 'ImagesLoaded',
  payload,
});

export const windowResized = (
  payload: Omit<ImagesPayload, 'images'>
): WindowResized => ({
  kind: 'WindowResized',
  payload,
});
