import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm px-5">
        <div className="ml-15 sm:ml-0">
          <img src={assets.logo} className="mb-5 w-25" alt="footerLogo" />
          <p className="w-full sm:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum
            molestiae delectus doloremque!
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li className="hover:color-yellow-600 cursor-pointer">Home</li>
            <li className="hover:color-yellow-600 cursor-pointer">About us</li>
            <li className="hover:color-yellow-600 cursor-pointer">Delivery</li>
            <li className="hover:color-yellow-600 cursor-pointer">
              Privacy policy
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+9232-1033-1333</li>
            <li>info@sehraekhaas.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr className="text-gray-800" />
        <p className="py-5 text-sm text-center text-gray-700">
          Copyright 2025@ sehraekhaas.com All Right Reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
