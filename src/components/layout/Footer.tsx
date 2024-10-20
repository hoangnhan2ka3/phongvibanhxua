import Image from "next/image"
import Link from "next/link"

import { useElementSize } from "@/hooks"
import { cn } from "@/lib/utils"

export default function Footer() {
    const infoLinks = [
        { idx: 1, href: "/", title: "Trang chủ" },
        { idx: 2, href: "/menu", title: "Menu" },
        { idx: 3, href: "/blog", title: "Blog" },
        { idx: 4, href: "/about", title: "Về chúng mình" },
        { idx: 5, href: "/contact", title: "Liên hệ" }
    ]
    const conditionLinks = [
        { idx: 1, href: "/", title: "Quy chế website" },
        { idx: 2, href: "/", title: "Bảo mật" },
        { idx: 3, href: "/", title: "Xuất hóa đơn GTGT" }
    ]
    const hotlineLinks = [
        { idx: 1, href: "/", title: "Đặt hàng", content: "0912345678", supportTime: "07:00 - 22:30" },
        { idx: 2, href: "/", title: "Hỗ trợ", content: "0912345678", supportTime: "07:00 - 22:30" }
    ]
    const contactInfos = [
        { idx: 1, title: "Địa chỉ 1", content: "Nhà văn hóa sinh viên, khu Đại học Quốc gia TP. Hồ Chí Minh" },
        { idx: 2, title: "Địa chỉ 2", content: "Lô E2a-7, Đường D1, Phường Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh" },
        { idx: 3, title: "Số điện thoại", content: "0912345678" },
        { idx: 4, title: "Email", content: "phongvibanhxua@gmail.com" }
    ]
    const detailInfos = [
        { idx: 2, title: "Mã số DN", content: "0312867172 do sở kế hoạch và đầu tư TP. HCM cấp ngày 23/07/2024." },
        { idx: 3, title: "Người đại diện", content: "(Ông.) Đinh Minh Huân." },
        { idx: 4, title: "Địa chỉ", content: "86-88 Cao Thắng, phường 04, quận 3, tp Hồ Chí Minh." },
        { idx: 5, title: "Số điện thoại", content: "(028) 7107 8079." },
        { idx: 6, title: "Email", content: "phongvibanhxua@gmail.com." },
        { idx: 7, title: "Bản quyền", content: "2024-2032 © Công ty cổ phần thương mại dịch vụ Phong Vị mọi quyền bảo lưu." }
    ]

    const { ref, height } = useElementSize()

    return (
        <div style={{ height, paddingBottom: `${height.toString()}px` }} className="-z-2 flex h-[80dvh] w-full items-center justify-center bg-pvbx-dark text-pvbx-light">
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
                        "flex gap-32"
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
                                                    <Link href={link.href} className={cn(
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
                                                    {info.title}: {info.content}
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
                    "flex justify-between gap-12 px-32 py-12"
                )}>
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
                    <div className={cn(
                        "flex flex-col items-end gap-8"
                    )}>
                        <Image
                            className={cn(
                                "pointer-events-none w-40 user-drag-none user-select-none"
                            )}
                            src="/footer/PVBX__da_thong_bao_bo_cong_thuong.png"
                            alt="Phong Vị Bánh Xưa đã thông báo bộ Công thương"
                            width={1405}
                            height={533}
                        />
                        <Image
                            className={cn(
                                "pointer-events-none w-20 user-drag-none user-select-none"
                            )}
                            src="/footer/PVBX__vien_an_toan_thuc_pham.png"
                            alt="Phong Vị Bánh Xưa Viện an toàn thực phẩm"
                            width={200}
                            height={200}
                        />
                    </div>
                </div>
            </footer>
        </div>
    )
}
