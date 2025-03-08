import React from "react";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { useAuth } from "../hooks/useUser";

const Header = () => {
  const username = JSON.parse(localStorage.getItem("userData"))?.data.name;

  const { logOut } = useAuth();

  console.log();
  return (
    <header className="bg-green-00 border-gray-500 h-full w-full">
      <div className="max-w-[1300px] justify-between mx-auto flex p-4 h-full">
        <img src="/logo.png" alt="Logo" className="h-14 w-14" />
        <div className="flex items-center gap-5">
          <div className="flex items-center  gap-2">
            <CiUser className="text-2xl" />
            <span className="text-lg">{username}</span>
          </div>

          <button
            onClick={logOut}
            className="w-14 h-14 items-center flex rounded-full bg-primary text-white"
          >
            <IoIosLogOut className="w-full  text-2xl" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
