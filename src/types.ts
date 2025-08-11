export type eventHandlers = Array<Function>;

export type state =
  | { [key: string]: any }
  | Array<any>
  | string
  | number
  | boolean
  | null;
