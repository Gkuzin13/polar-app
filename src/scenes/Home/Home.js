import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../services/Auth';
import { fetchPosts } from '../../services/postHandler';
import { ACTIONS } from '../../reducers/reducers';
import { getUserData } from '../../services/userDataHandler';
import PostSorter from '../../components/PostSorter/PostSorter';
import Post from '../../components/Post/Post';
import GroupSelect from '../../components/GroupSelect/GroupSelect';
import Loader from '../../components/Loader/Loader';
import './Home.css';

const Home = ({ manageLoginWindow, dispatch, postData, windowSize }) => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      getUserData(currentUser.uid).then((data) => {
        setUserData(data);
      });
    }

    setIsLoading(true);

    fetchPosts().then((posts) => {
      dispatch({
        type: ACTIONS.SORT_POST_BY_NEW,
        data: posts,
      });
      setIsLoading(false);
    });

    return () => {
      dispatch({
        type: ACTIONS.SET_DATA,
        data: [],
      });
      setIsLoading(false);
    };
  }, [dispatch, currentUser]);

  return (
    <div className='home-main-ctn'>
      <GroupSelect
        currentUser={currentUser}
        dispatch={dispatch}
        windowSize={windowSize}
        manageLoader={setIsLoading}
      />
      <div className='home-posts-ctn'>
        <PostSorter dispatch={dispatch} manageLoader={setIsLoading} />
        <div className='posts-ctn'>
          {!isLoading ? (
            postData.map((post) => {
              return (
                <Post
                  key={post.postId}
                  currentUser={currentUser}
                  dispatch={dispatch}
                  post={post}
                  userData={userData}
                  manageLoginWindow={manageLoginWindow}
                />
              );
            })
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
