import NavUser from "../Navuser/NavUser";
import "./Navbar.css";
import iceberg from "../../img/logo.png";

const Navbar = ({
  manageSignUpWindow,
  manageLoginWindow,
  loginWindow,
  signUpWindow,
  currentUser,
}) => {
  if (currentUser) {
    return (
      <nav className="navbar-ctn">
        <a href="/" className="logo">
          <img src={iceberg} alt="logo"></img>
          <span>Polar</span>
        </a>
        <NavUser currentUser={currentUser} />
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
        >
          Log In
        </button>

        <button onClick={() => manageSignUpWindow(!signUpWindow)}>
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
