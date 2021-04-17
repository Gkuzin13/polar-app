import React, { useReducer, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { reducer } from './reducers/reducers';
import { fetchPosts } from './services/postHandler';
import Post from './components/Post';
import Selection from './components/GroupList';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Loader from './components/Loader';
import { ACTIONS } from './reducers/reducers';

const App = () => {
  const [postData, dispatch] = useReducer(reducer, []);
  const [loginWindow, setLoginWindow] = useState(false);
  const [signUpWindow, setSignUpWindow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetchPosts().then((posts) => {
      dispatch({
        type: ACTIONS.SET_DATA,
        data: posts,
      });
      setLoading(false);
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
    <Router>
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

      {loading ? <Loader /> : null}
      <Switch>
        <Route exact path='/'>
          <Selection />

          <Post
            dispatch={dispatch}
            postData={postData}
            setSignUpWindow={setSignUpWindow}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
