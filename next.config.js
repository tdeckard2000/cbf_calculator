/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    NEXT_PUBLIC_SETTINGS_PASSWORD: process.env.NEXT_PUBLIC_SETTINGS_PASSWORD
  }
}

module.exports = nextConfig
