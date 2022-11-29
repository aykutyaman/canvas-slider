import { render } from '@testing-library/react';

import CanvasSlider from './canvas-slider';

describe('CanvasSlider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CanvasSlider />);
    expect(baseElement).toBeTruthy();
  });
});
