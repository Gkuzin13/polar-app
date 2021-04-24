import { db } from "../firebase/firebase";

export const fetchPosts = async () => {
  try {
    const posts = await db
      .ref("posts")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          return Object.values(snapshot.val());
        } else {
          return;
        }
      });
    return posts ? posts : [];
  } catch (err) {
    return console.log(err);
  }
};

export const fetchCurrentPost = async (postId) => {
  if (typeof postId === "undefined") {
    postId = "";
  }

  try {
    return await db
      .ref(`posts/${postId}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log("oops");
        }
      });
  } catch (err) {
    return console.log(err);
  }
};

export const pushNewPostToDb = async (post) => {
  try {
    return await db.ref(`posts/${post.postId}/`).set(post);
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
      .child("postVotes")
      .transaction((votes) => {
        if (postVoteData.downVoted) {
          return votes + 2;
        }

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
      .child("postVotes")
      .transaction((votes) => {
        if (postVoteData.upVoted) {
          return votes - 2;
        }

        if (postVoteData.downVoted) {
          return votes + 1;
        }

        return votes - 1;
      });
  } catch (err) {
    console.log(err);
  }
};
