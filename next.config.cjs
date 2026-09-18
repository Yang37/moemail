const withPWA = require('next-pwa')
const createNextIntlPlugin = require('next-intl/plugin')
const { setupDevPlatform } = require('@cloudflare/next-on-pages/next-dev')

async function setup() {
  if (process.env.NODE_ENV === 'development') {
    await setupDevPlatform()
  }
}

setup()

const withNextIntl = createNextIntlPlugin('./app/i18n/request.ts')

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      }
    ],
  },
}

const withPWAConfigured = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

const configWithPWA = withPWAConfigured(nextConfig)

module.exports = withNextIntl(configWithPWA)
