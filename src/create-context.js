var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _CreateContext_eventHandlers, _CreateContext_state;
export class CreateContext {
    constructor() {
        _CreateContext_eventHandlers.set(this, []);
        _CreateContext_state.set(this, null);
    }
    subscribe(handler) {
        __classPrivateFieldGet(this, _CreateContext_eventHandlers, "f").push(handler);
    }
    unsubscribe(handler) {
        const index = __classPrivateFieldGet(this, _CreateContext_eventHandlers, "f").indexOf(handler);
        if (index !== -1) {
            __classPrivateFieldGet(this, _CreateContext_eventHandlers, "f").splice(index, 1);
        }
    }
    commit(state) {
        this.setState(state);
        __classPrivateFieldGet(this, _CreateContext_eventHandlers, "f").forEach((callback) => callback.call(undefined, state));
    }
    setState(state) {
        __classPrivateFieldSet(this, _CreateContext_state, state, "f");
    }
    getState() {
        return __classPrivateFieldGet(this, _CreateContext_state, "f");
    }
}
_CreateContext_eventHandlers = new WeakMap(), _CreateContext_state = new WeakMap();
