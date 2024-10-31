import { cn } from "@/lib/utils"

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-3xl bg-pvbx-quaternary", className)}
            {...props}
        />
    )
}

export { Skeleton }
