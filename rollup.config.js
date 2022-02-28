import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import pkg from "./package.json";
import postcss from "rollup-plugin-postcss";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: "src/lib/index.js",
  output: {
    file: pkg.main,
    format: "esm",
  },
  external: ["react", "react-dom"],
  plugins: [
    postcss({
      config: {
        path: "./postcss.config.js",
      },
      extensions: [".css"],
      minimize: true,
      inject: {
        insertAt: "top",
      },
    }),
    babel({
      exclude: "node_modules/**",
    }),
    resolve(),
    commonjs({
      include: /node_modules/,
      namedExports: {
        flexsearch: ["Index"],
        "react-dom": ["createPortal"],
        "react/index.js": [
          "Component",
          "PureComponent",
          "Fragment",
          "Children",
          "createElement",
        ],
        "react/jsx-runtime": ["jsx", "jsxs", "Fragment"],
        "react/jsx-dev-runtime": ["jsx", "jsxs", "jsxDEV"],
      },
    }),
  ],
};
