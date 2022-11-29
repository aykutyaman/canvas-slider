import { useCanvas } from '@publitas/hooks/use-canvas';
import styles from './canvas-slider.module.css';

export interface CanvasSliderProps {
  children?: React.ReactNode;
}

export function CanvasSlider({ children }: CanvasSliderProps) {
  const canvasRef = useCanvas();
  return (
    <canvas
      ref={canvasRef}
      width="640"
      height="400"
      className={styles.container}
    >
      {children}
    </canvas>
  );
}

export default CanvasSlider;
