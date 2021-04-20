import { db } from "../firebase/firebase";

export const getUserData = async (currentUserUid) => {
  try {
    const userVotedPosts = await db
      .ref(`users/${currentUserUid}/votedPosts`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          return Object.values(snapshot.val());
        }
        return [];
      });

    const userSavedPosts = await db
      .ref(`users/${currentUserUid}/savedPosts`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          return Object.keys(snapshot.val());
        }
        return [];
      });

    return {
      userSavedPosts: userSavedPosts,
      userVotedPosts: userVotedPosts,
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
