import { XCircle } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"

export default function CheckoutFailPage() {
    return (
        <div className={cn(
            "flex min-h-[calc(100dvh-12rem-90px)] items-center justify-center text-pretty bg-red-100 px-32 py-12"
        )}>
            <div className={cn(
                "flex flex-col gap-12"
            )}>
                <div className={cn(
                    "flex flex-col items-center"
                )}>
                    <XCircle size={96} className="text-red-600" />
                    <h1 className="font-serif text-5xl text-red-600">Thanh toán thất bại</h1>
                </div>
                <div className={cn(
                    "flex flex-col gap-2 text-center font-semibold"
                )}>
                    <p>Có vẻ bạn đã hủy quá trình thanh toán hoặc đã xảy ra lỗi trong quá trình thực hiện thanh toán. Vui lòng thử lại.</p>
                    <p>Nếu lỗi còn xuất hiện, bạn vui lòng nhắn tin về <Link href="https://www.facebook.com/phongvi.banhxua" className="underline">fanpage</Link> của chúng mình để được tư vấn.</p>
                </div>
            </div>
        </div>
    )
}
