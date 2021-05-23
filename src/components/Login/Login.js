import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import loginHandler from "../../services/loginHandler";
import { XIcon } from "@heroicons/react/solid";
import Loader from "../Loader/Loader";
import "./Login.css";

const Login = ({
  manageLoader,
  loading,
  manageSignUpWindow,
  manageLoginWindow,
  currentUser,
}) => {
  const [errorMsg, setErrorMsg] = useState(null);

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

    loginHandler(email.value, password.value).then((res) => {
      setErrorMsg(res?.message);

      manageLoader(false);
    });
  };

  const testDriveLogin = (e) => {
    e.preventDefault();
    setErrorMsg(null);

    manageLoader(true);

    const { email, password } = {
      email: "tester@mail.com",
      password: "tester",
    };

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

          {errorMsg && <span className="error-msg">{errorMsg}</span>}

          {loading ? (
            <Loader />
          ) : (
            <button type="submit" className="form-btn">
              Log In
            </button>
          )}

          <div className="form-footer-ctn">
            New to this website?
            <strong onClick={() => manageSignUpWindow(true)}> Sign Up</strong>
          </div>
        </form>
        <div className="form-footer-ctn">
          <button
            onClick={(e) => testDriveLogin(e)}
            className="login-test-btn"
            type="button"
          >
            Log in as guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
