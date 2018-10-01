import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/main.js',
  output: {
    file: 'build/bundle.js',
    format: 'iife', // scriptタグの実行に適切な指定
  },
  plugins: [
    nodeResolve(), // Node.jsのモジュール読み込みに対応
  ],
};
