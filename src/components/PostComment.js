import "./postComment.css";

const PostComment = ({ currentPost }) => {
  return (
    <div>
      {currentPost.map((data, i) => {
        if (!data.postComments) {
          return <div key={i}>Pretty empty here...</div>;
        }
        const comments = Object.values(data.postComments);

        return comments.map((comment, i) => {
          return (
            <div className="post-comment-ctn" key={i}>
              <div>
                <span className="comment-owner">
                  {comment.commentOwnerName}
                </span>
                <span className="comment-date"> 18 hours ago</span>
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
