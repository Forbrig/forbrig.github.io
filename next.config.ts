import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  webpack: (config) => {
    // Add SVGR rule
    config.module.rules.push(
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: { not: /\.(css|scss|sass)$/ },
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              typescript: true,
              ext: "tsx",
            },
          },
        ],
      }
    );

    return config;
  },
};

export default nextConfig;
