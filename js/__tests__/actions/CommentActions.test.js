import {
  fetchComments,
  fetchMoreComments,
  fetchCommentsClean
} from '../../actions/CommentActions';
import { mockStory, mockCommentsResponse, mockMoreResponse } from '../../__mocks__/CommentActions';
import * as types from '../../actions/types';

import { expect } from 'chai';
import nock from 'nock';

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import { API_ENDOINT } from '../../network/config';

describe('API Comment Actions', () => {
  let store;

  beforeEach(() => store = mockStore({}));

  afterEach(() => nock.cleanAll());

  it('should dispatch FETCH_COMMENTS_SUCCESS when fetching comments has been done', () => {

    nock(API_ENDOINT).get('/item/15526919.json').reply(200, mockCommentsResponse);

    const expectedActions = [
      { type: types.FETCH_COMMENTS },
      {
        type: types.FETCH_COMMENTS_SUCCESS,
        id: mockStory.id,
        payload: [mockCommentsResponse]
      }
    ];

    const actions = store.getActions();

    return store
      .dispatch(fetchComments(mockStory))
      .then(() => expect(actions).to.eql(expectedActions));
  });

  it('should dispatch FETCH_MORE_COMMENTS_SUCCESS when fetching more comments has been done', () => {


    nock(API_ENDOINT).get('/item/15526987.json').reply(200, mockMoreResponse);

    const expectedActions = [
      { type: types.FETCH_COMMENTS },
      {
        type: types.FETCH_MORE_COMMENTS_SUCCESS,
        id: 15526956,
        payload: [mockMoreResponse]
      }
    ];

    const actions = store.getActions();

    return store
      .dispatch(fetchMoreComments(mockMoreResponse.parent, [mockMoreResponse.id]))
      .then(() => expect(actions).to.eql(expectedActions));
  });

  it('should dispatch FETCH_COMMENTS_FAILURE when fetching has failed', () => {

    nock(API_ENDOINT).get('/item/15526919.json').reply(404);

    const expectedActions = [
      { type: types.FETCH_COMMENTS },
      { type: types.FETCH_COMMENTS_FAILURE }
    ];

    const actions = store.getActions();

    return store
      .dispatch(fetchComments(mockStory))
      .then(() => expect(actions).to.eql(expectedActions));
  });

  it('should dispatch FETCH_COMMENTS_RESET when cleaning comments cache', () => {
    store.dispatch(fetchCommentsClean());

    const actions = store.getActions();
    const expectedActions = [{ type: types.FETCH_COMMENTS_RESET }];

    expect(actions).to.eql(expectedActions);
  });
});
