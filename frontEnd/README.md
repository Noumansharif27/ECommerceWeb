## react-router-dom:

it will help to build multiple routes in react

## react-toastify:

it will help to show us notification.

```js
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

impoted the browser route from react route and wraping our router tag arround it so that we can add different router through out our app.

## Creating a single route:

```js
<Router>
  <Route path="/" element={<Home />} />
</Router>
```

The path defines that whenever the user access this pth the element in home `Home` will be called, in our case the Home.jsx

## NavLink

```js
<NavLink to="/" className="flex flex-col items-center gap-1">
  <p>HOME</p>
  <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />
</NavLink>
```

`NavLink` is a react dom element/functionality which enables us to access a perticular route on click of its component.

**How to use it?** simply just import the `NavLink` from `react-route-dom` `jsimport { NavLink } from "react-router-dom";` then in a NavLink `Tag` wrap your element you wants to click on then simply by using a `to=""` property define your desire route to access.

‼ When a navLink is clicked and we redirected to the route, there is an active property applied to te `NavLink` automaticlly which comes in handy to defined more elements on this condition, a `NavLink` gets changed into an `a(anchor)` tag on the rendering phase.

```js
<hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
```

so now we applied hidden to our `hr` tag which lies at the vertical bottom of each `NavLink` so when ever a user click on a perticular `NavLink` only its `hr` gets displayed while other are hidden. it will makes easy for the user to know on which page is he browsing.

```css
a.active hr {
  display: block;
}
```

This property says that when an `a` tag has a class of `active` make its `hr` tag display block. so as per our previous two line of `html and css` we gets the fact that when a user clicks on a tag only its `hr` tags will be visable. not all of the anchor's.

```js
<Link to="/cart" className="relative">
  <img className="w-5 min-w-5" src={assets.cart_icon} alt="NavBar_CartIcon" />
  <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
    10
  </p>
</Link>
```

to use the `Link` tag we first have to import it from `react-route-dom` `import { NavLink, Link } from "react-router-dom";`

```js
const [visable, setVisable] = useState(false);
return {
<img
  onClick={() => setVisable(true)}
  className="w-5 cursor-pointer sm:hidden"
  src={assets.menu_icon}
  alt="NavBar_MenuIcon"
/>
}

 <div className={` absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visable ? "w-full" : "w-0"}`}>
        </div>
```

In the above code snippet we have defined a state for the element which says that whenever the user click on this component check the visablility state if it's true then assign the width-0 to our navbar for small screen or else assign it the full width of the screen.

```js
<div className="flex flex-col text-gray-600">
  <div
    onClick={() => setVisable(false)}
    className="flex items-center gap-4 p-3"
  >
    <img
      className="h-4 rotate-180 cursor-pointer"
      src={assets.dropdown_icon}
      alt="NavBar_DropDownIcon"
    />
    <p className="cursor-pointer">Back</p>
  </div>
</div>
```

It is our closing button for small screen dropdown menu, whenever a user clicks on its icon or on the text the navbar will be assigned width-0, as it will be smooth as we had applied the transition-all to our navbar.

```js
<div className="flex flex-col">
  <NavLink
    onClick={() => setVisable(false)}
    className="py-2 pl-6 border-b"
    to="/"
  >
    Home
  </NavLink>
</div>
```

The above code is for our smallScreen navbar component. it the link of our other pages, whenever a user click on it the web will redirect them to the perticular page that we had defined. but there is an error in our UI, right now when a user click on any of the link our web redirects them to the desire page but they have to manually close the navbar to see the actual content, so to solve this we had also put there the `setVisiable` function/updater which will close the navbar as soon as someone clicks on this link, the iser will also be redirected to their page.
