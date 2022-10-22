/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.graphql?$/,
      loader: "webpack-graphql-loader",
    });
  
    return config;
  },
}

module.exports = nextConfig
