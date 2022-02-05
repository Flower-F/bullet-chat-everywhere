module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              esModule: false,
              module: true,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.tsx?$/i,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|gif|jpe?g)$/i,
        type: "asset",
        generator: {
          filename: "img/[name].[hash:6][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 25 * 1024,
          },
        },
      },
      {
        test: /\.(ttf|woff2?)$/i,
        type: "asset/resource",
        generator: {
          filename: "font/[name].[hash:6][ext]",
        },
      },
      {
        test: /\.jsx?$/i,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
    ],
  },
};
