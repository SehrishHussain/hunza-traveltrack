/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // <- enables App Router
  },
}

module.exports = nextConfig
