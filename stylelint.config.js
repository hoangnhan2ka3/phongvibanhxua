/**
 * @type {import('stylelint').Config}
 */

const atRules = [
    "screen", "apply", "tailwind", "layer", "keyframes", "media", "import", "support",
    "property", "supports", "starting-style"
]
const functions = [
    "theme", /(rgb|hsl)(a)?/, "var", "calc", "min", "max", "clamp", "url", "repeat",
    /(repeating-)?(linear|radial|conic)-gradient/, "polygon", "rect",
    /translate[XY]?/, /rotate[XY]?/, "scale", "skew", /matrix(3d)?/, "perspective",
    "cubic-bezier"
]
const units = ["%", "deg", "em", "rem", "ms", "s", "fr", "vw", "vh", "dvw", "dvh", "cqw", "cqh"]

const combinator = [" ", ">", "~"]

//* <-- means auto-fixable

export default {
    defaultSeverity: "warning",
    ignoreFiles: ["**/*.{js,cjs,mjs,ts,tsx,svg,md}", ".*", ".next/**", "node_modules/.*/**"],
    plugins: [
        "@stylistic/stylelint-plugin",
        "stylelint-rem-over-px",
        "stylelint-order"
    ],
    rules: {
        //! rem to px
        "rem-over-px/rem-over-px": true,

        //! Color
        "@stylistic/color-hex-case": "lower",

        //! Function
        "@stylistic/function-comma-space-after": "always",
        "@stylistic/function-comma-space-before": "never",
        "@stylistic/function-max-empty-lines": 0,
        "@stylistic/function-parentheses-space-inside": "never",
        "@stylistic/function-whitespace-after": "always",

        //! Number
        "@stylistic/number-leading-zero": "always",
        "@stylistic/number-no-trailing-zeros": true,

        //! String
        "@stylistic/string-quotes": "double",

        //! Unit
        "@stylistic/unit-case": "lower",

        //! Value list
        "@stylistic/value-list-comma-space-after": "always",
        "@stylistic/value-list-comma-space-before": "never",
        "@stylistic/value-list-max-empty-lines": 0,

        //! Property
        "@stylistic/property-case": "lower",

        //! Declaration
        "@stylistic/declaration-bang-space-after": "never",
        "@stylistic/declaration-bang-space-before": "always",
        "@stylistic/declaration-colon-space-after": "always-single-line",
        "@stylistic/declaration-colon-space-before": "never",

        //! Declaration block
        "@stylistic/declaration-block-semicolon-newline-after": "always",
        "@stylistic/declaration-block-semicolon-space-after": "always-single-line",
        "@stylistic/declaration-block-semicolon-space-before": "never",
        "@stylistic/declaration-block-trailing-semicolon": "always",

        //! Block
        "@stylistic/block-closing-brace-empty-line-before": "never",
        "@stylistic/block-closing-brace-newline-after": "always",
        "@stylistic/block-closing-brace-newline-before": "always",
        "@stylistic/block-closing-brace-space-before": "always-single-line",
        "@stylistic/block-opening-brace-newline-after": "always",
        "@stylistic/block-opening-brace-space-after": "always-single-line",
        "@stylistic/block-opening-brace-space-before": "always",

        //! Selector
        "@stylistic/selector-attribute-brackets-space-inside": "never",
        "@stylistic/selector-attribute-operator-space-after": "never",
        "@stylistic/selector-attribute-operator-space-before": "never",
        "@stylistic/selector-combinator-space-after": "always",
        "@stylistic/selector-combinator-space-before": "always",
        "@stylistic/selector-descendant-combinator-no-non-space": true,
        "@stylistic/selector-max-empty-lines": 0,
        "@stylistic/selector-pseudo-class-case": "lower",
        "@stylistic/selector-pseudo-class-parentheses-space-inside": "never",
        "@stylistic/selector-pseudo-element-case": "lower",

        //! Selector list
        "@stylistic/selector-list-comma-space-after": "always-single-line",
        "@stylistic/selector-list-comma-space-before": "never",

        //! Media feature
        "@stylistic/media-feature-colon-space-after": "always",
        "@stylistic/media-feature-colon-space-before": "never",
        "@stylistic/media-feature-name-case": "lower",
        "@stylistic/media-feature-parentheses-space-inside": "never",
        "@stylistic/media-feature-range-operator-space-after": "always",
        "@stylistic/media-feature-range-operator-space-before": "always",

        //! Media query list
        "@stylistic/media-query-list-comma-space-after": "always",
        "@stylistic/media-query-list-comma-space-before": "never",

        //! At-rule
        "@stylistic/at-rule-name-case": "lower",
        "@stylistic/at-rule-name-space-after": "always",
        "@stylistic/at-rule-semicolon-newline-after": "always",
        "@stylistic/at-rule-semicolon-space-before": "never",

        //! Named grid areas
        "@stylistic/named-grid-areas-alignment": [true, { alignQuotes: true }],

        //! General / Sheet
        "@stylistic/indentation": 4,
        "@stylistic/linebreaks": "unix",
        "@stylistic/max-empty-lines": [1, { ignore: ["comments"] }],
        "@stylistic/no-empty-first-line": true,
        "@stylistic/no-extra-semicolons": true,
        "@stylistic/no-missing-end-of-source-newline": true,
        "@stylistic/unicode-bom": "never",

        //* **************** All ABOVE rules are auto-fixable **************** *//
        //* ****************************************************************** *//

        //! Descending
        "no-descending-specificity": true,

        //! Duplicate
        "declaration-block-no-duplicate-custom-properties": true,
        "declaration-block-no-duplicate-properties": [true, {
            ignoreProperties: ["cursor", "contain"]
        }], //*
        "font-family-no-duplicate-names": true, //*
        "keyframe-block-no-duplicate-selectors": true,
        "no-duplicate-at-import-rules": true,
        "no-duplicate-selectors": true,

        //! Empty
        "block-no-empty": null,
        "comment-no-empty": true,
        "no-empty-source": true,

        //! Invalid
        "color-no-invalid-hex": true,
        "function-calc-no-unspaced-operator": true, //*
        "keyframe-declaration-no-important": true,
        "media-query-no-invalid": true,
        "named-grid-areas-no-invalid": true,
        "no-invalid-double-slash-comments": true,
        "no-invalid-position-at-import-rule": true,
        "string-no-newline": true,

        //! Irregular
        "no-irregular-whitespace": true,

        //! Custom
        "custom-property-no-missing-var-function": true,
        "font-family-no-missing-generic-family-keyword": true,

        //! Non-standard
        "function-linear-gradient-no-nonstandard-direction": true,

        //! Unmatchable
        "selector-anb-no-unmatchable": true,

        //! Unknown
        "annotation-no-unknown": true,
        "at-rule-no-unknown": [true, { ignoreAtRules: atRules }],
        "declaration-property-value-no-unknown": [true, {
            ignoreProperties: {
                [/.+/]: /theme\(.+\)/
            }
        }],
        "function-no-unknown": [true, { ignoreFunctions: functions }],
        "media-feature-name-no-unknown": true,
        "no-unknown-animations": true,
        "property-no-unknown": true,
        "selector-pseudo-class-no-unknown": true,
        "selector-type-no-unknown": true,
        "unit-no-unknown": true,

        //! At-rule
        "at-rule-allowed-list": atRules,
        "at-rule-disallowed-list": [],
        "at-rule-no-vendor-prefix": true, //*

        //! Colors
        "color-named": "never",

        //! Declaration
        "declaration-property-unit-allowed-list": {
            [/^border(-.+)?/]: ["rem", "%", "em", "px"],
            [/^padding|^gap/]: ["rem", "em"],
            [/animation(-duration)?/]: ["s", "ms"]
        },

        //! Function
        "function-allowed-list": functions,
        "function-url-no-scheme-relative": true,
        "function-url-scheme-allowed-list": ["data", /^http(s)?/],

        //! Media
        "media-feature-name-allowed-list": [
            /(min|max)-(width|height)/,
            /prefers-(reduced-motion|color-scheme)/
        ],
        "media-feature-name-no-vendor-prefix": true, //*
        "media-feature-name-unit-allowed-list": {
            [/(min|max)-(width|height)/]: ["px"]
        },

        //! Property
        "property-no-vendor-prefix": true, //*

        //! Selector
        "selector-combinator-allowed-list": combinator,
        "selector-no-vendor-prefix": true, //*

        //! Unit
        "unit-allowed-list": units,

        //! Value
        "value-no-vendor-prefix": true, //*

        //! Case
        "function-name-case": "lower", //*
        "selector-type-case": "lower", //*
        "value-keyword-case": ["lower", {
            ignoreKeywords: [/.+\.DEFAULT/],
            camelCaseSvgKeywords: true
        }], //*

        //! Empty lines
        "at-rule-empty-line-before": ["always", {
            ignore: [
                "after-comment", "first-nested", "inside-block", "blockless-after-same-name-blockless",
                "blockless-after-blockless"
            ]
        }], //*

        //! Max & Min
        "declaration-property-max-values": {
            [/^(margin|padding)-(top|left|right|bottom)/]: 1
        },
        "number-max-precision": 5, //*
        "selector-max-universal": 1,

        //! Notation
        "alpha-value-notation": ["number"], //*
        "color-function-notation": ["modern", { "ignore": ["with-var-inside"] }], //*
        "color-hex-length": "long", //*
        "font-weight-notation": ["numeric", { ignore: ["relative"] }], //*
        "hue-degree-notation": "number", //*
        "import-notation": "string", //*
        "keyframe-selector-notation": "percentage", //*
        "lightness-notation": "percentage", //*
        "media-feature-range-notation": "prefix", //*
        "selector-not-notation": "complex", //*
        "selector-pseudo-element-colon-notation": "double", //*

        //! Quotes
        "font-family-name-quotes": "always-where-required", //*
        "function-url-quotes": "never", //*
        "selector-attribute-quotes": "always", //*

        //! Redundant
        "declaration-block-no-redundant-longhand-properties": true, //*
        "shorthand-property-no-redundant-values": true, //*

        //! Whitespace inside
        "comment-whitespace-inside": "always", //*

        //! CSS Order
        "order/order": [
            "custom-properties",
            "dollar-variables",
            "declarations",
            "rules",
            "at-rules"
        ],
        "order/properties-order": [
            "width",
            "height",
            "z-index",
            "background",
            "color",
            "font",
            "text",
            "border",
            "margin",
            "padding",
            "top",
            "right",
            "left",
            "bottom",
            "transform",
            "transition",
            "animation"
        ]
    }
}
