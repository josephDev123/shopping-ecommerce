/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // hostname: "firebasestorage.googleapis.com",
        hostname: "res.cloudinary.com",
        port: "",
        // pathname: "/v0/b/e-commerce-c0b3d.appspot.com/**",
        pathname: "/drm0sixwc/image/upload/v1764346737/products/*",
      },
    ],
  },
  // experimental: {
  //   serverComponentsExternalPackages: ["bcrypt"],
  // },
};

export default nextConfig;
