import nodeResolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import bundleSize from 'rollup-plugin-size';

const terserPlugin = terser({
  warnings: true,
  compress: {
    passes: 2
  }
});

const config = {
  input: 'disco.js',
  watch: {
    clearScreen: false
  },
  output: {
    format: 'iife',
    file: 'dist/disco.min.js',
    name: 'disco',
    strict: false, // Remove `use strict;`
    interop: false, // Remove `r=r&&r.hasOwnProperty("default")?r.default:r;`
    freeze: false, // Remove `Object.freeze()`
    esModule: false // Remove `esModule` property
  },
  plugins: [
    bundleSize(),
    nodeResolve(),
    // If we're building for production (npm run build
    // instead of npm run dev), minify
    terserPlugin
  ]
};

export default [
  config
];
