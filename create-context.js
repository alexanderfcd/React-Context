export class CreateContext {
    constructor(initialState, options = {}) {
        const defaults = {
            historySize: 999
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
    #needsReset = false;
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
        this.#trigger();
    }
    #trigger() {
        this.#eventHandlers.forEach((callback) => callback.call(undefined, this.getState()));
    }
    undo() {
        const prev = this.#history[this.#activeVersion - 1];
        if (prev) {
            this.setState(prev, this.#history.indexOf(prev), true);
            this.#needsReset = true;
            this.#trigger();
        }
    }
    hasUndo() {
        return this.#activeVersion > 0;
    }
    redo() {
        const nextIndex = this.#activeVersion + 1;
        const next = this.#history[nextIndex];
        if (next) {
            this.setState(next, nextIndex, true);
            this.#needsReset = true;
            this.#trigger();
        }
    }
    hasRedo() {
        return !!this.#history[this.#activeVersion + 1];
    }
    setState(state, _av, _skipPush) {
        if (typeof _av === 'undefined') {
            if (this.#history.length > 0 && (this.#history.length - 1) > this.#activeVersion && this.#needsReset) {
                this.#history.splice(this.#activeVersion + 1, this.#history.length);
            }
        }
        if (!_skipPush) {
            this.#history.push(state);
        }
        if (this.#history.length > this.settings.historySize) {
            this.#history.shift();
        }
        if (typeof _av === 'number') {
            this.#activeVersion = _av;
        }
        else {
            this.#activeVersion = this.#history.length - 1;
        }
        this.#state = state;
    }
    getState() {
        return this.#state;
    }
}
