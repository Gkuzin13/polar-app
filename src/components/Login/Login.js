import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import loginHandler from "../../services/loginHandler";
import { AuthContext } from "../../Auth";
import { XIcon } from "@heroicons/react/solid";
import Loader from "../Loader/Loader";
import "./Login.css";

const Login = ({
  manageLoader,
  loading,
  manageSignUpWindow,
  manageLoginWindow,
}) => {
  const [errorMsg, setErrorMsg] = useState(null);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    manageLoginWindow(true);

    if (currentUser) {
      manageLoginWindow(false);

      return <Redirect to="/" />;
    }

    return () => {
      manageLoginWindow(false);
    };
  }, [manageLoginWindow, currentUser]);

  const handleLogin = (e) => {
    e.preventDefault();

    setErrorMsg(null);

    const { email, password } = e.target.elements;

    manageLoader(true);

    loginHandler(email, password).then((res) => {
      setErrorMsg(res?.message);
      manageLoader(false);
    });
  };

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
          <h1>Log In</h1>

          <input type="text" name="email" placeholder="Email" required />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />

          {errorMsg ? <span className="error-msg">{errorMsg}</span> : null}

          {loading ? (
            <Loader />
          ) : (
            <button type="submit" className="form-btn">
              Log in
            </button>
          )}

          <div className="form-footer-ctn">
            New to this website?
            <strong onClick={() => manageSignUpWindow(true)}> Sign Up.</strong>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
