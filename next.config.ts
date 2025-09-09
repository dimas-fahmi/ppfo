import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://images.pexels.com/**"),
      new URL("https://zvgpixcwdvbogm3e.public.blob.vercel-storage.com/**"),
    ],
  },
};

export default nextConfig;
