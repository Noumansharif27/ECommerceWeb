import { createContext } from "react";
import { products } from "../assets/assets";

export const ShopContextProvider = createContext();

const ShopContextProvider = (porps) => {
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
