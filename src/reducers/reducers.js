import { db } from '../firebase/firebase';

export const ACTIONS = {
  SET_DATA: 'setdata',
  UPVOTE_POST: 'upvote',
  DOWNVOTE_POST: 'downvote',
  SAVE_POST: 'savepost',
};

export function reducer(data, action) {
  switch (action.type) {
    case ACTIONS.SET_DATA:
      return action.data;

    case ACTIONS.UPVOTE_POST:
      return data.map((post) => {
        if (post.postId === action.payload.id) {
          const postCopy = {
            ...post,
            postVotes: post.postVotes + 1,
            votedByUser: true,
          };

          const updateDb = async () => {
            try {
              await db.ref(`posts/${post.postId}`).set(postCopy);
            } catch (err) {
              alert(err);
            }
          };

          updateDb();

          return { ...post, postVotes: post.postVotes + 1, votedByUser: true };
        }

        return post;
      });

    case ACTIONS.DOWNVOTE_POST:
      return data.map((post) => {
        if (post.postId === action.payload.id) {
          const postCopy = {
            ...post,
            postVotes: post.postVotes - 1,
            votedByUser: true,
          };

          const updateDb = async () => {
            try {
              await db.ref(`posts/${post.postId}`).set(postCopy);
            } catch (err) {
              alert(err);
            }
          };

          updateDb();

          return { ...post, postVotes: post.postVotes - 1, votedByUser: true };
        }

        return post;
      });

    case ACTIONS.SAVE_POST:
      return data.map((post) => {
        if (post.postId === action.payload.id) {
          const updateDb = async () => {
            try {
              await db
                .ref(`users/${action.payload.user}/savedPosts/`)
                .push(post.postId);
            } catch (err) {
              alert(err);
            }
          };

          updateDb();

          return post;
        }

        return post;
      });

    default:
      return data;
  }
}
