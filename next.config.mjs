// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
//   reactStrictMode: true,
// };

// export default nextConfig;




// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'res.cloudinary.com',
//         pathname: '/**', // اجازه دسترسی به تمام مسیرهای این دامنه
//       },
//     ],
//   },
// }

// export default nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // اجازه دسترسی به تمام مسیرهای این دامنه
      },
    ],
  },
  // 🌟 ریدایرکت خودکار به روت مورد نظر شما
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home', // 👈 مسیر مورد نظرت را اینجا بنویس (مثلاً books/)
        permanent: true,
      },
    ]
  },
}

export default nextConfig