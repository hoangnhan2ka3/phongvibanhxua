import { ShoppingBasket } from "lucide-react"

import { Button } from "@/components/ui/button"
import api from "@/configs/axios"
import { useCartStore } from "@/hooks"
import { useUserStore } from "@/hooks/userLogin"
import { cn } from "@/lib/utils"
import { type Item } from "@/types/cakes"
import { type SetItem } from "@/types/combos"

export default function AddToCartButton({ product }: { product: Item | SetItem }) {
    const { addToCart } = useCartStore()
    const { user } = useUserStore()

    async function createCartItems(productId: number, quantity: number) {
        try {
            const response = await api.post(`/store/api/v1/cart-items/customers/${user.username}`, {
                "productId": productId,
                "comboId": 0,
                "type": "PRODUCT",
                "quantity": quantity
            })
            console.log(response.data)
        } catch (error) {
            console.error("Error creating cart items:", error)
        }
    }

    return (
        <Button
            variant="secondary"
            type="button"
            className={cn("grid h-[40px] flex-1 place-items-center rounded-2xl py-0")}
            onClick={() => {
                addToCart(product)
                createCartItems(product.id, product.quantity || 1) // Sử dụng quantity từ product hoặc mặc định là 1
            }}
        >
            <ShoppingBasket />
        </Button>
    )
}
