import { useContext } from "react";
import { AuthContext } from "../../Auth";
import NavUser from "../navuser/NavUser";
import "./Navbar.css";

const Navbar = ({
  loading,
  manageSignUpWindow,
  manageLoginWindow,
  loginWindow,
  signUpWindow,
}) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <nav className="navbar-ctn">
      <a href="/" className="logo">
        Squid.
      </a>

      <div className="nav-actions-ctn">
        <button
          className="nav-login-btn"
          onClick={() => manageLoginWindow(!loginWindow)}
          style={currentUser || loading ? { visibility: "hidden" } : null}
        >
          Log In
        </button>

        <button
          onClick={() => manageSignUpWindow(!signUpWindow)}
          style={currentUser || loading ? { visibility: "hidden" } : null}
        >
          Sign Up
        </button>

        {currentUser ? <NavUser /> : null}
      </div>
    </nav>
  );
};

export default Navbar;
