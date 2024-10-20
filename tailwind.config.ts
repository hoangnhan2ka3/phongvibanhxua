import "./src/utils/tailwindcss/conversion"

import { type Config } from "tailwindcss"
import { transformer } from "twg/lite"

import { theme } from "./src/utils/tailwindcss"
import {
    componentsPlugin,
    utilitiesPlugin,
    variantsPlugin
} from "./src/utils/tailwindcss/plugins"

export default {
    content: {
        files: [
            "./src/app/**/*.{ts,tsx}",
            "./src/components/**/*.{ts,tsx}"
        ],
        transform: {
            DEFAULT: transformer({
                callee: "cn"
            })
        }
    },
    darkMode: [
        "variant", [
            'html[data-theme="dark"] &',
            "html:not([data-theme]) &"
        ]
    ],
    corePlugins: {
        preflight: false
    },
    theme: {
        ...theme
    },
    plugins: [
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("./src/styles/@layers.css"),
        ...componentsPlugin,
        ...utilitiesPlugin,
        ...variantsPlugin
    ]
} satisfies Config
