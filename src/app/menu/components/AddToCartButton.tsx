import { ShoppingBasket } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCartStore } from "@/hooks"
import { cn } from "@/lib/utils"
import { type Item } from "@/types/cakes"
import { type SetItem } from "@/types/combos"

export default function AddToCartButton({ product }: { product: Item | SetItem }) {
    const { addToCart } = useCartStore()

    return (
        <Button variant="secondary" type="button" className={cn(
            "grid h-[40px] flex-1 place-items-center rounded-2xl py-0"
        )} onClick={() => {
            addToCart(product)
        }}>
            <ShoppingBasket />
        </Button>
    )
}
