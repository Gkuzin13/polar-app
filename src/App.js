import React, { useReducer, useState, useContext, useCallback } from "react";
import { Route, Switch } from "react-router-dom";
import { AuthContext } from "./Auth";
import { reducer } from "./reducers/reducers";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Commentsview from "./scenes/CommentsView";
import Home from "./scenes/Home";
import CreateNewPost from "./scenes/CreateNewPost";

const App = () => {
  const [postData, dispatch] = useReducer(reducer, []);
  const [loginWindow, setLoginWindow] = useState(false);
  const [signUpWindow, setSignUpWindow] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const manageLoginWindow = (action) => {
    setLoginWindow(action);
  };

  const manageSignUpWindow = (action) => {
    setSignUpWindow(action);
  };

  const manageLoader = useCallback(
    (action) => {
      return setLoading(action);
    },
    [setLoading]
  );

  return (
    <Route>
      <Navbar
        signUpWindow={signUpWindow}
        loginWindow={loginWindow}
        manageLoginWindow={manageLoginWindow}
        manageSignUpWindow={manageSignUpWindow}
        currentUser={currentUser}
        loading={loading}
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
              match={match}
              dispatch={dispatch}
              manageLoader={manageLoader}
              loading={loading}
              setSignUpWindow={setSignUpWindow}
            />
          )}
        />

        <Route
          path="/create"
          render={() => <CreateNewPost currentUser={currentUser} />}
        />
      </Switch>
    </Route>
  );
};

export default App;
