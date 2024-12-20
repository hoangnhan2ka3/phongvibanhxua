import * as React from "react"

import { cn } from "@/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-xl border border-pvbx-primary/20 bg-pvbx-light px-3 py-2 text-sm ring-offset-background",
                    {
                        file: "border-0 bg-transparent text-sm font-medium text-foreground",
                        placeholder: "text-muted-foreground",
                        "focus-visible": "outline-none ring-2 ring-ring ring-offset-2",
                        disabled: "cursor-not-allowed opacity-50",
                        after: ""
                    },
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }
