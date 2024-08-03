/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: 'export',
  serverRuntimeConfig: ['mongoose'],
  transpilePackages: ["@repo/designer", "@repo/ui"],
  experimental: {
    // reactCompiler: {
    //   compilationMode: 'annotation'
    // }
  }
};

export default nextConfig;
