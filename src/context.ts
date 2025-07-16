'use client'

import { ReactNode, useSyncExternalStore } from 'react'
import { CreateContext } from './create-context'

type cache = { [key: string]: InstanceType<typeof CreateContext> }

const cache: cache = {}

const getInstance = (name: string): InstanceType<typeof CreateContext> => {
    if (!cache[name]) {
        cache[name] = new CreateContext()
    }
    return cache[name]
}

export function updateCtx(name: string): Function {
    const ctx = getInstance(name)
    return ctx.commit.bind(ctx)
}

export function getCtx<Snapshot>(name: string): Snapshot {
    const context = getInstance(name)
    const subscription = (callback: Function) => {
        context.subscribe(callback)
        return () => context.unsubscribe(callback)
    }
    return useSyncExternalStore(
        subscription,
        context.getState.bind(context),
        context.getState.bind(context)
    )
}

export function useCtx(name: string): [ReactNode, Function] {
    return [getCtx(name), updateCtx(name)]
}
