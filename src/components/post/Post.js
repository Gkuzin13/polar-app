import { useEffect, useState } from "react";
import { updateUpVote, updateDownVote } from "../../services/postHandler";
import { updateSavedPosts } from "../../services/userDataHandler";
import { ArrowUpIcon } from "@heroicons/react/solid";
import { ArrowDownIcon } from "@heroicons/react/solid";
import { ChatAltIcon } from "@heroicons/react/solid";
import { BookmarkIcon } from "@heroicons/react/solid";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import { ACTIONS } from "../../reducers/reducers";
import "./Post.css";
import ReactTimeAgo from "react-time-ago";

const Post = ({
  dispatch,
  postData,
  manageLoginWindow,
  currentUser,
  userData,
}) => {
  const [votedPosts, setVotedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);

  const sorted = [...postData].sort((a, b) => {
    return b.postDate - a.postDate;
  });

  useEffect(() => {
    setSavedPosts(() => userData?.userSavedPosts);
    setVotedPosts(() => userData?.userVotedPosts);

    if (!currentUser) {
      setSavedPosts(() => []);
      setVotedPosts(() => []);
    }

    return () => {
      setSavedPosts(() => []);
      setVotedPosts(() => []);
    };
  }, [userData, currentUser]);

  const toggleSavePost = (thisPost, postId) => {
    if (!currentUser) {
      manageLoginWindow(true);
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
      manageLoginWindow(true);
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

    updateUpVote(thisPost, postVoteData, currentUser.uid, toggledVote);

    setVotedPosts(updatedVotedPosts);

    if (postVoteData.downVoted) {
      dispatch({
        type: ACTIONS.UPVOTE_FROM_DOWNVOTE,
        payload: { id: thisPost.postId, user: currentUser.uid },
      });

      return;
    }

    if (postVoteData.upVoted) {
      dispatch({
        type: ACTIONS.DOWNVOTE_POST,
        payload: { id: thisPost.postId, user: currentUser.uid },
      });

      return;
    }

    dispatch({
      type: ACTIONS.UPVOTE_POST,
      payload: { id: thisPost.postId, user: currentUser.uid },
    });
  };

  const toggleDownVote = (thisPost, postVoteData) => {
    if (!currentUser) {
      manageLoginWindow(true);
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

    updateDownVote(thisPost, postVoteData, currentUser.uid, toggledVote);

    setVotedPosts(updatedVotedPosts);

    if (postVoteData.upVoted) {
      dispatch({
        type: ACTIONS.DOWNVOTE_FROM_UPVOTE,
        payload: { id: thisPost.postId, user: currentUser.uid },
      });

      return;
    }

    if (postVoteData.downVoted) {
      dispatch({
        type: ACTIONS.UPVOTE_POST,
        payload: { id: thisPost.postId, user: currentUser.uid },
      });

      return;
    }

    dispatch({
      type: ACTIONS.DOWNVOTE_POST,
      payload: { id: thisPost.postId, user: currentUser.uid },
    });
  };

  return (
    <div className="post-ctn">
      {sorted.map((post, i) => {
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
          <div key={post.postId} className="post-inner-ctn">
            {/* Post Main Info */}
            <div className="post-info-ctn">
              <span className="post-info-group">{`g/${post.postSubGroup}`}</span>
              <div className="op-info">
                <span>
                  Posted by <strong>{post.postOwner}</strong>
                </span>
                <div className="post-date">
                  <ReactTimeAgo date={post.postDate} />
                </div>
              </div>
            </div>

            {/* Post Content */}

            <div className="post-content-ctn">
              <h1 className="post-title">{post.postTitle}</h1>
              <p>{post.postContent}</p>

              {/* Checks if url exists */}
              {!post.postContentUrl ? null : (
                <a href={post.postContentUrl} className="post-content-url">
                  {post.postContentUrl.length > 60
                    ? `${post.postContentUrl.slice(0, 60)}...`
                    : post.postContentUrl}
                  <ExternalLinkIcon className="icon" />
                </a>
              )}
            </div>

            {/* Post Actions */}
            <div className="post-actions-ctn">
              <div className="votes-ctn">
                <div className="icon-ctn">
                  <ArrowUpIcon
                    style={
                      userVoteData()?.upVoted
                        ? { color: "rgb(251, 86, 7)" }
                        : null
                    }
                    className="icon arrow-up-icon"
                    onClick={() => toggleUpVote(post, userVoteData())}
                  />
                </div>

                <div className="number-ctn">
                  <span>{post.postVotes}</span>
                </div>

                <div className="icon-ctn">
                  <ArrowDownIcon
                    style={
                      userVoteData()?.downVoted
                        ? { color: "rgb(58, 134, 255)" }
                        : null
                    }
                    className="icon arrow-down-icon"
                    onClick={() => toggleDownVote(post, userVoteData())}
                  />
                </div>
              </div>

              <a href={`/g/${post.postSubGroup}/${post.postId}`}>
                <div className="post-comments-ctn">
                  <div className="icon-ctn">
                    <ChatAltIcon className="icon" />
                  </div>

                  <div className="number-ctn">
                    {post.postComments
                      ? Object.values(post.postComments).length
                      : 0}
                  </div>

                  <div>
                    <span> Comments</span>
                  </div>
                </div>
              </a>

              {currentUser ? (
                <div
                  style={
                    userSavedPosts() ? { color: "rgb(26, 147, 111)" } : null
                  }
                  onClick={() => toggleSavePost(userSavedPosts(), post.postId)}
                  className="post-save-ctn"
                >
                  <div>
                    <BookmarkIcon className="icon" />
                  </div>

                  <span>Save</span>
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Post;
