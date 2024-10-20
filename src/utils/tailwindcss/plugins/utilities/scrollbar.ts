import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette"
import plugin from "tailwindcss/plugin"
import { type PluginAPI } from "tailwindcss/types/config"

export default plugin(function({ matchUtilities, theme }: PluginAPI) {
    matchUtilities({
        "scrollbar": (value: string) => {
            return {
                "scrollbar-color": `${value} transparent` /* Two valid colors.
                The first applies to the thumb of the scrollbar, the second to the track. */
            }
        }
    }, {
        values: flattenColorPalette(theme("colors")),
        type: ["color", "any"]
    })
    matchUtilities({
        "scrollbar": (value: string) => {
            return {
                "scrollbar-width": value
            }
        }
    }, {
        values: theme("scrollBarWidth")
    })
}, {
    theme: {
        scrollBarWidth: {
            none: "none",
            thin: "thin",
            auto: "auto"
        }
    }
})
