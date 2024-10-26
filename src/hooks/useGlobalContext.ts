"use client"

import { getCookie, setCookie } from "cookies-next"
import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

import { getObjectKeys } from "@/helpers"

/**
 * ? `State action` naming convention:
 * "toggle || set" + {globalState}, e.g:
 * state: blinkState: false,
 * action: toggleBlinkState: () => { ... }
 * action: setBlinkState: (setState: boolean) => { ... }
 */

/**
 * Current phrase: Cookies (temporary)
 * TODO: Next phrase -> Database
 */

// Temporary state while surfing the site
const SITE_STATE = {
    routeChange: false
}
// State that user can change and save to settings
const USER_STATE = {
    smoothScroll: true,
    cartQuantity: 0
}
// All possible state
const ALL_STATE = {
    ...SITE_STATE,
    ...USER_STATE
}

type GlobalStateKeys = typeof ALL_STATE
type ToggleActionsName = `toggle${Capitalize<keyof GlobalStateKeys>}`
type SetActionsName = `set${Capitalize<keyof GlobalStateKeys>}`

type GlobalActions = Record<ToggleActionsName, () => void> & Record<SetActionsName, (setState: string | boolean) => void>

export interface GlobalContextProps {
    state: GlobalStateKeys,
    action: GlobalActions
}

function saveUserStateToCookie(state: typeof USER_STATE) {
    const serializedState = JSON.stringify(state)
    setCookie("settings", serializedState, {
        priority: "high"
    })
}

function getUserStateFromCookie() {
    const serializedState = getCookie("settings", {
        priority: "high"
    })
    return serializedState ? JSON.parse(serializedState) as typeof USER_STATE : undefined
}

export const useGlobalContext = create(subscribeWithSelector<GlobalContextProps>((set) => ({
    state: {
        ...ALL_STATE,
        ...getUserStateFromCookie()
    },
    action: {
        ...getObjectKeys(ALL_STATE).reduce((acc, key) => {
            const toggleActionName = getActionName("toggle", key)
            const setActionName = getActionName("set", key)
            return {
                ...acc,
                [toggleActionName]: () => {
                    set(s => ({
                        state: {
                            ...s.state,
                            [key]: !s.state[key]
                        }
                    }))
                },
                [setActionName]: (setState: string | boolean) => {
                    set(s => ({
                        state: {
                            ...s.state,
                            [key]: setState
                        }
                    }))
                }
            }
        }, {})
    } as GlobalActions

    /**
     * result e.g:
     * state: blinkState: false,
     * ? TL;DR: toggle the opposite state of the blinkState or set the actual state of the blinkState
     * action: toggleBlinkState: () => { set(s => ({ state: { ...s.state, blinkState: !s.state.blinkState } })) }
     * action: setBlinkState: (setState: boolean) => { set(s => ({ state: { ...s.state, blinkState: setState } })) }
     * ? `toggle` to switch between the `opposite state` of the blinkState
     * ? `set` to set the `actual state` of the blinkState
     */
})))

useGlobalContext.subscribe((state) => {
    const userStateKeys = getObjectKeys(USER_STATE)

    const filteredState = Object.entries(state.state)
        .filter(([key]) => userStateKeys.includes(key as keyof typeof USER_STATE))
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

    saveUserStateToCookie(filteredState as GlobalStateKeys)
})

function getActionName(prefix: string, key: string) {
    return prefix + key.charAt(0).toUpperCase() + key.slice(1)
}
