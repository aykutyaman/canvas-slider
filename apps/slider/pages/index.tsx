import { useEffect, useReducer, useRef } from 'react';
import styles from './index.module.css';
import { reducer } from '@publitas/reducers';
import * as D from '@publitas/domain';
import { useCanvas } from '@publitas/hooks/use-canvas';

export function Index() {
  const canvasRef = useCanvas();
  return (
    <div className={styles.page} id="hello">
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
