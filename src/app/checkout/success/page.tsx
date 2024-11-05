import { CheckCircle } from "lucide-react"

import { cn } from "@/lib/utils"

export default function CheckoutSuccessPage() {
    return (
        <div className={cn(
            "flex min-h-[calc(100dvh-12rem-90px)] items-center justify-center text-pretty bg-green-100 px-32 py-12"
        )}>
            <div className={cn(
                "flex flex-col gap-12"
            )}>
                <div className={cn(
                    "flex flex-col items-center"
                )}>
                    <CheckCircle size={96} className="text-green-600" />
                    <h1 className="font-serif text-5xl text-green-600">Thanh toán thành công</h1>
                </div>
                <div className={cn(
                    "flex flex-col gap-2 text-center font-semibold"
                )}>
                    <p>Đội ngũ Phong Vị xin cảm ơn bạn đã ủng hộ một đơn hàng, sự thanh toán của bạn tăng tỷ lệ pass môn của chúng mình.</p>
                    <p>Chúng mình vô cùng cảm kích và biết ơn 🥹</p>
                </div>
            </div>
        </div>
    )
}
