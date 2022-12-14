const path = require("path");

module.exports = [
  {
    name: "umd",
    entry: "./src/automa.js",
    output: {
      filename: "umd.js",
      path: path.resolve(__dirname, "dist/"),
      libraryTarget: "umd",
    },
    mode: "production",
  },
  {
    name: "bundle:build",
    entry: "./demo/module_usage/main.js",
    output: {
      path: path.resolve(__dirname, "demo/module_usage/"),
      filename: "main.bundle.js",
    },
    mode: "production",
  },
  {
    name: "bundle:watch",
    entry: "./demo/module_usage/main.js",
    watch: true,
    output: {
      path: path.resolve(__dirname, "demo/module_usage/"),
      filename: "main.bundle.js",
    },
    mode: "development",
  },
];
