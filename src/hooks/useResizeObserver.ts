"use client"

import { useEffect, useRef, useState } from "react"

type ObserverRect = Omit<DOMRectReadOnly, "toJSON">

const defaultState: ObserverRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
}

/**
 * Tracks element size and position changes with ResizeObserver.
 * @see https://mantine.dev/hooks/use-resize-observer/
 */
export function useResizeObserver<T extends HTMLElement>(options?: ResizeObserverOptions) {
    const frameID = useRef(0)
    const ref = useRef<T>(null)

    const [rect, setRect] = useState<ObserverRect>(defaultState)

    useEffect(() => {
        if (typeof window === "undefined") return

        const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
            const entry = entries[0]

            cancelAnimationFrame(frameID.current)

            frameID.current = requestAnimationFrame(() => {
                setRect(entry.contentRect)
            })
        })

        if (ref.current) {
            observer.observe(ref.current, options)
        }

        return () => {
            observer.disconnect()

            if (frameID.current) {
                cancelAnimationFrame(frameID.current)
            }
        }
    }, [options])

    return [ref, rect] as const
}
