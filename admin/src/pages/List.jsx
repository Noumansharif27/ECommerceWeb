import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../App";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      if (isDeleting) {
        return;
      }
      setIsDeleting(true);
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { _id: id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <>
      <p className="mb-2">All Product List</p>
      <div className="flex flex-col gap-2">
        {/* ---------- List Table Tittle ----------- */}
        <div className="hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Original Price</b>
          <b>Sales Price</b>
          <b>Discount %</b>
          <b className="text-center">Action</b>
        </div>

        {/* ------- Product List -------- */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center gap-2 px-2 py-1 bg-gray-100 text-sm"
          >
            <img
              src={item.image[0]}
              alt="productImage"
              className="h-20 w-20 object-cover"
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency} {item.originalPrice.toFixed(2)}
            </p>
            <p>
              {currency} {item.salesPrice.toFixed(2)}
            </p>
            <p className="bg-red-500 w-[3rem] rounded text-center text-white">
              {item.discountPercentage}%
            </p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-lg text-white bg-black w-[2rem] ml-12 rounded"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
