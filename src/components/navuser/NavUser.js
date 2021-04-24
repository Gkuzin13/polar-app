import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { handleSignOut } from "../../services/logOutHandler";
import "./NavUser.css";

const NavUser = () => {
  const [dropDown, setDropDown] = useState(false);

  const modalRef = useRef();

  useEffect(() => {
    const clickListener = (e) => {
      console.log(e.target.contains(modalRef.current), modalRef.current);

      return null;
    };

    window.addEventListener("click", clickListener);

    return () => window.removeEventListener("click", clickListener);
  }, []);

  return (
    <div>
      <button
        className="navuser-btn"
        onClick={() => setDropDown(true)}
      ></button>

      <div
        ref={modalRef}
        className="navuser-dropdown"
        style={dropDown ? { display: "block" } : { display: "none" }}
      >
        <Link to="/">
          <button>Home</button>
        </Link>

        <Link to="/myposts">
          <button>My Posts</button>
        </Link>

        <Link to="/savedposts">
          <button>Saved Posts</button>
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
