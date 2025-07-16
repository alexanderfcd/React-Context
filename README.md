# React-Context

Custom React globally accessible context hook

## Installation

```
npm i react-usectx --save
```

## Add it to your project

```js
import ususeCtx from "react-usectx";
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
