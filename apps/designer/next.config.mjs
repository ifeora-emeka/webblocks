/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: ['mongoose'],
  transpilePackages: ["@repo/designer", "@repo/ui"],

};

export default nextConfig;
