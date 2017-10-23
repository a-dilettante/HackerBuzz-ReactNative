import { FAVORITE_STORY, UNFAVORITE_STORY } from './types';

export const favoriteStory = story => {
  return {
    type: FAVORITE_STORY,
    id: story.id,
    payload: story
  };
};

export const unfavoriteStory = id => {
  return {
    type: UNFAVORITE_STORY,
    id
  };
};
