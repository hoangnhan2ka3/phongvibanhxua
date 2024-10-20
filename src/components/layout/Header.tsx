"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRef } from "react"

import { useShrinkOnScroll } from "@/hooks"
import { cn } from "@/lib/utils"

export default function Header() {
    const headerLinks = [
        { idx: 1, href: "/", title: "Trang chủ" },
        { idx: 2, href: "/menu", title: "Menu", expandable: true },
        { idx: 3, href: "/blog", title: "Blog", expandable: true },
        { idx: 4, href: "/about", title: "Về chúng mình" },
        { idx: 5, href: "/contact", title: "Liên hệ" }
    ]

    const pathname = usePathname()
    const ref = useRef<HTMLDivElement>(null)

    const translateY = useShrinkOnScroll(ref, 500)

    return (
        <motion.header
            style={{
                translateY: `${translateY.toString()}px`
            }}
            className={cn(
                "sticky top-0 z-50 flex flex-col bg-pvbx-light"
            )}
        >
            <div
                ref={ref}
                className={cn(
                    "grid h-36 w-full place-items-center overflow-hidden"
                )}
            >
                <Image
                    className={cn(
                        "w-64"
                    )}
                    src="/logo/logo_phongvibanhxua.svg"
                    alt="Phong Vị Bánh Xưa logo"
                    width={402}
                    height={118}
                    priority
                />
            </div>
            <div className={cn(
                "flex h-12 items-center bg-pvbx-primary px-32 font-serif text-xl leading-[1.75] text-pvbx-light"
            )}>
                <motion.div style={{
                    scaleX: 1
                }} className={cn(
                    "flex h-full items-center justify-center bg-pvbx-light px-4"
                )}>
                    <Image
                        className={cn(
                            "w-24"
                        )}
                        src="/logo/logo_phongvibanhxua.svg"
                        alt="Phong Vị Bánh Xưa logo"
                        width={402}
                        height={118}
                        priority
                    />
                </motion.div>
                {headerLinks.map((link) => {
                    const isActiveLink = pathname === link.href || pathname.startsWith(link.href + "/")

                    return (
                        <Link key={link.idx} href={link.href} className={cn(
                            "flex h-inherit flex-1 items-start justify-center gap-1 px-4 duration-250",
                            isActiveLink ? "bg-pvbx-tertiary text-pvbx-dark" : {
                                hover: "backdrop-brightness-90 duration-0",
                                active: "backdrop-brightness-75"
                            }
                        )}>
                            {link.title}
                            {link.expandable && (
                                <ChevronDown size={24} className="h-inherit" />
                            )}
                        </Link>
                    )
                })}
            </div>
        </motion.header>
    )
}
