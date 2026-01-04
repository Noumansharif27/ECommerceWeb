import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../App";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { Trash2, Edit3, Package, Plus, AlertCircle } from "lucide-react";

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

  const removeProduct = async (id, name) => {
    if (!id) return toast.error("Product Id is required!");

    const isConfirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );
    if (!isConfirmed) return;

    try {
      if (isDeleting) return;
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
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Logic to determine stock status badge
  const getStockStatus = (qty) => {
    if (qty <= 0)
      return { label: "Out of Stock", color: "bg-red-100 text-red-700" };
    if (qty < 10)
      return { label: "Low Stock", color: "bg-orange-100 text-orange-700" };
    return { label: "In Stock", color: "bg-green-100 text-green-700" };
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Inventory Management
          </h1>
          <p className="text-gray-500 text-sm">
            Monitor stock levels and pricing across your store.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                  Quantity
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {list.map((item, index) => {
                const stockStatus = getStockStatus(item.quantity);
                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image[0]}
                          alt=""
                          className="w-10 h-10 rounded-md object-cover border border-gray-200 bg-gray-50"
                        />
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900 text-sm">
                            {item.name}
                          </span>
                          <span className="text-xs text-gray-400">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Quantity Column */}
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`text-sm font-semibold ${
                          item.quantity < 10
                            ? "text-orange-600"
                            : "text-gray-700"
                        }`}
                      >
                        {item.quantity}
                      </span>
                    </td>

                    {/* Dynamic Status Badge */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${stockStatus.color}`}
                      >
                        {stockStatus.label}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col leading-tight">
                        <span className="text-sm font-bold text-gray-900">
                          {currency}
                          {item.salesPrice.toFixed(2)}
                        </span>
                        {item.discountPercentage > 0 && (
                          <span className="text-[10px] text-red-500 font-medium">
                            -{item.discountPercentage}% OFF
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/${item._id}`}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit3 size={18} />
                        </Link>
                        <button
                          onClick={() => removeProduct(item._id, item.name)}
                          disabled={isDeleting}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {list.length === 0 && (
            <div className="flex flex-col items-center justify-center p-16 text-gray-400">
              <Package size={40} className="mb-2 opacity-20" />
              <p>No products available in stock.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
