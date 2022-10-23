/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx"],
};

module.exports = nextConfig;
