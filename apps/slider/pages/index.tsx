import { useEffect, useReducer, useRef } from 'react';
import styles from './index.module.css';
import { reducer } from '@publitas/reducers';
import * as D from '@publitas/domain';

export function Index() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [state, dispatch] = useReducer(reducer, D.initialState);

  useEffect(() => {
    if (state.kind === 'Loading') {
      const ctx = canvasRef.current.getContext('2d');
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
  }, [state]);

  useEffect(() => {
    if (state.kind === 'Idle' || state.kind === 'Dragging') {
      const ctx = canvasRef.current.getContext('2d');

      let intervalTime = 0;
      const interval = setInterval(() => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        intervalTime = intervalTime - 1;
        state.images.forEach((image) => {
          const { dHeight, dWidth, dx, dy, element, sHeight, sWidth, sx, sy } =
            image;

          ctx.drawImage(
            element,
            sx,
            sy,
            sWidth,
            sHeight,
            dx + intervalTime,
            dy,
            dWidth,
            dHeight
          );
        });
      }, 30);
      return () => {
        clearInterval(interval);
      };
    }
  }, [state]);

  useEffect(() => {
    const canvas = canvasRef;
    const ctx = canvas.current.getContext('2d');
    const mousedown = (event: MouseEvent) => {
      dispatch(
        D.mouseDown({
          event,
          canvas: ctx, // TODO: is it necessary? If not remove canvas dependecy
        })
      );
    };
    const mouseup = (event: MouseEvent) => {
      dispatch(
        D.mouseUp({
          event,
          canvas: ctx, // TODO: is it necessary? If not remove canvas dependecy
        })
      );
    };
    canvasRef.current.addEventListener('mousedown', mousedown);
    canvasRef.current.addEventListener('mouseup', mouseup);
    return () => {
      canvas.current.removeEventListener('mousedown', mousedown);
      canvas.current.removeEventListener('mouseup', mouseup);
    };
  }, []);

  return (
    <div className={styles.page}>
      <canvas
        ref={canvasRef}
        width="640"
        height="400"
        style={{ backgroundColor: 'gray' }}
      >
        <img src="/0.jpg" />
        <img src="/1.jpg" />
        <img src="/2.jpg" />
        <img src="/3.jpg" />
      </canvas>
    </div>
  );
}

export default Index;
