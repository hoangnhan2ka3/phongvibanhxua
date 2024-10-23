"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export interface UseFetchOptions extends RequestInit {
    autoInvoke?: boolean
}

/**
 * Fetch data with built-in loading and error states.
 * @see https://mantine.dev/hooks/use-fetch/
 */
export function useFetch<T>(url: string, { autoInvoke = true, ...options }: UseFetchOptions = {}) {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const controller = useRef<AbortController | null>(null)

    const refetch = useCallback(() => {
        if (!url) {
            return
        }

        if (controller.current) {
            controller.current.abort()
        }

        controller.current = new AbortController()

        setLoading(true)

        return fetch(url, { signal: controller.current.signal, cache: "force-cache", ...options })
            .then((res) => res.json())
            .then((res: T) => {
                setData(res)
                setLoading(false)
                return res
            })
            .catch((err: Error) => {
                setLoading(false)

                if (err.name !== "AbortError" && err) {
                    console.error("Error fetching data:", err)
                    setError(err)
                }

                return err
            })
    }, [options, url])

    const abort = useCallback(() => {
        if (controller.current) {
            controller.current.abort("")
        }
    }, [controller])

    useEffect(() => {
        if (autoInvoke) {
            void refetch()
        }

        return () => {
            if (controller.current) {
                controller.current.abort("")
            }
        }
    }, [autoInvoke, refetch])

    return { data, loading, error, refetch, abort }
}
