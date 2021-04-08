export const ACTIONS = {
  UPVOTE_POST: 'upvote',
  DOWNVOTE_POST: 'downvote',
};

export function reducer(data, action) {
  switch (action.type) {
    case ACTIONS.UPVOTE_POST:
      return data.map((post) => {
        if (post.postId === action.payload.id) {
          return { ...post, postVotes: post.postVotes + 1 };
        }

        return post;
      });
    case ACTIONS.DOWNVOTE_POST:
      return data.map((post) => {
        if (post.postId === action.payload.id) {
          return { ...post, postVotes: post.postVotes - 1 };
        }

        return post;
      });

    default:
      return data;
  }
}
