"use client"

import Image from "next/image"
import { useState } from "react"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { useFetch } from "@/hooks/useFetch"
import { cn } from "@/lib/utils"
import { type CakesData } from "@/types/cakes"

import AddToCartButton from "./AddToCartButton"
import OrderNowButton from "./OrderNowButton"
import TabsPagination from "./TabsPagination"

const MAX_CAKES_PER_PAGE = 9

export default function SingleCakesPagination() {
    const [currentPage, setCurrentPage] = useState(1)
    const [cakesPerPage, setCakesPerPage] = useState(
        currentPage === 1 ? (MAX_CAKES_PER_PAGE - 1) : MAX_CAKES_PER_PAGE
    )

    const { data, loading } = useFetch<CakesData>(
        "https://phongvibanhxua-be-apis.onrender.com/store/api/v1/products"
    )

    const lastCakeIndex = currentPage * cakesPerPage
    const firstCakeIndex = lastCakeIndex - cakesPerPage
    const currentCakes = data?.items.slice(firstCakeIndex, lastCakeIndex)

    return (
        <div className={cn(
            "flex grow flex-col gap-12"
        )}>
            {loading ? (
                <div className={cn(
                    "grid w-full grid-cols-3 grid-rows-3 gap-12"
                )}>
                    <Skeleton className={cn(
                        "col-span-2 h-[360px] w-full"
                    )} />
                    {Array.from({ length: 7 }).map((_, idx) => (
                        <Skeleton key={idx} className={cn(
                            "h-[360px] w-full"
                        )} />
                    ))}
                </div>
            ) : (
                <div className="grid w-full grid-cols-3 gap-12">
                    {currentCakes?.map((cake) => {
                        return (
                            <Card key={cake.id} className={cn(
                                "group flex h-[360px] w-full flex-col items-center justify-center bg-pvbx-quaternary p-2 text-pvbx-dark",
                                {
                                    first: currentPage === 1 && [
                                        "relative col-span-2 h-[360px] flex-row items-start gap-2",
                                        {
                                            after: "absolute left-0 top-0 rounded-br-3xl rounded-tl-3xl border-2 border-pvbx-quaternary bg-pvbx-primary px-6 py-2 text-xl font-bold text-pvbx-quaternary content-['Bán_chạy_nhất']"
                                        }
                                    ]
                                }
                            )}>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className={cn(
                                            "aspect-3/2 h-auto w-full cursor-pointer overflow-hidden rounded-2xl",
                                            {
                                                "group-first": currentPage === 1 && "h-full"
                                            }
                                        )}>
                                            <Image
                                                src={cake.images[0].source}
                                                alt={cake.images[0].description}
                                                quality={85}
                                                width={320}
                                                height={270}
                                                className={cn(
                                                    "h-[270px] w-auto transform object-cover transition-transform duration-500 ease-in-out group-hover:scale-105",
                                                    {
                                                        "group-first": currentPage === 1 && "h-full"
                                                    }
                                                )}
                                            />
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className={cn(
                                        "flex gap-6"
                                    )}>
                                        <div className={cn(
                                            "size-full overflow-hidden rounded-xl"
                                        )}>
                                            <Image
                                                src={cake.images[0].source}
                                                alt={cake.images[0].description}
                                                quality={85}
                                                width={320}
                                                height={270}
                                                className={cn(
                                                    "size-full transform object-cover"
                                                )}
                                            />
                                        </div>
                                        <div className={cn(
                                            "flex w-full flex-col items-start justify-between gap-2"
                                        )}>

                                            <DialogHeader className={cn(
                                                "w-full py-4"
                                            )}>
                                                <DialogTitle>
                                                    {cake.name}
                                                </DialogTitle>
                                                <DialogDescription>
                                                    {cake.description}
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className={cn(
                                                "flex w-full flex-col gap-2"
                                            )}>
                                                <div className={cn(
                                                    "flex items-end justify-center gap-2 p-0"
                                                )}>
                                                    <div className={cn(
                                                        "flex flex-1 flex-col items-start gap-1 text-xl"
                                                    )}>
                                                        <span className="flex h-[40px] w-full items-center whitespace-nowrap pr-4 text-1.5xl font-semibold leading-none text-pvbx-primary">
                                                            {cake.discountPrice.toLocaleString("vi-VN")} VNĐ
                                                        </span>
                                                    </div>
                                                    <DialogClose asChild>
                                                        <AddToCartButton product={cake} />
                                                    </DialogClose>
                                                </div>
                                                <DialogFooter>
                                                    <OrderNowButton product={cake} />
                                                </DialogFooter>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                                <div className={cn(
                                    "flex w-full flex-col justify-between gap-1",
                                    {
                                        "group-first": currentPage === 1 && "h-full justify-between"
                                    }
                                )}>
                                    <CardHeader className={cn(
                                        "p-2",
                                        {
                                            "group-first": currentPage === 1 && "gap-4 pt-4"
                                        }
                                    )}>
                                        <CardTitle className={cn(
                                            "line-clamp-1 text-center text-base",
                                            {
                                                "group-first": currentPage === 1 && "text-start text-xl"
                                            }
                                        )}>
                                            {cake.name}
                                        </CardTitle>
                                        <CardDescription className={cn(
                                            "line-clamp-2 text-center text-xs",
                                            {
                                                "group-first": currentPage === 1 && "line-clamp-none text-start text-sm"
                                            }
                                        )}>
                                            {cake.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <div className={cn(
                                        "flex flex-col gap-2"
                                    )}>
                                        <CardContent className="flex flex-col justify-center gap-2 p-0">
                                            <div className={cn(
                                                "flex items-end justify-center gap-2 p-0"
                                            )}>
                                                <div className={cn(
                                                    "flex flex-1 flex-col items-start gap-1 text-xl"
                                                )}>
                                                    <span className="flex h-[40px] w-full items-center whitespace-nowrap px-4 text-1.5xl font-semibold leading-none text-pvbx-primary">
                                                        {cake.discountPrice.toLocaleString("vi-VN")} VNĐ
                                                    </span>
                                                </div>
                                                <AddToCartButton product={cake} />
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <OrderNowButton product={cake} />
                                        </CardFooter>
                                    </div>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            )}
            {data && data.items.length > MAX_CAKES_PER_PAGE && (
                <TabsPagination
                    totalPosts={data.items.length}
                    productsPerPage={cakesPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            )}
        </div>
    )
}
