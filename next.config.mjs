/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/tasks',
        permanent: true,
      },
    ];
  },
  typescript: {
    // TODO: REMOVE THIS!!!
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
