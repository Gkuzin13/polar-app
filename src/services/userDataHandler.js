import { db } from "../firebase/firebase";

export const getUserData = async (currentUserUid) => {
  try {
    const data = await db
      .ref(`users/${currentUserUid}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        }

        return;
      });

    return {
      userSavedPosts: Object.keys(data?.savedPosts ? data.savedPosts : []),
      userVotedPosts: Object.values(data?.votedPosts ? data.votedPosts : []),
      userPosts: data?.userPosts ? data.userPosts : [],
    };
  } catch (err) {
    console.log(err);
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

export const updateUserPosts = async (postId, currentUserUid) => {
  try {
    await db.ref(`users/${currentUserUid}/userPosts`).set(postId);
  } catch (err) {
    console.log(err);
  }
};
