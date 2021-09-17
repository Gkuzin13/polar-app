import React, { useReducer, useState, useCallback, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { reducer } from './reducers/reducers';
import { AuthContext } from './services/Auth';
import Navbar from './components/Navbar/Navbar';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Commentsview from './scenes/CommentsView/CommentsView';
import Home from './scenes/Home/Home';
import CreateNewPost from './scenes/CreateNewPost';
import SavedPosts from './scenes/SavedPosts/SavedPosts';
import MyPosts from './scenes/MyPosts/MyPosts';
import PrivateRoute from './components/PrivateRoute';
import useWindowSize from './utils/useWindowSize';

const App = () => {
  const [postData, dispatch] = useReducer(reducer, []);
  const [loading, setLoading] = useState(false);
  const [loginWindow, setLoginWindow] = useState(false);
  const [signUpWindow, setSignUpWindow] = useState(false);

  const { currentUser, loadingUser } = useContext(AuthContext);

  const windowSize = useWindowSize();

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

  if (loginWindow || signUpWindow) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  if (loadingUser) {
    return <></>;
  }

  return (
    <>
      <Router>
        {loginWindow && (
          <Login
            manageLoader={manageLoader}
            loading={loading}
            manageLoginWindow={manageLoginWindow}
            manageSignUpWindow={manageSignUpWindow}
            currentUser={currentUser}
          />
        )}

        {signUpWindow && (
          <SignUp
            manageLoader={manageLoader}
            loading={loading}
            manageSignUpWindow={manageSignUpWindow}
            manageLoginWindow={manageLoginWindow}
            currentUser={currentUser}
          />
        )}

        <Navbar
          loading={loading}
          manageLoginWindow={manageLoginWindow}
          manageSignUpWindow={manageSignUpWindow}
          loginWindow={loginWindow}
          signUpWindow={signUpWindow}
          currentUser={currentUser}
        />

        <main>
          <Switch>
            <Route
              exact
              path='/'
              render={() => (
                <Home
                  postData={postData}
                  dispatch={dispatch}
                  manageLoader={manageLoader}
                  loading={loading}
                  manageLoginWindow={manageLoginWindow}
                  windowSize={windowSize}
                />
              )}
            />
            <Route
              path='/g/:groupId/:postId'
              render={({ match }) => (
                <Commentsview
                  postData={postData}
                  match={match}
                  dispatch={dispatch}
                  manageLoader={manageLoader}
                  loading={loading}
                  manageLoginWindow={manageLoginWindow}
                  manageSignUpWindow={manageSignUpWindow}
                  loginWindow={loginWindow}
                  signUpWindow={signUpWindow}
                  currentUser={currentUser}
                />
              )}
            />

            <PrivateRoute
              path='/myposts'
              component={MyPosts}
              postData={postData}
              dispatch={dispatch}
              manageLoader={manageLoader}
              loading={loading}
              currentUser={currentUser}
            />

            <PrivateRoute
              path='/savedposts'
              component={SavedPosts}
              postData={postData}
              dispatch={dispatch}
              manageLoader={manageLoader}
              loading={loading}
              currentUser={currentUser}
            />

            <PrivateRoute
              path='/create'
              component={CreateNewPost}
              currentUser={currentUser}
            />
          </Switch>
        </main>
      </Router>
    </>
  );
};

export default App;
