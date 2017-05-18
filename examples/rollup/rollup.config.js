import nodeResolve  from 'rollup-plugin-node-resolve';

export default {
  entry: 'src/main.js',
  dest: 'build/bundle.js',
  plugins: [
    nodeResolve(), // Node.jsのモジュール読み込みに対応
  ],
  format : "iife", // scriptタグの実行に適切な指定
  sourceMap: false // ソースマップの出力
};
