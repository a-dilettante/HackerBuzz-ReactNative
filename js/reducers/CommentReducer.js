import {
  FETCH_COMMENTS,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  FETCH_MORE_COMMENTS_SUCCESS,
  FETCH_COMMENTS_RESET
} from '../actions/types';

const INITIAL_STATE = {
  isFetching: false,
  hasErrored: false,
  comments: [],
  byStoryId: [],
  byStoryHash: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_RESET:
      return {
        ...state,
        comments: [],
        hasErrored: false
      };
    case FETCH_COMMENTS:
      return { ...state, isFetching: true };
    case FETCH_COMMENTS_SUCCESS:
      if (state.byStoryId.includes(action.id)) {
        return {
          ...state,
          isFetching: false,
          hasErrored: false
        };
      }
      return {
        ...state,
        comments: action.payload,
        byStoryId: [...state.byStoryId, action.id],
        byStoryHash: {
          ...state.byStoryHash,
          [action.id]: action.payload
        },
        isFetching: false,
        hasErrored: false
      };
    case FETCH_COMMENTS_FAILURE:
      return { ...state, comments: [], isFetching: false, hasErrored: true };
    case FETCH_MORE_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, ...action.payload],
        byStoryHash: {
          [action.id]: [...state.comments, ...action.payload]
        },
        isFetching: false,
        hasErrored: false
      };
    default:
      return state;
  }
};
