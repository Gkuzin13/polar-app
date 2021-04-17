import { db } from '../firebase/firebase';
import { v4 as uuid } from 'uuid';

export const pushCommentToDb = async (currentUser, content, postData) => {
  try {
    const newCommentId = uuid();

    await db.ref(`posts/${postData.postId}/postComments/${newCommentId}`).set({
      commentOwnerUid: currentUser.uid,
      commentOwnerName: currentUser.displayName,
      content: content,
      commentId: newCommentId,
      commentDate: Date.now(),
    });
  } catch (err) {
    console.log(err);
  }
};
