import { Nunito as nunitoFont, Roboto_Mono as robotoMonoFont } from "next/font/google"
import localFont from "next/font/local"

export const Lost_Type = localFont({
    src: [
        {
            path: "./LostType/LostVietnam-Regular.woff2",
            weight: "400",
            style: "normal"
        }
    ],
    variable: "--lost_type"
})

export const Nunito = nunitoFont({
    weight: ["400", "500", "800", "900"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    variable: "--nunito"
})

export const Roboto_Mono = robotoMonoFont({
    weight: ["400"],
    style: ["normal"],
    subsets: ["latin"],
    variable: "--roboto_mono"
})
