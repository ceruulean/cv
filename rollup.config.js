import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {terser} from 'rollup-plugin-terser';

export default {
  input: 'index.js',
  output: [{
    file: './public/dist.js',
    format: 'iife'
  },
  {
    file: './public/dist.min.js',
    format: 'iife',
    name: 'version',
    plugins: [terser()]
  }],
  plugins: [
    resolve(),
    ]
};