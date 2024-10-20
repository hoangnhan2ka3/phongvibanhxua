import data from "package.json"

//! Change this
const baseUrl = data.website

export const appConfig = {
    // Base links
    get url() {
        return process.env.NODE_ENV === "production" ? baseUrl : this.localHostUrl
    },
    get domain() {
        return this.url.replace(/(.*)+:\/\//, "")
    },
    localHostUrl: "http://localhost:3000",

    // Base information
    name: "phongvibanhxua",
    version: `v${data.version}`,
    author: data.author,
    description: data.description,
    birthDay: "10/18/2024",
    get birthYear() {
        return Number(((/\d{4}/).exec(this.birthDay))?.[0])
    },
    get age() {
        return new Date().getFullYear() - this.birthYear
    },
    email: {
        company: "phongvibanhxua@gmail.com",
        customerService: "phongvibanhxua.customer@gmail.com",
        ceo: "phongvibanhxua.ceo@gmail.com"
    },
    tel: "0817818898",
    get fullTel() {
        return "+84" + " " + this.tel.replace(/^0?/, "").replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")
    },

    // Social media
    link: {
        facebook: "https://www.facebook.com/phongvi.banhxua"
    },

    // Analytics ID
    cloudFlareInsights: "",
    googleAnalytics: "",
    googleTagManager: "",
    googleVerification: "",
    yandexVerification: ""
} as const

export type AppConfig = typeof appConfig
