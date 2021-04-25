import React, { useContext } from "react";
import { Redirect, withRouter } from "react-router";
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
  const { currentUser } = useContext(AuthContext);

  const handleSignUp = (e) => {
    e.preventDefault();

    const { email, password, confirmpassword, nickname } = e.target.elements;

    if (password.value !== confirmpassword.value) {
      return;
    }

    manageLoader(true);

    createNewUser(email, password, nickname).then(() => {
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
          <input type="text" name="nickname" placeholder="Nickname" />

          <input type="text" name="email" placeholder="Email" />

          <input type="password" name="password" placeholder="Password" />

          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
          />

          <button type="submit" className="form-btn">
            <div className="form-btn-content">
              {loading ? <Loader /> : "Sign Up"}
            </div>
          </button>

          <div className="form-footer-ctn">
            Already have an account?
            <strong onClick={() => manageLoginWindow(true)}> Login.</strong>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(SignUp);
