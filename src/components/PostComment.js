import { useEffect, useState } from 'react';

const PostComment = ({ postData }) => {
  const [comments, setComments] = useState([]);

  const getPostComments = () => {
    for (const key of postData) {
      return Object.values(key.postComments);
    }
  };

  useEffect(() => {
    setComments(() => getPostComments());
  }, [getPostComments]);

  console.log(comments);

  return (
    <div>
      {comments.map((comment) => {
        return (
          <div>
            <div>
              <span>{comment.commentOwnerName}</span>
              <span>18 days ago</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostComment;
