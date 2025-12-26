import React, { useContext, useState } from "react";
import Tittle from "../components/Tittle";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const { navigate } = useContext(ShopContext);
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstname: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-15 min-h-[80vh]">
      {/* --------------- Left Side -------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Tittle text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={onChangeHandler.firstName}
            type="text"
            placeholder="First name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={onChangeHandler.lastName}
            type="text"
            placeholder="Last name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
        </div>

        <input
          onChange={onChangeHandler}
          name="email"
          value={onChangeHandler.email}
          type="email"
          placeholder="Email address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          required
        />
        <input
          onChange={onChangeHandler}
          name="street"
          value={onChangeHandler.firstName}
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          required
        />

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="city"
            value={onChangeHandler.city}
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={onChangeHandler.state}
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
        </div>

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="zipcode"
            value={onChangeHandler.zipcode}
            type="number"
            placeholder="Zipcode"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={onChangeHandler.country}
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
        </div>

        <input
          onChange={onChangeHandler}
          name="phone"
          value={onChangeHandler.phone}
          type="number"
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          required
        />
      </div>

      {/* -----------Right Side------------ */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-10">
          <Tittle text1={"PAYMENT"} text2={"METHOD"} />
          {/* -------------------Payment Method------------------- */}
          <div className="flex gap-2 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-2 border-2 border-gray-500 rounded p-1 px-2 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full border-gray-500 ${
                  method == "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img
                src={assets.stripe_logo}
                alt="StripLogo_forPaymentMethod"
                className="w-12 h-auto"
              />
            </div>

            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-2 border-2 border-gray-500 rounded p-1 px-2 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full border-gray-500
                ${method == "razorpay" ? "bg-green-400" : ""}`}
              ></p>
              <img
                src={assets.razorpay_logo}
                alt="RayzerPayLogo_forPaymentMethod"
                className="w-12 h-auto"
              />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-2 border-2 border-gray-500 rounded p-1 px-2 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-gray-500 rounded-full
                ${method == "cod" ? "bg-green-400" : ""}`}
              ></p>
              <p className="text-gray-500 text-xs font-medium">
                Cashon Delivery
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              onClick={() => navigate("/orders")}
              className="bg-black text-white px-16 py-3 text-sm hover:bg-gray-800 cursor-pointer"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
