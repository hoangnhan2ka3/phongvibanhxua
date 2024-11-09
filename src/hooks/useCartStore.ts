import { create } from "zustand"
import { persist } from "zustand/middleware"

import { type Item } from "@/types/cakes"
import { type SetItem } from "@/types/combos"
import { User } from "@/types/users"
import api from "@/configs/axios"
import { get } from "http"
import { set } from "react-hook-form"

interface State {
    cart: Item[] | SetItem[],
    totalItems: number,
    totalPrice: number
}

interface Actions {
    addToCart: (item: Item | SetItem, user: User | null) => void,
    removeFromCart: (item: Item | SetItem, user: User | null) => void,
    emptyCart: () => void,
    removeProductFromCart: (item: Item | SetItem) => void
}

const INITIAL_STATE: State = {
    cart: [],
    totalItems: 0,
    totalPrice: 0
}

const createCartItems = async (username: string, productId: number, quantity: number) => {
    try {
        console.log("Running create cart")
        console.log(productId, quantity)
        const response = await api.post(`/store/api/v1/cart-items/customers/${username}`, {
            productId: productId,
            comboId: 0,
            type: "PRODUCT",
            quantity: quantity,
        });
        console.log(response.data);
    } catch (error) {
        console.error("Error creating cart items:", error);
    }
};

export const useCartStore = create(persist<State & Actions>((set, get) => ({
    cart: INITIAL_STATE.cart,
    totalItems: INITIAL_STATE.totalItems,
    totalPrice: INITIAL_STATE.totalPrice,
    addToCart: (product, user) => {
        const cart = get().cart
        const cartItem = cart.find((item) => item.id === product.id)
        console.log(user)
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
            if (user !== null && user !== undefined) {
                console.log(updatedCart)
                createCartItems(user.username, cartItem.id, cartItem.quantity + 1)
            } else {
                console.log("user is null")
            }
        } else {
            const updatedCart = [...cart, { ...product, quantity: 1 }]
            set((state) => ({
                cart: updatedCart as Item[] | SetItem[],
                totalItems: state.totalItems + 1,
                totalPrice: state.totalPrice + product.discountPrice
            }))
            if (user !== null && user !== undefined) {
                console.log(updatedCart)
                createCartItems(user.username, cartItem.id, 1)
            } else {
                console.log("user is null")
            }
        }
    },
    removeFromCart: (product, user) => {
        const cart = get().cart
        const cartItem = cart.find((item) => item.id === product.id)
        console.log(user)
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
            if (user !== null && user !== undefined) {
                console.log(updatedCart)
                createCartItems(user.username, cartItem.id, cartItem.quantity - 1)
            } else {
                console.log("user is null")
            }

        } else {
            set((state) => ({
                cart: state.cart.filter((item) => item.id !== product.id) as Item[] | SetItem[],
                totalItems: state.totalItems - 1,
                totalPrice: state.totalPrice - product.discountPrice
            }))

            if (user !== null && user !== undefined) {
                console.log(updatedCart)
                createCartItems(user.username, cartItem.id, 0)
            } else {
                console.log("user is null")
            }
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
