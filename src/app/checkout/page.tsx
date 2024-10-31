"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { useCartStore } from "@/hooks"
import { cn } from "@/lib/utils"

export default function CheckoutPage() {
    const { cart, totalItems, totalPrice } = useCartStore()

    return (
        <div className={cn(
            "flex min-h-[calc(100dvh-12rem-90px)] flex-col gap-6 bg-pvbx-light px-32 py-12"
        )}>
            <h2 className={cn(
                "font-serif text-6xl"
            )}>Thanh toán</h2>
            {cart.length > 0 ? (
                <div className={cn(
                    "grid grid-cols-3 gap-32"
                )}>
                    <div className={cn(
                        "col-span-2 flex flex-col items-center justify-center divide-y-1 divide-pvbx-primary/40 pb-8",
                        totalItems === 0 ? "min-h-full" : "h-full"
                    )}>
                        <Table>
                            <TableCaption>Vui lòng kiểm tra lại thông tin đơn hàng.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-13">STT</TableHead>
                                    <TableHead>Tên sản phẩm</TableHead>
                                    <TableHead>Số lượng</TableHead>
                                    <TableHead className="text-right">Đơn giá</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cart.map((cake, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-center">{String(index + 1).padStart(2, "0")}</TableCell>
                                        <TableCell className="font-bold">{cake.name}</TableCell>
                                        <TableCell>x{cake.quantity?.toLocaleString("vi-VN")}</TableCell>
                                        <TableCell className="text-right">{cake.price.toLocaleString("vi-VN")} VNĐ</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={2} className="text-xl font-bold text-pvbx-primary">Tổng cộng</TableCell>
                                    <TableCell className="text-xl font-bold">x{totalItems}</TableCell>
                                    <TableCell className="text-right text-xl font-bold">{totalPrice.toLocaleString("vi-VN")} VNĐ</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                    <div className={cn(
                        "flex flex-col gap-12"
                    )}>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            {/* <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="Email" /> */}
                            <CheckoutForm />
                        </div>
                    </div>
                </div>
            ) : (
                <p className={cn(
                    "grid size-full grow place-items-center text-xl font-semibold text-pvbx-primary"
                )}>🥲 Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
            )}
        </div>
    )
}

const CheckoutFormSchema = z.object({
    name: z.string({ required_error: "Name is required" }).min(2, {
        message: "Tên của bạn phải có ít nhất 2 ký tự"
    }),
    phone: z.string({ required_error: "Phone is required" }).min(10, {
        message: "Số điện thoại phải chứa ít nhất 10 ký tự"
    }),
    email: z.string({ required_error: "Email is required" }).email({
        message: "Email không hợp lệ"
    })
})

function CheckoutForm() {
    // const { handleSubmit, formState } = useForm<z.infer<typeof CheckoutFormSchema>>()

    const checkoutForm = useForm<z.infer<typeof CheckoutFormSchema>>({
        resolver: zodResolver(CheckoutFormSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: ""
        }
    })

    function onSubmit(values: z.infer<typeof CheckoutFormSchema>) {
        console.log(values)
    }

    // console.log(checkoutForm.formState.errors)

    return (
        <Form {...checkoutForm}>
            <form onSubmit={(e) => {
                e.preventDefault()
                void checkoutForm.handleSubmit(onSubmit)(e)
            }} className="space-y-6">
                <FormField
                    control={checkoutForm.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Họ và tên</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập đầy đủ họ và tên của bạn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={checkoutForm.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Số điện thoại</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập số điện thoại của bạn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={checkoutForm.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập email của bạn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
