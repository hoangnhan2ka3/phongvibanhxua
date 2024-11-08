"use client"

import * as PopoverPrimitive from "@radix-ui/react-popover"
import * as React from "react"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
    React.ElementRef<typeof PopoverPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 0, ...props }, ref) => (
    <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
            ref={ref}
            align={align}
            sideOffset={sideOffset}
            className={cn(
                "z-50 m-1 rounded-2xl border border-pvbx-primary bg-pvbx-light p-2 text-pvbx-dark outline-none",
                {
                    "data-state=open": "animate-in fade-in-0 zoom-in-95",
                    "data-state=closed": "animate-out fade-out-0 zoom-out-95",
                    "data-side=bottom": "slide-in-from-top-2",
                    "data-side=left": "slide-in-from-right-2",
                    "data-side=right": "slide-in-from-left-2",
                    "data-side=top": "slide-in-from-bottom-2"
                },
                className
            )}
            {...props}
        />
    </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverContent, PopoverTrigger }
