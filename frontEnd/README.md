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

## React Context (ShopContext)

React Context helps us share data with any component in our app without passing props again and again.

Think of it like a magic school bag that every child in the class can use without asking.

## Creating the Magic Bag

```js
export const ShopContext = createContext();
```

We imported createContext and made a new magic bag called ShopContext.

Filling the Bag With Goodies

```js
const currency = "$";
const delivery_fee = 170;
```

Here we added a money sign and a delivery charge.

Sharing the Bag With All Children

```js
<ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
```

Everyone inside this provider can use anything from the magic bag.

```js
import { createContext } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 170;

  const value = {
    products,
    currency,
    delivery_fee,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
```

## Filters:

```js
const [showFilter, setShowFilter] = useState(false);
const [filterProducts, setFilterProducts] = useState([]);
const [category, setCategory] = useState([]);
const [subCategory, setSubCategory] = useState([]);
const [sortType, setSortType] = useState("relevant");

// Creating a toggle for category section to filterOut the requirement that user needs,
let categoryToggle = (event) => {
  if (category.includes(event.target.value)) {
    // Searching wether the user selected option is avaliable in our category, if yes then we will be we will remove it from the array.
    setCategory((prev) => prev.filter((item) => item !== event.target.value));
  } else {
    // if the option is not avaliable in our Category we will add it
    setCategory((prev) => [...prev, event.target.value]);
  }
};

let subCategoryToggle = (e) => {
  if (subCategory.includes(e.target.value)) {
    // Searching wether the user selected option is avaliable in our subCategory, if yes then we will be we will remove it from the array.
    setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
  } else {
    // if the option is not avaliable in our Category we will add it
    setSubCategory((prev) => [...prev, e.target.value]);
  }
};

// applying the filters
const applyFilters = () => {
  //making the copy of our entire products
  let productsCopy = products.slice();

  // check wether the user had selected something or not.
  if (category.length > 0) {
    // updating the products array with keeping only those who have the same category.
    productsCopy = productsCopy.filter((item) =>
      category.includes(item.category)
    );
  }

  // check wether the user had selected something or not.
  if (subCategory.length > 0) {
    productsCopy = productsCopy.filter((item) =>
      // updating the products array with keeping only those who have the same subCategory.
      subCategory.includes(item.subCategory)
    );
  }

  // passing the filtered products to setFilterProduct function because it is the one rendering our all products.
  setFilterProducts(productsCopy);
};

<div
  className={`border border-gray-300 pl-5 py-3 mt-6 sm:block ${
    showFilter ? "" : "hidden"
  }`}
>
  <p className="mb-3 text-sm font-medium">CATEGORIES</p>
  <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
    <p className="flex gap-2">
      <input
        type="checkbox"
        name="category[men]"
        id="men"
        value={"Men"}
        className="w-3"
        onClick={categoryToggle}
      />
      Men
    </p>

    <p className="flex gap-2">
      <input
        type="checkbox"
        name="category[women]"
        id="men"
        value={"Women"}
        className="w-3"
        onClick={categoryToggle}
      />
      Women
    </p>

    <p className="flex gap-2">
      <input
        type="checkbox"
        name="category[kids]"
        id="men"
        value={"Kids"}
        className="w-3"
        onClick={categoryToggle}
      />
      Kids
    </p>
  </div>
</div>;

{
  /* SubCategory Products */
}
<div
  className={`border border-gray-300 pl-5 py-3 my-5 sm:block ${
    showFilter ? "" : "hidden"
  }`}
>
  <p className="mb-3 text-sm font-medium">TYPE</p>
  <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
    <p className="flex gap-2">
      <input
        type="checkbox"
        name="type[Topwear]"
        id="men"
        value={"Topwear"}
        className="w-3"
        onClick={subCategoryToggle}
      />
      Topwear
    </p>

    <p className="flex gap-2">
      <input
        type="checkbox"
        name="type[Bottomwear]"
        id="men"
        value={"Bottomwear"}
        className="w-3"
        onClick={subCategoryToggle}
      />
      Bottomwear
    </p>

    <p className="flex gap-2">
      <input
        type="checkbox"
        name="category[Winterwear]"
        id="men"
        value={"Winterwear"}
        className="w-3"
        onClick={subCategoryToggle}
      />
      Winterwear
    </p>
  </div>
</div>;
```

The **Personal Shopper** Analogy
Think of your filtering logic like hiring a Personal Shopper to find clothes for you in a massive warehouse. You don't want to see everything; you give the shopper a specific "Shopping List" (your State).

#### The Goal:

Start with all products, apply your rules (categories), and show only what survives the cut.

Step 1
The **Shopping List** (State)

```js
const [category, setCategory] = useState([]);
const [subCategory, setSubCategory] = useState([]);
```

These arrays are your Shopping Baskets. Initially, they are `empty []`, meaning **Show me everything** or **I haven't decided yet.**

When you check `Men`, we throw the string **Me** into the category basket.

Step 2
The **Toggle** Switch

```js
if (category.includes(value)) {
  removeIt(); // .filter()
} else {
  addIt(); // [...prev, value]
}
```

This function is the Bouncer at the club entrance.

If it's already in: The user is unchecking the box. We use `.filter()` to kick it out of the array.
If it's NOT in: The user is checking the box. We use the spread operator `[...prev, value]` to add it to the list.
Step 3
The `Funnel` (applyFilters)

```js
let productsCopy = products.slice();
if (category.length > 0) { ... }
if (subCategory.length > 0) { ... }
```

This is the engine. Imagine a Funnel system:

Copy First: We make a copy `slice()` so we don't accidentally destroy the original warehouse inventory.
**Funnel 1 (Category):** We pour all products through. Only those matching your `Category` basket fall through.
**Funnel 2 (SubCategory):** We take the survivors from Funnel 1 and pour them here. Only those matching `Type` survive.
Result: Whatever is left is shown to the user.

```js
const sortProduct = () => {
  let fpCopy = filterProducts.slice();
  switch (sortType) {
    case "low-high":
      setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
      break;

    case "high-low":
      setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
      break;

    default:
      applyFilters();
      break;
  }
};

useEffect(() => {
  sortProduct();
}, [sortType]);

<div className="flex-1">
  <div className="flex justify-between text-base sm:text-2xl mb-4">
    <Tittle text1={"ALL"} text2={"COLLECTIONS"} />
    {/* Product Sort */}
    <select
      name="priceFilter"
      id="priceFilter"
      className="border-2 border-gray-300 text-sm px-2"
      onChange={(e) => setSortType(e.target.value)}
    >
      <option value="relavent">Sert by: Relavent</option>
      <option value="low-high">Sort by: Low to High</option>
      <option value="high-low">Sort by: High to Low</option>
    </select>
  </div>

  {/* Map Product */}
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
    {filterProducts.map((product, index) => (
      <ProductItem
        key={index}
        name={product.name}
        id={product._id}
        price={product.price}
        image={product.image}
      />
    ))}
  </div>
</div>;
```

**The Big Picture:** "The Instant Store Clerk"
Imagine you own a physical store selling your hoodies and trousers. You have a rack of clothes. A customer walks in and says, "Show me the cheapest options first."

In real life, you would have to physically unhook every hanger and rearrange the rack. In your code, the sortProduct function is a super-fast store clerk who rearranges the entire digital rack in milliseconds.

1. The Logic: Rearranging the Rack (sortProduct)
   JavaScript

```js
const sortProduct = () => {
  let fpCopy = filterProducts.slice();
  // ... switch statement ...
};
```

The Safety Copy (slice()): Before rearranging the clothes, you take a snapshot of the current rack. In React, we never want to mess up the original "state" directly. We make a copy (fpCopy), mess around with that, and then show the result. It's like arranging a mannequin display without ruining the stock in the back room.

The Decision Maker (switch): This checks what the customer asked for:

**low-high:** Small price numbers go to the top. (Budget shoppers).

**high-low:** Big price numbers go to the top. (Premium shoppers).

**default:** If they want "Relevant," we just go back to the standard arrangement.

2. The Watcher: The Automation (useEffect)
   JavaScript

```js
useEffect(() => {
  sortProduct();
}, [sortType]);
```

Real-Life Analogy: This is your store manager watching the customers. The moment a customer touches the "Sort By" sign (changing the sortType), the manager instantly signals the clerk (sortProduct) to reshuffle the rack. You don't have to tell them to do it; they just react to the change automatically.

3. The Storefront: The Display (JSX)
   The Control Panel (<select>):

This is the sign on the shelf that lets the user choose their preference. You've styled it cleanly with a gray border so it doesn't distract from the clothes.

The Grid (map & classes):

JavaScript

```js
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ...">
```

This is your actual floor plan.

On Mobile (grid-cols-2): You show 2 items per row because phone screens are narrow.

On Desktop (lg:grid-cols-4): You spread out to 4 items per row because you have the luxury of space.

The Product (ProductItem): Instead of writing the code for every single hoodie or trouser repeatedly, you have a blueprint (ProductItem). You just hand the blueprint the specific details (Name, Price, Image) and it builds the card for you.

## Individual Product:

```js
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";

const Product = () => {
  const { productId } = useParams(); // getting the Id from user
  const { products } = useContext(ShopContext); // geting all the products
  const [productData, setProductData] = useState(false); // Initilizing a state for productData
  const [image, setImage] = useState(""); // Initilizing state for the main Image

  const fetchProductData = async () => {
    products.map((item) => {
      // going through all the product
      if (item._id === productId) {
        // finding the one that matches our ID
        setProductData(item); // storing it into the productData;
        setImage(item.image[0]); // Storing the main Image
        return null;
      }
    });
  };

  // calling this function whenever something chnges in productId or in products.
  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap 12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)} // showing each image in the main frame, when user clicks on it.
                src={item}
                alt="productImages"
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:s-[80%]">
            <img src={image} alt="" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
```

shuting the project for a while to create one on HTML and CSS instead of REACT.
It is taking too long to make, and I dont know even the REACT that much, so I need time for it to adapt.

# Drag-to-Scroll (Grabbing) in React

A beginner-friendly explanation of implementing **horizontal drag-to-scroll** using `useRef` in React.

---

## 📌 Problem

Horizontal scrollbars are often hidden for cleaner UI, but this causes a usability issue:

- Users without touchpads
- Mouse-only users
- Desktop users with hidden scrollbars

❌ No way to scroll horizontally  
❌ Poor accessibility

---

## ✅ Solution

Implement **drag-to-scroll (grabbing)** behavior:

> Click → Drag → Horizontal scroll

This mimics touch-based scrolling on desktop devices.

---

## 🧠 Why `useRef`?

`useRef` is used to store **mutable values** that:

- Persist between renders
- Do **not** cause re-renders
- Are perfect for DOM access and interaction logic

```js
const ref = useRef(initialValue);
```

Access:

```js
ref.current;
```

### Why not `useState`?

| useState            | useRef            |
| ------------------- | ----------------- |
| Triggers re-render  | No re-render      |
| UI updates          | Interaction logic |
| Slower for dragging | Fast and smooth   |

---

## 🧩 Core Refs Used

### 1️⃣ `containerRef`

```js
const containerRef = useRef(null);
```

**Purpose**

- Stores the scroll container DOM element

**Why**

- Access `scrollLeft`
- Add/remove classes
- Read layout properties

---

### 2️⃣ `isDragging`

```js
const isDragging = useRef(false);
```

**Purpose**

- Tracks whether dragging is active

**Why**

- Prevent scrolling when mouse moves normally

---

### 3️⃣ `startX`

```js
const startX = useRef(0);
```

**Purpose**

- Stores mouse X position at drag start

**Why**

- Used as a reference to calculate movement distance

---

### 4️⃣ `scrollLeft`

```js
const scrollLeft = useRef(0);
```

**Purpose**

- Stores container scroll position at drag start

**Why**

- Scrolling is relative, not absolute

---

## 🖱️ Drag Interaction Flow

### 🟢 Mouse Down (Start Drag)

```js
const onMouseDown = (e) => {
  isDragging.current = true;

  startX.current = e.pageX - containerRef.current.offsetLeft;

  scrollLeft.current = containerRef.current.scrollLeft;

  containerRef.current.classList.add("cursor-grabbing");
};
```

- Activates dragging
- Saves starting mouse position
- Saves starting scroll position
- Changes cursor visually

---

### 🟡 Mouse Move (Dragging)

```js
const onMouseMove = (e) => {
  if (!isDragging.current) return;

  e.preventDefault();

  const x = e.pageX - containerRef.current.offsetLeft;

  const walk = (x - startX.current) * 1.5;

  containerRef.current.scrollLeft = scrollLeft.current - walk;
};
```

- Calculates mouse movement
- Scrolls container horizontally
- Multiplier controls scroll speed

---

### 🔴 Mouse Up / Leave (Stop Drag)

```js
const stopDragging = () => {
  isDragging.current = false;
  containerRef.current.classList.remove("cursor-grabbing");
};
```

Used for:

```jsx
onMouseUp = { stopDragging };
onMouseLeave = { stopDragging };
```

Stops dragging safely in all cases.

---

## 📱 Touch Support (Mobile)

```js
const onTouchStart = (e) => {
  startX.current = e.touches[0].pageX;
  scrollLeft.current = containerRef.current.scrollLeft;
};

const onTouchMove = (e) => {
  const x = e.touches[0].pageX;
  const walk = (x - startX.current) * 1.5;

  containerRef.current.scrollLeft = scrollLeft.current - walk;
};
```

Same logic as mouse dragging, using finger position.

---

## 🧱 JSX Usage

```jsx
<div
  ref={containerRef}
  className="
    flex flex-nowrap overflow-x-auto
    cursor-grab select-none
  "
  onMouseDown={onMouseDown}
  onMouseMove={onMouseMove}
  onMouseUp={stopDragging}
  onMouseLeave={stopDragging}
  onTouchStart={onTouchStart}
  onTouchMove={onTouchMove}
>
```

---

## 🎨 CSS / Tailwind Classes

| Class             | Purpose                   |
| ----------------- | ------------------------- |
| `cursor-grab`     | Shows draggable hint      |
| `cursor-grabbing` | Active drag feedback      |
| `select-none`     | Prevents text selection   |
| `overflow-x-auto` | Enables horizontal scroll |

Fallback CSS if needed:

```css
.cursor-grabbing {
  cursor: grabbing;
}
```

---

## 🔑 Key Takeaways

- `useRef` is ideal for interaction logic
- Drag-to-scroll improves UX and accessibility
- No re-renders during drag = better performance
- Works on mouse and touch devices

---

## 🚀 Possible Enhancements

- Snap-to-card scrolling
- Momentum / inertia scrolling
- Arrow button navigation
- Keyboard support

---

**Happy coding! 🚀**

```

---

If you want next, I can:
- Add **diagrams (ASCII or SVG)**
- Convert this into a **mini tutorial series**
- Add **TypeScript version**
- Or build a **reusable hook** like `useDragScroll`

Just tell me 👍
```

````md
# 🏠 Home Page Collections – Complete Beginner-Friendly Explanation

This document explains **how to control Home Page collections** in a clean, scalable, and professional way.  
It is written for **beginners**, but the architecture follows **real-world industry standards**.

---

## 🧠 Problem We Are Solving

We want the **admin** to be able to:

1. Decide **which collections appear on the Home page**
2. Decide **which collection appears first, second, third, etc.**
3. Control **how many products** appear in each section
4. Add a **“View All →” card** that redirects users to a full collection page
5. Do all of this **without duplicating products or creating multiple product tables**

---

## ❌ What We Should NOT Do

- ❌ Do NOT create separate MongoDB collections like:
  - featuredProducts
  - newArrivalProducts
  - eidProducts

This causes:

- Data duplication
- Sync issues
- Difficult updates
- Bad scalability

---

## ✅ Correct Industry Approach

### ✔ One `Product` collection

### ✔ One separate `HomeCollection` collection (acts like CMS settings)

**Products stay products**  
**HomeCollection controls layout & visibility**

---

## 🧱 Core Concept (Very Important)

> A **Home Collection does NOT store products**  
> It only stores **rules to FETCH products**

---

## 📦 Product Model (Already Exists)

Each product can belong to multiple collections using tags:

```js
collectionTags: ["featured", "eid-special", "summer"];
```
````

This allows one product to appear in many places.

---

## 🧩 New Model: HomeCollection

### 📁 File: `models/homeCollectionModel.js`

```js
import mongoose from "mongoose";

const homeCollectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    type: {
      type: String,
      enum: ["tag", "auto"],
      required: true,
    },

    tag: {
      type: String,
    },

    autoRule: {
      type: String,
      enum: ["new-arrivals", "best-sellers", "discounted"],
    },

    showOnHome: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      required: true,
    },

    limit: {
      type: Number,
      default: 8,
    },
  },
  { timestamps: true }
);

const HomeCollection = mongoose.model("HomeCollection", homeCollectionSchema);

export default HomeCollection;
```

---

## 🧠 Field-by-Field Explanation

### 1️⃣ `title`

- Displayed as section heading on Home page

Example:

```txt
Featured Products
New Arrivals
Eid Special
```

---

### 2️⃣ `slug`

- Used in URLs and routing

Example:

```txt
/collection/featured
/collection/eid-special
```

Used by **“View All →”** button.

---

### 3️⃣ `type`

Controls **how products are selected**

| Type   | Meaning                                  |
| ------ | ---------------------------------------- |
| `tag`  | Fetch products using `collectionTags`    |
| `auto` | Fetch products automatically using logic |

---

### 4️⃣ `tag`

Used **only when type = tag**

Example:

```txt
featured
eid-special
```

Backend meaning:

```js
Product.find({ collectionTags: "featured" });
```

---

### 5️⃣ `autoRule`

Used **only when type = auto**

| Rule           | Logic                    |
| -------------- | ------------------------ |
| `new-arrivals` | Latest products          |
| `best-sellers` | `bestSeller: true`       |
| `discounted`   | `discountPercentage > 0` |

---

### 6️⃣ `showOnHome`

Admin toggle to show or hide entire section

Example:

```txt
false → Eid section hidden after Eid
```

---

### 7️⃣ `order`

Controls vertical position on Home page

| Order | Position |
| ----- | -------- |
| 1     | Top      |
| 2     | Second   |
| 3     | Third    |

---

### 8️⃣ `limit`

Number of products shown on Home page only

Example:

```txt
Show 8 products + View All card
```

---

## 🧪 Example HomeCollection Documents

### 🟢 Featured Products (Manual Tag)

```js
{
  title: "Featured Products",
  slug: "featured",
  type: "tag",
  tag: "featured",
  showOnHome: true,
  order: 1,
  limit: 8
}
```

---

### 🔵 New Arrivals (Automatic)

```js
{
  title: "New Arrivals",
  slug: "new-arrivals",
  type: "auto",
  autoRule: "new-arrivals",
  showOnHome: true,
  order: 2,
  limit: 8
}
```

---

### 🟢 Eid Special (Hidden Later)

```js
{
  title: "Eid Special",
  slug: "eid-special",
  type: "tag",
  tag: "eid-special",
  showOnHome: false,
  order: 3,
  limit: 6
}
```

---

## 🔁 How Home Page Data Is Built (Flow)

1. Frontend calls:

```txt
GET /api/home-collections
```

2. Backend:

- Fetch HomeCollections where `showOnHome = true`
- Sort by `order`
- Fetch products using rule (tag or auto)
- Attach products

3. Frontend:

- Render each section
- Render product cards
- Add last **“View All →”** card

---

## 🔗 View All Page Routing

Frontend route:

```txt
/collection/:slug
```

Backend:

- Find HomeCollection by slug
- Apply same rule
- Return full product list (with pagination)

---

## 🧑‍💼 Admin Panel Responsibilities

Admin can:

- Create / edit HomeCollections
- Toggle visibility
- Change order
- Set product limits
- Control homepage layout without touching products
