/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9290',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cpworldgroup.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    backend_url: "http://localhost:9290/api",
  },
};

export default nextConfig;
