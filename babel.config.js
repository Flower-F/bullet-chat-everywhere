const isDev = process.env.NODE_ENV !== "production";

const config = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        corejs: 3,
      },
    ],
    ["@babel/preset-react"],
    ["@babel/preset-typescript"],
  ],
};

if (isDev) {
  config.plugins = [["react-refresh/babel"]];
}

module.exports = config;
