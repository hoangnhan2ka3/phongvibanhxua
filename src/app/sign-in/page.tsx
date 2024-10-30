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
        { idx: 5, label: "Xác nhận mật khẩu", for: "password", placeholder: "Nhập lại mật khẩu" }
    ]

    return (
        <div className={cn(
            "flex min-h-[calc(100dvh-12rem-90px)] items-center justify-center text-pretty bg-pvbx-light px-32 py-12"
        )}>
            <Tabs defaultValue="Đăng nhập" className="w-[600px]">
                <TabsList className="grid w-full grid-cols-2 gap-0">
                    {/* eslint-disable-next-line tailwindcss/enforces-shorthand */}
                    <TabsTrigger value="Đăng nhập" className={cn(
                        "rounded-b-none rounded-tr-none bg-pvbx-primary/20 px-6 py-4 text-center",
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
                            <CardDescription>
                                Nếu bạn chưa có tài khoản, vui lòng đăng ký để tiếp tục.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 py-0">
                            {signInTabFields.map((field) => (
                                <div key={field.idx} className="space-y-1">
                                    <Label htmlFor={field.for}>{field.label}</Label>
                                    <Input id={field.for} placeholder={field.placeholder} />
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className={cn(
                            "p-6"
                        )}>
                            <Button className={cn(
                                "w-full px-6 py-4"
                            )}>
                                Đăng nhập
                            </Button>
                        </CardFooter>
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
                            <CardDescription>
                                Nếu bạn đã có tài khoản, vui lòng đăng nhập để tiếp tục.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 py-0">
                            {signUpTabFields.map((field) => (
                                <div key={field.idx} className="space-y-1">
                                    <Label htmlFor={field.for}>{field.label} <span className="text-pvbx-primary">*</span></Label>
                                    <Input id={field.for} placeholder={field.placeholder} />
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className={cn(
                            "p-6"
                        )}>
                            <Button className={cn(
                                "w-full px-6 py-4"
                            )}>
                                Xác nhận đăng ký
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
