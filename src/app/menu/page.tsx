import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import ClientPagination from "./components/Pagination"

export default function MenuPage() {
    return (
        <div className={cn(
            "flex flex-col gap-12 bg-pvbx-light px-32 py-13"
        )}>
            <div className={cn(
                "flex gap-12"
            )}>
                <Accordion type="single" defaultValue="item-1" collapsible className={cn(
                    "sticky top-20 flex h-fit w-56 min-w-56 rounded-3xl bg-pvbx-quaternary"
                )}>
                    <AccordionItem value="item-1" className={cn(
                        "w-full"
                    )}>
                        <Button asChild variant="secondary" className={cn(
                            "rounded-3xl px-6 py-4 text-xl font-bold"
                        )}>
                            <AccordionTrigger>
                                Danh mục
                            </AccordionTrigger>
                        </Button>
                        <AccordionContent className={cn(
                            "mt-4 px-6"
                        )}>
                            Tất cả
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <ClientPagination />
            </div>
        </div>
    )
}
