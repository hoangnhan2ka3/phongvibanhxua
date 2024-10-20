// import importPlugin from "eslint-plugin-import"
// import typescriptParser from "@typescript-eslint/parser"
import { fixupPluginRules } from "@eslint/compat"
import { FlatCompat } from "@eslint/eslintrc"
import eslint from "@eslint/js"
import importAlias from "@limegrass/eslint-plugin-import-alias"
import nextPlugin from "@next/eslint-plugin-next"
import stylisticPlugin from "@stylistic/eslint-plugin"
import importNewlines from "eslint-plugin-import-newlines"
import reactPlugin from "eslint-plugin-react"
import reactCompiler from "eslint-plugin-react-compiler"
import reactHooksPlugin from "eslint-plugin-react-hooks"
import readableTailwind from "eslint-plugin-readable-tailwind"
import { getDefaultCallees } from "eslint-plugin-readable-tailwind/api/defaults"
import simpleImportPlugin from "eslint-plugin-simple-import-sort"
import tailwind from "eslint-plugin-tailwindcss"
import globals from "globals"
import path from "path"
import tseslint from "typescript-eslint"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: eslint.configs.recommended
})

/**
 * @param {string} name the plugin name
 * @param {string} alias the plugin alias
 * @returns {import("eslint").ESLint.Plugin}
 */
function legacyPlugin(name, alias = name) {
    const plugin = compat.plugins(name)[0]?.plugins?.[alias]

    if (!plugin) {
        throw new Error(`Unable to resolve plugin ${name} and/or alias ${alias}`)
    }

    return fixupPluginRules(plugin)
}

//! DO NOT CHANGE THE ORDER OF RULES

export default tseslint.config(
    eslint.configs.recommended,

    //? Put `not supported` flat-config plugins as `recommended` here.
    //? Otherwise put them at the `//* Legacy Plugins` section below when you want to custom rules.
    ...compat.extends(
        "plugin:import/typescript",
        "plugin:drizzle/recommended"
    ),

    //* Global Config
    {
        //! Global ignores always stay alone
        ignores: [
            "**/node_modules/", "**/.git/", "**/.next/", "**/out/", "**/dist/", "public/old/"
        ]
    },
    {
        //? Default ESLint rules here
        rules: {
            "no-unused-vars": 0
        }
    },
    //* TypeScript Plugin
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            ...tseslint.configs.recommendedTypeChecked,
            ...tseslint.configs.strictTypeChecked,
            ...tseslint.configs.stylisticTypeChecked
        ],
        plugins: {
            "@typescript-eslint": tseslint.plugin
        },
        linterOptions: {
            reportUnusedDisableDirectives: "warn"
        },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
                sourceType: "module",
                ecmaVersion: "latest",
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        rules: {
            "@typescript-eslint/no-unused-vars": 0,
            "@typescript-eslint/require-await": 0,
            "@typescript-eslint/no-non-null-assertion": 0,
            "@typescript-eslint/use-unknown-in-catch-callback-variable": 0,
            "@typescript-eslint/unbound-method": 0,
            "@typescript-eslint/no-unused-expressions": 0,
            // "@typescript-eslint/no-unnecessary-template-expression": 1,
            "@typescript-eslint/consistent-type-imports": [1, {
                prefer: "type-imports",
                fixStyle: "inline-type-imports"
            }],
            "@typescript-eslint/consistent-generic-constructors": 1,
            "@typescript-eslint/no-unnecessary-condition": 1,
            "@typescript-eslint/no-unnecessary-template-expression": 1,
            "@typescript-eslint/prefer-nullish-coalescing": 1,
            "@typescript-eslint/no-unnecessary-type-parameters": 1,
            "@typescript-eslint/prefer-regexp-exec": 1
        }
    },
    {
        languageOptions: {
            globals: {
                ...globals.node
            }
        }
    },
    //* Next/React Plugin
    {
        plugins: {
            "@next/next": nextPlugin,
            "react": reactPlugin,
            "react-hooks": reactHooksPlugin,
            "react-compiler": reactCompiler
        },
        rules: {
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs["core-web-vitals"].rules,
            ...reactPlugin.configs["jsx-runtime"].rules,
            ...reactHooksPlugin.configs.recommended.rules,
            "react/no-unknown-property": [1, {
                "ignore": [
                    "tw",
                    "jsx",
                    "global",
                    "vaul-drawer-wrapper",
                    "cmdk-input-wrapper"
                ]
            }],
            "react/jsx-no-useless-fragment": 1,
            "react-compiler/react-compiler": 1
        },
        settings: {
            react: {
                version: "detect"
            }
        }
    },
    //* JavaScript Plugin (Disable Type Checked)
    {
        files: [
            "**/*.js"
        ],
        extends: [
            tseslint.configs.disableTypeChecked
        ]
    },
    //* Tailwind Plugin
    {
        files: [
            "**/*.{js,cjs,mjs,ts,tsx}"
        ],
        plugins: {
            "tailwindcss": tailwind,
            "readable-tailwind": readableTailwind
        },
        rules: {
            "tailwindcss/classnames-order": 1,
            "tailwindcss/enforces-negative-arbitrary-values": 0,
            "tailwindcss/enforces-shorthand": 1,
            "tailwindcss/no-custom-classname": 1,
            "tailwindcss/no-contradicting-classname": 2,
            "tailwindcss/no-unnecessary-arbitrary-value": 1,

            //? we just need the `no-unnecessary-whitespace` rule of this package so disable the rest
            //? ("flex   h-fit") => ("flex h-fit")
            //? because the tailwind-eslint-plugin doesn't have that.
            "readable-tailwind/multiline": 0,
            "readable-tailwind/sort-classes": 0,
            "readable-tailwind/no-duplicate-classes": 0,
            "readable-tailwind/no-unnecessary-whitespace": [1, {
                /** @see https://github.com/schoero/eslint-plugin-readable-tailwind/blob/c71a1bb90a5511fd05239fb839c0e8e0d3538ac9/docs/api/defaults.md */
                callees: [
                    ...getDefaultCallees(), [
                        "(?:cc|cx|tvg)\\(([^)(]*(?:\\([^)(]*(?:\\([^)(]*(?:\\([^)(]*\\)[^)(]*)*\\)[^)(]*)*\\)[^)(]*)*)\\)",
                        "'([^']*)'"
                    ], [
                        "(?:cc|cx|tvg)\\(([^)(]*(?:\\([^)(]*(?:\\([^)(]*(?:\\([^)(]*\\)[^)(]*)*\\)[^)(]*)*\\)[^)(]*)*)\\)",
                        "\"([^\"]*)\""
                    ], [
                        "(?:cc|cx|tvg)\\(([^)(]*(?:\\([^)(]*(?:\\([^)(]*(?:\\([^)(]*\\)[^)(]*)*\\)[^)(]*)*\\)[^)(]*)*)\\)",
                        "`([^`]*)`"
                    ]
                ]
            }]
        },
        settings: {
            tailwindcss: {
                callees: ["clsx", "cva", "cn", "cc", "cx", "tvg", "classnames"],
                config: "tailwind.config.ts",
                cssFiles: [
                    "**/*.css",
                    "!**/node_modules",
                    "!**/.*",
                    "!**/dist",
                    "!**/build"
                ],
                cssFilesRefreshRate: 5_000,
                removeDuplicates: true,
                skipClassAttribute: false,
                whitelist: [],
                tags: ["tw"],
                classRegex: "^(class(Name)?|tw)$"
            }
        }
    },
    //* Stylistic Plugin
    {
        files: [
            "**/*.{js,cjs,mjs,ts,tsx}"
        ],
        ignores: [
            "**/*.mdx"
        ],
        plugins: {
            "@stylistic": stylisticPlugin
        },
        rules: {

            // 0: Off, 1: Warning, 2: Error

            "no-console": [1, { allow: ["warn", "error"] }],

            //! Quotes
            "@stylistic/quotes": [1, "double", { "avoidEscape": true }],
            "@stylistic/jsx-quotes": [1, "prefer-double"],

            //! Commas
            "@stylistic/comma-dangle": [1, "never"],
            "@stylistic/comma-style": 1,

            //! Semis
            "@stylistic/semi": [1, "never"],
            "@stylistic/no-extra-semi": 1,
            "@stylistic/semi-spacing": 1,
            "@stylistic/semi-style": 1,

            //! Operators
            "@stylistic/dot-location": [1, "property"],
            "@stylistic/operator-linebreak": [1, "before"],

            //! Types
            "@stylistic/type-annotation-spacing": 1,
            "@stylistic/type-generic-spacing": 1,
            "@stylistic/type-named-tuple-spacing": 1,

            //! Disallow
            "@stylistic/no-confusing-arrow": 1,
            "@stylistic/no-floating-decimal": 1,
            "@stylistic/no-multiple-empty-lines": [1, {
                "max": 1, "maxEOF": Infinity, "maxBOF": 0
            }],

            //! Misc
            "@stylistic/max-statements-per-line": 1,
            "@stylistic/member-delimiter-style": [1, {
                "multiline": {
                    "delimiter": "comma",
                    "requireLast": false
                },
                "singleline": {
                    "delimiter": "comma",
                    "requireLast": false
                }
            }],
            "@stylistic/nonblock-statement-body-position": 1,
            "@stylistic/one-var-declaration-per-line": 1,

            //! Spacing
            // "@stylistic/indent": [1, 4],
            // "@stylistic/indent-binary-ops": [1, 4],
            "@stylistic/no-tabs": 0,
            "@stylistic/array-bracket-spacing": 1,
            "@stylistic/comma-spacing": 1,
            "@stylistic/arrow-spacing": 1,
            "@stylistic/block-spacing": 1,
            "@stylistic/key-spacing": 1,
            "@stylistic/keyword-spacing": 1,
            "@stylistic/computed-property-spacing": 1,
            "@stylistic/no-mixed-spaces-and-tabs": [1, "smart-tabs"],
            "@stylistic/no-multi-spaces": 1,
            "@stylistic/no-whitespace-before-property": 1,
            "@stylistic/object-curly-spacing": [1, "always"],
            "@stylistic/rest-spread-spacing": 1,
            "@stylistic/space-before-blocks": 1,
            // "@stylistic/space-before-function-paren": [1, "never"],
            "@stylistic/space-in-parens": 1,
            "@stylistic/space-infix-ops": 1,
            "@stylistic/space-unary-ops": 1,
            "@stylistic/switch-colon-spacing": 1,
            "@stylistic/template-curly-spacing": 1,
            "@stylistic/template-tag-spacing": 1,

            //! Comments
            "@stylistic/spaced-comment": [1, "always", {
                "block": {
                    "exceptions": ["-", "+", "*"],
                    "balanced": true
                },
                "markers": [
                    "/", "//", "!", "?", "*", "css", "js", "ts",
                    "html", "html-inline", "template", "inline-template"
                ]
            }],
            "@stylistic/lines-around-comment": [1, {
                "allowObjectStart": true,
                "allowBlockStart": true,
                "allowArrayStart": true,
                "allowInterfaceStart": true
            }],

            //! Line-breaks
            // "@stylistic/eol-last": 1,
            "@stylistic/padding-line-between-statements": [1,
                {
                    "blankLine": "always", "prev": "directive", "next": "*"
                }, {
                    "blankLine": "any", "prev": "directive", "next": "directive"
                }
            ],

            //! Brackets
            "@stylistic/brace-style": [1, "1tbs", { "allowSingleLine": true }],
            "@stylistic/new-parens": 1,
            "@stylistic/wrap-regex": 1,

            //! JSX-React
            "@stylistic/jsx-max-props-per-line": [1, { "maximum": 8 }],
            "@stylistic/jsx-props-no-multi-spaces": 1,
            "@stylistic/jsx-child-element-spacing": 1,
            "@stylistic/jsx-curly-spacing": 1,
            "@stylistic/jsx-equals-spacing": 1,
            "@stylistic/jsx-tag-spacing": [1, { "beforeClosing": "never" }],
            "@stylistic/jsx-curly-brace-presence": [1, { "props": "never", "children": "never", "propElementValues": "always" }]
        }
    },
    //* Legacy Plugins
    {
        files: [
            "**/*.{js,cjs,mjs,ts,tsx}"
        ],
        ignores: [
            "**/*.mdx"
        ],
        settings: {
            "import/resolver": {
                node: true,
                typescript: {
                    alwaysTryTypes: true,
                    project: "./tsconfig.json"
                }
            }
        },
        plugins: {
            import: legacyPlugin("eslint-plugin-import", "import"),
            "simple-import-sort": simpleImportPlugin,
            "import-newlines": importNewlines,
            "@limegrass/import-alias": importAlias
        },
        rules: {
            "import/first": 1,
            "import/newline-after-import": 1,
            "import/no-duplicates": [1, { "prefer-inline": true }],
            "import/no-unresolved": 1,
            "import/extensions": [1, "never"],
            "import/consistent-type-specifier-style": [1, "prefer-inline"],

            "import-newlines/enforce": [1, { items: 40, "max-len": 95, "semi": false }],

            "simple-import-sort/imports": 1,
            "simple-import-sort/exports": 1,

            "@limegrass/import-alias/import-alias": [1, {
                isAllowBaseUrlResolvedImport: false,
                aliasConfigPath: "./tsconfig.json",
                relativeImportOverrides: [{
                    path: ".",
                    depth: 0
                }]
            }]
        }
    }
)
