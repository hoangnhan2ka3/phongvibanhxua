"use client"

import Image from "next/image"
import Link from "next/link"

import { useElementSize } from "@/hooks"
import { cn } from "@/lib/utils"

export default function Footer() {
    const detailInfos = [
        { idx: 1, title: "Người đại diện", content: "(Ông.) Đinh Minh Huân." },
        { idx: 2, title: "Số điện thoại", content: "0357 064 765." }
    ]
    const infoLinks = [
        { idx: 1, href: "/", title: "Trang chủ" },
        { idx: 2, href: "/menu", title: "Menu" },
        { idx: 3, href: "/blog", title: "Blog" },
        { idx: 4, href: "/about", title: "Về chúng mình" }
    ]
    const conditionLinks = [
        { idx: 1, href: "/", title: "Quy chế website" },
        { idx: 2, href: "/", title: "Bảo mật" },
        { idx: 3, href: "/", title: "Xuất hóa đơn GTGT" }
    ]
    const hotlineLinks = [
        { idx: 1, title: "Đặt hàng", content: "0357064765", supportTime: "07:00 - 22:30" },
        { idx: 2, title: "Hỗ trợ", content: "0357064765", supportTime: "07:00 - 22:30" }
    ]
    const contactInfos = [
        { idx: 1, href: "https://www.facebook.com/phongvi.banhxua", title: "Fanpage", content: "Phong Vị Bánh Xưa" },
        {
            idx: 2,
            href: "https://www.google.com/maps/place/Nh%C3%A0+V%C4%83n+h%C3%B3a+Sinh+vi%C3%AAn+TP.HCM/@10.8751312,106.8007233,15z/data=!4m6!3m5!1s0x3174d8a6b19d6763:0x143c54525028b2e!8m2!3d10.8751312!4d106.8007233!16s%2Fg%2F11hd1pf9gj?entry=ttu&g_ep=EgoyMDI0MTAyNy4wIKXMDSoASAFQAw%3D%3D",
            title: "Địa chỉ 1",
            content: "Nhà văn hóa sinh viên, khu Đại học Quốc gia TP. Hồ Chí Minh"
        },
        {
            idx: 3,
            href: "https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+FPT+TP.+HCM/@10.8411276,106.809883,15z/data=!4m6!3m5!1s0x31752731176b07b1:0xb752b24b379bae5e!8m2!3d10.8411276!4d106.809883!16s%2Fg%2F11j2zx_fz_?entry=ttu&g_ep=EgoyMDI0MTAyNy4wIKXMDSoASAFQAw%3D%3D",
            title: "Địa chỉ 2",
            content: "Lô E2a-7, Đường D1, Phường Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh"
        },
        { idx: 4, href: "tel:0357064765", title: "Số điện thoại", content: "0357 064 765" },
        { idx: 5, href: "mailto:phongvibanhxua@gmail.com", title: "Email", content: "phongvibanhxua@gmail.com" }
    ]

    const { ref, height } = useElementSize()

    return (
        <div style={{ height, paddingBottom: `${height.toString()}px` }} className="-z-2 flex max-h-[9dvh] w-full items-center justify-center bg-pvbx-dark text-pvbx-light">
            <footer ref={ref} className="fixed inset-x-0 bottom-0 w-full">
                <div className={cn(
                    "relative px-32 py-12"
                )}>
                    <Image
                        className={cn(
                            "pointer-events-none absolute inset-x-0 top-0 -z-1 h-full object-cover brightness-30 user-drag-none user-select-none"
                        )}
                        src="/footer.png"
                        alt="Phong Vị Bánh Xưa footer"
                        width={1769}
                        height={594}
                    />
                    <div className={cn(
                        "flex items-center justify-between gap-12"
                    )}>
                        <div className={cn(
                            "flex flex-col gap-12"
                        )}>
                            <Image
                                className={cn(
                                    "w-72"
                                )}
                                src="/logo/logo_phongvibanhxua.svg"
                                alt="Phong Vị Bánh Xưa logo"
                                width={402}
                                height={118}
                                priority
                            />
                            <div className={cn(
                                "flex flex-col gap-4"
                            )}>
                                <span className="whitespace-nowrap text-lg font-bold">Công ty cổ phần thương mại dịch vụ Phong Vị</span>
                                <ul className="list-inside list-disc space-y-2 font-normal">
                                    {detailInfos.map((info) => {
                                        return (
                                            <li key={info.idx}>
                                                <span className="font-bold">{info.title}:</span>{" "}<span>{info.content}</span>

                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col gap-12">
                            <div className={cn(
                                "flex gap-12"
                            )}>
                                <div className={cn(
                                    "flex flex-col gap-4"
                                )}>
                                    <span className="whitespace-nowrap text-lg font-bold">Thông tin website</span>
                                    <ul className="list-inside list-disc space-y-2 font-normal">
                                        {infoLinks.map((link) => {
                                            return (
                                                <li key={link.idx}>
                                                    <Link href={link.href} className={cn(
                                                        {
                                                            hover: "underline"
                                                        }
                                                    )}>
                                                        {link.title}
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <div className={cn(
                                    "flex flex-col gap-4"
                                )}>
                                    <span className="whitespace-nowrap text-lg font-bold">Điều khoản sử dụng</span>
                                    <ul className="list-inside list-disc space-y-2 font-normal">
                                        {conditionLinks.map((link) => {
                                            return (
                                                <li key={link.idx}>
                                                    <Link href={link.href} className={cn(
                                                        {
                                                            hover: "underline"
                                                        }
                                                    )}>
                                                        {link.title}
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <div className={cn(
                                    "flex flex-col gap-4"
                                )}>
                                    <span className="whitespace-nowrap text-lg font-bold">Hotline</span>
                                    <ul className="list-inside list-disc space-y-2 font-normal">
                                        {hotlineLinks.map((link) => {
                                            return (
                                                <li key={link.idx}>
                                                    <Link href={`tel:${link.content}`} className={cn(
                                                        {
                                                            hover: "underline"
                                                        }
                                                    )}>
                                                        {link.title}: {link.content}
                                                    </Link>
                                                    <p className="text-sm">({link.supportTime})</p>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className={cn(
                                "flex flex-col gap-4"
                            )}>
                                <span className="whitespace-nowrap text-lg font-bold">Liên hệ</span>
                                <ul className="list-inside list-disc space-y-2 font-normal">
                                    {contactInfos.map((info) => {
                                        return (
                                            <li key={info.idx}>
                                                <span>
                                                    {info.title}:{" "}
                                                    {info.href ? (
                                                        <Link href={info.href} className={cn(
                                                            "inline",
                                                            {
                                                                hover: "underline"
                                                            }
                                                        )}>
                                                            {info.content}
                                                        </Link>
                                                    ) : (
                                                        info.content
                                                    )}
                                                </span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cn(
                    "flex items-center justify-center px-6 py-4 text-sm"
                )}>
                    <span>{new Date().getFullYear()} © Công ty cổ phần thương mại dịch vụ Phong Vị mọi quyền bảo lưu.</span>
                </div>
            </footer>
        </div>
    )
}
