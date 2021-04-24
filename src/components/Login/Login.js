import React, { useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import loginHandler from "../../services/loginHandler";
import { AuthContext } from "../../Auth";
import { XIcon } from "@heroicons/react/solid";
import Loader from "../Loader";
import "./Login.css";

const Login = ({
  manageLoader,
  loading,
  manageSignUpWindow,
  manageLoginWindow,
}) => {
  const { currentUser } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    const { email, password } = e.target.elements;

    manageLoader(true);

    loginHandler(email, password).then(() => {
      manageLoader(false);
    });
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="form-window-ctn">
      <div className="window-inner-ctn">
        <div className="window-exit-ctn">
          <XIcon
            className="exit-icon"
            onClick={() => manageLoginWindow(false)}
          />
        </div>

        <form onSubmit={handleLogin} className="form-ctn">
          <h1>Sign In</h1>

          <input type="text" name="email" placeholder="Email" />

          <input type="password" name="password" placeholder="Password" />

          <button type="submit" className="form-btn">
            <div className="form-btn-content">
              {loading ? <Loader /> : "Sign In"}
            </div>
          </button>

          <div className="form-footer-ctn">
            New to this website?
            <strong onClick={() => manageSignUpWindow(true)}> Sign up.</strong>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
