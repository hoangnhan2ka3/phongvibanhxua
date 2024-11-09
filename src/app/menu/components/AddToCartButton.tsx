import { ShoppingBasket } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import api from "@/configs/axios"
import { useCartStore } from "@/hooks"
import { useUser } from "@/hooks/useUser"
import { cn } from "@/lib/utils"
import { type Item } from "@/types/cakes"
import { type SetItem } from "@/types/combos"

export default function AddToCartButton({ product }: { product: Item | SetItem }) {
    const { cart, addToCart } = useCartStore()
    const { user, isAuth } = useUser()

    async function createCartItems(productId: number, quantity: number) {
        if (user) {
            try {
                await api.post(`/store/api/v1/cart-items/customers/${user.username}`, {
                    "productId": productId,
                    "comboId": 0,
                    "type": "PRODUCT",
                    "quantity": quantity
                })
            } catch (error) {
                console.error("Error creating cart items:", error)
            }
        }
    }

    const router = useRouter()

    return (
        <Button
            variant="secondary"
            type="button"
            className={cn("grid h-10 flex-1 place-items-center rounded-2xl py-0")}
            onClick={() => {
                if (!isAuth) {
                    router.push("/sign-in")
                } else {
                    addToCart(product)
                    const updateItem = cart.filter((cart) => cart.id === product.id)
                    createCartItems(product.id, updateItem[0] !== undefined ? updateItem[0].quantity + 1 : 1) // Sử dụng quantity từ product hoặc mặc định là 1
                }
            }}
        >
            <ShoppingBasket />
        </Button>
    )
}
