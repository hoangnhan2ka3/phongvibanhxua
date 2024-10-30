"use client"

import { motion } from "framer-motion"
import { ChevronDown, CircleUserRound, Minus, Plus, ShoppingBasket, Trash } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useRef } from "react"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { useCartStore, useShrinkOnScroll } from "@/hooks"
import { cn } from "@/lib/utils"

export default function Header() {
    const headerLinks = [
        { idx: 1, href: "/", title: "Trang chủ" },
        { idx: 2, href: "/menu", title: "Menu", expandable: true },
        { idx: 3, href: "/blog", title: "Blog", expandable: true },
        { idx: 4, href: "/about", title: "Về chúng mình" },
        { idx: 5, href: "#footer", title: "Liên hệ" }
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
                "relative flex h-12 items-center bg-pvbx-primary px-32 font-serif text-xl leading-[1.75] text-pvbx-light"
            )}>
                <div className={cn(
                    "absolute left-0 flex h-full w-32 items-center justify-center bg-pvbx-light px-4"
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
                </div>
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
                <CartButton />
            </div>
        </motion.header>
    )
}

function CartButton() {
    const router = useRouter()

    const { cart, totalItems, totalPrice, addToCart, removeFromCart, removeCakeFromCart, emptyCart } = useCartStore()

    return (
        <div className={cn(
            "absolute right-0 flex h-full w-32 divide-x-1 divide-pvbx-primary bg-pvbx-light"
        )}>
            <Drawer>
                <DrawerTrigger asChild>
                    <button className={cn(
                        "flex h-full grow items-center justify-center gap-2 px-2 font-sans text-pvbx-dark",
                        {
                            hover: "bg-pvbx-primary/10 duration-0",
                            active: "bg-pvbx-primary/15"
                        }
                    )}>
                        <ShoppingBasket size={24} />
                        <span className={cn(
                            "grid h-5 min-w-5 place-items-center rounded-full bg-pvbx-primary px-1 text-sm leading-none text-pvbx-light"
                        )}>
                            {totalItems}
                        </span>
                    </button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle className="font-serif text-4xl">Giỏ hàng</DrawerTitle>
                        <DrawerDescription>Bạn có thể chỉnh sửa sản phẩm đã chọn và thanh toán.</DrawerDescription>
                    </DrawerHeader>
                    <div className={cn(
                        "flex gap-12 overflow-y-auto px-12 pb-12"
                    )}>
                        {cart.length > 0 ? (
                            <Table>
                                <TableHeader className={cn(
                                    "sticky top-0 z-2 border-b border-pvbx-primary/40 bg-red-100"
                                )}>
                                    <TableRow>
                                        <TableHead className="w-13 text-pvbx-primary">STT</TableHead>
                                        <TableHead className="text-pvbx-primary">Sản phẩm</TableHead>
                                        <TableHead className="text-pvbx-primary">Đơn giá</TableHead>
                                        <TableHead className="text-pvbx-primary">Số lượng</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {cart.map((cake, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="text-center">{String(index + 1).padStart(2, "0")}</TableCell>
                                            <TableCell className="flex items-center gap-2 font-bold">
                                                <div className={cn(
                                                    "aspect-1 size-36 overflow-hidden rounded-2xl"
                                                )}>
                                                    <Image
                                                        src={cake.images[0].source}
                                                        alt={cake.images[0].description}
                                                        quality={85}
                                                        width={320}
                                                        height={270}
                                                        className={cn(
                                                            "h-[150px] w-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-105",
                                                            {
                                                                "group-first": index === 0 && "h-full"
                                                            }
                                                        )}
                                                    />
                                                </div>
                                                <p>{cake.name}</p>
                                            </TableCell>
                                            <TableCell>{cake.price.toLocaleString("vi-VN")} VNĐ</TableCell>
                                            <TableCell>
                                                <div className={cn(
                                                    "flex justify-between gap-2 text-right"
                                                )}>
                                                    <div className={cn(
                                                        "flex items-center justify-center gap-2 justify-self-center"
                                                    )}>
                                                        <Button variant="outline" disabled={cake.quantity! < 2} type="button" className={cn(
                                                            "grid w-fit place-items-center justify-self-end rounded-full p-2"
                                                        )} onClick={() => {
                                                            removeFromCart(cake)
                                                        }}>
                                                            <Minus size={14} color="rgb(var(--pvbx-primary))" />
                                                        </Button>
                                                        <span className="w-6 text-center">{cake.quantity?.toLocaleString("vi-VN")}</span>
                                                        <Button variant="outline" disabled={cake.quantity! > 98} type="button" className={cn(
                                                            "grid w-fit place-items-center justify-self-end rounded-full p-2"
                                                        )} onClick={() => {
                                                            addToCart(cake)
                                                        }}>
                                                            <Plus size={14} color="rgb(var(--pvbx-primary))" />
                                                        </Button>
                                                    </div>
                                                    <Button variant="outline" type="button" className={cn(
                                                        "flex h-[40px] w-fit items-center justify-center gap-2 justify-self-end rounded-full py-0 font-semibold text-pvbx-primary"
                                                    )} onClick={() => {
                                                        removeCakeFromCart(cake)
                                                    }}>
                                                        Xóa <Trash color="rgb(var(--pvbx-primary))" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p className={cn(
                                "grid grow place-items-center text-xl font-semibold text-pvbx-primary"
                            )}>🥲 Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
                        )}
                        <div className={cn(
                            "sticky top-0 flex shrink-0 flex-col justify-between gap-12 overflow-y-auto"
                        )}>
                            <Button variant="outline" disabled={totalItems === 0} type="button" className={cn(
                                "flex h-[40px] w-fit items-center justify-center gap-2 rounded-full py-0 text-pvbx-primary"
                            )} onClick={emptyCart}>
                                <Trash /> Xóa toàn bộ sản phẩm
                            </Button>
                            <div className={cn(
                                "flex flex-col gap-12"
                            )}>
                                <div className={cn(
                                    "flex flex-col gap-1"
                                )}>
                                    <h3>Tổng:</h3>
                                    <p className="whitespace-nowrap text-1.5xl font-bold text-pvbx-primary">{totalItems} sản phẩm</p>
                                </div>
                                <div className={cn(
                                    "flex flex-col gap-1"
                                )}>
                                    <h3>Của bạn hết:</h3>
                                    <p className="whitespace-nowrap text-1.5xl font-bold text-pvbx-primary">{totalPrice.toLocaleString("vi-VN")} VNĐ</p>
                                </div>
                                <DrawerFooter className="grid grid-cols-2 p-0">
                                    <DrawerClose asChild>
                                        <Button disabled={totalItems === 0} onClick={() => {
                                            router.push("/checkout")
                                        }}>
                                            Thanh toán
                                        </Button>
                                    </DrawerClose>
                                    <DrawerClose asChild>
                                        <Button variant="outline">Đóng</Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </div>
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
            <SignInButton />
        </div>
    )
}

function SignInButton() {
    const pathname = usePathname()
    const isInSignInPage = pathname === "/sign-in"

    return (
        <Link href="/sign-in" className={cn(
            "grid aspect-1 h-full w-auto place-items-center text-pvbx-dark",
            isInSignInPage ? "bg-pvbx-primary/15" : {
                hover: "bg-pvbx-primary/10 duration-0",
                active: "bg-pvbx-primary/15"
            }
        )}>
            <CircleUserRound size={24} />
        </Link>
    )
}
