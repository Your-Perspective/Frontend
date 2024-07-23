/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9290",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "157.230.45.176",
        port: "9290",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cpworldgroup.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
