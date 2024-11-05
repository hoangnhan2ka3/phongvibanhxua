/* eslint-disable @stylistic/no-multi-spaces */

import { type Config } from "tailwindcss"

export const theme = {
    container: {
        center: true,
        padding: "2rem",
        screens: {
            "2xl": "1400px"
        }
    },
    fontFamily: {
        sans: ["var(--nunito)"],
        mono: ["var(--roboto_mono)"],
        serif: ["var(--lost_type)"]
    },
    fontWeight: {
        thin: "100", extralight: "200", light: "300", normal: "400", medium: "500",
        semibold: "600", bold: "700", extrabold: "800", black: "900"
    },
    fontSize: {
        atom: "0.0625rem",   // 1px
        nuclear: "0.125rem", // 2px
        bacteria: "0.25rem", // 4px
        ant: "0.375rem",     // 6px
        cute: "0.5rem",      // 8px
        mini: "0.625rem",    // 10px
        xs: "0.75rem",       // 12px
        sm: "0.875rem",      // 14px
        base: "1rem",        // 16px
        lg: "1.25rem",       // 20px
        xl: "1.5rem",        // 24px
        "1.5xl": "1.75rem",  // 28px
        "2xl": "2rem",       // 32px
        "3xl": "2.25rem",    // 36px
        "3.5xl": "2.5rem",   // 40px
        "4xl": "3rem",       // 48px
        "4.5xl": "3.5rem",   // 56px
        "5xl": "4rem",       // 64px
        "6xl": "4.5rem",     // 72px
        "7xl": "6rem",       // 96px
        "8xl": "8rem",       // 128px
        "9xl": "9rem"        // 144px
    },
    data: {
        active: "active",
        disabled: "disabled",
        expanded: 'expanded="true"',
        "selected=true": 'selected="true"',
        "disabled=true": 'disabled="true"',
        cancel: 'cancel="true"',
        "is-dragging": 'is-dragging="true"',
        "aria-hidden=true": 'aria-hidden="true"',
        "index=1": 'index="1"',
        "index=2": 'index="2"',
        "index=3": 'index="3"',
        "index=4": 'index="4"',
        "index=5": 'index="5"',
        "state=active": 'state="active"',
        "state=inactive": 'state="inactive"',
        "state=open": 'state="open"',
        "state=closed": 'state="closed"',
        "align=start": 'align="start"',
        "align=end": 'align="end"',
        "side=top": 'side="top"',
        "side=bottom": 'side="bottom"',
        "side=left": 'side="left"',
        "side=right": 'side="right"',
        "type=success": 'type="success"',
        "type=warning": 'type="warning"',
        "type=error": 'type="error"',
        "type=info": 'type="info"',
        "type=destructive": 'type="destructive"',
        "type=loading": 'type="loading"'
    },
    aspectRatio: {
        auto: "auto",
        square: "1 / 1",
        video: "16 / 9",
        banner: "21 / 9",
        "3/2": "3/2",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10"
    },
    screens: {
        "2xl": { max: "1535px" }, xl: { max: "1279px" }, lg: { max: "1023px" },
        md: { max: "870px" }, sm: { max: "639px" }, xs: { max: "345px" },
        xxs: { max: "259px" }
    },
    borderWidth: {
        DEFAULT: "1px",
        0: "0rem", 1: "1px", 1.5: "0.09375rem", 2: "0.125rem", 3: "0.1875rem",
        4: "0.25rem", 5: "0.3125rem", 6: "0.375rem", 7: "0.4375rem", 8: "0.5rem",
        9: "0.5625rem", 10: "0.625rem"
    },
    zIndex: {
        1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9",
        10: "10", 11: "11", 12: "12", 13: "13", 14: "14", 15: "15", 16: "16",
        17: "17", 18: "18", 19: "19", 20: "20", 21: "21", 22: "22", 23: "23",
        24: "24", 25: "25", 26: "26", 27: "27", 28: "28", 29: "29", 30: "30",
        31: "31", 32: "32", 33: "33", 34: "34", 35: "35", 36: "36", 37: "37",
        38: "38", 39: "39", 40: "40", 41: "41", 42: "42", 43: "43", 44: "44",
        45: "45", 46: "46", 47: "47", 48: "48", 49: "49", 50: "50", 51: "51",
        52: "52", 53: "53", 54: "54", 55: "55", 56: "56", 57: "57", 58: "58",
        59: "59", 60: "60", 61: "61", 62: "62", 63: "63", 64: "64", 65: "65",
        66: "66", 67: "67", 68: "68", 69: "69", 70: "70", 71: "71", 72: "72",
        73: "73", 74: "74", 75: "75", 76: "76", 77: "77", 78: "78", 79: "79",
        80: "80", 81: "81", 82: "82", 83: "83", 84: "84", 85: "85", 86: "86",
        87: "87", 88: "88", 89: "89", 90: "90", 91: "91", 92: "92", 93: "93",
        94: "94", 95: "95", 96: "96", 97: "97", 98: "98", 99: "99", 100: "100",
        high: "2147483645", highest: "2147483646", max: "2147483647"
    },
    extend: {
        colors: {
            current: "currentColor",
            pvbx: {
                "light": "rgb(var(--pvbx-light))",
                "dark": "rgb(var(--pvbx-dark))",

                "primary": "rgb(var(--pvbx-primary))",
                "secondary": "rgb(var(--pvbx-secondary))",
                "tertiary": "rgb(var(--pvbx-tertiary))",
                "quaternary": "rgb(var(--pvbx-quaternary))",
                "quinary": "rgb(var(--pvbx-quinary))",
                "nav-box": "rgb(var(--pvbx-nav-box))",
                "module-border": "rgb(var(--pvbx-module-border))",
                "background": "rgb(var(--pvbx-background))",

                "accent-gray": "rgb(var(--pvbx-accent-gray))",

                "kbd-background": "rgb(var(--pvbx-kbd-background))",

                "success": "rgb(var(--pvbx-success))",
                "warning": "rgb(var(--pvbx-warning))",
                "alert": "rgb(var(--pvbx-alert))",
                "error": "rgb(var(--pvbx-error))",
                "info": "rgb(var(--pvbx-info))",
                "loading": "rgb(var(--pvbx-loading))"
            },
            white: "#fbfef7",
            border: "hsl(var(--border))",
            input: "hsl(var(--input))",
            ring: "hsl(var(--ring))",
            background: "rgb(var(--background))",
            foreground: "hsl(var(--foreground))",
            primary: {
                DEFAULT: "hsl(var(--primary))",
                foreground: "hsl(var(--primary-foreground))"
            },
            secondary: {
                DEFAULT: "hsl(var(--secondary))",
                foreground: "hsl(var(--secondary-foreground))"
            },
            destructive: {
                DEFAULT: "hsl(var(--destructive))",
                foreground: "hsl(var(--destructive-foreground))"
            },
            muted: {
                DEFAULT: "hsl(var(--muted))",
                foreground: "hsl(var(--muted-foreground))"
            },
            accent: {
                DEFAULT: "hsl(var(--accent))",
                foreground: "hsl(var(--accent-foreground))"
            },
            popover: {
                DEFAULT: "hsl(var(--popover))",
                foreground: "hsl(var(--popover-foreground))"
            },
            card: {
                DEFAULT: "hsl(var(--card))",
                foreground: "hsl(var(--card-foreground))"
            }
        },
        spacing: {
            inherit: "inherit",
            0.5: "0.125rem",
            0.75: "0.1875rem",
            1.25: "0.3125rem",
            1.5: "0.375rem",
            2.5: "0.625rem",
            4.5: "1.125rem",
            5.5: "1.375rem",
            6.5: "1.625rem",
            7.5: "1.875rem",
            8.5: "2.125rem",
            9.5: "2.375rem",
            10.5: "2.625rem",
            13: "3.25rem",
            14.5: "3.75rem",
            17: "4.375rem",
            18: "4.6875rem",
            42: "10.25rem",
            50: "12.5rem",
            84: "21.5rem",
            92: "23rem"
        },
        ringWidth: {
            1.5: "1.5px"
        },
        strokeWidth: {
            1.5: "1.5"
        },
        borderRadius: {
            "1/2": "50%",
            "1.5lg": "0.625rem",
            "1.5xl": "0.875rem"
        },
        brightness: {
            20: ".2",
            25: ".25",
            30: ".3",
            40: ".4"
        },
        backgroundImage: {
            "gradient-radial": "radial-gradient(circle, var(--pvbx-gradient-stops))",
            "pvbx-skeleton": "linear-gradient(270deg, var(--accents-1), var(--accents-2), var(--accents-2), var(--accents-1))"
        },
        transitionTimingFunction: {
            "in-out-back": "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
            "vaul": "cubic-bezier(.35, .75, 0, 1)",
            bounce: "cubic-bezier(.15,1.6,.75,1)",
            "bounce-sm": "cubic-bezier(.5,1.35,.6,1)"
        },
        keyframes: {
            "accordion-down": {
                from: { height: "0" },
                to: { height: "var(--radix-accordion-content-height)" }
            },
            "accordion-up": {
                from: { height: "var(--radix-accordion-content-height)" },
                to: { height: "0" }
            },
            "skeleton-loading": {
                "0%": { backgroundPosition: "200% 0" },
                "100%": { backgroundPosition: "-200% 0" }
            }
        },
        animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
            "skeleton-loading": "skeleton-loading 8s ease-in-out infinite"
        },
        transitionProperty: {
            filter: "filter"
        },
        transitionDuration: {
            50: "50ms",
            250: "250ms",
            350: "350ms",
            400: "400ms",
            600: "600ms",
            700: "700ms",
            750: "750ms",
            800: "800ms",
            850: "850ms",
            1200: "1.2s",
            2000: "2s",
            2500: "2.5s",
            5000: "5s"
        },
        get transitionDelay() {
            return this.transitionDuration
        },
        boxShadow: {
            "module": "inset 0px 0px 0.75rem 0px",
            "tooltip": "inset 0px 0px 0.25rem 0px",
            "nav-menu": "inset 0px 0px 0.75rem 0px",
            "login-icons-xl": "inset 0px 0px 1rem 0px",
            "login-icons-lg": "inset 0px 0px 0.75rem 0px",
            "login-icons-md": "inset 0px 0px 0.5rem 0px"
        },
        rotate: {
            "30": "30deg"
        },
        cursor: {
            inherit: "inherit"
        }
    }
} satisfies Config["theme"]
