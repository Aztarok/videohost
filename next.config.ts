import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "source.unsplash.com",
                port: "",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "example.com",
                port: "",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "loremflickr.com",
                port: "",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "jdasbabgtrfgdnbtstdp.supabase.co",
                port: "",
                pathname: "/**"
            }
        ]
    }
};

export default nextConfig;
