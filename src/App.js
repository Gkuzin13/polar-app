import React, { useReducer, useState, useEffect, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { AuthContext } from "./Auth";
import { fetchPosts } from "./services/postHandler";
import { reducer } from "./reducers/reducers";
import { ACTIONS } from "./reducers/reducers";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Loader from "./components/Loader";
import Commentsview from "./scenes/CommentsView";
import Home from "./scenes/Home";

const App = () => {
  const [postData, dispatch] = useReducer(reducer, []);
  const [loginWindow, setLoginWindow] = useState(false);
  const [signUpWindow, setSignUpWindow] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    manageLoader(true);

    fetchPosts().then((posts) => {
      dispatch({
        type: ACTIONS.SET_DATA,
        data: posts,
      });

      manageLoader(false);
    });
  }, []);

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
        {loading ? <Loader /> : null}
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
              setSignUpWindow={setSignUpWindow}
            />
          )}
        />
      </Switch>
    </Route>
  );
};

export default App;
