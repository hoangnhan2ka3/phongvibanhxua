"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { useCartStore, useUser } from "@/hooks"
import { cn } from "@/lib/utils"
import { type Item } from "@/types/cakes"
import { type SetItem } from "@/types/combos"

export default function OrderNowButton({ product }: { product: Item | SetItem }) {
    const { addToCart } = useCartStore()
    const { isAuth } = useUser()

    const router = useRouter()

    return (
        <Button type="button" onClick={() => {
            !isAuth ? router.push("/sign-in") : addToCart(product)
            router.push("/checkout")
        }} className={cn(
            "grid h-10 w-full place-items-center rounded-2xl py-0"
        )}>
            Đặt ngay
        </Button>
    )
}
