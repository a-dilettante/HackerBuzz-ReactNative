import {
  NewListReducer,
  TopListReducer,
  BestListReducer,
  AskListReducer,
  ShowListReducer,
  JobListReducer
} from '../../reducers/StoryListReducers';
import * as types from '../../actions/types';

import { expect } from 'chai';

const mockStoryIds = [1, 2, 3];
const mockRefreshStoryIds = [1, 2, 3, 4, 5];

const wrongReducerMockStories = [
  {
    id: 10,
    by: 'author4',
    text: 'text4',
    descendants: 3,
    kids: [14, 25, 36],
    score: 2,
    time: 'now',
    title: 'title4',
    type: 'story',
    url: 'url4',
    category: 'newstories'
  }
];

const mockStories = [
  {
    id: 1,
    by: 'author1',
    text: 'text1',
    descendants: 3,
    kids: [4, 5, 6],
    score: 2,
    time: 'now',
    title: 'title1',
    type: 'story',
    url: 'url1',
    category: 'newstories'
  },
  {
    id: 2,
    by: 'author2',
    text: 'text2',
    descendants: 2,
    kids: [7, 8],
    score: 2,
    time: 'now',
    title: 'title2',
    type: 'story',
    url: 'url2',
    category: 'newstories'
  },
  {
    id: 3,
    by: 'author3',
    text: 'text3',
    descendants: 1,
    kids: [9],
    score: 2,
    time: 'now',
    title: 'title3',
    type: 'story',
    url: 'url3',
    category: 'newstories'
  }
];

const mockAd = {
  ad: 'ad',
  id: '123abc'
};

const INITIAL_STATE = {
  isLoading: false,
  refreshing: false,
  hasErrored: false,
  ids: [],
  stories: []
};

const FETCH_STORIES_STATE = {
  isLoading: true,
  refreshing: false,
  hasErrored: false,
  ids: [],
  stories: []
};

const FETCH_STORIES_SUCCESS_STATE = {
  isLoading: false,
  refreshing: false,
  hasErrored: false,
  ids: mockStoryIds,
  stories: []
};

const FETCH_MORE_STORIES_SUCCESS_STATE = {
  isLoading: false,
  refreshing: false,
  hasErrored: false,
  ids: mockStoryIds,
  stories: [...mockStories, mockAd]
};

const FETCH_MORE_STORIES_SUCCESS_STATE_WITHOUT_AD = {
  isLoading: false,
  refreshing: false,
  hasErrored: false,
  ids: mockStoryIds,
  stories: mockStories
};

const FETCH_MORE_STORIES_FAILURE = {
  isLoading: false,
  refreshing: false,
  hasErrored: true,
  ids: [],
  stories: []
};

const REFRESH_STORIES_STATE = {
  isLoading: false,
  refreshing: true,
  hasErrored: false,
  ids: mockStoryIds,
  stories: [...mockStories, mockAd]
};

const REFRESH_STORIES_SUCCESS_STATE = {
  isLoading: false,
  refreshing: false,
  hasErrored: false,
  ids: mockRefreshStoryIds,
  stories: []
};

const REFRESH_STORIES_FAILURE_STATE = {
  isLoading: false,
  refreshing: false,
  hasErrored: false,
  ids: mockStoryIds,
  stories: [...mockStories, mockAd]
};

describe('Comment Reducer', () => {
  it('should return the initial state', () => {
    expect(NewListReducer(undefined, {})).to.eql(INITIAL_STATE);
    expect(TopListReducer(undefined, {})).to.eql(INITIAL_STATE);
    expect(BestListReducer(undefined, {})).to.eql(INITIAL_STATE);
    expect(AskListReducer(undefined, {})).to.eql(INITIAL_STATE);
    expect(ShowListReducer(undefined, {})).to.eql(INITIAL_STATE);
    expect(JobListReducer(undefined, {})).to.eql(INITIAL_STATE);
  });

  it('should handle FETCH_STORIES', () => {
    expect(
      NewListReducer(INITIAL_STATE, {
        type: types.FETCH_STORIES
      })
    ).to.eql(FETCH_STORIES_STATE);
  });

  it('should handle FETCH_STORIES_SUCCESS', () => {
    expect(
      NewListReducer(FETCH_STORIES_STATE, {
        type: types.FETCH_STORIES_SUCCESS,
        category: 'newstories',
        payload: mockStoryIds
      })
    ).to.eql(FETCH_STORIES_SUCCESS_STATE);
  });

  it('should handle FETCH_STORIES_SUCCESS into appropriate reducer', () => {
    expect(
      NewListReducer(FETCH_STORIES_SUCCESS_STATE, {
        type: types.FETCH_STORIES_SUCCESS,
        category: 'beststories',
        payload: [4, 5, 6]
      })
    ).to.eql(FETCH_STORIES_SUCCESS_STATE);
  });

  it('should handle FETCH_STORIES_FAILURE', () => {
    expect(
      NewListReducer(FETCH_STORIES_STATE, {
        type: types.FETCH_STORIES_FAILURE
      })
    ).to.eql(FETCH_MORE_STORIES_FAILURE);
  });

  it('should handle FETCH_MORE_STORIES_SUCCESS', () => {
    const state = NewListReducer(FETCH_STORIES_SUCCESS_STATE, {
      type: types.FETCH_MORE_STORIES_SUCCESS,
      payload: mockStories,
      category: 'newstories'
    });

    state.stories.pop();

    expect(state).to.eql(FETCH_MORE_STORIES_SUCCESS_STATE_WITHOUT_AD);
  });

  it('should handle FETCH_MORE_STORIES_SUCCESS into appropriate reducer', () => {
    expect(
      NewListReducer(FETCH_MORE_STORIES_SUCCESS_STATE, {
        type: types.FETCH_MORE_STORIES_SUCCESS,
        payload: wrongReducerMockStories,
        category: 'beststories'
      })
    ).to.equal(FETCH_MORE_STORIES_SUCCESS_STATE);
  });

  it('should handle REFRESH_STORIES', () => {
    expect(
      NewListReducer(FETCH_MORE_STORIES_SUCCESS_STATE, {
        type: types.REFRESH_STORIES
      })
    ).to.eql(REFRESH_STORIES_STATE);
  });

  it('should handle REFRESH_STORIES_SUCCESS', () => {
    expect(
      NewListReducer(REFRESH_STORIES_STATE, {
        type: types.REFRESH_STORIES_SUCCESS,
        payload: mockRefreshStoryIds,
        category: 'newstories'
      })
    ).to.eql(REFRESH_STORIES_SUCCESS_STATE);
  });

  it('should handle REFRESH_STORIES_FAILURE', () => {
    expect(
      NewListReducer(REFRESH_STORIES_STATE, {
        type: types.REFRESH_STORIES_FAILURE
      })
    ).to.eql(REFRESH_STORIES_FAILURE_STATE);
  });
});
