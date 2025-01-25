/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    DADATA_URL: process.env.DADATA_URL,
    DADATA_TOKEN: process.env.DADATA_TOKEN,
  },
};

export default nextConfig;
