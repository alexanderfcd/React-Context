# React-Context

Custom React globally accessible context hook

## Installation

```
npm i react-usectx --save
```

## Add it to your project

```js
import {useGlobalState} from "react-usectx";
```

## Usage

```js
// get both current state and set function
const [myState, setMyState] = useGlobalState("stateName");


// use with undo and redo methods
const [myState, setMyState, undo, redo] = useGlobalState("stateName");

```

Undo and redo functionality is essential for any interface that allows users to make edits. It enhances usability by giving users confidence that their changes aren’t permanent and can be easily adjusted.

By implementing simple Undo and Redo actions—typically as two buttons—you allow users to navigate backward to a previous state or forward to a more recent state of the component.

## Other methods:

### getGlobalState

```js
// get current state only

import { getGlobalState } from "react-usectx";

const myState = getGlobalState("stateName");
```

### updateGlobalState

```js
// set function  only

import { updateGlobalState } from "react-usectx";

const setMyState = updateGlobalState("stateName");

setMyState({ name: "Rick Ross" });
```

### useGlobalReducer

```js
import { useGlobalReducer } from "react-usectx";

const fullName = useGlobalReducer("stateName", (data) => {
  return `${data.firstName} ${data.lastName}`;
});
```

## Params

### stateName

```js
const myContextID = "MyUniqueIdentifier";

useGlobalState(myContextID);
```

The stateName serves as a unique identifier for a shared state object. Internally, the state manager maintains a list of state entries, each associated with a distinct stateName.

When any of the provided functions—useGlobalState, updateGlobalState, or getGlobalState—are invoked, the state manager checks whether a state object with the specified stateName already exists. If it does not, a new state entry is automatically created and initialized.

This mechanism enables global state sharing across components. For example, calling getGlobalState("example-1") in one component will return the same state reference when called with "example-1" in any other component within the same document. This allows for seamless state synchronization across different parts of your application without the need for explicit context providers.

### initialState

```js
useGlobalState(myContextID, { name: "John" });
```

The value you want the state to be initially. It can be a value of any type.


## API Methods

```js
const api = stateApi(myContextID);
```

Manualy control the flow of the data.


### subscribe 

```js
api.subscribe(data => {
  console.log(data)
});
```

Subscribe for changes


### unsubscribe 

```js
const subscription = data => {
  console.log(data)
}
api.unsubscribe(subscription);
```

unsubscribe from specific subscription


### commit 

```js
api.commit({
  my: "data"
});
```

Sets data, and triggers all subscriptions and react hooks.


### setState 

```js
api.setState({
  my: "data"
});
```

Sets data 'silently', without triggering anything.


### undo 

```js
api.undo();
```

Sets state to previous (if any), and triggers all subscriptions and react hooks.

### redo 

```js
api.redo();
```

Sets data to next state if undo was called previously, and triggers all subscriptions and react hooks.



## Example

```js
function Page() {
  const [title, setTitle] = useGlobalState("title");

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
  const title: string = getGlobalState("title");
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
  const [title, setTitle] = useGlobalState("title");

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
  const reducedTitle: string = useGlobalReducer(
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
