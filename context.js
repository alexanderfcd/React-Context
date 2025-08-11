"use client";
import { useSyncExternalStore } from "react";
import { CreateContext } from "./create-context";
const cache = {};
const getInstance = (name, initialState) => {
    if (!cache[name]) {
        cache[name] = new CreateContext(initialState);
    }
    else {
        if (typeof initialState !== "undefined") {
            cache[name].commit(initialState);
        }
    }
    return cache[name];
};
export function updateCtx(name, initialState) {
    const ctx = getInstance(name, initialState);
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
export function useCtx(name, initialState) {
    return [getCtx(name), updateCtx(name, initialState)];
}
const reducerCache = {};
export function useReducer(name, modiFier, useCache = false) {
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
