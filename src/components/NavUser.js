import React, { useState } from "react";
import { Link } from "react-router-dom";
import { handleSignOut } from "../services/logOutHandler";

const NavUser = ({ history }) => {
  const [dropDown, setDropDown] = useState(false);

  return (
    <div className="flex justify-center z-10">
      <div className="relative">
        <button
          className="block h-10 w-10 rounded-full overflow-hidden focus:outline-none"
          onClick={() => setDropDown(!dropDown)}
        >
          <img
            className="h-full w-full object-cover"
            src={`https://eu.ui-avatars.com/api/?name=hi&length=1`}
            alt="avatar"
          />
        </button>

        <div
          className="absolute right-0 w-40 mt-2 py-2 bg-white border rounded shadow-xl"
          style={dropDown ? { display: "block" } : { display: "none" }}
        >
          <Link to="/">
            <button className="w-full text-left transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white">
              Home
            </button>
          </Link>

          <Link to="/myposts">
            <button className="w-full text-left transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white">
              My Posts
            </button>
          </Link>

          <Link to="/savedposts">
            <button className="w-full text-left transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white">
              Saved Posts
            </button>
          </Link>

          <div className="py-2">
            <hr></hr>
          </div>
          <button
            onClick={(e) => handleSignOut(e)}
            className="w-full text-left transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavUser;
