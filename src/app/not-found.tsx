import { cn } from "@/lib/utils"

export default function NotFoundPage() {
    return (
        <div className={cn(
            "flex min-h-[calc(100dvh-12rem-90px)] items-center justify-center text-pretty bg-pvbx-light px-32 py-12 font-serif text-5xl leading-none"
        )}>
            <div className={cn(
                "flex flex-col items-center"
            )}>
                <span>🫣</span>
                <h1 className={cn(
                    "opacity-50"
                )}>Làm gì có trang này...</h1>
            </div>
        </div>
    )
}
