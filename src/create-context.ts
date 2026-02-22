import { eventHandlers, state } from "./types";


export interface CreateContextOptions {
  historySize?: number
}

export class CreateContext {
  constructor(initialState?: state, options: CreateContextOptions = {}) {
    const defaults: CreateContextOptions = {
      historySize: 999
    }
    this.settings = Object.assign({}, defaults, options)
    if (initialState !== undefined) {
      this.setState(initialState);
    }
  }

  settings: CreateContextOptions;

  #eventHandlers: eventHandlers = [];

  #state: state = null;

  #history: any[] = [];
  #activeVersion:number = -1;

  subscribe(handler: Function): void {
    this.#eventHandlers.push(handler);
  }

  unsubscribe(handler: Function): void {
    const index = this.#eventHandlers.indexOf(handler);
    if (index !== -1) {
      this.#eventHandlers.splice(index, 1);
    }
  }

  commit(state: state): void {
    this.setState(state);
    this.#eventHandlers.forEach((callback) => callback.call(undefined, state));
  }

  undo(){
    const prev = this.#history[this.#activeVersion - 1];
    if(prev) {
      this.setState(prev, this.#history.indexOf(prev))
    }
  }

  redo() {
    const next = this.#history[this.#activeVersion + 1];
    if(next) {
      this.setState(next, this.#history.indexOf(next))
    }
  }

  setState(state: state, _av?: number): void {
    if (typeof _av === 'undefined') {
        if((this.#history.length - 1) > this.#activeVersion) {
            this.#history.splice(this.#activeVersion + 1, this.#history.length)
        }
        this.#activeVersion = this.#history.length - 1;
    }
    this.#history.push(state);
    if (this.#history.length > this.settings.historySize!) {
        this.#history.shift();
    }
    if (typeof _av === 'number') {
        this.#activeVersion = _av;
    }

    this.#state = state;
  }

  getState(): state {
    return this.#state;
  }
}
