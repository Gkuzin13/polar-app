import React, { useReducer, useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./Auth";
import { reducer } from "./reducers/reducers";
import Navbar from "./components/Navbar";
import SignUp from "./components/signup/SignUp";
import Login from "./components/Login/Login";
import Commentsview from "./scenes/CommentsView";
import Home from "./scenes/Home";
import CreateNewPost from "./scenes/CreateNewPost";
import SavedPosts from "./scenes/SavedPosts/SavedPosts";
import MyPosts from "./scenes/MyPosts/MyPosts";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  const [postData, dispatch] = useReducer(reducer, []);
  const [loading, setLoading] = useState(false);
  const [loginWindow, setLoginWindow] = useState(false);
  const [signUpWindow, setSignUpWindow] = useState(false);

  const manageLoginWindow = (action) => {
    setLoginWindow(action);
    setSignUpWindow(false);
  };

  const manageSignUpWindow = (action) => {
    setSignUpWindow(action);
    setLoginWindow(false);
  };

  const manageLoader = useCallback(
    (action) => {
      return setLoading(action);
    },
    [setLoading]
  );

  return (
    <AuthProvider>
      <Router>
        {loginWindow ? (
          <Login
            manageLoader={manageLoader}
            loading={loading}
            manageLoginWindow={manageLoginWindow}
            manageSignUpWindow={manageSignUpWindow}
          />
        ) : null}

        {signUpWindow ? (
          <SignUp
            manageLoader={manageLoader}
            loading={loading}
            manageSignUpWindow={manageSignUpWindow}
            manageLoginWindow={manageLoginWindow}
          />
        ) : null}

        <Navbar
          loading={loading}
          manageLoginWindow={manageLoginWindow}
          manageSignUpWindow={manageSignUpWindow}
          loginWindow={loginWindow}
          signUpWindow={signUpWindow}
        />

        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home
                postData={postData}
                dispatch={dispatch}
                manageLoader={manageLoader}
                loading={loading}
              />
            )}
          />
          <Route
            path="/g/:groupId/:postId"
            render={({ match }) => (
              <Commentsview
                postData={postData}
                match={match}
                dispatch={dispatch}
                manageLoader={manageLoader}
                loading={loading}
              />
            )}
          />

          <PrivateRoute
            path="/myposts"
            component={MyPosts}
            postData={postData}
            dispatch={dispatch}
            manageLoader={manageLoader}
          />

          <PrivateRoute
            path="/savedposts"
            component={SavedPosts}
            postData={postData}
            dispatch={dispatch}
            manageLoader={manageLoader}
          />

          <PrivateRoute path="/create" component={CreateNewPost} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
