import { extendTailwindMerge } from "tailwind-merge"
import { type ClassValue, twg } from "twg/lite"

import { getObjectKeys } from "@/helpers"
import { theme } from "@/utils/tailwindcss"

type AdditionalThemeGroupIDs = "fontSize"
type AdditionalClassGroupIDs = "app-region" | "mask" | "text-shadow" | "user-drag" | "user-select" | "user-modify"

const twMerge = extendTailwindMerge<AdditionalClassGroupIDs, AdditionalThemeGroupIDs>({
    extend: {
        classGroups: {
            /** @see https://github.com/dcastil/tailwind-merge/blob/main/src/lib/default-config.ts */
            shadow: getObjectKeys(theme.extend.boxShadow).map(
                key => `shadow-${key}`
            ),
            "font-size": getObjectKeys(theme.fontSize).map(
                key => `text-${key}`
            ),
            "app-region": [{ "app-region": ["drag", "no-drag", "none"] }],
            mask: [{ mask: ["none", "inherit", "initial", "unset", "revert", "revert-layer"] }],
            "text-shadow": [{ text: ["shadow", "shadow-none"] }],
            "user-drag": [{ "user-drag": ["auto", "element", "none"] }],
            "user-select": [{ "user-select": ["all", "auto", "element", "text", "contain", "none"] }],
            "user-modify": [{ "user-modify": ["read-only", "read-write", "read-write-plaintext-only"] }]
        },
        theme: {
            /** @see https://github.com/dcastil/tailwind-merge/blob/main/docs/configuration.md#theme */
        }
    }
})

function cn(...inputs: ClassValue[]) {
    return twMerge(twg(...inputs))
}

export { cn, twMerge }
