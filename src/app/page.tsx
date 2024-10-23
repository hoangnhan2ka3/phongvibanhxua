/* eslint-disable react-compiler/react-compiler */
"use client"

import Autoplay from "embla-carousel-autoplay"
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures"
import { ShoppingBasket } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"

import Footer from "@/components/layout/Footer"
import SectionSeparator from "@/components/layout/SectionSeparator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel"
import { ParallaxText } from "@/components/ui/parallax-text"
import { cn } from "@/lib/utils"

export default function Home() {
    const plugin = useRef(
        Autoplay({ delay: 3500, stopOnInteraction: false })
    )

    return (
        <div className="relative">
            <div className={cn(
                "w-full bg-pvbx-light px-32 py-13"
            )}>
                <Carousel
                    opts={{
                        loop: true
                    }}
                    plugins={[plugin.current, WheelGesturesPlugin()]}
                    className="w-full select-none"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent className="h-full">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <CarouselItem key={index}>
                                <Card className={cn(
                                    "bg-green-600"
                                )}>
                                    <CardContent className="flex aspect-banner items-center justify-center p-6">
                                        <span className="text-4xl font-semibold">{index + 1}</span>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            <AboutUsSection />
            <SectionSeparator />
            <SaleSection />
            <SectionSeparator />
            <HighlightedSection />
            <SectionSeparator />
            <StorySection />
        </div>
    )
}

function AboutUsSection() {
    return (
        <div className={cn(
            "flex w-full gap-9 bg-pvbx-secondary px-32 py-12"
        )}>
            <Image
                className={cn(
                    "h-[25rem] w-auto rounded-3xl"
                )}
                src="/set_1.png"
                alt="Phong Vị Bánh Xưa logo"
                width={1200}
                height={800}
            />
            <div className={cn(
                "flex flex-col justify-between gap-2 py-4"
            )}>
                <div>
                    <h3 className="font-serif text-xl text-pvbx-light">About us</h3>
                    <h1 className="font-serif text-5xl leading-[0.8] text-pvbx-primary">Đậm đà bản sắc, ngọt ngào từng khoảnh khắc</h1>
                </div>
                <p>Đội ngũ <span className="font-bold text-pvbx-primary">“Phong vị bánh xưa”</span> tự hào mang đến những món bánh truyền thống không chỉ là sự kết hợp tinh tế của nguyên liệu, mà còn mang trong đó một phần của di sản văn hóa lâu đời của đất nước. Mỗi chiếc bánh, mỗi miếng ăn không chỉ là về hương vị, mà còn là về câu chuyện và sự kết nối với quá khứ và truyền thống.</p>
                <Link href="/about" className="w-fit rounded-full bg-pvbx-primary px-4 pb-2 font-serif text-xl uppercase text-pvbx-light">
                    Về chúng mình
                </Link>
            </div>
        </div>
    )
}

function SaleSection() {
    const saleCakes = [
        { idx: 1, src: "/cakes/PVBX__banh_khoai_mi_nuong_dua_non.png", name: "Bánh khoai mì nướng dừa non", oldPrice: 21, salePrice: 19 },
        { idx: 2, src: "/cakes/PVBX__banh_in.png", name: "Bánh in", oldPrice: 21, salePrice: 19 },
        { idx: 3, src: "/cakes/PVBX__banh_tam.png", name: "Bánh tằm", oldPrice: 21, salePrice: 19 }
    ]

    return (
        <div className={cn(
            "flex w-full flex-col items-center justify-center gap-12 bg-pvbx-light pb-24"
        )}>
            <div className={cn(
                "w-full"
            )}>
                <ParallaxText baseVelocity={-5} className={cn(
                    "font-serif text-[8dvw] font-bold uppercase leading-none"
                )}>
                    <span className="text-pvbx-secondary">Bánh</span>{" "}ngọt
                </ParallaxText>
                <ParallaxText baseVelocity={5} className={cn(
                    "-mt-8 font-serif text-[8dvw] font-bold uppercase leading-none"
                )}>
                    <span className="text-pvbx-primary">sale</span>{" "}ngon!
                </ParallaxText>
            </div>
            <div className={cn(
                "flex h-17 items-center gap-4 rounded-full bg-pvbx-primary px-8 py-2 text-pvbx-light"
            )}>
                <h3 className="-translate-y-1.5 font-serif text-3xl uppercase">Flash sale</h3>
                <p>kết thúc trong:</p>
                <time dateTime="2024-10-30" className={cn(
                    "flex items-center gap-1 text-xl"
                )}>
                    <span className="rounded-lg bg-pvbx-light px-1 py-1.5 text-2xl text-pvbx-primary">00</span>{" "}
                    :
                    <span className="rounded-lg bg-pvbx-light px-1 py-1.5 text-2xl text-pvbx-primary">10</span>{" "}
                    :
                    <span className="rounded-lg bg-pvbx-light px-1 py-1.5 text-2xl text-pvbx-primary">32</span>
                </time>
            </div>
            <div className={cn(
                "flex w-full gap-16 px-32"
            )}>
                {saleCakes.map((cake) => (
                    <Card key={cake.idx} className={cn(
                        "w-full bg-pvbx-tertiary/40 p-2"
                    )}>
                        <Image
                            className={cn(
                                "w-full rounded-2xl"
                            )}
                            src={cake.src}
                            alt={cake.name}
                            width={320}
                            height={270}
                        />
                        <CardHeader className={cn(
                            "py-2"
                        )}>
                            <CardTitle className={cn(
                                "text-center text-base"
                            )}>{cake.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col justify-center gap-2 p-0">
                            <div className={cn(
                                "flex items-end justify-center gap-2 p-0"
                            )}>
                                <div className={cn(
                                    "flex flex-1 flex-col items-start gap-1 text-xl"
                                )}>
                                    <span className="whitespace-nowrap pl-4 text-sm font-semibold text-pvbx-primary/40 line-through">
                                        {cake.oldPrice}.000 VNĐ
                                    </span>
                                    <span className="flex h-[40px] w-full items-center whitespace-nowrap px-4 text-1.5xl font-semibold leading-none text-pvbx-primary">
                                        {cake.salePrice}.000 VNĐ
                                    </span>
                                </div>
                                <Button variant="secondary" type="button" className={cn(
                                    "grid h-[40px] flex-1 place-items-center rounded-full py-0"
                                )}>
                                    <ShoppingBasket />
                                </Button>
                            </div>
                            <Button type="button" className={cn(
                                "grid h-[40px] w-full place-items-center rounded-2xl py-0"
                            )}>
                                Đặt ngay
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

function HighlightedSection() {
    const topCakes = [
        { rank: 1, src: "/cakes/PVBX__banh_dau_xanh_hinh_trai_cay.png", name: "Bánh đậu xanh hình trái cây", price: 21 },
        { rank: 2, src: "/cakes/PVBX__banh_bot_bang.png", name: "Bánh bột báng", price: 18 },
        { rank: 3, src: "/cakes/PVBX__banh_tet_chuoi.png", name: "Bánh tét chuối", price: 21 }
    ]

    const moreCakes = [
        { idx: 1, src: "/cakes/PVBX__banh_da_lon.png", name: "Bánh da lợn", price: 21 },
        { idx: 2, src: "/cakes/PVBX__banh_chuoi_nuong.png", name: "Bánh chuối nướng", price: 18 },
        { idx: 3, src: "/cakes/PVBX__banh_bo_hap.png", name: "Bánh bò hấp", price: 21 },
        { idx: 4, src: "/cakes/PVBX__banh_cam.png", name: "Bánh cam", price: 21 },
        { idx: 5, src: "/cakes/PVBX__banh_duc_gan.png", name: "Bánh đúc gân", price: 18 },
        { idx: 6, src: "/cakes/PVBX__banh_bo_nuong.png", name: "Bánh bò nướng", price: 21 }
    ]

    return (
        <div className={cn(
            "flex w-full flex-col items-center gap-12 bg-pvbx-primary px-32 pb-24"
        )}>
            <h2 className="mt-16 w-[40.5rem] text-center font-serif text-7xl uppercase leading-none text-pvbx-light">
                Bánh nổi bật trong tuần
            </h2>
            <div className="relative flex w-full justify-center">
                {topCakes.map((cake) => (
                    <div key={cake.rank} className={cn(
                        "mt-12 flex w-fit flex-col items-center justify-center gap-2",
                        cake.rank === 2 ? "absolute left-0 top-1/2" : cake.rank === 3 && "absolute right-0 top-1/2"
                    )}>
                        <div className="relative">
                            <Image
                                className={cn(
                                    "rounded-full",
                                    cake.rank === 1 ? "size-92" : "size-64"
                                )}
                                src={cake.src}
                                alt={cake.name}
                                width={320}
                                height={270}
                            />
                            <div className={cn(
                                "absolute -top-[20%] left-[60%]"
                            )}>
                                <span className={cn(
                                    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif font-bold text-pvbx-primary",
                                    cake.rank === 1 ? "pb-6 text-5xl" : "pb-2 text-3xl"
                                )}>
                                    {cake.rank}
                                </span>
                                <Image
                                    className={cn(
                                        cake.rank !== 1 && "h-auto w-36"
                                    )}
                                    src="/star_4.svg"
                                    alt="top_star"
                                    width={170}
                                    height={220}
                                />
                            </div>
                        </div>
                        <p className="mt-2 text-lg font-bold text-pvbx-light">{cake.name}</p>
                        <div className={cn(
                            "flex items-end justify-center gap-2 p-0"
                        )}>
                            <div className={cn(
                                "flex flex-1 flex-col items-start gap-1 text-xl"
                            )}>
                                <span className="flex h-[40px] w-full items-center whitespace-nowrap px-4 text-1.5xl font-semibold leading-none text-pvbx-secondary">
                                    {cake.price}.000 VNĐ
                                </span>
                            </div>
                            <Button variant="tertiary" type="button" className={cn(
                                "grid h-[40px] flex-1 place-items-center rounded-full py-0"
                            )}>
                                <ShoppingBasket />
                            </Button>
                        </div>
                        <Button variant="secondary" type="button" className={cn(
                            "grid h-[40px] w-full place-items-center rounded-2xl py-0"
                        )}>
                            Đặt ngay
                        </Button>
                    </div>
                ))}
            </div>
            <hr className="mt-56 w-full border-pvbx-tertiary" />
            <div className={cn(
                "grid w-full grid-cols-2 gap-x-36"
            )}>
                {moreCakes.map((cake) => (
                    <div key={cake.idx} className={cn(
                        "mt-12 flex w-full items-center justify-center gap-6"
                    )}>
                        <Image
                            className={cn(
                                "rounded-3xl object-cover",
                                "size-64"
                            )}
                            src={cake.src}
                            alt={cake.name}
                            width={320}
                            height={270}
                        />
                        <div className={cn(
                            "flex w-full flex-col items-start justify-center gap-2"
                        )}>
                            <p className="mt-2 text-lg font-bold text-pvbx-light">{cake.name}</p>
                            <div className={cn(
                                "flex w-full items-end justify-between gap-2 p-0"
                            )}>
                                <div className={cn(
                                    "flex flex-1 flex-col items-start gap-1 text-xl"
                                )}>
                                    <span className="flex h-[40px] w-full items-center whitespace-nowrap text-1.5xl font-semibold leading-none text-pvbx-secondary">
                                        {cake.price}.000 VNĐ
                                    </span>
                                </div>
                                <Button variant="tertiary" type="button" className={cn(
                                    "grid h-[40px] flex-1 place-items-center rounded-full py-0"
                                )}>
                                    <ShoppingBasket />
                                </Button>
                            </div>
                            <Button variant="secondary" type="button" className={cn(
                                "grid h-[40px] w-full place-items-center rounded-2xl py-0"
                            )}>
                                Đặt ngay
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function StorySection() {
    return (
        <div className={cn(
            "flex w-full gap-9 bg-pvbx-light px-32 py-12"
        )}>
            <div className={cn(
                "relative w-fit"
            )}>
                <Image
                    className={cn(
                        "h-[42rem] min-w-[42rem] rounded-full border-[22px] border-pvbx-primary"
                    )}
                    src="/set_2.png"
                    alt="Phong Vị Bánh Xưa story"
                    width={694}
                    height={694}
                />
                <Image
                    className={cn(
                        "absolute bottom-2/3 left-2/3 -z-1"
                    )}
                    src="/star_15.svg"
                    alt="start_15"
                    width={264}
                    height={264}
                />
            </div>
            <div className={cn(
                "flex flex-col justify-center gap-8 py-4"
            )}>
                <h1 className="font-serif text-7xl leading-[0.8] text-pvbx-primary">Những câu chuyện chưa kể...</h1>
                <p>Đội ngũ <span className="font-bold text-pvbx-primary">“Phong vị bánh xưa”</span> mang đến những câu chuyện bên lề của những con người tuy tuổi đã lớn nhưng vẫn ngày đêm miệt mài với công việc làm bánh, không chỉ để bươn chải cuộc sống mà còn giữ gìn những nét đẹp văn hóa ẩm thực Việt Nam đang trên bờ hội nhập...</p>
                <Link href="/blog" className="w-fit rounded-full bg-pvbx-primary px-4 pb-2 font-serif text-xl uppercase text-pvbx-light">
                    Blog
                </Link>
            </div>
        </div>
    )
}
