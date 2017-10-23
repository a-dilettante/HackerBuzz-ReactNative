import { favoriteStory, unfavoriteStory } from '../../actions/FavoriteActions';
import * as types from '../../actions/types';

import { expect } from 'chai';

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Story Favorite Actions', () => {
  let store;
  beforeEach(() => store = mockStore({}));

  it('should dispatch FAVORITE_STORY when a story has been favorited', () => {
    const story = {
      id: 15526859,
      by: 'joeyespo',
      descendants: 1,
      kids: [15526919],
      score: 2,
      time: 1508680744,
      title: 'Rolling back \'net neutrality\' is essential to the free internet\'s future',
      type: 'story',
      url: 'http://thehill.com/opinion/technology/356420-rolling-back-net-neutrality-is-essential-to-the-free-internets-future',
      category: 'newstories'
    };

    store.dispatch(favoriteStory(story));

    const actions = store.getActions();
    const expectedActions = [
      { type: types.FAVORITE_STORY, id: 15526859, payload: story }
    ];

    expect(actions).to.eql(expectedActions);
  });

  it('should dispatch UNFAVORITE_STORY when a story has been unfavorited', () => {
    store.dispatch(unfavoriteStory(15526859));

    const actions = store.getActions();
    const expectedActions = [{ type: types.UNFAVORITE_STORY, id: 15526859 }];

    expect(actions).to.eql(expectedActions);
  });
});
