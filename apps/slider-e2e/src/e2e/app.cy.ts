import { downloadPng } from '../support/downloadPng';
import ensureCanvasStatic from '../support/ensureCanvasStatic';
import looksSame from '../support/looksSame';

const platform = Cypress.platform;

describe('slider', () => {
  beforeEach(() => cy.visit('/'));

  it('should display images on the canvas', () => {
    const filename = 'idle.png';
    ensureCanvasStatic('canvas');

    // downloadPng(`./images/${platform}/${filename}`);
    looksSame(`./snapshots/${platform}/${filename}`, true);
  });

  it('should drag first image to left', () => {
    const filename = 'dragging-first-image-to-left.png';
    ensureCanvasStatic('canvas');

    cy.get('canvas')
      .trigger('mousedown', { clientX: 200, clientY: 200 })
      .trigger('mousemove', { clientX: 0, clientY: 0 })
      .trigger('mouseup');
    cy.log(platform);

    // downloadPng(`./images/${platform}/${filename}`);
    looksSame(`./snapshots/${platform}/${filename}`, true);
  });
});
