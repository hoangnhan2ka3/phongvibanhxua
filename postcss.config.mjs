/**
 * @type {import('postcss-load-config').Config}
 */

const config = {
    plugins: {
        "postcss-import": {},
        tailwindcss: {},
        autoprefixer: {},
        "postcss-nesting": {},
        "postcss-replace": {
            pattern: /(--(tw|os)-)/gi,
            data: {
                "--tw-": "--pvbx-"
            }
        }
    }
}

export default config
