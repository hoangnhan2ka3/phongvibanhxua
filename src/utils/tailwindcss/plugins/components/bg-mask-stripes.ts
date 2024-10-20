import plugin from "tailwindcss/plugin"
import { type PluginAPI } from "tailwindcss/types/config"

export default plugin(function({ addComponents }: PluginAPI) {
    addComponents({
        ".bg-stripes": {
            "--nhn-stripes-rotate": "0deg",
            "--nhn-stripes-first-color": "currentColor",
            "--nhn-stripes-second-color": "transparent",
            backgroundImage: "linear-gradient(var(--nhn-stripes-rotate), var(--nhn-stripes-first-color) 12.50%, var(--nhn-stripes-second-color) 12.50%, var(--nhn-stripes-second-color) 50%, var(--nhn-stripes-first-color) 50%, var(--nhn-stripes-first-color) 62.50%, var(--nhn-stripes-second-color) 62.50%, var(--nhn-stripes-second-color) 100%)",
            backgroundSize: "var(--nhn-bg-size)"
        },
        ".mask-stripes": {
            "--nhn-stripes-rotate": "0deg",
            "--nhn-stripes-first-color": "currentColor",
            "--nhn-stripes-second-color": "transparent",
            mask: "linear-gradient(var(--nhn-stripes-rotate), var(--nhn-stripes-first-color) 12.50%, var(--nhn-stripes-second-color) 12.50%, var(--nhn-stripes-second-color) 50%, var(--nhn-stripes-first-color) 50%, var(--nhn-stripes-first-color) 62.50%, var(--nhn-stripes-second-color) 62.50%, var(--nhn-stripes-second-color) 100%)",
            maskSize: "var(--nhn-mask-size)"
        }
    })
})
