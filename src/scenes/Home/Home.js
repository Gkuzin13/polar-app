import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Auth";
import { fetchPosts } from "../../services/postHandler";
import { ACTIONS } from "../../reducers/reducers";
import { getUserData } from "../../services/userDataHandler";
import Post from "../../components/Post/Post";
import HomeActions from "../../components/HomeActions/HomeActions";
import Loader from "../../components/Loader/Loader";
import app from "../../firebase/firebase";
import "./Home.css";

const Home = ({
  manageLoginWindow,
  dispatch,
  postData,
  manageLoader,
  loading,
  windowSize,
}) => {
  const [userData, setUserData] = useState([]);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;

    manageLoader(true);

    fetchPosts().then((posts) => {
      if (isMounted) {
        dispatch({
          type: ACTIONS.SET_DATA,
          data: posts,
        });

        manageLoader(() => false);
      }
    });

    app.auth().onAuthStateChanged((user) => {
      if (user) {
        getUserData(user.uid).then((data) => {
          setUserData(() => data);
        });

        return;
      }
    });

    return () => {
      isMounted = false;

      dispatch({
        type: ACTIONS.SET_DATA,
        data: [],
      });

      manageLoader(false);
    };
  }, [dispatch, manageLoader, currentUser]);

  return (
    <div className="home-main-ctn">
      <HomeActions
        currentUser={currentUser}
        dispatch={dispatch}
        windowSize={windowSize}
        manageLoader={manageLoader}
      />

      {loading ? (
        <Loader />
      ) : (
        <Post
          currentUser={currentUser}
          dispatch={dispatch}
          postData={postData}
          userData={userData}
          manageLoginWindow={manageLoginWindow}
        />
      )}
    </div>
  );
};

export default Home;