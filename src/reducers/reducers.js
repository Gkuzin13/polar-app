export const ACTIONS = {
  SET_DATA: 'setdata',
  SORT_POST_BY_NEW: 'sort-post-by-new',
  SORT_POST_BY_TOP: 'sort-post-by-top',
  UPVOTE_POST: 'upvote',
  DOWNVOTE_POST: 'downvote',
  UPVOTE_FROM_DOWNVOTE: 'upvote-from-downvote',
  DOWNVOTE_FROM_UPVOTE: 'downvote-from-upvote',
  SAVE_POST: 'savepost',
};

export function reducer(data, action) {
  switch (action.type) {
    case ACTIONS.SET_DATA:
      return action.data;

    case ACTIONS.SORT_POST_BY_NEW:
      return action.data.sort((a, b) => {
        return b.postDate - a.postDate;
      });

    case ACTIONS.SORT_POST_BY_TOP:
      return action.data.sort((a, b) => {
        return b.postVotes - a.postVotes;
      });

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

    case ACTIONS.DOWNVOTE_FROM_UPVOTE:
      return data.map((post) => {
        if (post.postId === action.payload.id) {
          return { ...post, postVotes: post.postVotes - 2 };
        }

        return post;
      });

    case ACTIONS.UPVOTE_FROM_DOWNVOTE:
      return data.map((post) => {
        if (post.postId === action.payload.id) {
          return { ...post, postVotes: post.postVotes + 2 };
        }

        return post;
      });

    default:
      return data;
  }
}
