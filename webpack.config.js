const path = require("path");

module.exports = [
  {
    name: "umd",
    entry: "./src/automa.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "umd.js",
      library: "Automa",
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
];
