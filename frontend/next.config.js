/** @type {import('next').NextConfig} */

module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: `${process.env.PUBLIC_BACKEND_URL}/api/:path*`,
        },
      ]
    }
  }
  
