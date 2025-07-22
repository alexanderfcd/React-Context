# React-Context

Custom React globally accessible context hook

## Installation

```
npm i react-usectx --save
```

## Add it to your project

```js
import useCtx from "react-usectx";
```

## Usage

```js
// get both current state and set function
const [myContext, setMyContext] = useCtx("stateName");
```

## Other methods:

### getCtx

```js
// get current state only

import { getCtx } from "react-usectx";

const myContext = getCtx("stateName");
```

### updateCtx

```js
// set function  only

import { updateCtx } from "react-usectx";

const setMyContext = updateCtx("stateName");

setMyContext({ name: "Rick Ross" });
```

### useReducer

```js
import { useReducer } from "react-usectx";

const fullName = useReducer("stateName", (data) => {
  return `${data.firstName} ${data.lastName}`;
});
```

## Params

### stateName

```js
const myContextID = "MyUniqueIdentifier";

useCtx(myContextID);
```

The stateName serves as a unique identifier for a shared state object. Internally, the state manager maintains a list of state entries, each associated with a distinct stateName.

When any of the provided functions—useCtx, updateCtx, or getCtx—are invoked, the state manager checks whether a state object with the specified stateName already exists. If it does not, a new state entry is automatically created and initialized.

This mechanism enables global state sharing across components. For example, calling getCtx("example-1") in one component will return the same state reference when called with "example-1" in any other component within the same document. This allows for seamless state synchronization across different parts of your application without the need for explicit context providers.

## Example

```js
function Page() {
  const [title, setTitle] = useCtx("title");

  return (
    <div className="wrapper">
      <form>
        <label htmlFor="text">Enter text</label>
        <input
          type="text"
          id="text"
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>
      <Title></Title>
      <p>{title}</p>
    </div>
  );
}

function Title() {
  const title: string = getContext("title");
  return (
    <h1>
      Component: <br />
      <strong>{title}</strong>
    </h1>
  );
}
```

## Example with reducer

```js
function Page() {
  const [title, setTitle] = useCtx("title");

  return (
    <div className="wrapper">
      <form>
        <label htmlFor="text">Enter text</label>
        <input
          type="text"
          id="text"
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>
      <Title></Title>
      <p>{title}</p>
    </div>
  );
}

function Title() {
  const reducedTitle: string = useReducer(
    "title",
    (title) => `Title is: ${title.toUpperCase()}`
  );
  return (
    <h1>
      <strong>{reducedTitle}</strong>
    </h1>
  );
}
```
