import { useEffect, useState } from 'react';
import ReactTimeAgo from 'react-time-ago';
import { updateUpVote, updateDownVote } from '../../services/postHandler';
import { updateSavedPosts } from '../../services/userDataHandler';
import { ACTIONS } from '../../reducers/reducers';
import { ArrowUpIcon } from '@heroicons/react/solid';
import { ArrowDownIcon } from '@heroicons/react/solid';
import { ChatAltIcon } from '@heroicons/react/solid';
import { BookmarkIcon } from '@heroicons/react/solid';
import { ExternalLinkIcon } from '@heroicons/react/solid';
import './Post.css';

const Post = ({ dispatch, post, manageLoginWindow, currentUser, userData }) => {
  const [votedPosts, setVotedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);

  const userVoteData = votedPosts.find((posts) => posts.postId === post.postId);
  const userSavedPosts = savedPosts.find((posts) => posts === post.postId);

  useEffect(() => {
    if (currentUser) {
      setSavedPosts(userData.userSavedPosts);
      setVotedPosts(userData.userVotedPosts);
    }
    return () => {
      setSavedPosts([]);
      setVotedPosts([]);
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

    if (postVoteData === undefined) {
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
    if (postVoteData === undefined) {
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
    <div className='post-ctn'>
      <div className='post-inner-ctn'>
        {/* Post Main Info */}
        <a
          aria-label={`Show comments for this post, with the title ${post.postTitle}. Created by ${post.postOwner} `}
          href={`/g/${post.postSubGroup}/${post.postId}`}>
          <div className='post-info-ctn'>
            <span className='post-info-group'>{`g/${post.postSubGroup}`}</span>
            <div className='op-info'>
              <span>
                Posted by <strong>{post.postOwner}</strong>
              </span>
              <div className='post-date'>
                <ReactTimeAgo date={post.postDate} />
              </div>
            </div>
          </div>
        </a>
        {/* Post Content */}
        <div className='post-content-ctn'>
          <a
            aria-label={`Show comments for this post, 
                with the title ${post.postTitle}. Created by ${post.postOwner} `}
            href={`/g/${post.postSubGroup}/${post.postId}`}>
            <h1 className='post-title'>{post.postTitle}</h1>
            <p>{post.postContent}</p>
          </a>
          {/* Checks if url exists */}
          {!post.postContentUrl ? null : (
            <a href={post.postContentUrl} className='post-content-url'>
              {post.postContentUrl.length > 60
                ? `${post.postContentUrl.slice(0, 60)}...`
                : post.postContentUrl}
              <ExternalLinkIcon className='url-icon' />
            </a>
          )}
        </div>
        {/* Post Actions */}
        <div className='post-actions-ctn'>
          <div className='votes-ctn'>
            <ArrowUpIcon
              style={{ color: userVoteData?.upVoted && 'rgb(251, 86, 7)' }}
              className='icon arrow-up-icon'
              onClick={() => toggleUpVote(post, userVoteData)}
            />
            <span>{post.postVotes}</span>
            <ArrowDownIcon
              style={{
                color: userVoteData?.downVoted && 'rgb(58, 134, 255)',
              }}
              className='icon arrow-down-icon'
              onClick={() => toggleDownVote(post, userVoteData)}
            />
          </div>

          <a
            aria-label={`Show comments for this post, 
                with the title ${post.postTitle}. Created by ${post.postOwner} `}
            href={`/g/${post.postSubGroup}/${post.postId}`}>
            <div className='post-comments-ctn'>
              <ChatAltIcon className='icon' />
              <span>
                {post.postComments
                  ? Object.values(post.postComments).length
                  : 0}
              </span>
              <span>Comments</span>
            </div>
          </a>

          {currentUser && (
            <div
              style={userSavedPosts && { color: 'rgb(44, 125, 102)' }}
              onClick={() => toggleSavePost(userSavedPosts, post.postId)}
              className='post-save-ctn'>
              <BookmarkIcon className='icon' />
              <span>Save</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
