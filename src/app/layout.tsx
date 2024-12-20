import "@/styles/globals.css"

import { type Metadata, type Viewport } from "next"

import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import SectionSeparator from "@/components/layout/SectionSeparator"
import { appConfig } from "@/configs/app.config"
import { cn } from "@/lib/utils"
import * as fonts from "@/styles/fonts"

export const metadata: Metadata = {
    title: "Trang chủ | Phong vị bánh xưa",
    description: appConfig.description
}

export const viewport: Viewport = {
    width: "device-width",
    height: "device-height",
    initialScale: 1,
    viewportFit: "cover",
    minimumScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#000000" }
    ],
    colorScheme: "dark light"
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en" dir="ltr" translate="no"
            suppressHydrationWarning
            data-overlayscrollbars-initialize=""
            data-theme="light"
            className={cn(
                fonts.Nunito.variable,
                fonts.Lost_Type.variable,
                "bg-pvbx-background text-[0.9373dvw] font-medium text-pvbx-dark",
                {
                    selection: "bg-red-500 text-white text-shadow-none",
                    "2xl": "text-base"
                }
            )}
        >
            <head>
                <meta httpEquiv="x-ua-compatible" content="IE=edge" />
            </head>
            <body className="min-w-[1368px] text-pretty">
                <Header />
                <main className="relative z-1">
                    {children}
                    <SectionSeparator />
                </main>
                <Footer />
            </body>
        </html>
    )
}
