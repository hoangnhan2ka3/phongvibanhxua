import plugin from "tailwindcss/plugin"
import { type PluginAPI } from "tailwindcss/types/config"

//? HOW TO USE:
//* Select all children
// `div:flex` === `[&_div]:flex` --> `.{selector} div { display: flex }`
//* Select all children multiple times (max 2)
// `div-div:flex` === `[&_div_div]:flex` --> `.{selector} div div { display: flex }`
//* Select direct children
// `this>div:flex` === `[&>div]:flex` --> `.{selector} > div { display: flex }`
//* Select direct children multiple times (max 2)
// `this>div>div:flex` === `[&>div>div]:flex` --> `.{selector} > div > div { display: flex }`
//* Use with pseudos (alternate of group-*: in Tailwind, but only need one class)
// `div.hover-div:flex` === `[&_div:hover_div]:flex` --> `.{selector} div:hover div { display: flex }`
//* Use with pseudos multiple times (max 2)
// `this>div.hover>div:flex` === `[&>div:hover>div]:flex` --> `.{selector} > div:hover > div { display: flex }`
//? Cannot mix between `all children` and `direct children` (yet)
//? Also support to use with `selector.ts`

// List of elements from https://developer.mozilla.org/en-US/docs/Web/HTML/Element, but just some commons, not all!
const elements = [
    // General selector
    "", "div",

    // Root
    "body", "noscript",

    // Additional
    "label", "button", "time",

    // Content
    "article", "footer", "header",
    "main", "nav", "section",

    // Text content
    "h1", "h2", "h3", "h4", "h5", "h6",
    "hr", "br", "li", "ol", "p", "ul",

    // Inline text semantics
    "a", "b", "br", "code", "i", "kbd", "q", "s", "span", "u",

    // Image and multimedia
    "img",

    // SVG and MathML
    "svg", "path"
]

const pseudos = [
    "",
    "hover", "first", "last", "even", "odd"
]

const directAlias = "this>"

const alias_list = Object.entries({
    ">": [directAlias],
    " ": [...elements]
}).map(([key, value]) => {
    if (key === ">") {
        return [key, value.flatMap(v => elements.map(e => v + e))]
    }

    return [key, value]
})

const variants = elements.flatMap((element) =>
    pseudos.flatMap((pseudo) =>
        alias_list.flatMap(([selector, aliases]) => {
            if (Array.isArray(aliases)) {
                return aliases.map((alias: string) => {
                    const tag = alias + (pseudo ? `.${pseudo}` : "") + (element ? (selector === ">" ? `>${element}` : `-${element}`) : "")
                    const base = `& ${element ? `${alias}${pseudo ? `:${pseudo}` : ""} ${element}` : alias}`
                    const direct = selector === ">"
                        ? `& > ${element ? `${alias.replace(directAlias, "")}${pseudo ? `:${pseudo}` : ""} > ${element.replace(directAlias, "")}` : alias.replace(directAlias, "")}`
                        : ""

                    return [tag, direct ? direct : base]
                })
            }
        })
    )
)

export default plugin(
    function({ addVariant }: PluginAPI) {
        variants.forEach(v => {
            addVariant(...v as [string, string])
        })
    }
)
