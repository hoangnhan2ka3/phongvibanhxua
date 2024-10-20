import plugin from "tailwindcss/plugin"
import { type PluginAPI } from "tailwindcss/types/config"

export default plugin(function({ addComponents }: PluginAPI) {
    addComponents({
        ".font-optimized": {
            "font-synthesis": "none",
            "text-rendering": "optimizeLegibility",
            "-webkit-font-smoothing": "antialiased",
            "-moz-osx-font-smoothing": "grayscale",
            "font-feature-settings": "normal",
            "font-variation-settings": "normal",
            "-webkit-tap-highlight-color": "transparent"
        }
    })
})
