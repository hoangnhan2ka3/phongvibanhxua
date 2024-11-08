"use client"

import { useUser } from "@/hooks"
import { cn } from "@/lib/utils"

export default function AccountPage() {
    const { user, isAuth, setUser } = useUser()

    return (
        <div className={cn(
            "flex flex-col gap-12 bg-pvbx-light py-12"
        )}>
            <div className={cn(
                "flex flex-col gap-6 px-32"
            )}>
                <h2 className={cn(
                    "font-serif text-6xl"
                )}>Tài khoản của tôi</h2>
                <div className={cn(
                    "grid h-[500px] grid-cols-2 grid-rows-2 gap-12"
                )}>

                </div>
            </div>
        </div>
    )
}
