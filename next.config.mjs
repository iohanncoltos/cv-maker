const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [],
  },
  webpack: (config) => {
    // Fix for html2pdf.js and other browser-only libraries
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    }
    return config
  },
}

export default nextConfig