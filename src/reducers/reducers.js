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
          return { ...post, postVotes: post.postVotes + 1, votedByUser: true };
        }

        return post;
      });

    case ACTIONS.DOWNVOTE_POST:
      return data.map((post) => {
        if (post.postId === action.payload.id) {
          return { ...post, postVotes: post.postVotes - 1, votedByUser: true };
        }

        return post;
      });

    default:
      return data;
  }
}
