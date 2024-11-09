import SectionSeparator from "@/components/layout/SectionSeparator"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

import CombosPagination from "./components/CombosPagination"
import NewCakes from "./components/NewCakes"
import SingleCakesPagination from "./components/SingleCakesPagination"

export default function MenuPage() {

    return (
        <div className={cn(
            "flex min-h-[calc(100dvh-12rem-90px)] flex-col gap-12 bg-pvbx-light py-12"
        )}>
            <NewCakes />
            <SectionSeparator />
            <Tabs defaultValue="cake" orientation="vertical" className={cn(
                "flex gap-12 px-32"
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
                            <TabsList>
                                <TabsTrigger value="all">Tất cả</TabsTrigger>
                                <Separator className={cn(
                                    "my-2"
                                )} />
                                <TabsTrigger value="cake">Bánh</TabsTrigger>
                                <TabsTrigger value="combo">Combo</TabsTrigger>
                            </TabsList>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <TabsContent value="all">
                    <SingleCakesPagination />
                </TabsContent>
                <TabsContent value="cake" className={cn(
                    "w-full"
                )}>
                    <SingleCakesPagination />
                </TabsContent>
                <TabsContent value="combo" className={cn(
                    "w-full"
                )}>
                    <CombosPagination />
                </TabsContent>
            </Tabs>
        </div>
    )
}
