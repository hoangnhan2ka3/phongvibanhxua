import { existsSync, readdirSync, readFileSync } from "fs"
import Module from "module"
import path from "path"
import postcss from "postcss"
import postcssJs from "postcss-js"
import { type CSSRuleObject, type PluginAPI } from "tailwindcss/types/config"

interface CSSModule extends NodeModule {
    _extensions: Record<string, (module: NodeModule) => void>
}

(Module as unknown as CSSModule)._extensions[".css"] = function (module: NodeModule): void {
    const directory = path.resolve(process.cwd(), "./src/styles")
    module.exports = ({ addBase, addComponents, addUtilities }: PluginAPI) => {
        // Check if the directory exists
        if (existsSync(directory)) {
            // Read all files in the directory
            const files = readdirSync(directory)
            // Filter out non-CSS files
            const cssFiles = files.filter(file => path.extname(file) === ".css")

            cssFiles.forEach(filename => {
                const css = readFileSync(path.join(directory, filename), "utf8")
                const root = postcss.parse(css)
                const jss = postcssJs.objectify(root)

                if ("@layer base" in jss) {
                    addBase(jss["@layer base"] as CSSRuleObject | CSSRuleObject[])
                }
                if ("@layer components" in jss) {
                    addComponents(jss["@layer components"] as CSSRuleObject | CSSRuleObject[])
                }
                if ("@layer utilities" in jss) {
                    addUtilities(jss["@layer utilities"] as CSSRuleObject | CSSRuleObject[])
                }
            })
        } else {
            console.error(`Invalid directory: ${directory}`)
        }
    }
}
