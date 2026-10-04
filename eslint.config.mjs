// archprint:start (managed by archprint; run `archprint eject` to remove)
import archprintRules from './.archprint/eslint.mjs';
// archprint:end
import tseslint from 'typescript-eslint';

export default [...archprintRules /* archprint:managed */, { ignores: ['.next/', 'node_modules/'] }, ...tseslint.configs.recommended];
