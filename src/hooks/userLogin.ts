import { create } from "zustand"
import { persist } from "zustand/middleware"

import { type User } from "@/types/users"

interface UserState {
    user: User | null
}

interface UserActions {
    setUser: (user: User) => void,
    clearUser: () => void
}

export const useUserStore = create(persist<UserState & UserActions>(
    (set) => ({
        user: null,
        setUser: (user) => { set(() => ({ user })) },
        clearUser: () => { set(() => ({ user: null })) }
    }),
    {
        name: "user-storage"
    }
))
