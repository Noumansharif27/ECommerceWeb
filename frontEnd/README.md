## react-router-dom:

it will help to build multiple routes in react

## react-toastify:

it will help to show a notification.

```js
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

impoted the browser route from react route and wraping our router tag arround it so that we can add different router through out our app.

## Creating a single rote:

```js
<Router>
  <Route path="/" element={<Home />} />
</Router>
```

The path defines that whenever the user access this pth the element in home `Home` will be called, in our case the Home.jsx
