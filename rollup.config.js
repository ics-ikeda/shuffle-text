import typescript from 'rollup-plugin-typescript';

export default {
  entry: 'src/ShuffleText.ts',
  indent: '\t',
  plugins: [
    typescript()
  ],
  sourceMap: true,
  targets: [
    {
      format: 'umd',
      moduleName: 'clockmaker',
      dest: 'build/shuffle-text.js'
    },
    {
      format: 'es',
      dest: 'build/shuffle-text.module.js'
    }
  ]
};
