import { compare } from 'odiff-bin';
import * as path from 'path';
import * as os from 'os';
import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';
import { CompareArgs } from './src/support/CompareArgs';

const osName = os.platform();

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    setupNodeEvents(on, _config) {
      on('task', {
        async compare({ filename, options }: CompareArgs) {
          const baseFolder = 'images';
          const baseImage = path.join(
            baseFolder,
            osName,
            path.basename(filename)
          );
          const newImage = filename;
          const diffImage = 'diff.png';
          console.log(
            'comparing base image %s to the new image %s',
            baseImage,
            newImage
          );
          if (options) {
            console.log('odiff options %o', options);
          }
          const started = +new Date();

          const result = await compare(baseImage, newImage, diffImage, options);

          const finished = +new Date();
          const elapsed = finished - started;
          console.log('odiff took %dms', elapsed);

          console.log(result);
          return result;
        },
      });
    },
  },
});
