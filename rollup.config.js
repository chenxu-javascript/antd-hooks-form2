import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from "rollup-plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import babel from "rollup-plugin-babel";
import json from '@rollup/plugin-json';
import url from "rollup-plugin-url";

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
  input: "./src/index.ts",
  output: [
    {
      file: "dist/utils.js",
      format: "cjs", // immediately-invoked function expression — suitable for <script> tags
      exports: "named"
    },
    {
      file: `dist/utils.es.js`,
      format: "esm"
    }
  ],
  plugins: [
    url(),
    peerDepsExternal(),
    nodeResolve({
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
    }),
    typescript({
      tsconfig: "./tsconfig.json",
      clean: true
    }),
    resolve(), // tells Rollup how to find date-fns in node_modules
    babel({
      exclude: "node_modules/**",
      babelrc: false,
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      plugins: [
        [
          "import",
          {
            libraryName: "antd",
            style: true
          }
        ]
      ]
    }),
    commonjs({
      include: /\**node_modules\**/
    }),
    postcss({
      extensions: [".less", ".css"],
      modules: true,
      use: [["less", { javascriptEnabled: true }]]
    }),
    json(),
    production && terser() // minify, but only in production
  ],
  external: ["react", "antd"]
};