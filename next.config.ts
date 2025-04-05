import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "google-site-verification",
            value: "YOUR_VERIFICATION_CODE",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
