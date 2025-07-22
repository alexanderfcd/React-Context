"use client";
import { useSyncExternalStore } from "react";
import { CreateContext } from "./create-context";
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
const reducerCache = {};
export function useReducer(name, modiFier, useCache = true) {
    if (!reducerCache[name]) {
        reducerCache[name] = new WeakMap();
    }
    const context = getInstance(name);
    const _getState = context.getState.bind(context);
    const getState = () => {
        const state = _getState();
        const cache = reducerCache[name].get(state);
        if (cache && useCache) {
            return cache;
        }
        const res = modiFier(state);
        reducerCache[name].set(state, res);
        return res;
    };
    const subscription = (callback) => {
        context.subscribe(callback);
        return () => context.unsubscribe(callback);
    };
    return useSyncExternalStore(subscription, getState, getState);
}
