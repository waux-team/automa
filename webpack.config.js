const path = require("path");

module.exports = [
  {
    name: "umd",
    entry: "./src/automa.js",
    output: {
      filename: "umd.js",
      path: path.resolve(__dirname, "dist/automa"),
      libraryTarget: "umd",
    },
    mode: "production",
  },
  {
    name: "bundle",
    entry: "./demo/index.js",
    output: {
      path: path.resolve(__dirname, "demo"),
      filename: "index.bundle.js",
    },
    mode: "production",
  },
  {
    name: "comumd",
    entry: "./src/component.js",
    output: {
      filename: "umd.js",
      path: path.resolve(__dirname, "dist/component/"),
      libraryTarget: "umd",
    },
    mode: "production",
  },
];
