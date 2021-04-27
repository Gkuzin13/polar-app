import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { handleSignOut } from "../../services/logOutHandler";
import { UserCircleIcon, ChevronDownIcon } from "@heroicons/react/solid";
import "./NavUser.css";

const NavUser = ({ currentUser }) => {
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
        <div className="dropdown-user">
          Hi, <strong>{currentUser?.displayName}</strong>
        </div>

        <div className="dropdown-border"></div>

        <Link to="/create">
          <button onClick={() => setDropDown(false)}>Create Post</button>
        </Link>

        <Link to="/myposts">
          <button onClick={() => setDropDown(false)}>My Posts</button>
        </Link>

        <Link to="/savedposts">
          <button onClick={() => setDropDown(false)}>Saved Posts</button>
        </Link>

        <div className="dropdown-border"></div>

        <button onClick={(e) => handleSignOut(e)}>Logout</button>
      </div>
    </div>
  );
};

export default NavUser;
