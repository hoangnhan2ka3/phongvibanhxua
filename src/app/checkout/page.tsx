"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useEffect, useState } from "react"
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
import { useUserStore } from "@/hooks/userLogin"
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
                                        <TableCell className="text-right">{cake.discountPrice.toLocaleString("vi-VN")} VNĐ</TableCell>
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
            )
            }
        </div>
    )
}

const CheckoutFormSchema = z.object({
    receiverName: z.string().min(2, {
        message: "Tên người nhận không được để trống"
    }),
    contactNumber: z.string().min(10, {
        message: "Số điện thoại phải chứa ít nhất 10 ký tự"
    }),
    description: z.string().optional(),
    street: z.string().min(1, {
        message: "Tên đường không được để trống"
    }),
    ward: z.string().min(1, {
        message: "Phường không được để trống"
    }),
    wardCode: z.string().optional(),
    district: z.string().min(1, {
        message: "Quận không được để trống"
    }),
    districtId: z.number().optional(),
    isDefault: z.boolean().optional()
})

function CheckoutForm() {
    // const { handleSubmit, formState } = useForm<z.infer<typeof CheckoutFormSchema>>()

    const checkoutForm = useForm<z.infer<typeof CheckoutFormSchema>>({
        resolver: zodResolver(CheckoutFormSchema),
        defaultValues: {
            receiverName: "",
            contactNumber: "",
            description: "",
            street: "",
            ward: "",
            wardCode: "61",
            district: "",
            districtId: 61, // giá trị mặc định
            isDefault: true // giá trị mặc định
        }
    })

    const { user } = useUserStore()

    async function onSubmit(values: z.infer<typeof CheckoutFormSchema>) {
        console.log("Form submitted with values:", values)
        try {
            const response = await axios.post(`https://phongvibanhxua-be-apis.onrender.com/store/api/v1/shipments/customers/${user.username}`, {
                ...values,
                wardCode: "61",
                districtId: 61, // Đặt mã quận mặc định
                isDefault: true // Đặt isDefault mặc định
            })

            fetchCartItems()
            fetchShipment()

        } catch (error) {
            console.error("Error creating shipment:", error)
        }
    }

    const [shipMent, setShipment] = useState("")
    async function fetchShipment() {
        const response = await axios.get(`https://phongvibanhxua-be-apis.onrender.com/store/api/v1/shipments/customers/${user?.username}/default`)
        console.log(response.data.data)
        setShipment(response.data.data)
    }

    const [cartItems, setCartItems] = useState([])

    async function fetchCartItems() {
        const response = await axios.get(`https://phongvibanhxua-be-apis.onrender.com/store/api/v1/cart-items/customers/${user?.username}`)
        console.log(response.data.items)
        setCartItems(response.data.items)
    }

    useEffect(() => {
        if (cartItems !== undefined && shipMent !== undefined) {
            createOrder()
        }
    }, [cartItems, shipMent])

    async function createOrder() {
        const itemIds = cartItems.map(item => item.id)
        console.log({
            shipmentId: shipMent.id,
            receiverName: shipMent.receiverName,
            contactPhone: shipMent.contactNumber,
            items: itemIds,
            redirectUrl: "",
            paymentType: "PAYOS",
            shippingType: "SHIPPING"
        })
        const response = await axios.post(`https://phongvibanhxua-be-apis.onrender.com/store/api/v1/orders/${user?.username}`, {
            shipmentId: shipMent.id,
            receiverName: shipMent.receiverName,
            contactPhone: shipMent.contactNumber,
            items: itemIds,
            redirectUrl: "",
            paymentType: "PAYOS",
            shippingType: "SHIPPING"
        })

        console.log(response.data.data)
        window.location.href = response.data.data.checkoutUrl
    }

    // console.log(checkoutForm.formState.errors)

    return (
        <Form {...checkoutForm}>
            <form onSubmit={checkoutForm.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                    control={checkoutForm.control}
                    name="receiverName"
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
                    name="contactNumber"
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
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ghi chú</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập ghi chú" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={checkoutForm.control}
                    name="street"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên đường</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập tên đường của bạn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={checkoutForm.control}
                    name="ward"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phường</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập tên phường của bạn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={checkoutForm.control}
                    name="district"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quận</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập tên quận của bạn" {...field} />
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
