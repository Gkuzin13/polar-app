import { useEffect, useState } from "react";
import { fetchPosts } from "../services/postHandler";
import { ACTIONS } from "../reducers/reducers";
import { getUserData } from "../services/userDataHandler";
import Post from "../components/Post";
import HomeActions from "../components/HomeActions";
import Loader from "../components/Loader";

const Home = ({
  setSignUpWindow,
  dispatch,
  postData,
  currentUser,
  manageLoader,
  loading,
}) => {
  const [userData, setUserData] = useState([]);

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

    getUserData(currentUser?.uid).then((data) => {
      setUserData(() => data);
    });

    return () => {
      isMounted = false;

      dispatch({
        type: ACTIONS.SET_DATA,
        data: [],
      });
    };
  }, [dispatch, manageLoader, currentUser]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <HomeActions postData={postData} dispatch={dispatch} />

      <Post
        currentUser={currentUser}
        dispatch={dispatch}
        postData={postData}
        userData={userData}
        setSignUpWindow={setSignUpWindow}
      />
    </div>
  );
};

export default Home;
