import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    // Find the existing rule that handles SVG files
    const fileLoaderRule = config.module.rules.find((rule: unknown) => {
      const ruleObj = rule as { test?: { test?: (str: string) => boolean } };
      return ruleObj?.test?.test?.(".svg");
    });

    // Only modify webpack config if we found the file loader rule
    if (fileLoaderRule) {
      config.module.rules.push(
        // Reapply the existing rule, but only for svg imports ending in ?url
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // *.svg?url
        },
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
                // svgoConfig: {
                //   plugins: [
                //     {
                //       name: "preset-default",
                //       params: {
                //         overrides: {
                //           removeViewBox: false,
                //         },
                //       },
                //     },
                //   ],
                // },
              },
            },
          ],
        }
      );

      // Modify the file loader rule to ignore *.svg, since we have it handled now.
      (fileLoaderRule as { exclude?: RegExp }).exclude = /\.svg$/i;
    }

    return config;
  },
};

export default nextConfig;
