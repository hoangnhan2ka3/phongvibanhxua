import { create } from "zustand"
import { persist } from "zustand/middleware"

import { type Item } from "@/types/products"

interface State {
    cart: Item[],
    totalItems: number,
    totalPrice: number
}

interface Actions {
    addToCart: (item: Item) => void,
    removeFromCart: (item: Item) => void,
    emptyCart: () => void,
    removeCakeFromCart: (item: Item) => void
}

const INITIAL_STATE: State = {
    cart: [],
    totalItems: 0,
    totalPrice: 0
}

export const useCartStore = create(persist<State & Actions>((set, get) => ({
    cart: INITIAL_STATE.cart,
    totalItems: INITIAL_STATE.totalItems,
    totalPrice: INITIAL_STATE.totalPrice,
    addToCart: (cake) => {
        const cart = get().cart
        const cartItem = cart.find((item) => item.id === cake.id)

        if (cartItem) {
            const updatedCart = cart.map((item) =>
            (item.id === cake.id
                ? { ...item, quantity: (item.quantity!) + 1 }
                : item)
            )
            set((state) => ({
                cart: updatedCart,
                totalItems: state.totalItems + 1,
                totalPrice: state.totalPrice + cake.price
            }))
        } else {
            const updatedCart = [...cart, { ...cake, quantity: 1 }]

            set((state) => ({
                cart: updatedCart,
                totalItems: state.totalItems + 1,
                totalPrice: state.totalPrice + cake.price
            }))
        }
    },
    removeFromCart: (cake) => {
        const cart = get().cart
        const cartItem = cart.find((item) => item.id === cake.id)

        if (cartItem?.quantity && cartItem.quantity > 1) {
            const updatedCart = cart.map((item) =>
            (item.id === cake.id
                ? { ...item, quantity: (item.quantity!) - 1 }
                : item)
            )
            set((state) => ({
                cart: updatedCart,
                totalItems: state.totalItems - 1,
                totalPrice: state.totalPrice - cake.price
            }))
        } else {
            set((state) => ({
                cart: state.cart.filter((item) => item.id !== cake.id),
                totalItems: state.totalItems - 1,
                totalPrice: state.totalPrice - cake.price
            }))
        }
    },
    removeCakeFromCart: (cake) => {
        set((state) => {
            const cartItem = state.cart.find((item) => item.id === cake.id)
            const quantityToRemove = cartItem?.quantity ?? 0
            const priceToRemove = cartItem ? cartItem.price * quantityToRemove : 0

            return {
                cart: state.cart.filter((item) => item.id !== cake.id),
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
