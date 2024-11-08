import { create } from "zustand"
import { persist } from "zustand/middleware"

import { type User } from "@/types/users"

interface UserState {
    user: User | null,
    isAuth: boolean
}

interface UserActions {
    setUser: (user: User) => void,
    clearUser: () => void
}

export const useUser = create(persist<UserState & UserActions>(
    (set) => ({
        user: null,
        isAuth: false,
        setUser: (user) => { set(() => ({ user, isAuth: true })) },
        clearUser: () => { set(() => ({ user: null, isAuth: false })) }
    }),
    {
        name: "user-storage"
    }
))
