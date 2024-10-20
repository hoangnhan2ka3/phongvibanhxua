import plugin from "tailwindcss/plugin"
import { type PluginAPI } from "tailwindcss/types/config"

import { useGlobalContext } from "@/hooks"

/**
 * squircle:bg
 * squircle:border
 * squircle:bg-opacity
 * squircle:border-opacity
 */

export default plugin(function ({ addVariant }: {
    addVariant: PluginAPI["addVariant"]
}) {
    const { state } = useGlobalContext()
    addVariant("squircle", state.squircleMode ? "&::before" : "&")
}, {
    theme: {}
})
