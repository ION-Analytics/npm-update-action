const commonjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')
const { nodeResolve } = require('@rollup/plugin-node-resolve')

module.exports = {
  input: 'src/main.js',
  output: {
    dir: 'dist',
    format: 'cjs',
    exports: 'auto',
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    json()
  ],
}
