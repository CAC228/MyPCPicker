import next from 'next';

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.alias = {
          ...config.resolve.alias,
          '@': path.resolve(__dirname, './'),
        };
    
        return config;
      },
    reactStrictMode: true,
    
};

export default nextConfig;