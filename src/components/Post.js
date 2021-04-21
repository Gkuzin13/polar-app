import { useEffect, useState } from "react";
import { updateUpVote, updateDownVote } from "../services/postHandler";
import { updateSavedPosts } from "../services/userDataHandler";
import { ArrowUpIcon } from "@heroicons/react/solid";
import { ArrowDownIcon } from "@heroicons/react/solid";
import { ChatAltIcon } from "@heroicons/react/solid";
import { UserCircleIcon } from "@heroicons/react/solid";
import { BookmarkIcon } from "@heroicons/react/solid";
import { ACTIONS } from "../reducers/reducers";
import { Link } from "react-router-dom";
import "./Post.css";

const Post = ({
  dispatch,
  postData,
  setSignUpWindow,
  currentUser,
  userData,
}) => {
  const [votedPosts, setVotedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    setSavedPosts(() => userData.userSavedPosts);
    setVotedPosts(() => userData.userVotedPosts);

    return () => {
      setSavedPosts(() => []);
      setVotedPosts(() => []);
    };
  }, [userData]);

  const toggleSavePost = (thisPost, postId) => {
    if (!currentUser) {
      setSignUpWindow(true);
      return;
    }
    if (!thisPost) {
      updateSavedPosts(thisPost, postId, currentUser.uid).then(() => {
        setSavedPosts((prev) => [...prev, postId]);
      });
    }

    if (thisPost) {
      updateSavedPosts(thisPost, postId, currentUser.uid).then(() => {
        const newSavedPosts = [...savedPosts].filter(
          (post) => post !== thisPost
        );

        setSavedPosts(() => newSavedPosts);
      });
    }
  };

  const toggleUpVote = (thisPost, postVoteData) => {
    if (!currentUser) {
      setSignUpWindow(true);
      return;
    }
    if (typeof postVoteData === "undefined") {
      postVoteData = {
        upVoted: false,
        downVoted: false,
        postId: thisPost.postId,
      };
    }

    const toggledVote = {
      ...postVoteData,
      upVoted: !postVoteData.upVoted,
      downVoted: false,
    };

    const filteredPosts = [...votedPosts].filter(
      (posts) => posts.postId !== thisPost.postId
    );

    const updatedVotedPosts = [...filteredPosts, toggledVote];

    updateUpVote(thisPost, postVoteData, currentUser.uid, toggledVote).then(
      () => {
        setVotedPosts(updatedVotedPosts);

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
    );
  };

  const toggleDownVote = (thisPost, postVoteData) => {
    if (!currentUser) {
      setSignUpWindow(true);
      return;
    }
    if (typeof postVoteData === "undefined") {
      postVoteData = {
        upVoted: false,
        downVoted: false,
        postId: thisPost.postId,
      };
    }

    const toggledVote = {
      ...postVoteData,
      upVoted: false,
      downVoted: !postVoteData.downVoted,
    };

    const filteredPosts = [...votedPosts].filter(
      (posts) => posts.postId !== thisPost.postId
    );

    const updatedVotedPosts = [...filteredPosts, toggledVote];

    updateDownVote(thisPost, postVoteData, currentUser.uid, toggledVote).then(
      () => {
        setVotedPosts(updatedVotedPosts);

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
    );
  };

  return (
    <div>
      {postData.map((post, i) => {
        const userVoteData = () => {
          if (!votedPosts) {
            return;
          }

          return votedPosts.find((posts) => posts.postId === post.postId);
        };

        const userSavedPosts = () => {
          if (!savedPosts) {
            return;
          }

          return savedPosts.find((posts) => posts === post.postId);
        };

        return (
          <div
            key={i}
            className="flex justify-center flex-col cursor-pointer 
            border-solid border-2 hover:border-gray-300 mb-3 mx-1"
          >
            {/* Post Main Info */}
            <div className="flex items-center justify-start p-1 ">
              <UserCircleIcon className="h-5 w-5  cursor-pointer" />
              <span className="pr-2 pl-2 font-bold hover:underline ">
                {`/${post.postSubGroup}`}
              </span>
              <div className="text-sm text-gray-500">
                <span>Posted by </span>
                <span className="hover:underline font-semibold">
                  {post.postOwner}
                </span>
                <span> {post.postDate} Hours ago</span>
              </div>
            </div>

            {/* Post Content */}

            <div
              className="flex flex-col w-full text-left p-2 
            border-solid border-t-2 border-b-2"
            >
              <h1 className="post-title">{post.postTitle}</h1>
              <p>{post?.postContent}</p>

              {/* Checks if url exists */}
              {!post.postContentUrl ? null : (
                <a href={post.postContentUrl} className="post-content-url">
                  {post.postContentUrl.length > 60
                    ? `${post.postContentUrl.slice(0, 60)}...`
                    : post.postContentUrl}
                </a>
              )}
            </div>

            {/* Post Actions */}
            <div
              className="text-gray-600 flex justify-between w-1/2
               items-center p-1 pl-2 "
            >
              <div className="flex items-center w-full ">
                <ArrowUpIcon
                  className={`h-4 w-5 ${
                    userVoteData()?.upVoted ? "text-red-500" : null
                  }  transition-colors hover:text-red-400 `}
                  onClick={() => toggleUpVote(post, userVoteData())}
                />
                <span className="pl-1 pr-1">{post.postVotes}</span>
                <ArrowDownIcon
                  className={`h-4 w-4 ${
                    userVoteData()?.downVoted ? "text-blue-500" : null
                  }  transition-colors hover:text-blue-400`}
                  onClick={() => toggleDownVote(post, userVoteData())}
                />
              </div>
              <Link
                to={`/g/${post.postSubGroup}/${post.postId}`}
                className="mx-10 text-black-500 flex 
                justify-center items-center 
               hover:text-blue-600 transition-colors "
              >
                <ChatAltIcon className="h-5 w-5" />
                <span className="px-1">
                  {post.postComments
                    ? Object.values(post.postComments).length
                    : 0}
                </span>
                <span>Comments</span>
              </Link>
              <div
                onClick={() => toggleSavePost(userSavedPosts(), post.postId)}
                className={`flex justify-evenly items-center 
              hover:text-green-600 transition-colors ${
                userSavedPosts() ? "text-green-700" : null
              }`}
              >
                <BookmarkIcon className="h-5 w-5 " />
                <span>Save</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Post;
