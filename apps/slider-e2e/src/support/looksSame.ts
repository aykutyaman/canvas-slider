import { CompareArgs } from './CompareArgs';
import { downloadPng } from './downloadPng';

const looksSame = (filename: string, match: boolean) =>
  downloadPng(filename).then((_filename) => {
    const filename = _filename as unknown as string;
    cy.log(filename);

    const compareArgs: CompareArgs = { filename, options: {} };

    cy.task('compare', compareArgs).should('deep.equal', {
      match,
    });
  });

export default looksSame;
