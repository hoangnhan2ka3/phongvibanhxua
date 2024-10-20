"use client"

import { useMotionValueEvent, useScroll } from "framer-motion"
import { useEffect, useState } from "react"

export function useShrinkOnScroll<T extends HTMLElement>(ref: React.RefObject<T>, at: number) {
    const [translateY, setTranslateY] = useState(0)
    const [targetHeight, setTargetHeight] = useState(0)

    const { scrollY } = useScroll()
    useMotionValueEvent(scrollY, "change", (latest) => {
        const newTranslateY = Math.max(-targetHeight, -(latest / at) * targetHeight)
        setTranslateY(newTranslateY)
    })

    useEffect(() => {
        if (ref.current instanceof HTMLElement) setTargetHeight(ref.current.offsetHeight)
    }, [ref])

    return translateY
}
