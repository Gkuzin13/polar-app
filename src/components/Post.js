import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Auth';
import { ArrowUpIcon } from '@heroicons/react/solid';
import { ArrowDownIcon } from '@heroicons/react/solid';
import { ChatAltIcon } from '@heroicons/react/solid';
import { UserCircleIcon } from '@heroicons/react/solid';
import { BookmarkIcon } from '@heroicons/react/solid';
import { ACTIONS } from '../reducers/reducers';
import { db } from '../firebase/firebase';

const Post = ({ dispatch, postData }) => {
  const [votedPosts, setVotedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getUserVotedPosts = async () => {
      try {
        await db
          .ref(`users/${currentUser.uid}/votedPosts`)
          .on('value', (snapshot) => {
            if (!snapshot.val()) {
              return;
            }
            setVotedPosts(Object.values(snapshot.val()));
          });
      } catch (err) {
        console.log(err);
      }
    };

    if (currentUser) {
      getUserVotedPosts();
    }
  }, [currentUser]);

  useEffect(() => {
    const getUserSavedPosts = async () => {
      try {
        await db
          .ref(`users/${currentUser.uid}/savedPosts`)
          .on('value', (snapshot) => {
            if (!snapshot.val()) {
              return;
            }
            setSavedPosts(Object.keys(snapshot.val()));
          });
      } catch (err) {
        console.log(err);
      }
    };

    if (currentUser) {
      getUserSavedPosts();
    }
  }, [currentUser]);

  const votePost = async (action, thisPost, postVoteData) => {
    if (!currentUser) {
      return;
    }

    if (typeof postVoteData === 'undefined') {
      postVoteData = {
        upVoted: false,
        downVoted: false,
        postId: thisPost.postId,
      };
    }

    try {
      if (action === ACTIONS.UPVOTE_POST) {
        const updatedVote = {
          ...postVoteData,
          upVoted: !postVoteData.upVoted,
          downVoted: false,
        };

        await db
          .ref(`users/${currentUser.uid}/votedPosts`)
          .child(thisPost.postId)
          .update(updatedVote);

        await db
          .ref(`posts/${thisPost.postId}`)
          .child('postVotes')
          .transaction((votes) => {
            if (postVoteData.upVoted) {
              return votes - 1;
            }

            return votes + 1;
          });

        if (postVoteData.upVoted) {
          dispatch({
            type: ACTIONS.DOWNVOTE_POST,
            payload: { id: thisPost.postId, user: currentUser.uid },
          });
        } else {
          dispatch({
            type: ACTIONS.UPVOTE_POST,
            payload: { id: thisPost.postId, user: currentUser.uid },
          });
        }
      }

      if (action === ACTIONS.DOWNVOTE_POST) {
        const updatedVote = {
          ...postVoteData,
          upVoted: false,
          downVoted: !postVoteData.downVoted,
        };

        console.log(postVoteData);

        await db
          .ref(`users/${currentUser.uid}/votedPosts`)
          .child(thisPost.postId)
          .update(updatedVote);

        await db
          .ref(`posts/${thisPost.postId}`)
          .child('postVotes')
          .transaction((votes) => {
            if (postVoteData.downVoted) {
              console.log(postVoteData);
              return votes + 1;
            }

            console.log(postVoteData);

            return votes - 1;
          });

        if (postVoteData.downVoted) {
          dispatch({
            type: ACTIONS.UPVOTE_POST,
            payload: { id: thisPost.postId, user: currentUser.uid },
          });
        } else {
          dispatch({
            type: ACTIONS.DOWNVOTE_POST,
            payload: { id: thisPost.postId, user: currentUser.uid },
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const savePost = async (thisPost, thisPostId) => {
    if (!currentUser) {
      return;
    }

    const savedPostsCopy = [...savedPosts];

    try {
      if (!thisPost) {
        await db
          .ref(`users/${currentUser.uid}/savedPosts/${thisPostId}`)
          .set(true);

        setSavedPosts((prev) => [...prev, thisPostId]);
      }

      if (thisPost) {
        await db
          .ref(`users/${currentUser.uid}/savedPosts`)
          .child(thisPost)
          .remove();

        const newSavedPosts = [...savedPostsCopy].filter(
          (post) => post !== thisPost
        );

        setSavedPosts(newSavedPosts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {[...postData].map((post, i) => {
        const userVoteData = () => {
          if (!votedPosts && !currentUser) {
            return;
          }

          return votedPosts.find((posts) => posts.postId === post.postId);
        };

        const userSavedPosts = () => {
          if (!savedPosts && !currentUser) {
            return;
          }

          return savedPosts.find((posts) => posts === post.postId);
        };

        return (
          <div
            key={i}
            className='flex justify-center flex-col cursor-pointer 
            border-solid border-2 hover:border-gray-300 mb-3 mt-3'
          >
            {/* Post Main Info */}
            <div className='flex items-center justify-start p-1 '>
              <UserCircleIcon className='h-5 w-5  cursor-pointer' />
              <span className='pr-2 pl-2 font-bold hover:underline '>
                {post.postSubGroup}
              </span>
              <div className='text-sm text-gray-500'>
                <span>Posted by </span>
                <span className='hover:underline font-semibold'>
                  {post.postOwner}
                </span>
                <span> {post.postDate} Hours ago</span>
              </div>
            </div>

            {/* Post Content */}
            <div
              className='flex flex-col w-full text-left p-2 
            border-solid border-t-2 border-b-2'
            >
              {post.postContent}
            </div>

            {/* Post Actions */}
            <div
              className='text-gray-600 flex justify-between w-1/2
               items-center p-1 pl-2 '
            >
              <div className='flex items-center w-full '>
                <ArrowUpIcon
                  className={`h-4 w-5 ${
                    userVoteData()?.upVoted ? 'text-red-500' : null
                  }  transition-colors hover:text-red-400 `}
                  onClick={() =>
                    votePost(ACTIONS.UPVOTE_POST, post, userVoteData())
                  }
                />
                <span className='pl-1 pr-1'>{post.postVotes}</span>
                <ArrowDownIcon
                  className={`h-4 w-4 ${
                    userVoteData()?.downVoted ? 'text-blue-500' : null
                  }  transition-colors`}
                  onClick={() =>
                    votePost(ACTIONS.DOWNVOTE_POST, post, userVoteData())
                  }
                />
              </div>
              <div
                className='mx-10 text-black-500 flex 
                justify-center items-center 
               hover:text-blue-600 transition-colors '
              >
                <ChatAltIcon className='h-5 w-5' />
                <span className='px-1'>{post.comments} </span>
                <span>Comments</span>
              </div>
              <div
                onClick={() => savePost(userSavedPosts(), post.postId)}
                className={`flex justify-evenly items-center 
              hover:text-green-600 transition-colors ${
                userSavedPosts() ? 'text-green-700' : null
              }`}
              >
                <BookmarkIcon className='h-5 w-5 ' />
                <span>Save</span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Post;
