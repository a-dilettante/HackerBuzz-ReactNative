import {
  FETCH_STORIES,
  FETCH_STORIES_SUCCESS,
  FETCH_STORIES_FAILURE,
  FETCH_MORE_STORIES_SUCCESS,
  REFRESH_STORIES,
  REFRESH_STORIES_SUCCESS,
  REFRESH_STORIES_FAILURE
} from '../actions/types';

import { filterAdditionalStories, setIds, storyTypes } from './helpers';

const initialState = {
  isLoading: false,
  refreshing: false,
  hasErrored: false,
  ids: [],
  stories: []
};

const createReducer = category => {
  return (state = initialState, action) => {
    switch (action.type) {
      case FETCH_STORIES:
        return { ...state, isLoading: true, hasErrored: false };
      case FETCH_STORIES_SUCCESS:
        return setIds(state, action.payload, action.category, category);
      case FETCH_STORIES_FAILURE:
        return { ...state, isLoading: false, hasErrored: true };
      case FETCH_MORE_STORIES_SUCCESS:
        return filterAdditionalStories(
          state,
          action.payload,
          action.category,
          category
        );
      case REFRESH_STORIES:
        return { ...state, refreshing: true };
      case REFRESH_STORIES_SUCCESS:
        return setIds(state, action.payload, action.category, category);
      case REFRESH_STORIES_FAILURE:
        return { ...state, refreshing: false };
      default:
        return state;
    }
  };
};

export const NewListReducer = createReducer(storyTypes.newStories);
export const TopListReducer = createReducer(storyTypes.topStories);
export const BestListReducer = createReducer(storyTypes.bestStories);
export const AskListReducer = createReducer(storyTypes.askStories);
export const ShowListReducer = createReducer(storyTypes.showStories);
export const JobListReducer = createReducer(storyTypes.jobStories);
