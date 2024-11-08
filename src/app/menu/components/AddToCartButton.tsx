import { ShoppingBasket } from "lucide-react"

import { Button } from "@/components/ui/button"
import api from "@/configs/axios"
import { useCartStore } from "@/hooks"
import { useUser } from "@/hooks/useUser"
import { cn } from "@/lib/utils"
import { type Item } from "@/types/cakes"
import { type SetItem } from "@/types/combos"

export default function AddToCartButton({ product }: { product: Item | SetItem }) {
    const { cart, totalItems, totalPrice, addToCart } = useCartStore()
    const { user } = useUser()

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
                var updateItem = cart.filter((cart) => cart.id === product.id)
                createCartItems(product.id, updateItem[0] !== undefined ? updateItem[0].quantity + 1 : 1) // Sử dụng quantity từ product hoặc mặc định là 1
            }}
        >
            <ShoppingBasket />
        </Button>
    )
}
