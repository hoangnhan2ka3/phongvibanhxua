"use client"

import { ChevronRight } from "lucide-react"
import Image from "next/image"

import { type CakeTypes } from "@/app/api/cakes"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
import { useFetch } from "@/hooks/useFetch"
import { cn } from "@/lib/utils"

import AddToCartButton from "./AddToCartButton"

export default function NewCakes() {
    const { data, loading } = useFetch<CakeTypes[]>("/api/cakes")

    const newCakeIds = [9, 14, 16]
    const newCakes = data?.filter((cake) => newCakeIds.includes(cake.id))

    return (
        <div className={cn(
            "flex flex-col gap-6 px-32"
        )}>
            <h2 className={cn(
                "font-serif text-6xl"
            )}>Bánh mới về</h2>
            <div className={cn(
                "grid h-[500px] grid-cols-2 grid-rows-2 gap-12"
            )}>
                {newCakes?.map((cake) => {
                    return (
                        <Dialog key={cake.id}>
                            <DialogTrigger asChild>
                                <Card className={cn(
                                    "group relative flex cursor-pointer items-center justify-center",
                                    {
                                        first: "row-span-2"
                                    }
                                )}>
                                    <CardContent className={cn(
                                        "m-0 flex size-full items-center justify-center p-0"
                                    )}>
                                        <Image
                                            src={cake.url}
                                            alt={cake.name}
                                            quality={85}
                                            width={320}
                                            height={270}
                                            className={cn(
                                                "h-auto w-full object-cover transition-transform duration-500 ease-in-out",
                                                {
                                                    "group-hover": "scale-105",
                                                    "group-first": "h-full w-auto"
                                                }
                                            )}
                                        />
                                        <div className={cn(
                                            "absolute inset-0 bg-gradient-to-t from-pvbx-secondary via-transparent to-transparent"
                                        )}>
                                            <div className={cn(
                                                "absolute bottom-6 left-8 flex items-center gap-2 text-2xl font-bold text-pvbx-light"
                                            )}>
                                                <h3>
                                                    {cake.name}
                                                </h3>
                                                <ChevronRight size={32} strokeWidth={3} />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </DialogTrigger>
                            <DialogContent className={cn(
                                "flex gap-6"
                            )}>
                                <div className={cn(
                                    "size-full overflow-hidden rounded-xl"
                                )}>
                                    <Image
                                        src={cake.url}
                                        alt={cake.name}
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
                                            {cake.ingredients}
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
                                                    {(cake.price * 1000).toLocaleString("vi-VN")} VNĐ
                                                </span>
                                            </div>
                                            <DialogClose asChild>
                                                <AddToCartButton product={cake} />
                                            </DialogClose>
                                        </div>
                                        <DialogFooter>
                                            <Button type="button" className={cn(
                                                "grid h-[40px] w-full place-items-center rounded-2xl py-0"
                                            )}>
                                                Đặt ngay
                                            </Button>
                                        </DialogFooter>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    )
                })}
            </div>
        </div>
    )
}
