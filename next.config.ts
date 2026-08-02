import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "query", key: "view", value: "salary" }],
        destination: "/custo-da-hora",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
