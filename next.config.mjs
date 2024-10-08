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
        protocol: "https",
        hostname: "pub-631e8a8ccb574df6b8649128e21c164a.r2.dev",
        port: "",
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
        hostname: "yp-backend.ddkhdev.lol",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cpworldgroup.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
