"use client"

import { motion } from "framer-motion"
import { ChevronDown, CircleUserRound, Minus, Plus, ShoppingBasket, Trash } from "lucide-react"
import { type Url } from "next/dist/shared/lib/router/router"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useRef, useState } from "react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip"
import { useCartStore, useShrinkOnScroll, useUser } from "@/hooks"
import { cn } from "@/lib/utils"

export default function Header() {
    const headerLinks = [
        { idx: 1, href: "/", title: "Trang chủ" },
        { idx: 2, href: "/menu", title: "Menu", expandable: true },
        { idx: 3, href: "/blog", title: "Blog", expandable: true },
        { idx: 4, href: "/about", title: "Về chúng mình" }
    ]

    function scrollToBottom() {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
    }

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
                <button onClick={scrollToBottom} className={cn(
                    "flex h-inherit flex-1 items-start justify-center gap-1 px-4",
                    {
                        hover: "backdrop-brightness-90 duration-0",
                        active: "backdrop-brightness-75"
                    }
                )}>
                    Liên hệ
                </button>
                <CartButton />
            </div>
        </motion.header>
    )
}

function CartButton() {
    const router = useRouter()

    const { cart, totalItems, totalPrice, addToCart, removeFromCart, removeProductFromCart, emptyCart } = useCartStore()
    const { user } = useUser()
    return (
        <div className={cn(
            "absolute right-0 flex h-full w-32 bg-pvbx-light"
        )}>
            <TooltipProvider>
                <Drawer>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DrawerTrigger asChild>
                                <button className={cn(
                                    "flex h-full grow items-center justify-center gap-2 border-r-1 border-pvbx-primary px-2 font-sans text-pvbx-dark",
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
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            <p>Giỏ hàng</p>
                        </TooltipContent>
                    </Tooltip>
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
                                                <TableCell className="flex items-center gap-4 font-bold">
                                                    <div className={cn(
                                                        "aspect-1 size-36 overflow-hidden rounded-2xl"
                                                    )}>
                                                        {"images" in cake ? (
                                                            <Image
                                                                src={cake.images[0].source}
                                                                alt={cake.images[0].description}
                                                                quality={85}
                                                                width={320}
                                                                height={270}
                                                                className={cn(
                                                                    "h-[150px] w-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                                                )}
                                                            />
                                                        ) : (
                                                            <div className={cn(
                                                                "grid h-[150px] w-auto place-items-center bg-pvbx-primary"
                                                            )}>
                                                                <Image
                                                                    src="/star_15.svg"
                                                                    alt=""
                                                                    width={264}
                                                                    height={264}
                                                                    className={cn(
                                                                        "h-2/3 w-auto"
                                                                    )}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p>{cake.name}</p>
                                                </TableCell>
                                                <TableCell>{cake.discountPrice.toLocaleString("vi-VN")} VNĐ</TableCell>
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
                                                                console.log("removingggg")
                                                                console.log(user)
                                                                removeFromCart(cake, user)
                                                            }}>
                                                                <Minus size={14} color="rgb(var(--pvbx-primary))" />
                                                            </Button>
                                                            <span className="w-6 text-center">{cake.quantity?.toLocaleString("vi-VN")}</span>
                                                            <Button variant="outline" disabled={cake.quantity! > 98} type="button" className={cn(
                                                                "grid w-fit place-items-center justify-self-end rounded-full p-2"
                                                            )} onClick={() => {
                                                                console.log("addinggg")
                                                                console.log(user)
                                                                addToCart(cake, user)
                                                            }}>
                                                                <Plus size={14} color="rgb(var(--pvbx-primary))" />
                                                            </Button>
                                                        </div>
                                                        <Button variant="outline" type="button" className={cn(
                                                            "flex h-10 w-fit items-center justify-center gap-2 justify-self-end rounded-full py-0 font-semibold text-pvbx-primary"
                                                        )} onClick={() => {
                                                            removeProductFromCart(cake)
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
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="outline" disabled={totalItems === 0} type="button" className={cn(
                                            "flex min-h-[40px] w-fit items-center justify-center gap-2 rounded-full py-0 text-pvbx-primary"
                                        )}>
                                            <Trash /> Xóa toàn bộ sản phẩm
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Bạn có chắc chưa?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Nhấn "Xóa toàn bộ sản phẩm" sẽ lập tức xóa toàn bộ sản phẩm trong giỏ hàng.
                                                Hành động này không thể hoàn tác, vui lòng suy nghĩ kỹ.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                                            <AlertDialogAction onClick={emptyCart}>Xóa toàn bộ sản phẩm</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
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
                <Tooltip>
                    <SignInButton />

                </Tooltip>
            </TooltipProvider>
        </div>
    )
}

function SignInButton() {
    const pathname = usePathname()
    const { user, isAuth, clearUser } = useUser()
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    const Comp = isAuth ? PopoverTrigger : Link

    return (
        <>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <TooltipTrigger asChild>
                    <Comp href={isAuth ? null as unknown as Url : "/sign-in"} className={cn(
                        "grid aspect-1 h-full w-auto place-items-center text-pvbx-dark",
                        pathname === "/sign-in" ? "bg-pvbx-primary/15" : {
                            hover: "bg-pvbx-primary/10 duration-0",
                            active: "bg-pvbx-primary/15"
                        }
                    )}>
                        {user && isAuth ? (
                            <span className={cn(
                                "grid size-6 place-items-center rounded-full border-2 border-pvbx-dark font-sans text-xs font-semibold leading-none text-pvbx-dark"
                            )}>
                                {user.username.charAt(0).toUpperCase()}
                            </span>
                        ) : (
                            <CircleUserRound size={24} />
                        )}
                    </Comp>
                </TooltipTrigger>
                <PopoverContent className={cn(
                    "flex flex-col gap-2"
                )}>
                    <div className="w-full px-2 py-1">
                        <p className="text-xs font-semibold opacity-60">Tên đăng nhập:</p>
                        <span>{user?.username}</span>
                    </div>
                    <Button variant="outline" className={cn(
                        "grid size-full place-items-center font-semibold text-pvbx-primary"
                    )} onClick={() => {
                        setIsPopoverOpen(false)
                        clearUser()
                    }}>
                        Đăng xuất
                    </Button>
                </PopoverContent>
            </Popover>
            <TooltipContent side="bottom">
                <p>
                    {isAuth ? "Tài khoản" : "Đăng nhập"}
                </p>
            </TooltipContent>
        </>
    )
}
