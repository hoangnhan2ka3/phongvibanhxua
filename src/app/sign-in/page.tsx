"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import api from "phongvibanhxua/src/configs/axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button, buttonVariants } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUserStore } from "@/hooks/userLogin"
import { cn } from "@/lib/utils"

export default function SignInPage() {
    const [tabValue, setTabValue] = useState("Đăng nhập")
    return (
        <div className={cn(
            "flex min-h-[calc(100dvh-12rem-90px)] items-center justify-center text-pretty bg-pvbx-light px-32 py-12"
        )}>
            <Tabs defaultValue="Đăng nhập" value={tabValue} onValueChange={setTabValue} className="w-[600px]">
                <TabsList className="grid w-full grid-cols-2 gap-0">
                    <TabsTrigger value="Đăng nhập" className={cn(
                        "rounded-r-none rounded-bl-none bg-pvbx-primary/20 px-6 py-4 text-center",
                        {
                            "data-state=active": "bg-pvbx-primary"
                        }
                    )}>Đăng nhập</TabsTrigger>
                    <TabsTrigger value="Đăng ký" className={cn(
                        "rounded-b-none rounded-tl-none bg-pvbx-primary/20 px-6 py-4 text-center",
                        {
                            "data-state=active": "bg-pvbx-primary"
                        }
                    )}>Đăng ký</TabsTrigger>
                </TabsList>
                <TabsContent value="Đăng nhập">
                    <Card className={cn(
                        "rounded-t-none"
                    )}>
                        <CardHeader className={cn(
                            "pt-2 text-center"
                        )}>
                            <CardTitle className={cn(
                                "font-serif text-4xl font-normal"
                            )}>Đăng nhập</CardTitle>
                            <CardDescription>Nếu bạn chưa có tài khoản, vui lòng đăng ký để tiếp tục.</CardDescription>
                        </CardHeader>
                        <CardContent className={cn(
                            "space-y-2 py-0"
                        )}>
                            <SignInForm />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="Đăng ký">
                    <Card className={cn(
                        "rounded-t-none"
                    )}>
                        <CardHeader className={cn(
                            "pt-2 text-center"
                        )}>
                            <CardTitle className={cn(
                                "font-serif text-4xl font-normal"
                            )}>Đăng ký</CardTitle>
                            <CardDescription>Nếu bạn đã có tài khoản, vui lòng đăng nhập để tiếp tục.</CardDescription>
                        </CardHeader>
                        <CardContent className={cn(
                            "space-y-2 py-0"
                        )}>
                            <SignUpForm afterSignUpAction={() => { setTabValue("Đăng nhập") }} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

const SignInFormSchema = z.object({
    username: (
        z.string().min(1, {
            message: "Tên đăng nhập không được để trống"
        }).trim().toLowerCase()
    ),
    password: (
        z.string().min(1, {
            message: "Mật khẩu không được để trống"
        })
    )
})

function SignInForm() {
    const SignInForm = useForm<z.infer<typeof SignInFormSchema>>({
        resolver: zodResolver(SignInFormSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })

    const [loading, setLoading] = useState(false)
    const { setUser } = useUserStore()
    const router = useRouter()

    const handleLogin = async (values: z.infer<typeof SignInFormSchema>) => {
        setLoading(true)
        try {
            const response = await api.post("/store/api/v1/auth/sign-in", values)
            const { jwtToken } = response.data.data
            localStorage.setItem("jwtToken", jwtToken)
            setUser(response.data.data)
            alert("Đăng nhập thành công!")

            router.push("/menu")
        } catch (error) {
            console.error("Error during login:", error)
            alert("Đăng nhập thất bại. Vui lòng thử lại.")
        } finally {
            setLoading(false)
        }
    }

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    return (
        <Form {...SignInForm}>
            <form onSubmit={SignInForm.handleSubmit(handleLogin)} className="space-y-6">
                <FormField
                    control={SignInForm.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên đăng nhập</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Nhập tên đăng nhập của bạn"
                                    type="username"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={SignInForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mật khẩu</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        {...field}
                                        placeholder="Nhập mật khẩu của bạn"
                                        type={isPasswordVisible ? "text" : "password"}
                                    />
                                    <ToggleShowPasswordButton
                                        isPasswordVisible={isPasswordVisible}
                                        setIsPasswordVisible={setIsPasswordVisible}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <CardFooter className={cn(
                    "pb-6"
                )}>
                    <Button type="submit" disabled={loading} className={cn(
                        "w-full px-6 py-4"
                    )}>
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </Button>
                </CardFooter>
            </form>
        </Form>
    )
}

const SignUpFormSchema = z.object({
    username: (
        z.string().min(3, {
            message: "Tên đăng nhập phải chứa ít nhất 3 ký tự."
        }).max(52, {
            message: "Tên đăng nhập quá dài."
        }).trim().toLowerCase().refine(
            u => !u.includes(" "), "Username không thể chứa khoảng trắng."
        )
    ),
    name: (
        z.string().min(1, {
            message: "Họ và tên không được để trống."
        }).trim()
    ),
    email: (
        z.string().min(1, {
            message: "Tên đăng nhập không được để trống."
        }).email({
            message: "Email không hợp lệ."
        }).trim()
    ),
    password: (
        z.string().min(3, {
            message: "Mật khẩu phải chứa ít nhất 3 ký tự."
        })
    ),
    confirmPassword: (
        z.string().min(3, {
            message: "Mật khẩu phải chứa ít nhất 3 ký tự."
        })
    )
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "Xác nhận mật khẩu chưa trùng khớp.",
            path: ["confirmPassword"]
        })
    }
})

function SignUpForm({ afterSignUpAction }: { afterSignUpAction?: () => void }) {
    const SignUpForm = useForm<z.infer<typeof SignUpFormSchema>>({
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: {
            username: "",
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const [loading, setLoading] = useState(false)

    const handleRegister = async (values: z.infer<typeof SignUpFormSchema>) => {
        setLoading(true)
        try {
            // const response = await api.post("/store/api/v1/users/register", values)
            alert("Đăng ký thành công!")
            afterSignUpAction?.()
        } catch (error) {
            console.error("Error during registration:", error)
            alert("Đăng ký thất bại. Vui lòng thử lại.")
        } finally {
            setLoading(false)
        }
    }

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    return (
        <Form {...SignUpForm}>
            <form onSubmit={SignUpForm.handleSubmit(handleRegister)} className="space-y-6">
                <FormField
                    control={SignUpForm.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="username" required>Tên đăng nhập</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Nhập tên đăng nhập của bạn"
                                    type="username"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={SignUpForm.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="name" required>Họ và tên</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Nhập họ và tên của bạn"
                                    type="name"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={SignUpForm.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="email" required>Email</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Nhập email của bạn"
                                    type="email"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={SignUpForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="password" required>Mật khẩu</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        {...field}
                                        placeholder="Nhập mật khẩu của bạn"
                                        type={isPasswordVisible ? "text" : "password"}
                                    />
                                    <ToggleShowPasswordButton
                                        isPasswordVisible={isPasswordVisible}
                                        setIsPasswordVisible={setIsPasswordVisible}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={SignUpForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="password" required>Xác nhận mật khẩu</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        {...field}
                                        placeholder="Nhập mật khẩu của bạn"
                                        type={isPasswordVisible ? "text" : "password"}
                                    />
                                    <ToggleShowPasswordButton
                                        isPasswordVisible={isPasswordVisible}
                                        setIsPasswordVisible={setIsPasswordVisible}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <CardFooter className={cn(
                    "pb-6"
                )}>
                    <Button type="submit" disabled={loading} className={cn(
                        "w-full px-6 py-4"
                    )}>
                        {loading ? "Đang đăng ký..." : "Xác nhận đăng ký"}
                    </Button>
                </CardFooter>
            </form>
        </Form>
    )
}

function ToggleShowPasswordButton({
    isPasswordVisible,
    setIsPasswordVisible
}: {
    isPasswordVisible: boolean,
    setIsPasswordVisible: (value: boolean) => void
}) {
    return (
        <div className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer rounded-lg"
        )} onClick={() => {
            setIsPasswordVisible(!isPasswordVisible)
        }}>
            {isPasswordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
        </div>
    )
}
