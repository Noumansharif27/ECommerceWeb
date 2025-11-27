import React from "react";
import Tittle from "../components/Tittle";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";

const PlaceOrder = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-15 min-h-[80vh] border-top">
      {/* --------------- Left Side -------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Tittle text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="Last name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>

        <input
          type="email"
          placeholder="Email address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>

        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Zipcode"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>

        <input
          type="number"
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
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
            <div className="flex items-center gap-2 border-2 border-gray-500 rounded p-1 px-2 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full`}></p>
              <img
                src={assets.stripe_logo}
                alt="StripLogo_forPaymentMethod"
                className="w-12 h-auto"
              />
            </div>

            <div className="flex items-center gap-2 border-2 border-gray-500 rounded p-1 px-2 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full`}></p>
              <img
                src={assets.razorpay_logo}
                alt="RayzerPayLogo_forPaymentMethod"
                className="w-12 h-auto"
              />
            </div>

            <div className="flex items-center gap-2 border-2 border-gray-500 rounded p-1 px-2 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full`}></p>
              <p className="text-gray-500 text-xs font-medium">
                Cashon Delivery
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
