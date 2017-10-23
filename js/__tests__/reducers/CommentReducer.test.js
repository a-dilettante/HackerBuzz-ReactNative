import CommentReducer from '../../reducers/CommentReducer';
import * as types from '../../actions/types';

import { expect } from 'chai';

const INITIAL_STATE = {
  isFetching: false,
  hasErrored: false,
  comments: [],
  byStoryId: [],
  byStoryHash: {}
};

const FETCH_LOADING_STATE = {
  isFetching: true,
  hasErrored: false,
  comments: [],
  byStoryId: [],
  byStoryHash: {}
};

const firstComment = {
  '1': {
    id: 1,
    author: 'some dude',
    text: 'this rocks!'
  }
};

const secondComment = {
  '2': {
    id: 2,
    author: 'some other dude',
    text: 'wow!'
  }
};

const thirdComment = {
  '4': {
    id: 4,
    author: 'another dude',
    text: 'amazing!'
  }
};

const FETCH_COMMENTS_SUCCESS_STATE = {
  isFetching: false,
  hasErrored: false,
  comments: [firstComment, secondComment],
  byStoryId: [3],
  byStoryHash: {
    '3': [firstComment, secondComment]
  }
};

const FETCH_MORE_COMMENTS_SUCCESS_STATE = {
  isFetching: false,
  hasErrored: false,
  comments: [firstComment, secondComment, thirdComment],
  byStoryId: [3],
  byStoryHash: {
    '3': [firstComment, secondComment, thirdComment]
  }
};

const FETCH_COMMENTS_FAILURE_STATE = {
  isFetching: false,
  hasErrored: true,
  comments: [],
  byStoryId: [],
  byStoryHash: {}
};

const FETCH_COMMENTS_RESET_STATE = {
  isFetching: false,
  hasErrored: false,
  comments: [],
  byStoryId: [3],
  byStoryHash: {
    '3': [firstComment, secondComment]
  }
};

describe('Comment Reducer', () => {
  it('should return the initial state', () => {
    expect(CommentReducer(undefined, {})).to.eql(INITIAL_STATE);
  });

  it('should handle FETCH_COMMENTS', () => {
    expect(
      CommentReducer(INITIAL_STATE, {
        type: types.FETCH_COMMENTS,
        isFetching: true
      })
    ).to.eql(FETCH_LOADING_STATE);
  });

  it('should handle FETCH_COMMENTS_SUCCESS', () => {
    expect(
      CommentReducer(INITIAL_STATE, {
        type: types.FETCH_COMMENTS_SUCCESS,
        id: 3,
        payload: [firstComment, secondComment]
      })
    ).to.eql(FETCH_COMMENTS_SUCCESS_STATE);
  });

  it('should handle distinct FETCH_COMMENTS_SUCCESS', () => {
    expect(
      CommentReducer(FETCH_COMMENTS_SUCCESS_STATE, {
        type: types.FETCH_COMMENTS_SUCCESS,
        id: 3,
        payload: [firstComment, secondComment]
      })
    ).to.eql(FETCH_COMMENTS_SUCCESS_STATE);
  });

  it('should handle distinct FETCH_MORE_COMMENTS_SUCCESS', () => {
    expect(
      CommentReducer(FETCH_COMMENTS_SUCCESS_STATE, {
        type: types.FETCH_MORE_COMMENTS_SUCCESS,
        id: 3,
        payload: [thirdComment]
      })
    ).to.eql(FETCH_MORE_COMMENTS_SUCCESS_STATE);
  });

  it('should handle distinct FETCH_COMMENTS_FAILURE', () => {
    expect(
      CommentReducer(FETCH_LOADING_STATE, {
        type: types.FETCH_COMMENTS_FAILURE
      })
    ).to.eql(FETCH_COMMENTS_FAILURE_STATE);
  });

  it('should handle distinct FETCH_COMMENTS_RESET', () => {
    expect(
      CommentReducer(FETCH_COMMENTS_SUCCESS_STATE, {
        type: types.FETCH_COMMENTS_RESET
      })
    ).to.eql(FETCH_COMMENTS_RESET_STATE);
  });
});
