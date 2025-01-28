/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    swcPlugins: [
      [
        'next-superjson-plugin',
        {
          excluded: [],
        },
      ],
    ],
  },
  images: {
    domains: ['s3.sa-east-1.amazonaws.com'],
  },
};

module.exports = nextConfig;
