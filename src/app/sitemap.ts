import { type MetadataRoute } from "next"

import { appConfig } from "@/configs/app.config"

const currentDate = new Date().toISOString()

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: appConfig.url,
            lastModified: currentDate,
            changeFrequency: "daily",
            priority: 0.9
        },
        {
            url: `${appConfig.url}/home`,
            lastModified: currentDate,
            changeFrequency: "daily",
            priority: 1
        },
        // ...docEntries,
        {
            url: `${appConfig.url}/templates`,
            lastModified: currentDate,
            changeFrequency: "daily",
            priority: 0.9
        },
        {
            url: `${appConfig.url}/features`,
            lastModified: currentDate,
            changeFrequency: "daily",
            priority: 0.8
        },
        {
            url: `${appConfig.url}/docs`,
            lastModified: currentDate,
            changeFrequency: "daily",
            priority: 0.8
        },
        {
            url: `${appConfig.url}/pricing`,
            lastModified: currentDate,
            changeFrequency: "daily",
            priority: 0.8
        },
        [
            "privacy-policy",
            "cookies-policy",
            "terms-and-conditions",
            "disclaimer"
        ].map((slug) => ({
            url: `${appConfig.url}/${slug}`,
            lastModified: currentDate,
            changeFrequency: "yearly",
            priority: 0.1
        })),
        {
            url: `${appConfig.url}/auth/sign-in`,
            lastModified: currentDate,
            changeFrequency: "daily",
            priority: 0.8
        },
        [
            "privacy-policy",
            "cookies-policy",
            "terms-and-conditions",
            "disclaimer"
        ].map((slug) => ({
            url: `${appConfig.url}/${slug}`,
            lastModified: currentDate,
            changeFrequency: "yearly",
            priority: 0.1
        }))
    ].flat() as MetadataRoute.Sitemap
}
