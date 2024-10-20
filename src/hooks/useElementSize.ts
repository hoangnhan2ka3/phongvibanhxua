import { useResizeObserver } from "./useResizeObserver"

/**
 * Returns element width and height and observes changes with ResizeObserver.
 * @see https://mantine.dev/hooks/use-element-size/
 */
export function useElementSize<T extends HTMLElement>(options?: ResizeObserverOptions) {
    const [ref, { width, height }] = useResizeObserver<T>(options)
    return { ref, width, height }
}
