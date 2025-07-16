'use client';
import { useSyncExternalStore } from 'react';
import { CreateContext } from './create-context';
const cache = {};
const getInstance = (name) => {
    if (!cache[name]) {
        cache[name] = new CreateContext();
    }
    return cache[name];
};
export function updateCtx(name) {
    const ctx = getInstance(name);
    return ctx.commit.bind(ctx);
}
export function getCtx(name) {
    const context = getInstance(name);
    const subscription = (callback) => {
        context.subscribe(callback);
        return () => context.unsubscribe(callback);
    };
    return useSyncExternalStore(subscription, context.getState.bind(context), context.getState.bind(context));
}
export function useCtx(name) {
    return [getCtx(name), updateCtx(name)];
}
