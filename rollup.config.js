import { minify as htmlMinifier } from 'html-minifier-terser'
import replace from '@rollup/plugin-replace'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import cjs from "@rollup/plugin-commonjs";
import alias from "@rollup/plugin-alias";
import copy from 'rollup-plugin-copy'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import analyze from 'rollup-plugin-filesize'
import workerLoader from 'rollup-plugin-worker'

const dist = 'dist'
const bundleName = 'bundle.js'
const loaderName = '/loader/system.js'
const production = !process.env.ROLLUP_WATCH
const development = !production
const isBeautify = !!process.env.beautify

console.log('Build: '+ ( production? 'Production' : 'Development' ))
// process.env.NODE_ENV = production? 'production' : 'development';
// console.log('process.env.NODE_ENV', process.env.NODE_ENV)


/** @type {[import('rollup').RollupOptions]} */
const rollupOptions = [
  { 
    // config for loader bundle sorce with systemjs
    input: './loader.js',
    output: {
      file: dist + loaderName,
      format: 'iife'
    },
    plugins: [ resolve(), replace({ TRACING: true }), babel(), terser() ],
  },

  {
    input: 'src/index',
    preserveEntrySignatures: 'allow-extension',
    output: [{
      format: 'systemjs',
      sourcemap: development,// && 'inline',
      preserveModules: false,
      dir: 'dist',
      entryFileNames: 'scripts/'+ bundleName ,
      chunkFileNames: 'scripts/'+`[${ development || isBeautify? 'name':'hash' }].js`,
      banner: `self.importScripts && !self.System && importScripts('${loaderName}');`
    }],
    plugins: [
      alias({ entries: require('./package.json').alias }),
      resolve(),
      replace({ 'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development') }),
      copy({
        targets:[
          { src: 'src/assets', dest: dist },
          { src: 'index.html', dest: dist,
            transform: (content) => htmlMinifier( content.toString(), {
              removeAttributeQuotes: production,
              collapseWhitespace: production,
              collapseInlineTagWhitespace: production,
              minifyJS: { toplevel: true, output: { beautify: development } }
            })
          }
        ],
        copyOnce: true,
      }),
      babel({
        exclude: 'node_modules/**',
        // exclude: /node_modules/,
      }),
      postcss({
        extract: 'assets/css/style.css',
        minimize: production,
      }),
      workerLoader({
        exclude: 'node_modules/**'
      }),
      cjs(),

      production && analyze({ 
        showBrotliSize: true, showMinifiedSize: false,
      }),
      production && terser({
        compress: {
          drop_console: true,
        },
        mangle: true,
        nameCache: {},
        output: {
          beautify: isBeautify,
          indent_level: 2,
          comments: false,
        }
      })

    ],
    // external: ['react', 'react-dom']
  }
]

export default rollupOptions