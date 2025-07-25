type eventHandlers = Array<Function>;

type state =
  | { [key: string]: any }
  | Array<any>
  | string
  | number
  | boolean
  | null;

export class CreateContext {
  #eventHandlers: eventHandlers = [];

  #state: state = null;

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

  setState(state: state): void {
    this.#state = state;
  }

  getState(): state {
    return this.#state;
  }
}
