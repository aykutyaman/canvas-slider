import { useCanvas } from '@publitas/hooks/use-canvas';
import * as styles from './canvas-slider.css';

export interface CanvasSliderProps {
  children?: React.ReactNode;
}

export function CanvasSlider({ children }: CanvasSliderProps) {
  const canvasRef = useCanvas();
  return (
    <canvas ref={canvasRef} className={styles.container}>
      {children}
    </canvas>
  );
}

export default CanvasSlider;
