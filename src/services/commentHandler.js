import { db } from "../firebase/firebase";

export const pushCommentToDb = async (commentData, postId, newCommentId) => {
  try {
    await db
      .ref(`posts/${postId}/postComments/${newCommentId}`)
      .set(commentData);
  } catch (err) {
    console.log(err);
  }
};
