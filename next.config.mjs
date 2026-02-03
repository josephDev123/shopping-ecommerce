/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        // hostname: "firebasestorage.googleapis.com",
        hostname: "res.cloudinary.com",
        port: "",
        // pathname: "/v0/b/e-commerce-c0b3d.appspot.com/**",
        pathname: "/drm0sixwc/**",
      },
    ],
  },
  // experimental: {
  //   serverComponentsExternalPackages: ["bcrypt"],
  // },
};

export default nextConfig;
