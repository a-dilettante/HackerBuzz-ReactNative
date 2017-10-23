import {
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS,
  FETCH_COMMENTS_FAILURE,
  FETCH_MORE_COMMENTS_SUCCESS,
  FETCH_COMMENTS_RESET
} from './types';

import { getComment } from '../network/api';

export function fetchCommentsSuccess(id, payload) {
  return {
    type: FETCH_COMMENTS_SUCCESS,
    id,
    payload
  };
}

export function fetchMoreCommentsSuccess(id, payload) {
  return {
    type: FETCH_MORE_COMMENTS_SUCCESS,
    id,
    payload
  };
}

export function fetchCommentsFailure() {
  return {
    type: FETCH_COMMENTS_FAILURE
  };
}

export function fetchCommentsRequest() {
  return {
    type: FETCH_COMMENTS
  };
}

export function fetchCommentsReset() {
  return {
    type: FETCH_COMMENTS_RESET
  };
}

export const fetchCommentsClean = () => {
  return dispatch => dispatch(fetchCommentsReset());
};

export const fetchComments = item => {
  return dispatch => {
    dispatch(fetchCommentsRequest());
    if (item.kids && item.kids.length > 0) {
      return Promise.all(item.kids.map(getComment))
        .then(comments => dispatch(fetchCommentsSuccess(item.id, comments)))
        .catch(() => dispatch(fetchCommentsFailure()));
    } else {
      dispatch(fetchCommentsFailure());
    }
  };
};

export const fetchMoreComments = (storyId, ids) => {
  return dispatch => {
    dispatch(fetchCommentsRequest());
    if (ids && ids.length > 0) {
      return Promise.all(ids.map(getComment))
        .then(comments => dispatch(fetchMoreCommentsSuccess(storyId, comments)))
        .catch(() => dispatch(fetchCommentsFailure()));
    } else {
      dispatch(fetchMoreCommentsSuccess([]));
    }
  };
};
