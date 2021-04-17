import { db } from '../firebase/firebase';

export const fetchPosts = async () => {
  try {
    return await db
      .ref('posts')
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          return Object.values(snapshot.val());
        } else {
          console.log('oops');
        }
      });
  } catch (err) {
    return console.log(err);
  }
};

export const getUserVotedPosts = async (currentUserUid) => {
  try {
    return await db
      .ref(`users/${currentUserUid}/votedPosts`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          return Object.values(snapshot.val());
        }
        return [];
      });
  } catch (err) {
    return console.log(err);
  }
};

export const getUserSavedPosts = async (currentUserUid) => {
  try {
    return await db
      .ref(`users/${currentUserUid}/savedPosts`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          return Object.keys(snapshot.val());
        }
        return [];
      });
  } catch (err) {
    console.log(err);
  }
};

export const updateSavedPosts = async (thisPost, postId, currentUserUid) => {
  try {
    if (!thisPost) {
      await db.ref(`users/${currentUserUid}/savedPosts/${postId}`).set(true);
    }

    if (thisPost) {
      await db
        .ref(`users/${currentUserUid}/savedPosts`)
        .child(thisPost)
        .remove();
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateUpVote = async (
  thisPost,
  postVoteData,
  currentUserUid,
  toggledVote
) => {
  try {
    await db
      .ref(`users/${currentUserUid}/votedPosts`)
      .child(thisPost.postId)
      .update(toggledVote);

    await db
      .ref(`posts/${thisPost.postId}`)
      .child('postVotes')
      .transaction((votes) => {
        if (postVoteData.upVoted) {
          return votes - 1;
        }

        return votes + 1;
      });
  } catch (err) {
    console.log(err);
  }
};

export const updateDownVote = async (
  thisPost,
  postVoteData,
  currentUserUid,
  toggledVote
) => {
  try {
    await db
      .ref(`users/${currentUserUid}/votedPosts`)
      .child(thisPost.postId)
      .update(toggledVote);

    await db
      .ref(`posts/${thisPost.postId}`)
      .child('postVotes')
      .transaction((votes) => {
        if (postVoteData.downVoted) {
          return votes + 1;
        }

        return votes - 1;
      });
  } catch (err) {
    console.log(err);
  }
};
