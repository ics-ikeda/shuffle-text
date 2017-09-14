import typescript from 'rollup-plugin-typescript';

export default {
  input: 'src/ShuffleText.ts',
  indent: '\t',
  plugins: [
    typescript()
  ],
  sourcemap: true,
  output: [
    {
      format: 'umd',
      name: 'ShuffleText',
      file: 'build/shuffle-text.js'
    },
    {
      format: 'es',
      file: 'build/shuffle-text.module.js'
    }
  ]
};
