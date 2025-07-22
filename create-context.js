export class CreateContext {
    #eventHandlers = [];
    #state = null;
    subscribe(handler) {
        this.#eventHandlers.push(handler);
    }
    unsubscribe(handler) {
        const index = this.#eventHandlers.indexOf(handler);
        if (index !== -1) {
            this.#eventHandlers.splice(index, 1);
        }
    }
    commit(state) {
        this.setState(state);
        this.#eventHandlers.forEach((callback) => callback.call(undefined, state));
    }
    setState(state) {
        this.#state = state;
    }
    getState() {
        return this.#state;
    }
}
