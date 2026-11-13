/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // این خط به Next.js می‌گه که ارورهای تایپ‌اسکریپت رو موقع بیلد نادیده بگیره
    ignoreBuildErrors: true,
  },
  eslint: {
    // این خط هم ارورهای ESLint رو نادیده می‌گیره
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
