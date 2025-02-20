/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Server Components
  reactStrictMode: true,
  
  // Optimize image handling
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Improve performance with static exports if applicable
  // output: 'export',
  
  // Optional: Configure webpack for custom optimizations
  webpack: (config) => {
    // Add any custom webpack configurations here
    return config;
  }
};

export default nextConfig;
