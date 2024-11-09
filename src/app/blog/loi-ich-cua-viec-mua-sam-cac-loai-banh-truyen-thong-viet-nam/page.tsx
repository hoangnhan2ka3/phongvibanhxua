import { ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function BlogDetail1() {
    return (
        <div className={cn(
            "flex min-h-[calc(100dvh-12rem-90px)] flex-col gap-12 bg-pvbx-light py-12"
        )}>
            <div className={cn(
                "flex flex-col gap-6 px-32"
            )}>
                <Link href="/blog" className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-fit pl-2"
                )}>
                    <ChevronLeft size={24} /> Trở về
                </Link>
                <div className={cn(
                    "flex flex-col gap-12"
                )}>
                    <Card className={cn(
                        "flex h-80 gap-8 p-2"
                    )}>
                        <div className={cn(
                            "h-full min-w-92 overflow-hidden rounded-2xl"
                        )}>
                            <Image
                                src="/blog/1.jpg"
                                alt="Blog 1"
                                width={320}
                                height={270}
                                className={cn(
                                    "h-full w-92 object-cover transition-transform duration-500 ease-in-out"
                                )}
                            />
                        </div>
                        <div className={cn(
                            "flex flex-col justify-between"
                        )}>
                            <CardHeader className={cn(
                                "gap-3 pl-0"
                            )}>
                                <CardTitle className={cn(
                                    "line-clamp-2 text-pretty leading-tight"
                                )}>
                                    Lợi ích của việc mua sắm các loại bánh truyền thống Việt Nam
                                </CardTitle>
                                <CardDescription className={cn(
                                    "line-clamp-2 text-pretty pr-56 text-base"
                                )}>
                                    Khám phá lợi ích không ngờ của việc mua sắm các loại bánh truyền thống Việt Nam,
                                    từ việc giữ gìn văn hóa đến hỗ trợ cộng đồng.
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className={cn(
                                "flex gap-2 pb-6"
                            )}>
                                <time>19/10/2024</time>
                                <span>-</span>
                                <p>Đinh Minh Huân</p>
                            </CardFooter>
                        </div>
                    </Card>
                </div>
                <div className={cn(
                    "mx-auto w-[57.5rem] space-y-10 py-8"
                )}>
                    {sections.map((section, idx) => (
                        <div key={idx} className={cn(
                            "flex flex-col gap-4"
                        )}>
                            <h2 className={cn(
                                "text-xl font-bold"
                            )}>
                                {section.title}
                            </h2>
                            <p className={cn(
                                "text-justify leading-normal"
                            )}>
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const sections = [
    {
        title: "1. Giữ gìn và phát huy văn hóa",
        content: `Các loại bánh truyền thống như bánh chưng, bánh dày, bánh tét, bánh ít, và bánh gai không chỉ
            là món ăn ngon mà còn là biểu tượng văn hóa, mang đậm dấu ấn lịch sử và truyền thống của dân
            tộc. Khi chúng ta mua và thưởng thức các loại bánh này, chúng ta đang góp phần giữ gìn và phát
            huy giá trị văn hóa của người Việt.
        `
    },
    {
        title: "2. Hỗ trợ cộng đồng",
        content: `Một trong những mục tiêu chính của việc bán các loại bánh truyền thống trên trang web này là
            sử dụng tiền lợi nhuận để hỗ trợ các cô chú bán hàng rong lớn tuổi gặp khó khăn. Với mỗi chiếc bánh bạn
            mua, một phần tiền sẽ được dành để giúp đỡ những người lao động vất vả này, mang lại cho họ một cuộc sống
            tốt đẹp hơn.
        `
    },
    {
        title: "3. Bảo vệ sức khỏe",
        content: `Các loại bánh truyền thống thường được làm từ nguyên liệu tự nhiên, không chứa chất bảo quản
            hay phẩm màu nhân tạo. Điều này giúp bảo vệ sức khỏe cho bạn và gia đình. Bánh chưng được làm từ gạo nếp,
            đậu xanh và thịt lợn; bánh dày từ bột nếp; bánh gai từ lá gai và đậu xanh. Tất cả đều là những nguyên
            liệu tự nhiên, an toàn và tốt cho sức khỏe.
        `
    },
    {
        title: "4. Tạo công ăn việc làm",
        content: `Kinh doanh các loại bánh truyền thống còn giúp tạo ra công ăn việc làm cho nhiều người, đặc biệt
            là những nghệ nhân làm bánh và người lao động phổ thông. Điều này không chỉ giúp họ có thu nhập ổn định
            mà còn khuyến khích họ tiếp tục duy trì và phát triển nghề truyền thống.
        `
    },
    {
        title: "5. Bảo vệ môi trường",
        content: `Quá trình sản xuất các loại bánh truyền thống thường ít gây hại cho môi trường hơn so với sản
            xuất công nghiệp. Việc sử dụng lá dong, lá chuối để gói bánh thay cho bao bì nhựa không chỉ giữ được
            hương vị đặc trưng mà còn giúp giảm thiểu rác thải nhựa, bảo vệ môi trường sống.
        `
    },
    {
        title: "6. Gắn kết gia đình",
        content: `Việc cùng nhau làm và thưởng thức các loại bánh truyền thống trong các dịp lễ Tết không chỉ
            mang lại niềm vui mà còn giúp gắn kết các thành viên trong gia đình. Đây là những khoảnh khắc quý giá,
            tạo nên những kỷ niệm đẹp và ý nghĩa.
        `
    },
    {
        title: "Kết luận",
        content: `Việc mua sắm các loại bánh truyền thống Việt Nam không chỉ mang lại cho bạn những món ăn
            ngon mà còn giúp bảo vệ sức khỏe, giữ gìn văn hóa, hỗ trợ cộng đồng và bảo vệ môi trường. Hãy cùng nhau
            ủng hộ các sản phẩm truyền thống để góp phần làm cho cuộc sống tốt đẹp hơn và duy trì những giá trị
            quý báu của dân tộc.
        `
    }
]
