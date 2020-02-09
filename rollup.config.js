import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'index.js',
  output: {
    file: './public/dist.js',
    format: 'iife'
  },
  plugins: [resolve()]
};