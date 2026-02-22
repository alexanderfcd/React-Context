export class CreateContext {
    constructor(initialState, options = {}) {
        const defaults = {
            historySize: 99
        };
        this.settings = Object.assign({}, defaults, options);
        if (initialState !== undefined) {
            this.setState(initialState);
        }
    }
    settings;
    #eventHandlers = [];
    #state = null;
    #history = [];
    #activeVersion = -1;
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
    undo() {
        const prev = this.#history[this.#activeVersion - 1];
        if (prev) {
            this.setState(prev, this.#history.indexOf(prev));
        }
    }
    redo() {
        const next = this.#history[this.#activeVersion + 1];
        if (next) {
            this.setState(next, this.#history.indexOf(next));
        }
    }
    setState(state, _av) {
        if (typeof _av === 'undefined') {
            if ((this.#history.length - 1) > this.#activeVersion) {
                this.#history.splice(this.#activeVersion + 1, this.#history.length);
            }
            this.#activeVersion = this.#history.length - 1;
        }
        this.#history.push(state);
        if (this.#history.length > this.settings.historySize) {
            this.#history.shift();
        }
        if (typeof _av === 'number') {
            this.#activeVersion = _av;
        }
        this.#state = state;
    }
    getState() {
        return this.#state;
    }
}
