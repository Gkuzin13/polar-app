import "./postComment.css";
import ReactTimeAgo from "react-time-ago";
import { ChatAlt2Icon } from "@heroicons/react/solid";

const PostComment = ({ currentPost }) => {
  return (
    <div>
      {currentPost.map((data, i) => {
        if (!data.postComments) {
          return (
            <div key={i} className="no-comments-ctn">
              <div className="no-comments-main">
                <ChatAlt2Icon className="chat-icon" />
                <span>No Comments Yet</span>
                <span>Be the first one to share his thoughts!</span>
              </div>
            </div>
          );
        }
        const comments = Object.values(data?.postComments);

        return comments.map((comment, i) => {
          return (
            <div className="post-comment-ctn" key={i}>
              <div>
                <span className="comment-owner">
                  {comment.commentOwnerName}
                </span>
                <span className="comment-date">
                  {" "}
                  <ReactTimeAgo date={comment.commentDate} />
                </span>
              </div>
              <div className="comment-content-ctn">
                <span>{comment.content}</span>
              </div>
            </div>
          );
        });
      })}
    </div>
  );
};

export default PostComment;
