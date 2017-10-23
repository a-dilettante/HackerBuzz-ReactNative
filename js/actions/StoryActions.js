import {
  FETCH_STORIES,
  FETCH_STORIES_SUCCESS,
  FETCH_STORIES_FAILURE,
  FETCH_MORE_STORIES_SUCCESS,
  REFRESH_STORIES,
  REFRESH_STORIES_SUCCESS,
  REFRESH_STORIES_FAILURE
} from './types';

import { getItem, getStories } from '../network/api';

export function fetchStoriesSuccess(category, stories) {
  return {
    type: FETCH_STORIES_SUCCESS,
    category,
    payload: stories
  };
}

export function fetchStoriesRequest() {
  return {
    type: FETCH_STORIES
  };
}

export function fetchStoriesFailure() {
  return {
    type: FETCH_STORIES_FAILURE
  };
}

export function fetchMoreStoriesSuccess(stories, category) {
  return {
    type: FETCH_MORE_STORIES_SUCCESS,
    payload: stories,
    category
  };
}

export function refreshStoriesRequest() {
  return {
    type: REFRESH_STORIES
  };
}

export function refreshStoriesSuccess(stories, category) {
  return {
    type: REFRESH_STORIES_SUCCESS,
    payload: stories,
    category
  };
}

export function refreshStoriesFailure() {
  return {
    type: REFRESH_STORIES_FAILURE
  };
}

export function refreshStories(category, currentIds) {
  return dispatch => {
    dispatch(refreshStoriesRequest());
    return getStories(category)
      .then(stories => {
        if (JSON.stringify(stories) !== JSON.stringify(currentIds)) {
          dispatch(refreshStoriesSuccess(stories, category));
        } else {
          dispatch(refreshStoriesFailure());
        }
      })
      .catch(() => dispatch(fetchStoriesFailure()));
  };
}

export function fetchStories(category) {
  return dispatch => {
    dispatch(fetchStoriesRequest());
    return getStories(category)
      .then(stories => dispatch(fetchStoriesSuccess(category, stories)))
      .catch(() => dispatch(fetchStoriesFailure()));
  };
}

export function fetchMoreStories(ids, category) {
  return dispatch => {
    dispatch(fetchStoriesRequest());
    return Promise.all(ids.map(getItem))
      .then(stories => dispatch(fetchMoreStoriesSuccess(stories, category)))
      .catch(() => dispatch(fetchStoriesFailure()));
  };
}
