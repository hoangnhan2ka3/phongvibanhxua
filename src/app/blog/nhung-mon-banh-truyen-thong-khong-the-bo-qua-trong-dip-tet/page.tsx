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

export default function BlogDetail2() {
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
                                src="/blog/2.jpg"
                                alt="Blog 2"
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
                                    Những món bánh truyền thống không thể bỏ qua trong dịp Tết
                                </CardTitle>
                                <CardDescription className={cn(
                                    "line-clamp-2 text-pretty pr-56 text-base"
                                )}>
                                    Khám phá những món bánh truyền thống không thể thiếu trong dịp Tết cổ truyền của người Việt.
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className={cn(
                                "flex gap-2 pb-6"
                            )}>
                                <time>10/10/2024</time>
                                <span>-</span>
                                <p>Đinh Minh Huân</p>
                            </CardFooter>
                        </div>
                    </Card>
                </div>
                <div className={cn(
                    "mx-auto w-[57.5rem] space-y-10 py-8"
                )}>
                    <p className={cn(
                        "text-justify leading-normal"
                    )}>
                        Tết Nguyên Đán là dịp lễ quan trọng nhất trong năm của người Việt, là thời điểm sum vầy gia đình và tưởng nhớ tổ tiên. Mâm cỗ ngày Tết không thể thiếu những món bánh truyền thống, mỗi loại bánh mang một ý nghĩa riêng, tượng trưng cho sự đoàn viên, sung túc và hy vọng vào một năm mới tốt đẹp. Dưới đây là những loại bánh không thể bỏ qua trong dịp Tết:
                    </p>
                    {sections.map((section, idx) => (
                        <div key={idx} className={cn(
                            "flex flex-col gap-4"
                        )}>
                            <h2 className={cn(
                                "text-xl font-bold"
                            )}>
                                {section.title}
                            </h2>
                            <div className={cn(
                                "flex flex-col gap-2"
                            )}>
                                {section.content.map((content, idx) => (
                                    <p key={idx} className={cn(
                                        "text-justify leading-normal"
                                    )}>
                                        <span className={cn(
                                            "font-semibold"
                                        )}>
                                            {content.title}{" "}
                                        </span>
                                        {content.content}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className={cn(
                        "flex flex-col gap-4"
                    )}>
                        <h2 className={cn(
                            "text-xl font-bold"
                        )}>
                            Kết luận
                        </h2>
                        <p className={cn(
                            "text-justify leading-normal"
                        )}>
                            Những món bánh truyền thống không chỉ là thực phẩm mà còn mang ý nghĩa tâm linh và phong tục tập quán của người Việt. Việc duy trì và phát huy truyền thống làm bánh trong dịp Tết giúp chúng ta gắn kết gia đình, giữ gìn bản sắc văn hóa và truyền lại cho thế hệ sau những giá trị quý báu của dân tộc. Hãy cùng nhau thưởng thức và trân trọng những món bánh truyền thống này trong mỗi dịp Tết đến xuân về.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const sections = [
    {
        title: "1. Bánh Chưng",
        content: [
            {
                title: "Lịch sử và ý nghĩa:",
                content: "Bánh chưng là biểu tượng của đất, mang hình vuông và màu xanh của lá dong, tượng trưng cho sự màu mỡ của đồng ruộng. Theo truyền thuyết, bánh chưng do Lang Liêu, con trai của Vua Hùng thứ 6, sáng tạo ra."
            },
            {
                title: "Thành phần và cách làm:",
                content: "Bánh chưng được làm từ gạo nếp, đậu xanh, thịt lợn và lá dong. Các nguyên liệu được gói chặt trong lá dong, buộc bằng lạt, và luộc trong nhiều giờ cho đến khi bánh chín."
            },
            {
                title: "Tầm quan trọng:",
                content: "Bánh chưng không chỉ là món ăn mà còn là một phần không thể thiếu trong mâm cỗ cúng tổ tiên, thể hiện lòng biết ơn và kính trọng đối với ông bà, tổ tiên."
            }
        ]
    },
    {
        title: "2. Bánh Tét",
        content: [
            {
                title: "Lịch sử và ý nghĩa:",
                content: "Bánh tét là phiên bản miền Nam của bánh chưng, mang hình trụ dài, tượng trưng cho sự sinh sôi, phát triển."
            },
            {
                title: "Thành phần và cách làm:",
                content: "Tương tự như bánh chưng, bánh tét cũng được làm từ gạo nếp, đậu xanh và thịt lợn, nhưng có hình trụ dài. Ngoài ra, còn có bánh tét nhân chuối, nhân dừa."
            },
            {
                title: "Tầm quan trọng:",
                content: "Bánh tét là món ăn phổ biến trong dịp Tết của người miền Nam, thể hiện sự đa dạng và phong phú của ẩm thực Việt Nam."
            }
        ]
    },
    {
        title: "3. Bánh Dày",
        content: [
            {
                title: "Lịch sử và ý nghĩa:",
                content: "Bánh dày tượng trưng cho trời, có hình tròn, màu trắng mịn. Theo truyền thuyết, bánh dày cũng do Lang Liêu sáng tạo ra cùng với bánh chưng."
            },
            {
                title: "Thành phần và cách làm:",
                content: "Bánh dày được làm từ bột nếp dẻo, có thể ăn kèm với giò lụa hoặc chả."
            },
            {
                title: "Tầm quan trọng:",
                content: "Bánh dày thường xuất hiện trong các lễ cúng thần linh, tổ tiên, đặc biệt trong dịp lễ hội mùa xuân."
            }
        ]
    },
    {
        title: "4. Bánh Ít",
        content: [
            {
                title: "Lịch sử và ý nghĩa:",
                content: "Bánh ít có xuất xứ từ miền Trung, là biểu tượng của lòng hiếu thảo và tình yêu thương."
            },
            {
                title: "Thành phần và cách làm:",
                content: "Bánh ít được làm từ bột nếp, nhân đậu xanh hoặc dừa, gói trong lá chuối và hấp chín."
            },
            {
                title: "Tầm quan trọng:",
                content: "Bánh ít thường được dùng trong các dịp lễ Tết, cưới hỏi, thể hiện sự chân thành và kính trọng."
            }
        ]
    },
    {
        title: "5. Bánh Gai",
        content: [
            {
                title: "Lịch sử và ý nghĩa:",
                content: "Bánh gai là món ăn truyền thống của vùng Bắc Bộ, có màu đen đặc trưng từ lá gai."
            },
            {
                title: "Thành phần và cách làm:",
                content: "Bánh gai được làm từ bột nếp trộn với lá gai xay nhuyễn, nhân đậu xanh hoặc dừa, gói trong lá chuối và hấp chín."
            },
            {
                title: "Tầm quan trọng:",
                content: "Bánh gai thường được dùng trong các dịp lễ hội, cúng giỗ, mang ý nghĩa may mắn và thịnh vượng."
            }
        ]
    }
]
