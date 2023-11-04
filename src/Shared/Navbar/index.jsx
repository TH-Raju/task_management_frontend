/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { ContextData } from "../../Context";
import { SunIcon } from "@heroicons/react/24/solid";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const cookies = new Cookies();
  const userEmail = cookies.get("email");
  const { siteName, theme, setTheme } = useContext(ContextData);
  const navigate = useNavigate();

  const menuItems = (
    <>
      <li>
        <Link to="/">
          <p>Home</p>
        </Link>
      </li>
      {userEmail ? (
        <>
          <li className="">
            <button
              onClick={() => handleLogout()}
              className="hover:bg-red-700 hover:text-white bg-red-500  my-2 md:my-0  rounded-lg duration-100"
            >
              <span>Log out</span>
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">
              <p>Log in</p>
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <p>Sign Up</p>
            </Link>
          </li>
        </>
      )}
    </>
  );

  const handleLogout = async () => {
    cookies.remove("email", { path: "/" });
    cookies.remove("name", { path: "/" });
    cookies.remove("role", { path: "/" });
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="">
      <div className="navbar bg-gray-500 hidden lg:block ">
        <div className="navbar-start">
          <a className="btn btn-ghost normal-case text-xl">{siteName}</a>
        </div>
        <div className="navbar-end">
          <div
            className={`btn btn-sm  ${
              theme
                ? "bg-black text-white hover:bg-gray-800 duration-200"
                : "bg-white hover:bg-gray-400 duration-200 hover:text-white"
            }`}
            onClick={() => setTheme(!theme)}
          >
            {theme ? (
              <p className="flex justify-center items-center ">
                {" "}
                <SunIcon className="h-6 w-6 text-blue-500" />
                <p>Dark</p>
              </p>
            ) : (
              <p className="flex justify-center items-center ">
                {" "}
                <SunIcon className="h-6 w-6 text-blue-500" />
                <p>Light</p>
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="navbar bg-gray-500 lg:-mt-10">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content  z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black"
            >
              {menuItems}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl lg:hidden">
            {siteName}
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-md font-bold ">
            {menuItems}
          </ul>
        </div>
        <div className="navbar-end lg:hidden">
          <div
            className={`btn btn-sm  ${
              theme
                ? "bg-black text-white hover:bg-gray-800 duration-200"
                : "bg-white hover:bg-gray-400 duration-200 hover:text-white"
            }`}
            onClick={() => setTheme(!theme)}
          >
            {theme ? (
              <p className="flex justify-center items-center ">
                {" "}
                <SunIcon className="h-6 w-6 text-blue-500" />
                <p>Dark</p>
              </p>
            ) : (
              <p className="flex justify-center items-center ">
                {" "}
                <SunIcon className="h-6 w-6 text-blue-500" />
                <p>Light</p>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
