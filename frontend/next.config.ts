import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Activa el modo estricto de React
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Todas las rutas que comiencen con /api/
        destination: 'http://192.168.0.17:8080/api/:path*', // Redirige correctamente al backend
      },
    ];
  },
};

export default nextConfig;
