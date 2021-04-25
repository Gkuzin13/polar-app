import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { handleSignOut } from "../../services/logOutHandler";
import { UserCircleIcon, ChevronDownIcon } from "@heroicons/react/solid";
import "./NavUser.css";

const NavUser = () => {
  const [dropDown, setDropDown] = useState(false);

  const modalRef = useRef();

  useEffect(() => {
    const clickListener = (e) => {
      if (!modalRef.current.contains(e.target)) {
        setDropDown(false);

        return;
      }
    };

    if (dropDown) {
      window.addEventListener("click", clickListener);
    }

    return () => window.removeEventListener("click", clickListener);
  }, [dropDown]);

  return (
    <div>
      <button
        type="button"
        className="navuser-btn"
        onClick={() => setDropDown(true)}
      >
        <UserCircleIcon className="user-icon" />
        <ChevronDownIcon className="chevron-icon" />
      </button>

      <div
        ref={modalRef}
        className="navuser-dropdown"
        style={dropDown ? { display: "block" } : { display: "none" }}
      >
        <Link to="/">
          <button onClick={() => setDropDown(false)}>Home</button>
        </Link>

        <Link to="/myposts">
          <button onClick={() => setDropDown(false)}>My Posts</button>
        </Link>

        <Link to="/savedposts">
          <button onClick={() => setDropDown(false)}>Saved Posts</button>
        </Link>

        <div className="dropdown-border">
          <hr></hr>
        </div>
        <button onClick={(e) => handleSignOut(e)}>Logout</button>
      </div>
    </div>
  );
};

export default NavUser;
