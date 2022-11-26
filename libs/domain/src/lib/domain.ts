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
} & Images;

export type State = Loading | Idle | Dragging;

export const initialState: State = {
  kind: 'Loading',
};

// actions
type MouseDown = {
  kind: 'MouseDown';
  payload: {
    event: MouseEvent;
    canvas: Canvas;
  };
};

type MouseUp = {
  kind: 'MouseUp';
  payload: {
    event: MouseEvent;
    canvas: Canvas;
  };
};

type MouseMove = {
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

export type Action = MouseDown | MouseUp | MouseMove | ImagesLoaded;

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
