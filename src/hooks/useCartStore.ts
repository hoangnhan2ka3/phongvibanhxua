import { create } from "zustand"
import { persist } from "zustand/middleware"

import { type Item } from "@/types/cakes"
import { type SetItem } from "@/types/combos"
import api from "@/configs/axios"
import { useUserStore } from "./userLogin"

interface State {
    cart: Item[] | SetItem[],
    totalItems: number,
    totalPrice: number
}

interface Actions {
    addToCart: (item: Item | SetItem) => void,
    removeFromCart: (item: Item | SetItem) => void,
    emptyCart: () => void,
    removeProductFromCart: (item: Item | SetItem) => void
}

const INITIAL_STATE: State = {
    cart: [],
    totalItems: 0,
    totalPrice: 0
}

async function createCartItems(productId: number, quantity: number) {
    const { user } = useUserStore()
    console.log(quantity)
    try {
        if (user !== null) {
            const response = await api.post(`/store/api/v1/cart-items/customers/${user.username}`, {
                "productId": productId,
                "comboId": 0,
                "type": "PRODUCT",
                "quantity": quantity
            })
            console.log(response.data)
        } else window.location.href = "https://phongvibanhxua.vercel.app/sign-in"
    } catch (error) {
        console.error("Error creating cart items:", error)
    }
}

export const useCartStore = create(persist<State & Actions>((set, get) => ({
    cart: INITIAL_STATE.cart,
    totalItems: INITIAL_STATE.totalItems,
    totalPrice: INITIAL_STATE.totalPrice,
    addToCart: (product) => {
        const cart = get().cart
        const cartItem = cart.find((item) => item.id === product.id)

        if (cartItem) {
            const updatedCart = cart.map((item) =>
            (item.id === product.id
                ? { ...item, quantity: (item.quantity!) + 1 }
                : item
            ))
            set((state) => ({
                cart: updatedCart as Item[] | SetItem[],
                totalItems: state.totalItems + 1,
                totalPrice: state.totalPrice + product.discountPrice
            }))
        } else {
            const updatedCart = [...cart, { ...product, quantity: 1 }]
            set((state) => ({
                cart: updatedCart as Item[] | SetItem[],
                totalItems: state.totalItems + 1,
                totalPrice: state.totalPrice + product.discountPrice
            }))
        }
    },
    removeFromCart: (product) => {
        const cart = get().cart
        const cartItem = cart.find((item) => item.id === product.id)

        if (cartItem?.quantity && cartItem.quantity > 1) {
            const updatedCart = cart.map((item) =>
            (item.id === product.id
                ? { ...item, quantity: (item.quantity!) - 1 }
                : item
            ))
            set((state) => ({
                cart: updatedCart as Item[] | SetItem[],
                totalItems: state.totalItems - 1,
                totalPrice: state.totalPrice - product.discountPrice
            }))
        } else {
            set((state) => ({
                cart: state.cart.filter((item) => item.id !== product.id) as Item[] | SetItem[],
                totalItems: state.totalItems - 1,
                totalPrice: state.totalPrice - product.discountPrice
            }))
        }
    },
    removeProductFromCart: (product) => {
        set((state) => {
            const cartItem = state.cart.find((item) => item.id === product.id)
            const quantityToRemove = cartItem?.quantity ?? 0
            const priceToRemove = cartItem ? cartItem.discountPrice * quantityToRemove : 0

            return {
                cart: state.cart.filter((item) => item.id !== product.id) as Item[] | SetItem[],
                totalItems: state.totalItems - quantityToRemove,
                totalPrice: state.totalPrice - priceToRemove
            }
        })
    },
    emptyCart: () => {
        set(() => ({
            cart: [],
            totalItems: 0,
            totalPrice: 0
        }))
    }
}), {
    name: "cart-storage"
}))
