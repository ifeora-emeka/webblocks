/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: ['mongoose'],
  transpilePackages: ["@repo/designer", "@repo/ui"],
  experimental: {
    // reactCompiler: {
    //   compilationMode: 'annotation'
    // }
  }
};

export default nextConfig;
