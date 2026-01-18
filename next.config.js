/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/admin/projects/new',
        destination: '/admin',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
