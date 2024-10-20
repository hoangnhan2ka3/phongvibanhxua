import plugin from "tailwindcss/plugin"
import { type PluginAPI } from "tailwindcss/types/config"

export default plugin(
    function({ matchVariant, addVariant }: PluginAPI) {
        addVariant("all", "& *")
        addVariant("not-first-last", "&:not(:first-child):not(:last-child)")
        addVariant("not-first-last-type", "&:not(:first-of-type):not(:last-of-type)")

        matchVariant(
            "nth", (value) => {
                return `&:nth-child(${value})`
            }, {
                values: {
                    1: "1",
                    2: "2",
                    3: "3",
                    odd: "odd",
                    even: "even"
                }
            }
        )
        matchVariant(
            "nth-type", (value) => {
                return `&:nth-of-type(${value})`
            }, {
                values: {
                    1: "1",
                    2: "2",
                    3: "3",
                    odd: "odd",
                    even: "even"
                }
            }
        )
        matchVariant(
            "not", (value) => {
                return `&:not(${value})`
            }, {
                values: {
                    first: ":first-child",
                    "first-type": ":first-of-type",
                    last: ":last-child",
                    "last-type": ":last-of-type"
                }
            }
        )
    }
)
