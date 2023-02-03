import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
// import dts from 'rollup-plugin-dts';
// import fg from 'fast-glob';

const packageJson = require('../packages/core/package.json');

const dependencies = [
    ...Object.keys(packageJson.peerDependencies ?? {}),
    ...Object.keys(packageJson.dependencies ?? {}),
    ...Object.keys(packageJson.devDependencies ?? {}),
];

function createPackageRegex(name) {
    return new RegExp(`^${name}(/.*)?`);
}

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true,
            },
        ],
        plugins: [
            resolve(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' }),
        ],
    },
    // {
    //   input: "dist/esm/types/index.d.ts",
    //   output: [{ file: "dist/index.d.ts", format: "esm" }],
    //   plugins: [dts()],
    // },
];
