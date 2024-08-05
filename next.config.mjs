/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/e-commerce-c0b3d.appspot.com/**",
      },
    ],
  },
  // experimental: {
  //   serverComponentsExternalPackages: ["bcrypt"],
  // },
};

export default nextConfig;
