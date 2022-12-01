import { useEffect, useReducer, useRef } from 'react';
import { reducer } from '@publitas/reducers';
import * as D from '@publitas/domain';
import { useMediaQuery } from '@publitas/hooks/use-media-query';

export const useCanvas = () => {
  const xs = useMediaQuery('xs');
  const sm = useMediaQuery('sm');
  const md = useMediaQuery('md');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  const [state, dispatch] = useReducer(reducer, D.initialState);

  // Resize responsively canvas size
  useEffect(() => {
    const ctx = canvasCtxRef.current;
    if (canvasRef.current && ctx) {
      if (md) {
        canvasRef.current.width = 990;
        canvasRef.current.height = 618.75;
      } else if (sm) {
        canvasRef.current.width = 600;
        canvasRef.current.height = 375;
      } else {
        canvasRef.current.width = 340;
        canvasRef.current.height = 212.5;
      }

      const imagesNodes = canvasRef.current.children;
      const images = Array.from(imagesNodes) as Array<HTMLImageElement>;
      dispatch(
        D.windowResized({
          canvas: ctx,
          images,
        })
      );
    }
  }, [xs, sm, md]);

  // Initialize canvasCtxRef
  useEffect(() => {
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
    }
  }, []);

  // Load images taking them from the canvas children
  useEffect(() => {
    if (state.kind === 'Loading') {
      if (canvasRef.current && canvasCtxRef.current) {
        const ctx = canvasCtxRef.current;
        ctx.fillStyle = '#000000';

        const imagesNodes = canvasRef.current.children;
        const images = Array.from(imagesNodes) as Array<HTMLImageElement>;
        dispatch(
          D.imagesLoaded({
            canvas: ctx,
            images,
          })
        );
      }
    }
  }, [state]);

  // Draw or redraw images onto canvas
  useEffect(() => {
    if (state.kind === 'Idle' || state.kind === 'Dragging') {
      if (canvasRef.current && canvasCtxRef.current) {
        const ctx = canvasCtxRef.current;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        state.images.forEach((image) => {
          const { dHeight, dWidth, dx, dy, element, sHeight, sWidth, sx, sy } =
            image;

          ctx.drawImage(
            element,
            sx,
            sy,
            sWidth,
            sHeight,
            dx,
            dy,
            dWidth,
            dHeight
          );
        });
      }
    }
  }, [state]);

  // Register mouse event listeners
  useEffect(() => {
    const ctx = canvasCtxRef.current;

    const mousedown = (event: MouseEvent) => {
      if (ctx) {
        dispatch(
          D.mouseDown({
            event,
            canvas: ctx,
          })
        );
      }
    };

    const mouseup = (event: MouseEvent) => {
      if (ctx) {
        dispatch(
          D.mouseUp({
            event,
            canvas: ctx,
          })
        );
      }
    };
    const mousemove = (event: MouseEvent) => {
      if (ctx) {
        dispatch(
          D.mouseMove({
            event,
            canvas: ctx,
          })
        );
      }
    };
    if (canvasRef.current) {
      canvasRef.current.addEventListener('mousedown', mousedown);
    }
    document.addEventListener('mouseup', mouseup);
    document.addEventListener('mousemove', mousemove);

    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('mousedown', mousedown);
      }
      document.body.removeEventListener('mouseup', mouseup);
      document.removeEventListener('mousemove', mousemove);
    };
  }, []);

  return canvasRef;
};
