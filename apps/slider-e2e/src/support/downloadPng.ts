export const downloadPng = (filename: string) => {
  expect(filename).to.be.a('string');

  return cy.get('canvas').then(($canvas) => {
    const url = $canvas[0].toDataURL();
    const data = url.replace(/^data:image\/png;base64,/, '');
    cy.writeFile(filename, data, 'base64');
    cy.wrap(filename);
  });
};
