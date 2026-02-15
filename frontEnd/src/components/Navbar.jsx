import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import {
  Handbag,
  UserRound,
  Search,
  Menu,
  MoveLeftIcon,
  MoveRightIcon,
} from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  // Check if we are on the home page
  const isHomePage = location.pathname === "/";

  const [visable, setVisable] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    setToken("");
    setCartItems({});
    navigate("/login");
    localStorage.removeItem("token");
  };

  return (
    <div className="w-full h-auto">
      <div className="w-full bg-black flex gap-2 h-[25px] flex items-center justify-center">
        <MoveLeftIcon size={15} />
        <p className="font-light text-xs">Lorem ipsum dolor sit amet</p>
        <MoveRightIcon size={15} />
      </div>
      <div
        className={`relative flex items-center justify-between font-medium px-5
    ${
      isHomePage
        ? "absolute top-0 left-0 bg-transparent text-white hover:bg-white hover:text-black z-70 w-full"
        : ""
    }
    `}
      >
        <div
          className="flex w-[250px] cursor-pointer py-4 pr-10"
          onMouseEnter={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
        >
          <div className="flex-1">
            <Menu size={15} />
          </div>

          {showMenu && (
            <ul
              className={`fixed top-0 left-0 w-[25rem] h-full bg-white z-80 flex flex-col items-start pt-25 pl-5 gap-2 text-black font-light transition-all`}
            >
              <NavLink to="/" className="flex flex-col items-start gap-1">
                <p>HOME</p>
                <hr className="w-2/4 border-none h-[1px] bg-gray-700 hidden" />
              </NavLink>

              <NavLink
                to="/collection"
                className="flex flex-col items-start gap-1 ml-[1px]"
              >
                <p>COLLECTION</p>
                <hr className="w-2/4 border-none h-[1px] bg-gray-700 hidden ml-[1px]" />
              </NavLink>

              <NavLink to="/about" className="flex flex-col items-start gap-1">
                <p>ABOUT</p>
                <hr className="w-2/4 border-none h-[1px] bg-gray-700 hidden ml-[1px]" />
              </NavLink>

              <NavLink
                to="/contact"
                className="flex flex-col items-start gap-1"
              >
                <p>CONTACT</p>
                <hr className="w-2/4 border-none h-[1px] bg-gray-700 hidden ml-[1px]" />
              </NavLink>
            </ul>
          )}
        </div>

        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <img
            src={isHomePage ? assets.whiteLogo : assets.logo}
            alt="navBar-logo"
            className="w-25"
          />
        </Link>

        <div className={`flex items-center gap-10 opacity-[0.7]`}>
          <Search
            onClick={() => setShowSearch(true)}
            size={15}
            className="cursor-pointer"
          />

          <div className="group relative">
            <Link to="/login">
              <UserRound
                size={15}
                onClick={() => (token ? null : navigate("/login"))}
              />
            </Link>

            {/* dropDwn Menu */}
            {token && (
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                  <p className="cursor-pointer hover:text-black">My Profile</p>
                  <p
                    onClick={() => navigate("/orders")}
                    className="cursor-pointer hover:text-black"
                  >
                    Orders
                  </p>
                  <p
                    onClick={logout}
                    className="cursor-pointer hover:text-black"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
          <Link to="/cart" className="relative">
            <Handbag size={20} />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </Link>

          <img
            onClick={() => setVisable(true)}
            className="w-5 cursor-pointer sm:hidden"
            src={assets.menu_icon}
            alt="NavBar_MenuIcon"
          />

          {/* Sidebar menu for Smaller Screen */}
          <div
            className={` absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
              visable ? "w-full" : "w-0"
            }`}
          >
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

              <div className="flex flex-col">
                <NavLink
                  onClick={() => setVisable(false)}
                  className="py-2 pl-6 border-b"
                  to="/"
                >
                  HOME
                </NavLink>
                <NavLink
                  onClick={() => setVisable(false)}
                  className="py-2 pl-6 border-b"
                  to="/collection"
                >
                  COLLECTION
                </NavLink>
                <NavLink
                  onClick={() => setVisable(false)}
                  className="py-2 pl-6 border-b"
                  to="/about"
                >
                  ABOUT
                </NavLink>
                <NavLink
                  onClick={() => setVisable(false)}
                  className="py-2 pl-6 border-b"
                  to="/contact"
                >
                  CONTACT
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
