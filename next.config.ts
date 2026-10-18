import type { NextConfig } from "next";

const supabaseHost = "https://ptzzkubcmzqcofohqbst.supabase.co";
const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline' https://connect.facebook.net https://www.clarity.ms https://*.clarity.ms https://c.bing.com${isDev ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self'",
      `img-src 'self' data: blob: ${supabaseHost} https://www.facebook.com https://www.clarity.ms https://*.clarity.ms https://c.bing.com`,
      `media-src 'self' ${supabaseHost}`,
      "connect-src 'self' https://www.facebook.com https://connect.facebook.net https://www.clarity.ms https://*.clarity.ms https://c.bing.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      ...(isDev ? [] : ["upgrade-insecure-requests"]),
    ].join("; "),
  },
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains",
        },
      ]),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  async headers() {
    // Only the post-acquisition page embeds Eduzz's official confirmation script.
    const thankYouSources: Record<string, string> = {
      "script-src": "https://cdn.eduzzcdn.com/sun/thankyou/thankyou.js",
      "connect-src": "https://elements-api.eduzz.com https://pixel.eduzz.info",
      "style-src": "https://fonts.googleapis.com",
      "font-src": "https://fonts.gstatic.com",
      "img-src": "https://cdn.eduzzcdn.com",
    };
    const thankYouHeaders = securityHeaders.map((header) =>
      header.key === "Content-Security-Policy"
        ? {
            ...header,
            value: header.value
              .split("; ")
              .map((directive) => {
                const extra = thankYouSources[directive.split(" ")[0]];
                return extra ? `${directive} ${extra}` : directive;
              })
              .join("; "),
          }
        : header,
    );
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/skill-gratuita", headers: thankYouHeaders },
    ];
  },
  images: {
    qualities: [75, 85, 90, 95, 100],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ptzzkubcmzqcofohqbst.supabase.co",
        pathname: "/storage/v1/object/public/marketing/**",
      },
    ],
  },
};

export default nextConfig;
