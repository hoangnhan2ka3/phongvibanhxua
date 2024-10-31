"use client"

import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import * as React from "react"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 0, ...props }, ref) => (
    <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
            "z-50 m-1 select-none overflow-hidden rounded-1.5lg border-2 border-dashed border-pvbx-primary bg-pvbx-background px-2 font-sans text-sm font-semibold text-pvbx-dark transition-[transform,_opacity] duration-300 ease-vaul will-change-[transform,_opacity]",
            {
                "data-side=top:starting": "-translate-y-2 scale-90 opacity-0",
                "data-side=bottom:starting": "-translate-y-2 scale-90 opacity-0",
                "data-side=left:starting": "-translate-x-2 scale-90 opacity-0",
                "data-side=right:starting": "-translate-x-2 scale-90 opacity-0",
                "data-state=closed": "animate-out fade-out-0 zoom-out-90"
            },
            className
        )}
        {...props}
    />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
