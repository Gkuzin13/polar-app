import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth";
import NavUser from "./NavUser";

const Navbar = ({
  loading,
  manageSignUpWindow,
  manageLoginWindow,
  loginWindow,
  signUpWindow,
}) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <nav
      className="flex w-full justify-between items-center px-8 py-3 mb-5 
    shadow-md static "
    >
      <a href="/">Logo</a>

      <div className="text-sm flex justify-between items-center">
        <button
          onClick={() => manageLoginWindow(!loginWindow)}
          style={currentUser || loading ? { visibility: "hidden" } : null}
          className="bg-gray-200 hover:bg-gray-300 text-black font-semibold 
          py-2 px-3 mr-3 rounded transition-colors"
        >
          Log In
        </button>

        <button
          onClick={() => manageSignUpWindow(!signUpWindow)}
          style={currentUser || loading ? { visibility: "hidden" } : null}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-3 mr-3 rounded 
      transition-colors"
        >
          Sign Up
        </button>

        {currentUser ? <NavUser /> : null}
      </div>
    </nav>
  );
};

export default Navbar;
