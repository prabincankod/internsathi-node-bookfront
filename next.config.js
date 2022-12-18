/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_API_URL: process.env.BASE_API_URL,
  }
}

module.exports = nextConfig
