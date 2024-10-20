"use client"

import { useEffect, useLayoutEffect } from "react"

/**
 * Custom hook that uses either `useLayoutEffect` or `useEffect` based on the environment (client-side or server-side).
 * @see https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
 */
export const useIsomorphicEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect
