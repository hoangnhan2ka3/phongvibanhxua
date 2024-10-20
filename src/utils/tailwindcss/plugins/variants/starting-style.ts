import plugin from "tailwindcss/plugin"
import { type PluginAPI } from "tailwindcss/types/config"

export default plugin(
    function ({ addVariant }: PluginAPI) {
        addVariant("starting", "@starting-style")
    }
)
