import React, { useReducer, useState, useContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { AuthContext } from "./Auth";
import { reducer } from "./reducers/reducers";
import { getUserData } from "./services/userDataHandler";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Commentsview from "./scenes/CommentsView";
import Home from "./scenes/Home";

const App = () => {
  const [postData, dispatch] = useReducer(reducer, []);
  const [userData, setUserData] = useState([]);
  const [loginWindow, setLoginWindow] = useState(false);
  const [signUpWindow, setSignUpWindow] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    getUserData(currentUser?.uid).then((data) => {
      setUserData(data);
    });
  }, [currentUser]);

  const manageLoginWindow = (action) => {
    setLoginWindow(action);
  };

  const manageSignUpWindow = (action) => {
    setSignUpWindow(action);
  };

  const manageLoader = (action) => {
    setLoading(action);
  };

  return (
    <Route>
      <Navbar
        signUpWindow={signUpWindow}
        loginWindow={loginWindow}
        manageLoginWindow={manageLoginWindow}
        manageSignUpWindow={manageSignUpWindow}
      />
      <div>
        {loginWindow ? (
          <Login
            loginWindow={loginWindow}
            manageLoginWindow={manageLoginWindow}
            manageLoader={manageLoader}
            loading={loading}
          />
        ) : null}
        {signUpWindow ? (
          <SignUp
            signUpWindow={signUpWindow}
            manageSignUpWindow={manageSignUpWindow}
            manageLoader={manageLoader}
            loading={loading}
          />
        ) : null}
      </div>

      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Home
              currentUser={currentUser}
              postData={postData}
              userData={userData}
              dispatch={dispatch}
              manageLoader={manageLoader}
              setSignUpWindow={setSignUpWindow}
              loading={loading}
            />
          )}
        />
        <Route
          path="/g/:groupId/:postId"
          render={({ match }) => (
            <Commentsview
              currentUser={currentUser}
              postData={postData}
              userData={userData}
              match={match}
              dispatch={dispatch}
              manageLoader={manageLoader}
              loading={loading}
              setSignUpWindow={setSignUpWindow}
            />
          )}
        />
      </Switch>
    </Route>
  );
};

export default App;
