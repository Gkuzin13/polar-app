import React, { useReducer, useState, useContext } from 'react';
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

  if (loadingUser) {
    return <></>;
  }

  return (
    <>
      <Router>
        {loginWindow && (
          <Login
            manageLoginWindow={manageLoginWindow}
            manageSignUpWindow={manageSignUpWindow}
            currentUser={currentUser}
          />
        )}
        {signUpWindow && (
          <SignUp
            manageSignUpWindow={manageSignUpWindow}
            manageLoginWindow={manageLoginWindow}
            currentUser={currentUser}
          />
        )}

        <Navbar
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
              currentUser={currentUser}
            />

            <PrivateRoute
              path='/savedposts'
              component={SavedPosts}
              postData={postData}
              dispatch={dispatch}
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
