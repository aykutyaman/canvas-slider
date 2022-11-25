import { useEffect, useRef } from 'react';
import styles from './index.module.css';

type Canvas = CanvasRenderingContext2D;

function drawImageScaled(img: HTMLImageElement, ctx: Canvas, x: number) {
  const canvas = ctx.canvas;
  const hRatio = canvas.width / img.width;
  const vRatio = canvas.height / img.height;
  const ratio = Math.min(hRatio, vRatio);
  const centerShift_x = (canvas.width - img.width * ratio) / 2;
  const centerShift_y = (canvas.height - img.height * ratio) / 2;

  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x + x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}
export function Index() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.fillStyle = '#000000';

    const imagesNodes = canvasRef.current.children;
    const imagesArray = Array.from(imagesNodes) as Array<HTMLImageElement>;

    const myImages = imagesArray.map((img, i) => {
      return { img, x: ctx.canvas.width * i };
    });

    let interval = 0;
    setInterval(() => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      interval = interval - 3;
      myImages.forEach((img) => {
        drawImageScaled(img.img, ctx, img.x + interval);
      });
    }, 300);
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
