const { override } = require("customize-cra");
const cspHtmlWebpackPlugin = require("csp-html-webpack-plugin");

const cspConfigPolicy = {
  "default-src": "*",
  "object-src": "*",
  "script-src": ["*", "'unsafe-inline'", "'unsafe-eval'"],
  "style-src": "*",
  "connect-src": "*",
};

function addCspHtmlWebpackPlugin(config) {
  if (process.env.NODE_ENV === "production") {
    config.plugins.push(new cspHtmlWebpackPlugin(cspConfigPolicy));
  }

  return config;
}

module.exports = {
  webpack: override(addCspHtmlWebpackPlugin),
};
