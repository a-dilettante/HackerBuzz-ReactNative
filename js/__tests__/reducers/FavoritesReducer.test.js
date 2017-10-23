import FavoritesReducer from '../../reducers/FavoritesReducer';
import * as types from '../../actions/types';

import { expect } from 'chai';

const INITIAL_STATE = {
  byId: [],
  byHash: {}
};

const ONE_FAVORITE_STATE = {
  byId: [1],
  byHash: {
    '1': {
      id: 1,
      title: 'A cool title',
      author: 'Some dude'
    }
  }
};

const TWO_FAVORITES_STATE = {
  byId: [1, 2],
  byHash: {
    '1': {
      id: 1,
      title: 'A cool title',
      author: 'Some dude'
    },
    '2': {
      id: 2,
      title: 'A second cool title',
      author: 'A second dude'
    }
  }
};

describe('Favorites Reducer', () => {
  it('should return the initial state', () => {
    expect(FavoritesReducer(undefined, {})).to.eql(INITIAL_STATE);
  });

  it('should handle FAVORITE_STORY', () => {
    expect(
      FavoritesReducer(INITIAL_STATE, {
        type: types.FAVORITE_STORY,
        id: 1,
        payload: {
          id: 1,
          title: 'A cool title',
          author: 'Some dude'
        }
      })
    ).to.eql(ONE_FAVORITE_STATE);
  });

  it('should handle distinct FAVORITE_STORY', () => {
    expect(
      FavoritesReducer(ONE_FAVORITE_STATE, {
        type: types.FAVORITE_STORY,
        id: 1,
        payload: {
          id: 1,
          title: 'A cool title',
          author: 'Some dude'
        }
      })
    ).to.eql(ONE_FAVORITE_STATE);
  });

  it('should handle UNFAVORITE_STORY', () => {
    expect(
      FavoritesReducer(TWO_FAVORITES_STATE, {
        type: types.UNFAVORITE_STORY,
        id: 2
      })
    ).to.eql(ONE_FAVORITE_STATE);
  });
});
