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
import { type CombosData } from "@/types/combos"

import AddToCartButton from "./AddToCartButton"
import OrderNowButton from "./OrderNowButton"
import TabsPagination from "./TabsPagination"

const MAX_COMBOS_PER_PAGE = 3

export default function CombosPagination() {
    const [currentPage, setCurrentPage] = useState(1)
    const [combosPerPage, setCombosPerPage] = useState(MAX_COMBOS_PER_PAGE)

    const { data, loading } = useFetch<CombosData>(
        "https://phongvibanhxua-be-apis.onrender.com/store/api/v1/combos"
    )

    const lastComboIndex = currentPage * combosPerPage
    const firstComboIndex = lastComboIndex - combosPerPage
    const currentCombos = data?.items.slice(firstComboIndex, lastComboIndex)

    return (
        <div className={cn(
            "flex grow flex-col gap-12"
        )}>
            {loading ? (
                <div className={cn(
                    "grid w-full grid-cols-1 grid-rows-3 gap-12"
                )}>
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <Skeleton key={idx} className={cn(
                            "h-[360px] w-full"
                        )} />
                    ))}
                </div>
            ) : (
                <div className="grid w-full grid-cols-1 gap-12">
                    {currentCombos?.map((combo) => {
                        return (
                            <Card key={combo.id} className={cn(
                                "flex h-[360px] w-full flex-col items-center justify-center bg-pvbx-quaternary p-2 text-pvbx-dark"
                            )}>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className={cn(
                                            "grid h-[270px] w-full cursor-pointer auto-cols-fr grid-flow-col gap-2 overflow-hidden rounded-2xl"
                                        )}>
                                            {combo.items.map((item, idx) => (
                                                <div key={idx} className={cn(
                                                    "group size-full overflow-hidden rounded-xl"
                                                )}>
                                                    <Image
                                                        src={item.product.images[0].source}
                                                        alt={item.product.images[0].description}
                                                        quality={85}
                                                        width={320}
                                                        height={270}
                                                        className={cn(
                                                            "h-auto w-full transform object-cover transition-transform duration-500 ease-in-out",
                                                            {
                                                                "group-hover": "scale-105"
                                                            }
                                                        )}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className={cn(
                                        "flex gap-6"
                                    )}>
                                        <div className={cn(
                                            "grid h-full grow grid-flow-row auto-rows-fr grid-cols-1 gap-2 overflow-hidden rounded-xl"
                                        )}>
                                            {combo.items.map((item, idx) => (
                                                <div key={idx} className={cn(
                                                    "h-full overflow-hidden rounded-xl"
                                                )}>
                                                    <Image
                                                        src={item.product.images[0].source}
                                                        alt={item.product.images[0].description}
                                                        quality={85}
                                                        width={320}
                                                        height={270}
                                                        className={cn(
                                                            "h-auto w-[320px] transform object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                                        )}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <div className={cn(
                                            "flex w-full flex-col items-start justify-between gap-2"
                                        )}>

                                            <DialogHeader className={cn(
                                                "w-full py-4"
                                            )}>
                                                <DialogTitle>
                                                    {combo.name}
                                                </DialogTitle>
                                                <DialogDescription>
                                                    {combo.description}
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
                                                            {combo.price.toLocaleString("vi-VN")} VNĐ
                                                        </span>
                                                    </div>
                                                    <DialogClose asChild>
                                                        <AddToCartButton product={combo} />
                                                    </DialogClose>
                                                </div>
                                                <DialogFooter>
                                                    <OrderNowButton product={combo} />
                                                </DialogFooter>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                                <div className={cn(
                                    "flex w-full flex-col justify-between gap-1"
                                )}>
                                    <CardHeader className={cn(
                                        "p-2",
                                        {
                                            "group-first": "gap-4 pt-4"
                                        }
                                    )}>
                                        <CardTitle className={cn(
                                            "line-clamp-1 text-center text-xl"
                                        )}>
                                            {combo.name}
                                        </CardTitle>
                                        <CardDescription className={cn(
                                            "line-clamp-2 px-12 text-center text-xs"
                                        )}>
                                            {combo.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardFooter className={cn(
                                        "grid grid-cols-3 gap-2"
                                    )}>
                                        <span className="flex h-[40px] w-full items-center justify-center whitespace-nowrap px-4 text-center text-1.5xl font-semibold leading-none text-pvbx-primary">
                                            {combo.price.toLocaleString("vi-VN")} VNĐ
                                        </span>
                                        <OrderNowButton product={combo} />
                                        <AddToCartButton product={combo} />
                                    </CardFooter>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            )}
            {data && data.items.length > MAX_COMBOS_PER_PAGE && (
                <TabsPagination
                    totalPosts={data.items.length}
                    productsPerPage={combosPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            )}
        </div>
    )
}
