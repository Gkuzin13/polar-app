import { useEffect, useState } from "react";
import { fetchPosts } from "../../services/postHandler";
import { ACTIONS } from "../../reducers/reducers";
import { getUserData } from "../../services/userDataHandler";
import PostSorter from "../../components/PostSorter/PostSorter";
import Post from "../../components/Post/Post";
import GroupSelect from "../../components/GroupSelect/GroupSelect";
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
  currentUser,
}) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    let isMounted = true;

    manageLoader(true);

    fetchPosts().then((posts) => {
      if (isMounted) {
        dispatch({
          type: ACTIONS.SORT_POST_BY_NEW,
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
      <GroupSelect
        currentUser={currentUser}
        dispatch={dispatch}
        windowSize={windowSize}
        manageLoader={manageLoader}
      />

      <div className="home-posts-ctn">
        <PostSorter dispatch={dispatch} manageLoader={manageLoader} />
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
    </div>
  );
};

export default Home;
