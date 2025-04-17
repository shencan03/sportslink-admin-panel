import { NextConfig } from "next";

const config: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard/news",
        permanent: true,
      },
    ];
  },
};

export default config;
