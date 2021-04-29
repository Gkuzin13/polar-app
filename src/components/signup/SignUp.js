import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { createNewUser } from "../../services/signUpHandler";
import { AuthContext } from "../../Auth";
import { XIcon } from "@heroicons/react/solid";
import Loader from "../Loader/Loader";
import "./SignUp.css";

const SignUp = ({
  loading,
  manageLoader,
  manageLoginWindow,
  manageSignUpWindow,
}) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const { currentUser } = useContext(AuthContext);

  const handleSignUp = (e) => {
    e.preventDefault();

    manageLoader(true);

    setErrorMsg(null);

    const { email, password, confirmpassword, nickname } = e.target.elements;

    if (password.value !== confirmpassword.value) {
      setErrorMsg("The passwords do not match. Try again.");

      manageLoader(false);

      return;
    }

    createNewUser(email, password, nickname).then((res) => {
      setErrorMsg(res?.message);

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
            onClick={() => manageSignUpWindow(false)}
          />
        </div>
        <form className="form-ctn" onSubmit={(e) => handleSignUp(e)}>
          <h1>Sign Up</h1>

          <input type="text" name="nickname" placeholder="Nickname" required />

          <input type="text" name="email" placeholder="Email" required />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />

          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            required
          />

          {errorMsg ? <span className="error-msg">{errorMsg}</span> : null}

          {loading ? (
            <Loader />
          ) : (
            <button type="submit" className="form-btn">
              Sign In
            </button>
          )}

          <div className="form-footer-ctn">
            Already have an account?
            <strong onClick={() => manageLoginWindow(true)}> Login.</strong>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
