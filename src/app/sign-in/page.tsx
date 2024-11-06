"use client"

import api from "phongvibanhxua/src/configs/axios"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUserStore } from "@/hooks/userLogin"
import { cn } from "@/lib/utils"

export default function SignInPage() {
    const signInTabFields = [
        { idx: 1, label: "Tên đăng nhập / email", for: "username", placeholder: "Tên đăng nhập hoặc email của bạn" },
        { idx: 2, label: "Mật khẩu", for: "password", placeholder: "Nhập mật khẩu" }
    ]
    const signUpTabFields = [
        { idx: 1, label: "Tên đăng nhập", for: "username", placeholder: "Tên đăng nhập của bạn" },
        { idx: 2, label: "Họ và tên", for: "name", placeholder: "Nhập đầy đủ họ và tên của bạn" },
        { idx: 3, label: "Email", for: "email", placeholder: "Email của bạn" },
        { idx: 4, label: "Mật khẩu", for: "password", placeholder: "Nhập mật khẩu" },
        { idx: 5, label: "Xác nhận mật khẩu", for: "confirmPassword", placeholder: "Nhập lại mật khẩu" }
    ]

    const [registerData, setRegisterData] = useState({
        username: "",
        fullname: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)

    const { setUser } = useUserStore()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setRegisterData(prev => ({
            ...prev,
            [id]: value
        }))
    }

    const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setLoginData(prev => ({
            ...prev,
            [id]: value
        }))
    }

    const handleRegister = async () => {
        setLoading(true)
        try {
            const response = await api.post("/store/api/v1/users/register", registerData)
            alert("Đăng ký thành công!")
            setRegisterData({
                username: "",
                fullname: "",
                email: "",
                password: "",
                confirmPassword: ""
            })
        } catch (error) {
            console.error("Error during registration:", error)
            alert("Đăng ký thất bại. Vui lòng thử lại.")
        } finally {
            setLoading(false)
        }
    }

    const handleLogin = async () => {
        setLoading(true)
        try {
            const response = await api.post("/store/api/v1/auth/sign-in", loginData)
            const { jwtToken } = response.data.data
            localStorage.setItem("jwtToken", jwtToken)
            setUser(response.data.data)
            alert("Đăng nhập thành công!")
            setLoginData({
                username: "",
                password: ""
            })

            window.location.href = "https://phongvibanhxua.vercel.app/menu"
        } catch (error) {
            console.error("Error during login:", error)
            alert("Đăng nhập thất bại. Vui lòng thử lại.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={cn(
            "flex min-h-[calc(100dvh-12rem-90px)] items-center justify-center text-pretty bg-pvbx-light px-32 py-12"
        )}>
            <Tabs defaultValue="Đăng nhập" className="w-[600px]">
                <TabsList className="grid w-full grid-cols-2 gap-0">
                    <TabsTrigger value="Đăng nhập" className={cn(
                        "rounded-r-none bg-pvbx-primary/20 px-6 py-4 text-center",
                        { "data-state=active": "bg-pvbx-primary" }
                    )}>Đăng nhập</TabsTrigger>
                    <TabsTrigger value="Đăng ký" className={cn(
                        "rounded-b-none rounded-tl-none bg-pvbx-primary/20 px-6 py-4 text-center",
                        { "data-state=active": "bg-pvbx-primary" }
                    )}>Đăng ký</TabsTrigger>
                </TabsList>
                <TabsContent value="Đăng nhập">
                    <Card className="rounded-t-none">
                        <CardHeader className="pt-2 text-center">
                            <CardTitle className="font-serif text-4xl font-normal">Đăng nhập</CardTitle>
                            <CardDescription>Nếu bạn chưa có tài khoản, vui lòng đăng ký để tiếp tục.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 py-0">
                            {signInTabFields.map((field) => (
                                <div key={field.idx} className="space-y-1">
                                    <Label htmlFor={field.for}>{field.label}</Label>
                                    <Input id={field.for} placeholder={field.placeholder} value={loginData[field.for as keyof typeof loginData]} onChange={handleLoginInputChange} />
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="p-6">
                            <Button onClick={handleLogin} disabled={loading} className="w-full px-6 py-4">
                                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="Đăng ký">
                    <Card className="rounded-t-none">
                        <CardHeader className="pt-2 text-center">
                            <CardTitle className="font-serif text-4xl font-normal">Đăng ký</CardTitle>
                            <CardDescription>Nếu bạn đã có tài khoản, vui lòng đăng nhập để tiếp tục.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 py-0">
                            {signUpTabFields.map((field) => (
                                <div key={field.idx} className="space-y-1">
                                    <Label htmlFor={field.for}>{field.label} <span className="text-pvbx-primary">*</span></Label>
                                    <Input id={field.for} placeholder={field.placeholder} value={registerData[field.for as keyof typeof registerData]} onChange={handleInputChange} />
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="p-6">
                            <Button onClick={handleRegister} disabled={loading} className="w-full px-6 py-4">
                                {loading ? "Đang đăng ký..." : "Xác nhận đăng ký"}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
