import { ShoppingBasket } from "lucide-react"

import { type CakeTypes } from "@/app/api/cakes"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/hooks"
import { cn } from "@/lib/utils"

export default function AddToCartButton({ product }: { product: CakeTypes }) {
    const { addToCart } = useCartStore()

    return (
        <Button variant="secondary" type="button" className={cn(
            "grid h-[40px] flex-1 place-items-center rounded-full py-0"
        )} onClick={() => {
            addToCart(product)
        }}>
            <ShoppingBasket />
        </Button>
    )
}
