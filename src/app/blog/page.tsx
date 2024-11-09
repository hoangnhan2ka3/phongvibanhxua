import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function BlogPage() {
    return (
        <div className={cn(
            "flex min-h-[calc(100dvh-12rem-90px)] flex-col gap-12 bg-pvbx-light py-12"
        )}>
            <div className={cn(
                "flex flex-col gap-6 px-32"
            )}>
                <h2 className={cn(
                    "font-serif text-6xl"
                )}>Blog</h2>
                <div className={cn(
                    "flex flex-col gap-12 py-8"
                )}>
                    {blogSections.map((section) => (
                        <Link key={section.href} href={section.href}>
                            <Card className={cn(
                                "flex h-80 gap-8 p-2"
                            )}>
                                <div className={cn(
                                    "h-full min-w-92 overflow-hidden rounded-2xl"
                                )}>
                                    <Image
                                        src={section.image}
                                        alt={section.title}
                                        width={320}
                                        height={270}
                                        className={cn(
                                            "h-full w-92 object-cover transition-transform duration-500 ease-in-out"
                                        )}
                                    />
                                </div>
                                <div>
                                    <CardHeader className={cn(
                                        "gap-3 pl-0"
                                    )}>
                                        <CardTitle className={cn(
                                            "line-clamp-2 text-pretty leading-tight"
                                        )}>
                                            {section.title}
                                        </CardTitle>
                                        <CardDescription className={cn(
                                            "line-clamp-2 text-pretty pr-56 text-base"
                                        )}>
                                            {section.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className={cn(
                                        "flex gap-2 pb-6 pl-0"
                                    )}>
                                        <time>{section.date}</time>
                                        <span>-</span>
                                        <p>{section.author}</p>
                                    </CardContent>
                                    <CardFooter className={cn(
                                        "pb-6"
                                    )}>
                                        <Button>Đọc thêm</Button>
                                    </CardFooter>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

const blogSections = [
    {
        href: "/blog/loi-ich-cua-viec-mua-sam-cac-loai-banh-truyen-thong-viet-nam",
        image: "/blog/1.jpg",
        title: "Lợi ích của việc mua sắm các loại bánh truyền thống Việt Nam",
        description: "Khám phá lợi ích không ngờ của việc mua sắm các loại bánh truyền thống Việt Nam, từ việc giữ gìn văn hóa đến hỗ trợ cộng đồng.",
        date: "19/10/2024",
        author: "Đinh Minh Huân"
    },
    {
        href: "/blog/nhung-mon-banh-truyen-thong-khong-the-bo-qua-trong-dip-tet",
        image: "/blog/2.jpg",
        title: "Những món bánh truyền thống không thể bỏ qua trong dịp Tết",
        description: "Khám phá những món bánh truyền thống không thể thiếu trong dịp Tết cổ truyền của người Việt.",
        date: "10/10/2024",
        author: "Đinh Minh Huân"
    },
    {
        href: "/blog/chia-se-cau-chuyen-cam-dong-cua-cac-co-chu-ban-hang-rong",
        image: "/blog/3.jpg",
        title: "Chia sẻ câu chuyện cảm động của các cô chú bán hàng rong",
        description: "Gặp gỡ và lắng nghe những câu chuyện đời thường đầy cảm động của các cô chú bán hàng rong lớn tuổi.",
        date: "2/10/2024",
        author: "Đinh Minh Huân"
    }
]
