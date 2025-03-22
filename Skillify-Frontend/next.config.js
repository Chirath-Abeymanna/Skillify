/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    MONGODB_URI: process.env.MONGODB_URI,
  },
  experimental: {
    sprFlushToDisk: process.env.CI ? false : true, // Disable static page generation during CI
  },
  async redirects() {
    if (process.env.CI) {
      return [
        {
          source: "/_not-found",
          destination: "/", // Redirect it to a valid page or handle differently
          permanent: false,
        },
      ];
    }
    return [];
  },
};

module.exports = nextConfig;
