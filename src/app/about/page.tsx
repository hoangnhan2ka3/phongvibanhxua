import { cn } from "@/lib/utils"

export default function AboutPage() {
    return (
        <div className={cn(
            "flex min-h-[calc(100dvh-12rem-90px)] flex-col items-center justify-center gap-6 bg-pvbx-light"
        )}>
            <h1 className={cn(
                "font-serif text-8xl text-pvbx-primary"
            )}>Về chúng mình</h1>
            <p className={cn(
                "mx-auto w-[650px] text-center text-lg"
            )}>
                Với đa dạng các loại bánh như bánh bò, bánh bèo, bánh da lợn, bánh in,... Phong Vị Bánh Xưa hứa hẹn mang đến cho bạn những trải nghiệm ẩm thực độc đáo và khó quên.
            </p>
        </div>
    )
}
