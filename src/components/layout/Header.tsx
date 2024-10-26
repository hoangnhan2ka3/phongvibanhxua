"use client"

import { motion } from "framer-motion"
import { ChevronDown, Minus, Plus, ShoppingBasket, Trash } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

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
        <Drawer>
            <DrawerTrigger asChild>
                <button className={cn(
                    "absolute right-0 flex h-full w-32 items-center justify-center gap-2 bg-pvbx-light px-4 font-sans text-pvbx-dark"
                )}>
                    <ShoppingBasket size={24} />
                    {/* <p className="whitespace-nowrap text-xs">Giỏ hàng</p> */}
                    <span className={cn(
                        "grid h-5 min-w-5 place-items-center rounded-full bg-pvbx-primary px-1 text-sm leading-none text-pvbx-light"
                    )}>
                        {totalItems}
                    </span>
                </button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Giỏ hàng</DrawerTitle>
                    <DrawerDescription>Bạn có thể chỉnh sửa sản phẩm đã chọn và thanh toán.</DrawerDescription>
                </DrawerHeader>
                <div className={cn(
                    "flex gap-12 overflow-y-auto px-12"
                )}>
                    <div className={cn(
                        "flex grow flex-col items-center justify-center divide-y-1 divide-pvbx-primary/40 pb-8",
                        totalItems === 0 ? "min-h-full" : "h-full"
                    )}>
                        {cart.length > 0 ? (
                            cart.map((cake, index) => (
                                <div key={index} className={cn(
                                    "flex w-full items-center gap-6 p-4"
                                )}>
                                    <span>{String(index + 1).padStart(2, "0")}.</span>
                                    <div className={cn(
                                        "flex w-full items-center gap-6"
                                    )}>
                                        <div className={cn(
                                            "aspect-1 size-36 overflow-hidden rounded-2xl"
                                        )}>
                                            <Image
                                                src={cake.url}
                                                alt={cake.name}
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
                                        <div className={cn(
                                            "grid grow auto-cols-fr grid-flow-col items-center gap-2"
                                        )}>
                                            <p className="justify-self-start font-bold">{cake.name}</p>
                                            <p className="justify-self-center">{(cake.price * 1000).toLocaleString("vi-VN")} VNĐ</p>
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
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className={cn(
                                "text-xl font-semibold text-pvbx-primary"
                            )}>🥲 Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
                        )}
                    </div>
                    <div className={cn(
                        "sticky top-0 flex flex-col justify-between gap-12 overflow-y-auto pb-12"
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
                                <p className="whitespace-nowrap text-1.5xl font-bold text-pvbx-primary">{(totalPrice * 1000).toLocaleString("vi-VN")} VNĐ</p>
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
    )
}
