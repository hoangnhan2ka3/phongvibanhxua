"use client"

import Image from "next/image"
import { useState } from "react"

import { type CakeTypes } from "@/app/api/cakes"
import { Button } from "@/components/ui/button"
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
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination"
import { useFetch } from "@/hooks/useFetch"
import { cn } from "@/lib/utils"

import AddToCartButton from "./AddToCartButton"

export default function ClientPagination() {
    const [currentPage, setCurrentPage] = useState(1)
    const [cakesPerPage, setCakesPerPage] = useState(currentPage === 1 ? 8 : 9)

    const { data, loading } = useFetch<CakeTypes[]>("/api/cakes")

    const lastCakeIndex = currentPage * cakesPerPage
    const firstCakeIndex = lastCakeIndex - cakesPerPage
    const currentCakes = data?.slice(firstCakeIndex, lastCakeIndex)

    return (
        <div className={cn(
            "flex grow flex-col gap-12"
        )}>
            <div className="grid w-full grid-cols-3 gap-12">
                {currentCakes?.map((cake) => {
                    return (
                        <Card key={cake.id} className={cn(
                            "group flex flex-col items-center justify-center bg-pvbx-quaternary p-2 text-pvbx-dark",
                            {
                                first: currentPage === 1 && [
                                    "relative col-span-2 h-full flex-row items-start gap-2",
                                    {
                                        after: "absolute left-0 top-0 rounded-br-3xl rounded-tl-3xl border-2 border-pvbx-tertiary bg-pvbx-primary px-6 py-2 text-xl font-bold text-pvbx-tertiary content-['Bán_chạy_nhất']"
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
                                            src={cake.url}
                                            alt={cake.name}
                                            quality={85}
                                            width={320}
                                            height={270}
                                            className={cn(
                                                "h-[270px] w-full transform object-cover transition-transform duration-500 ease-in-out group-hover:scale-105",
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
                            <div className={cn(
                                "flex w-full flex-col gap-2",
                                {
                                    "group-first": currentPage === 1 && "h-full justify-between"
                                }
                            )}>
                                <CardHeader className={cn(
                                    "py-2"
                                )}>
                                    <CardTitle className={cn(
                                        "text-center text-base"
                                    )}>
                                        {cake.name}
                                    </CardTitle>
                                    <CardDescription className="text-center text-xs">
                                        {cake.ingredients}
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
                                                    {(cake.price * 1000).toLocaleString("vi-VN")} VNĐ
                                                </span>
                                            </div>
                                            <AddToCartButton product={cake} />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button type="button" className={cn(
                                            "grid h-[40px] w-full place-items-center rounded-2xl py-0"
                                        )}>
                                            Đặt ngay
                                        </Button>
                                    </CardFooter>
                                </div>
                            </div>
                        </Card>
                    )
                })}
            </div>
            <CakesPagination
                totalPosts={data ? data.length : 0}
                cakesPerPage={cakesPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}

function CakesPagination({
    totalPosts,
    cakesPerPage,
    currentPage,
    setCurrentPage
}: {
    totalPosts: number,
    cakesPerPage: number,
    currentPage: number,
    setCurrentPage: (page: number) => void
}) {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalPosts / cakesPerPage); i++) {
        pageNumbers.push(i)
    }

    const maxPageNum = 5 // Maximum page numbers to display at once
    const pageNumLimit = Math.floor(maxPageNum / 2) // Current page should be in the middle if possible

    const activePages = pageNumbers.slice(
        Math.max(0, currentPage - 1 - pageNumLimit),
        Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length)
    )

    const handleNextPage = () => {
        if (currentPage < pageNumbers.length) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    // Function to render page numbers with ellipsis
    const renderPages = () => {
        const renderedPages = activePages.map((page, idx) => (
            <PaginationItem key={idx}>
                <PaginationLink
                    type="button"
                    isActive={currentPage === page}
                    onClick={() => { setCurrentPage(page) }}
                >
                    {page}
                </PaginationLink>
            </PaginationItem>
        ))

        // Add ellipsis at the start if necessary
        if (activePages[0] > 1) {
            renderedPages.unshift(
                <PaginationEllipsis
                    key="ellipsis-start"
                    onClick={() => { setCurrentPage(activePages[0] - 1) }}
                />
            )
        }

        // Add ellipsis at the end if necessary
        if (activePages[activePages.length - 1] < pageNumbers.length) {
            renderedPages.push(
                <PaginationEllipsis
                    key="ellipsis-end"
                    onClick={() => {
                        setCurrentPage(activePages[activePages.length - 1] + 1)
                    }}
                />
            )
        }

        return renderedPages
    }

    return (
        <div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious type="button" onClick={handlePrevPage} />
                    </PaginationItem>
                    {renderPages()}
                    <PaginationItem>
                        <PaginationNext type="button" onClick={handleNextPage} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
