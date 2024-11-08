import { type NextConfig } from "next"
import { type NextJsWebpackConfig } from "next/dist/server/config-shared"

export default {
    reactStrictMode: true,
    poweredByHeader: false,
    experimental: {
        reactCompiler: true,
        turbo: {
            resolveExtensions: [".mdx", ".tsx", ".ts", ".js", ".mjs", ".json"]
        }
    },
    devIndicators: {
        buildActivityPosition: "bottom-right"
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["warn", "error"] } : false
    },
    typescript: {
        ignoreBuildErrors: true
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    webpack: (config: NextJsWebpackConfig & {
        resolve: {
            fallback: {
                fs: boolean
            }
        }
    }) => {
        config.resolve.fallback = {
            fs: false
        }
        return config
    },
    images: {
        remotePatterns: [{
            protocol: "https",
            hostname: "lh3.googleusercontent.com",
            port: "",
            pathname: "/a/**"
        }, {
            protocol: "https",
            hostname: "platform-lookaside.fbsbx.com",
            port: "",
            pathname: "/platform/profilepic/**"
        }, {
            protocol: "https",
            hostname: "graph.facebook.com",
            port: "",
            pathname: "/**"
        }, {
            protocol: "https",
            hostname: "avatars.githubusercontent.com",
            port: "",
            pathname: "/u/**"
        }, {
            protocol: "https",
            hostname: "firebasestorage.googleapis.com",
            port: "",
            pathname: "/v0/b/phongvibanhxua.appspot.com/**"
        }]
    },
    async headers() {
        return [{
            source: "/api/auth/:slug",
            headers: [
                {
                    key: "Cache-Control",
                    value: "no-store, max-age=0"
                }
            ]
        }, {
            source: "/:path*{/}?",
            headers: [{
                key: "Cross-Origin-Embedder-Policy",
                value: "same-origin"
            }, {
                key: "Cross-Origin-Opener-Policy",
                value: "same-origin"
            }, {
                key: "Cross-Origin-Resource-Policy",
                value: "cross-origin"
            }, {
                key: "Expect-CT",
                value: "max-age=86400, enforce"
            }, {
                key: "Permissions-Policy",
                value: "geolocation=(), microphone=(), camera=(), fullscreen=*"
            }, {
                key: "Referrer-Policy",
                value: "same-origin"
            }, {
                key: "Set-Cookie",
                value: "HttpOnly; Secure; SameSite=None"
            }, {
                key: "Strict-Transport-Security",
                value: "max-age=63072000; includeSubDomains; preload"
            }, {
                key: "X-Content-Type-Options",
                value: "nosniff"
            }, {
                key: "X-DNS-Prefetch-Control",
                value: "on"
            }, {
                key: "X-Download-Options",
                value: "noopen"
            }, {
                key: "X-Frame-Options",
                value: "SAMEORIGIN"
            }, {
                key: "X-Permitted-Cross-Domain-Policies",
                value: "none"
            }, {
                key: "X-XSS-Protection",
                value: "1; mode=block"
            }, {
                key: "Accept-Ch",
                value: "Sec-Ch-Viewport-Width, Sec-Ch-Width, Sec-Ch-Dpr, Sec-Ch-Ua-Platform-Version, Sec-Ch-Ua-Full-Version, Sec-Ch-Ua-Arch, Sec-Ch-Ua-Bitness, Sec-Ch-Ua-Model"
            }]
        }]
    }
} satisfies NextConfig
