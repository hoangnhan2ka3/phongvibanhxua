import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette"
import plugin from "tailwindcss/plugin"
import { type PluginAPI } from "tailwindcss/types/config"

export default plugin(function({ matchUtilities, theme }: PluginAPI) {
    matchUtilities({
        "stripe-rotate": (value: string) => {
            return {
                "--nhn-stripes-rotate": value
            }
        }
    }, {
        values: theme("rotate"),
        supportsNegativeValues: true
    })
    matchUtilities({
        "bg-size": (value: string) => {
            return {
                "--nhn-bg-size": `${value} ${value}`
            }
        }
    }, {
        values: theme("spacing")
    })
    matchUtilities({
        "mask-size": (value: string) => {
            return {
                "--nhn-mask-size": `${value} ${value}`
            }
        }
    }, {
        values: theme("spacing")
    })
    matchUtilities({
        "stripes-first": (value: string) => {
            return {
                "--nhn-stripes-first-color": value
            }
        }
    }, {
        values: flattenColorPalette(theme("colors")),
        type: ["color", "any"]
    })
    matchUtilities({
        "stripes-second": (value: string) => {
            return {
                "--nhn-stripes-second-color": value
            }
        }
    }, {
        values: flattenColorPalette(theme("colors")),
        type: ["color", "any"]
    })
})
