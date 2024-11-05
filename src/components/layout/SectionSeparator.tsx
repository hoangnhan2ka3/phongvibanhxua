"use client"

import { cn } from "@/lib/utils"

export default function SectionSeparator() {
    return (
        <div className={cn(
            "h-[90px] w-full bg-pvbx-tertiary bg-[length:45px_45px] bg-[0_0,23px_23px]"
        )}>
            <style jsx>{`
                div {
                    background-image: repeating-linear-gradient(
                        45deg,
                        rgb(var(--pvbx-primary)) 25%,
                        transparent 25%,
                        transparent 75%,
                        rgb(var(--pvbx-primary)) 75%,
                        rgb(var(--pvbx-primary))),
                        repeating-linear-gradient(45deg, rgb(var(--pvbx-primary)) 25%,
                        rgb(var(--pvbx-tertiary)) 25%, rgb(var(--pvbx-tertiary)) 75%,
                        rgb(var(--pvbx-primary)) 75%, rgb(var(--pvbx-primary))
                    )
                }
            `}</style>
        </div>
    )
}
