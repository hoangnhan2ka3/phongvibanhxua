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

export default function BlogDetail3() {
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
                                src="/blog/3.jpg"
                                alt="Blog 3"
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
                                    Chia sẻ câu chuyện cảm động của các cô chú bán hàng rong
                                </CardTitle>
                                <CardDescription className={cn(
                                    "line-clamp-2 text-pretty pr-56 text-base"
                                )}>
                                    Gặp gỡ và lắng nghe những câu chuyện đời thường đầy cảm động của các cô chú bán hàng rong lớn tuổi.
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className={cn(
                                "flex gap-2 pb-6"
                            )}>
                                <time>2/10/2024</time>
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
                        Cuộc sống của các cô chú bán hàng rong lớn tuổi luôn chứa đựng nhiều khó khăn và thử thách. Những con người cần mẫn, không ngại nắng mưa, đi khắp các con phố, góc chợ để mưu sinh. Dưới đây là những câu chuyện cảm động về cuộc đời và nghị lực của họ mà chúng tôi muốn chia sẻ.
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
                            Những câu chuyện đời thường của các cô chú bán hàng rong lớn tuổi không chỉ làm chúng ta cảm động mà còn là nguồn cảm hứng để chúng ta sống tốt hơn, biết trân trọng và giúp đỡ những người xung quanh. Cuộc sống dù có khó khăn, nhưng với lòng yêu nghề và tình yêu thương, họ đã vượt qua mọi thử thách để duy trì cuộc sống và truyền lại những giá trị văn hóa truyền thống. Hãy cùng nhau chung tay ủng hộ và giúp đỡ họ, để cuộc sống này trở nên tốt đẹp hơn.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const sections = [
    {
        title: "1. Cô Mai - Người giữ hồn bánh ít",
        content: [
            {
                title: "Câu chuyện của cô Mai:",
                content: "Cô Mai, 65 tuổi, đã gắn bó với nghề làm bánh ít hơn 40 năm. Cô là người duy nhất trong gia đình còn giữ nghề làm bánh ít lá gai - một món bánh truyền thống của vùng miền Trung. Cô kể rằng, từ nhỏ, cô đã được mẹ dạy cách làm bánh, và mỗi chiếc bánh ít của cô không chỉ ngon mà còn chứa đựng tình yêu và tâm huyết."
            },
            {
                title: "Khó khăn và nghị lực:",
                content: "Dù cuộc sống vất vả, phải đi bán bánh khắp nơi, nhưng cô Mai luôn giữ nụ cười và lòng yêu nghề. Cô nói rằng, làm bánh không chỉ là kiếm sống mà còn là cách cô duy trì và truyền lại nghề truyền thống của gia đình cho các con, cháu."
            }
        ]
    },
    {
        title: "2. Chú Tư - Người gác lại ước mơ để nuôi con",
        content: [
            {
                title: "Câu chuyện của chú Tư:",
                content: "Chú Tư, 70 tuổi, từng mơ ước trở thành thầy giáo. Nhưng vì hoàn cảnh gia đình khó khăn, chú phải từ bỏ ước mơ để làm công việc bán bánh tét dạo để nuôi con. Chú nói rằng, mặc dù cuộc sống bán hàng rong vất vả, nhưng chú luôn tự hào vì đã nuôi dạy được các con trưởng thành, có công ăn việc làm ổn định."
            },
            {
                title: "Khó khăn và nghị lực:",
                content: "Những ngày đầu, công việc bán bánh rất khó khăn, thường xuyên bị cảnh sát trật tự xua đuổi. Nhưng với quyết tâm và tình yêu thương con cái, chú Tư đã vượt qua mọi khó khăn. Chú luôn hy vọng, một ngày nào đó, các con sẽ có cuộc sống tốt đẹp hơn."
            }
        ]
    },
    {
        title: "3. Bà Lan - Người mẹ của những đứa trẻ lang thang",
        content: [
            {
                title: "Câu chuyện của bà Lan:",
                content: "Bà Lan, 68 tuổi, không có con cái, nhưng bà luôn coi những đứa trẻ lang thang là con mình. Hằng ngày, bà đi bán bánh chưng khắp các con phố để kiếm sống và dành dụm tiền mua sách vở, quần áo cho các em nhỏ vô gia cư."
            },
            {
                title: "Khó khăn và nghị lực:",
                content: "Dù cuộc sống rất khó khăn, nhưng bà Lan luôn dành tình yêu thương và sự quan tâm đến những đứa trẻ. Bà chia sẻ rằng, nhìn thấy các em có niềm vui và hạnh phúc là niềm động viên lớn nhất đối với bà. Mỗi ngày, bà luôn cầu nguyện cho các em có cuộc sống tốt đẹp hơn và không phải lang thang trên đường phố."
            }
        ]
    },
    {
        title: "4. Ông Minh - Người giữ gìn hương vị bánh gai truyền thống",
        content: [
            {
                title: "Câu chuyện của ông Minh:",
                content: "Ông Minh, 72 tuổi, đã gắn bó với nghề làm bánh gai từ khi còn trẻ. Ông là người duy nhất trong làng vẫn giữ nguyên công thức làm bánh từ thời ông bà truyền lại. Mỗi chiếc bánh gai của ông đều mang hương vị đặc trưng, không lẫn với bất kỳ nơi nào khác."
            },
            {
                title: "Khó khăn và nghị lực:",
                content: "Dù tuổi đã cao, nhưng ông Minh vẫn kiên trì với nghề. Ông nói rằng, nghề làm bánh gai không chỉ là kế sinh nhai mà còn là cách ông gìn giữ văn hóa và truyền thống của gia đình, làng xóm. Ông luôn hy vọng, sau này sẽ có người nối nghiệp và tiếp tục giữ gìn hương vị đặc trưng này."
            }
        ]
    }
]
