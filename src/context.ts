"use client";

import { ReactNode, useSyncExternalStore } from "react";
import { CreateContext } from "./create-context";
import { state } from "./types";

type cache = { [key: string]: InstanceType<typeof CreateContext> };

const cache: cache = {};

const getInstance = (
  name: string,
  initialState?: state
): InstanceType<typeof CreateContext> => {
  if (!cache[name]) {
    cache[name] = new CreateContext(initialState);
  } else {
    if (typeof initialState !== "undefined") {
      cache[name].commit(initialState);
    }
  }
  return cache[name];
};

export function updateCtx(name: string, initialState?: state): Function {
  const ctx = getInstance(name, initialState);
  return ctx.commit.bind(ctx);
}

export function getCtx<Snapshot>(name: string): Snapshot {
  const context = getInstance(name);
  const subscription = (callback: Function) => {
    context.subscribe(callback);
    return () => context.unsubscribe(callback);
  };
  return useSyncExternalStore(
    subscription,
    context.getState.bind(context),
    context.getState.bind(context)
  );
}

export function useCtx(
  name: string,
  initialState?: state
): [ReactNode, Function] {
  return [getCtx(name), updateCtx(name, initialState)];
}

const reducerCache: { [key: string]: WeakMap<any, any> } = {};

export function useReducer<Snapshot>(
  name: string,
  modiFier: (data: any) => Snapshot,
  useCache: boolean = false
): Snapshot {
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
  const subscription = (callback: Function) => {
    context.subscribe(callback);
    return () => context.unsubscribe(callback);
  };
  return useSyncExternalStore(subscription, getState, getState);
}
