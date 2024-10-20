/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import plugin from "tailwindcss/plugin"
import { type PluginAPI } from "tailwindcss/types/config"

function filterDefault(values: Record<string, unknown> | ArrayLike<unknown>) {
    return Object.fromEntries(
        Object.entries(values).filter(([key]) => key !== "DEFAULT")
    )
}

export default plugin(function ({ addUtilities, matchUtilities, theme }: {
    theme: PluginAPI["theme"],
    addUtilities: PluginAPI["addUtilities"],
    matchUtilities: PluginAPI["matchUtilities"]
}) {
    addUtilities({
        "@keyframes enter": theme("keyframes.enter"),
        "@keyframes exit": theme("keyframes.exit"),
        ".animate-in": {
            animationName: "enter",
            animationDuration: theme("animationDuration.DEFAULT"),
            "--tw-enter-opacity": "initial",
            "--tw-enter-scale": "initial",
            "--tw-enter-rotate": "initial",
            "--tw-enter-translate-x": "initial",
            "--tw-enter-translate-y": "initial",
            "--tw-enter-blur": "initial"
        },
        ".animate-out": {
            animationName: "exit",
            animationDuration: theme("animationDuration.DEFAULT"),
            "--tw-exit-opacity": "initial",
            "--tw-exit-scale": "initial",
            "--tw-exit-rotate": "initial",
            "--tw-exit-translate-x": "initial",
            "--tw-exit-translate-y": "initial",
            "--tw-exit-blur": "initial"
        }
    })

    matchUtilities({
        "fade-in": (value: string) => ({ "--tw-enter-opacity": value }),
        "fade-out": (value: string) => ({ "--tw-exit-opacity": value })
    }, { values: theme("animationOpacity") })

    matchUtilities({
        "zoom-in": (value: string) => ({ "--tw-enter-scale": value }),
        "zoom-out": (value: string) => ({ "--tw-exit-scale": value })
    }, { values: theme("animationScale") })

    matchUtilities({
        "spin-in": (value: string) => ({ "--tw-enter-rotate": value }),
        "spin-out": (value: string) => ({ "--tw-exit-rotate": value })
    }, { values: theme("animationRotate") })

    matchUtilities({
        "blur-in": (value: string) => ({ "--tw-enter-blur": value }),
        "blur-out": (value: string) => ({ "--tw-exit-blur": value })
    }, { values: theme("animationBlur") })

    matchUtilities(
        {
            "slide-in-from-top": (value: string) => ({
                "--tw-enter-translate-y": `-${value}`
            }),
            "slide-in-from-bottom": (value: string) => ({
                "--tw-enter-translate-y": value
            }),
            "slide-in-from-left": (value: string) => ({
                "--tw-enter-translate-x": `-${value}`
            }),
            "slide-in-from-right": (value: string) => ({
                "--tw-enter-translate-x": value
            }),
            "slide-out-to-top": (value: string) => ({
                "--tw-exit-translate-y": `-${value}`
            }),
            "slide-out-to-bottom": (value: string) => ({
                "--tw-exit-translate-y": value
            }),
            "slide-out-to-left": (value: string) => ({
                "--tw-exit-translate-x": `-${value}`
            }),
            "slide-out-to-right": (value: string) => ({
                "--tw-exit-translate-x": value
            })
        },
        { values: theme("animationTranslate") }
    )

    matchUtilities(
        { duration: (value) => ({ animationDuration: value as string }) },
        { values: filterDefault(theme("animationDuration")) }
    )

    matchUtilities(
        { delay: (value: string) => ({ animationDelay: value }) },
        { values: theme("animationDelay") }
    )

    matchUtilities(
        { ease: (value) => ({ animationTimingFunction: value as string }) },
        { values: filterDefault(theme("animationTimingFunction")) }
    )

    addUtilities({
        ".running": { animationPlayState: "running" },
        ".paused": { animationPlayState: "paused" }
    })

    matchUtilities(
        { "fill-mode": (value: string) => ({ animationFillMode: value }) },
        { values: theme("animationFillMode") }
    )

    matchUtilities(
        { direction: (value: string) => ({ animationDirection: value }) },
        { values: theme("animationDirection") }
    )

    matchUtilities(
        { repeat: (value: string) => ({ animationIterationCount: value }) },
        { values: theme("animationRepeat") }
    )
}, {
    theme: {
        extend: {
            animationDelay: ({ theme }: { theme: any }) => ({
                ...(theme("transitionDelay") as Record<string, string>)
            }),
            animationDuration: ({ theme }: { theme: any }) => ({
                0: "0ms",
                ...theme("transitionDuration")
            }),
            animationTimingFunction: ({ theme }: { theme: any }) => ({
                ...theme("transitionTimingFunction")
            }),
            animationFillMode: {
                none: "none",
                forwards: "forwards",
                backwards: "backwards",
                both: "both"
            },
            animationDirection: {
                normal: "normal",
                reverse: "reverse",
                alternate: "alternate",
                "alternate-reverse": "alternate-reverse"
            },
            animationOpacity: ({ theme }: { theme: any }) => ({
                DEFAULT: 0,
                ...theme("opacity")
            }),
            animationTranslate: ({ theme }: { theme: any }) => ({
                DEFAULT: "100%",
                ...theme("translate")
            }),
            animationScale: ({ theme }: { theme: any }) => ({
                DEFAULT: 0,
                ...theme("scale")
            }),
            animationRotate: ({ theme }: { theme: any }) => ({
                DEFAULT: "30deg",
                ...theme("rotate")
            }),
            animationBlur: ({ theme }: { theme: any }) => ({
                DEFAULT: "0px",
                ...theme("blur")
            }),
            animationRepeat: {
                0: "0",
                1: "1",
                infinite: "infinite"
            },
            keyframes: {
                enter: {
                    from: {
                        opacity: "var(--tw-enter-opacity, 1)",
                        filter: "blur(var(--tw-enter-blur, 0px))",
                        transform: /* css */`
                            translate3d(
                                var(--tw-enter-translate-x, 0),
                                var(--tw-enter-translate-y, 0),
                                0
                            )
                            scale3d(
                                var(--tw-enter-scale, 1),
                                var(--tw-enter-scale, 1),
                                var(--tw-enter-scale, 1)
                            )
                            rotate(
                                var(--tw-enter-rotate, 0)
                            )
                        `
                    }
                },
                exit: {
                    to: {
                        opacity: "var(--tw-exit-opacity, 1)",
                        filter: "blur(var(--tw-exit-blur, 0px))",
                        transform: /* css */ `
                            translate3d(
                                var(--tw-exit-translate-x, 0),
                                var(--tw-exit-translate-y, 0),
                                0
                            )
                            scale3d(
                                var(--tw-exit-scale, 1),
                                var(--tw-exit-scale, 1),
                                var(--tw-exit-scale, 1)
                            )
                            rotate(
                                var(--tw-exit-rotate, 0)
                            )
                        `
                    }
                }
            }
        }
    }
})
