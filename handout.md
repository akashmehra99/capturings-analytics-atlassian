Our company wants to switch to data driven product development. To make this initiative work we need to design a reusable function capable of collecting and delivering UI analytics to the backend server.

To get you started we created a small snippet of code which should explain how we intend to use that API function.

```js
// This is the example of component to be instrumented using the function
class Component {
  constructor() {
    // this is where the unction could be called for example
    sendAnalyticsEvent(event);
    setTimeout(this.init, 100);
  }
  init() {
    sendAnalyticsEvent(event);
  }
}
```

Your goal is to implement the sendAnalyticsEvent(event) API function.

```js
const sendAnalyticsEvent = (event) => {
  // TODO: add your code here
  // example event
  // {
  // "type": "pageView",
  // "data": {
  //   "userId": "abc123"
  // }
};
```

When using an API, you would need to POST those analytics events down to the backend via some `/analytics` end-point. To get you started we’ve developed a simple mock of the server API abstraction.
Feel free to change this implementation.

```js
const doRequest = (events) => {
  return new Promise((resolve, reject) => {
    return resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({}),
    });
  });
};
```

Server returns 200 HTTP code and empty response when API worked fine.

Server returns 500 HTTP code and empty response when server has experienced an error.

```js
const doRequest = (event) => {
  return new Promise((resolve, reject) => {
    return resolve({
      ok: false,
      status: 500,
      json: () => null,
    });
  });
};
```