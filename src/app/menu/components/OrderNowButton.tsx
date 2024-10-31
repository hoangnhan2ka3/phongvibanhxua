"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { useCartStore } from "@/hooks"
import { cn } from "@/lib/utils"
import { type Item } from "@/types/cakes"
import { type SetItem } from "@/types/combos"

export default function OrderNowButton({ product }: { product: Item | SetItem }) {
    const { addToCart } = useCartStore()

    const router = useRouter()

    return (
        <Button type="button" onClick={() => {
            addToCart(product)
            router.push("/checkout")
        }} className={cn(
            "grid h-[40px] w-full place-items-center rounded-2xl py-0"
        )}>
            Đặt ngay
        </Button>
    )
}
