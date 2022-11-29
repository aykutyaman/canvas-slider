import { useEffect, useReducer, useRef } from 'react';
import { reducer } from '@publitas/reducers';
import * as D from '@publitas/domain';

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  const [state, dispatch] = useReducer(reducer, D.initialState);

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

          ctx.beginPath();
          ctx.strokeStyle = '#f00'; // some color/style
          ctx.lineWidth = 2;
          ctx.strokeRect(dx, dy, dWidth, dHeight);
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