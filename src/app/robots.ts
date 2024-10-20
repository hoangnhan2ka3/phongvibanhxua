import { type MetadataRoute } from "next"

import { appConfig } from "@/configs/app.config"

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: ["/"],
            disallow: [
                "/api/",
                "/admin/"
            ]
        },
        sitemap: `${appConfig.url}/sitemap.xml`
    }
}

/**
 * Enforces that this route is used as static rendering
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
 */
export const dynamic = "error"
