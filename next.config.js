/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }, // business photos + gallery images come from many hosts (Supabase storage, scraped sources)
    ],
  },
  // View Transitions API is used directly via the browser API in templates
  // (document.startViewTransition) rather than a Next.js experimental flag —
  // that flag isn't stable in Next 14.2. Revisit if you upgrade to a version
  // where it's supported natively.
};

module.exports = nextConfig;
