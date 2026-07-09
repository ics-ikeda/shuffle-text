export default {
  input: 'src/ShuffleText.ts',
  output: [
    {
      format: 'umd',
      name: 'ShuffleText',
      file: 'build/shuffle-text.js',
      strict: true
    },
    {
      format: 'umd',
      name: 'ShuffleText',
      file: 'build/shuffle-text.min.js',
      strict: true,
      minify: true
    },
    {
      format: 'es',
      file: 'build/shuffle-text.module.js'
    }
  ]
};
