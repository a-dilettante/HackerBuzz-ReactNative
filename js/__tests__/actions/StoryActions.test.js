import {
  fetchStories,
  fetchMoreStories,
  refreshStories
} from '../../actions/StoryActions';
import * as types from '../../actions/types';

import { expect } from 'chai';
import nock from 'nock';

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import { API_ENDOINT } from '../../network/config';

describe('API Story Actions', () => {
  let store;

  beforeEach(() => store = mockStore({}));

  afterAll(() => nock.cleanAll());

  it('should dispatch FETCH_STORIES_SUCCESS when fetching stories for a category has been done', () => {
    nock(API_ENDOINT).get('/newstories.json').reply(200, [1, 2, 3]);

    const expectedActions = [
      { type: types.FETCH_STORIES },
      {
        type: types.FETCH_STORIES_SUCCESS,
        category: 'newstories',
        payload: [1, 2, 3]
      }
    ];

    const actions = store.getActions();

    return store
      .dispatch(fetchStories('newstories'))
      .then(() => expect(actions).to.eql(expectedActions));
  });

  it('should dispatch FETCH_STORIES_FAILURE when fetching stories for a category has failed', () => {
    nock(API_ENDOINT).get('/newstories.json').reply(404);

    const expectedActions = [
      { type: types.FETCH_STORIES },
      { type: types.FETCH_STORIES_FAILURE }
    ];

    const actions = store.getActions();

    return store
      .dispatch(fetchStories('newstories'))
      .then(() => expect(actions).to.eql(expectedActions));
  });

  it('should dispatch FETCH_MORE_STORIES_SUCCESS when fetching individual stories for a category has been done', () => {
    const story = {
      by: 'burgessct',
      descendants: 0,
      id: 15527605,
      score: 2,
      time: 1508690353,
      title: 'GPS Smartwatch for your Grandchild? Many are flawed',
      type: 'story',
      url: 'https://www.senioronlinesafety.com/gps-smartwatch-grandchild-many-flawed/'
    };

    nock(API_ENDOINT).get('/item/15527605.json').reply(200, story);

    const expectedActions = [
      { type: types.FETCH_STORIES },
      {
        type: types.FETCH_MORE_STORIES_SUCCESS,
        payload: [story],
        category: 'newstories'
      }
    ];

    const actions = store.getActions();

    return store
      .dispatch(fetchMoreStories([15527605], 'newstories'))
      .then(() => expect(actions).to.eql(expectedActions));
  });

  it('should dispatch FETCH_STORIES_FAILURE when fetching an individual story for a category has failed', () => {
    nock(API_ENDOINT).get('/item/15527605.json').reply(404);

    const expectedActions = [
      { type: types.FETCH_STORIES },
      { type: types.FETCH_STORIES_FAILURE }
    ];

    const actions = store.getActions();

    return store
      .dispatch(fetchMoreStories([15527605], 'newstories'))
      .then(() => expect(actions).to.eql(expectedActions));
  });

  it('should dispatch REFRESH_STORIES_SUCCESS when refreshing new stories for a category has been done', () => {
    nock(API_ENDOINT).get('/newstories.json').reply(200, [1, 2, 3]);

    const expectedActions = [
      { type: types.REFRESH_STORIES },
      {
        type: types.REFRESH_STORIES_SUCCESS,
        payload: [1, 2, 3],
        category: 'newstories'
      }
    ];

    const actions = store.getActions();

    return store
      .dispatch(refreshStories('newstories', [4, 5, 6]))
      .then(() => expect(actions).to.eql(expectedActions));
  });

  it('should dispatch REFRESH_STORIES_FAILURE when refreshing new stories for a category has failed', () => {
    nock(API_ENDOINT).get('/newstories.json').reply(200, [1, 2, 3]);

    const expectedActions = [
      { type: types.REFRESH_STORIES },
      { type: types.REFRESH_STORIES_FAILURE }
    ];

    const actions = store.getActions();

    return store
      .dispatch(refreshStories('newstories', [1, 2, 3]))
      .then(() => expect(actions).to.eql(expectedActions));
  });

  it('should dispatch FETCH_STORIES_FAILURE when refreshing new stories for a category has failed due to a network error', () => {
    nock(API_ENDOINT).get('/newstories.json').reply(404);

    const expectedActions = [
      { type: types.REFRESH_STORIES },
      { type: types.FETCH_STORIES_FAILURE }
    ];

    const actions = store.getActions();

    return store
      .dispatch(refreshStories('newstories', [1, 2, 3]))
      .then(() => expect(actions).to.eql(expectedActions));
  });
});
