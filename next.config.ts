import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mpogczuwetybialqpmqt.supabase.co",
      },
    ],
  },
};

export default nextConfig;
