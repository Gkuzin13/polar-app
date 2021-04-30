import { useContext } from "react";
import { AuthContext } from "../../Auth";
import NavUser from "../Navuser/NavUser";
import "./Navbar.css";
import iceberg from "../../img/logo.png";

const Navbar = ({
  loading,
  manageSignUpWindow,
  manageLoginWindow,
  loginWindow,
  signUpWindow,
}) => {
  const { currentUser } = useContext(AuthContext);

  if (loading) {
    return (
      <nav className="navbar-ctn">
        <a href="/" className="logo">
          <img src={iceberg} alt="logo"></img>
          <span>Polar</span>
        </a>
      </nav>
    );
  }

  return (
    <nav className="navbar-ctn">
      <a href="/" className="logo">
        <img src={iceberg} alt="logo"></img>
        <span>Polar</span>
      </a>

      <div className="nav-actions-ctn">
        <button
          className="nav-login-btn"
          onClick={() => manageLoginWindow(!loginWindow)}
          style={currentUser ? { display: "none" } : null}
        >
          Log In
        </button>

        <button
          onClick={() => manageSignUpWindow(!signUpWindow)}
          style={currentUser ? { display: "none" } : null}
        >
          Sign Up
        </button>

        {currentUser ? <NavUser currentUser={currentUser} /> : null}
      </div>
    </nav>
  );
};

export default Navbar;
