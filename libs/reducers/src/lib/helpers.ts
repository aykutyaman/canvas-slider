import * as D from '@publitas/domain';

export const assertNever = (value: never): never => {
  throw new Error('This value should be nnreacable' + value);
};
export const noop = (state: D.State, _action: D.Action): D.State => {
  // console.log(`noop for: ${state.type} - ${_action.type}`);
  return state;
};

/*
  Check if the left or right scrolling overflows the canvas for the first or last image.
  If it's the case return leftalignedx or rightalignedx. Otherwise return the passed images
*/
export const withAlignment = (images: D.Image[]): D.Image[] => {
  const [min, max] = images.reduce(
    ([min, max], image) => {
      return [image.dx < min ? image.dx : min, image.dx > max ? image.dx : max];
    },
    [+Infinity, -Infinity]
  );

  const centerShiftX = images.length > 0 ? images[0].centerShiftX : 0;

  if (min - centerShiftX > 0) {
    return mapDX(images, (image) => image.leftalignedx);
  }

  if (max < 0) {
    return mapDX(images, (image) => image.rightalignedx);
  }
  return images;
};

export const mapDX = (images: D.Image[], dx: (image: D.Image) => number) =>
  images.map((image) => {
    return {
      ...image,
      dx: dx(image),
    };
  });

export const calculateImage =
  (canvas: HTMLCanvasElement) =>
  (img: HTMLImageElement, i: number, arr: HTMLImageElement[]): D.Image => {
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
      centerShiftX,
    };
  };
