import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Tittle from "./Tittle";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((product) => product.bestSeller);
    setBestSeller(bestProduct.slice(0, 5));
  }, []);
  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Tittle text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur
          ipsum veritatis dolore. Aliquid similique debitis neque minima
          voluptatibus! Reprehenderit assumenda tempora accusantium ipsa
          molestias officiis incidunt quisquam minus repellat aut.
        </p>
      </div>
    </div>
  );
};

export default BestSeller;
