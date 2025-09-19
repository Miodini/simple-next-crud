import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: '/simple-next-crud',
  basePath: '/simple-next-crud',
  compiler: {
    styledComponents: true
  },
  images: {
    unoptimized: true
  },
  output: 'export',
};

export default nextConfig;
