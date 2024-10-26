import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-bold ring-offset-background transition-colors",
        {
            "focus-visible": "outline-none ring-2 ring-ring ring-offset-2",
            disabled: "pointer-events-none opacity-50",
            "svg": "pointer-events-none shrink-0"
        }
    ),
    {
        variants: {
            variant: {
                default: cn(
                    "bg-pvbx-primary text-pvbx-light",
                    {
                        hover: "brightness-90 duration-0",
                        active: "brightness-75"
                    }
                ),
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline: cn(
                    "border border-pvbx-primary/40 bg-pvbx-background",
                    {
                        hover: "bg-pvbx-primary/10 duration-0"
                    }
                ),
                secondary: cn(
                    "bg-pvbx-secondary text-pvbx-light",
                    {
                        hover: "brightness-90 duration-0",
                        active: "brightness-75"
                    }
                ),
                tertiary: cn(
                    "bg-pvbx-tertiary text-pvbx-light",
                    {
                        hover: "brightness-90 duration-0",
                        active: "brightness-75"
                    }
                ),
                ghost: cn(
                    {
                        hover: "bg-pvbx-primary/10 duration-0",
                        active: "bg-pvbx-primary/15"
                    }
                ),
                link: "text-primary underline-offset-4 hover:underline"
            },
            size: {
                default: "px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "size-10"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
