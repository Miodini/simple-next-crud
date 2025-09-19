import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: '/simple-next-crud',
  basePath: '/simple-next-crud',
  compiler: {
    styledComponents: true
  },
  output: 'export'
};

export default nextConfig;
