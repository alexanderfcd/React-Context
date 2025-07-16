import { CreateContext } from "./create-context";

describe("CreateContext", () => {
  let context: CreateContext;

  beforeEach(() => {
    context = new CreateContext();
  });

  test("should set and get state correctly", () => {
    context.setState("hello");
    expect(context.getState()).toBe("hello");

    context.setState(123);
    expect(context.getState()).toBe(123);

    context.setState({ a: 1 });
    expect(context.getState()).toEqual({ a: 1 });

    context.setState(null);
    expect(context.getState()).toBeNull();
  });

  test("should subscribe and notify event handlers on commit", () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    context.subscribe(handler1);
    context.subscribe(handler2);

    context.commit("new state");

    expect(handler1).toHaveBeenCalledWith("new state");
    expect(handler2).toHaveBeenCalledWith("new state");
  });

  test("should not notify unsubscribed handlers", () => {
    const handler = jest.fn();

    context.subscribe(handler);
    context.unsubscribe(handler);
    context.commit("test");

    expect(handler).not.toHaveBeenCalled();
  });

  test("unsubscribe should not fail for non-existent handler", () => {
    const handler = jest.fn();
    expect(() => context.unsubscribe(handler)).not.toThrow();
  });

  test("commit should update state and call handlers", () => {
    const handler = jest.fn();
    context.subscribe(handler);

    context.commit({ key: "value" });

    expect(context.getState()).toEqual({ key: "value" });
    expect(handler).toHaveBeenCalledWith({ key: "value" });
  });
});
