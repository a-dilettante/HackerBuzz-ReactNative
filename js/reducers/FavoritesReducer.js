import {
  FAVORITE_STORY,
  UNFAVORITE_STORY,
} from '../actions/types';

const INITIAL_STATE = {
  byId: [],
  byHash: {}
};

const removeByKey = (obj, prop) => {
  let res = Object.assign({}, obj);
  delete res[prop];
  return res;
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FAVORITE_STORY:
      if (state.byId.includes(action.id)) {
        return state;
      }
      return {
        byId: [...state.byId, action.id],
        byHash: {
          ...state.byHash,
          [action.id]: action.payload
        }
      };
    case UNFAVORITE_STORY:
      return {
        byId: state.byId.filter(element => element !== action.id),
        byHash: removeByKey(state.byHash, action.id)
      };
    default:
      return state;
  }
};