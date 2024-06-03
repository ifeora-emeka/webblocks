/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: ['mongoose'],
  transpilePackages: ["@repo/designer", "@repo/ui"],
  experimental: {
    // reactCompiler: {
    //   compilationMode: 'annotation'
    // }
  }
};

export default nextConfig;
