export const storyTypes = {
  newStories: 'newstories',
  topStories: 'topstories',
  bestStories: 'beststories',
  askStories: 'askstories',
  showStories: 'showstories',
  jobStories: 'jobstories'
};

export const filterAdditionalStories = (
  state,
  stories,
  actionCategory,
  requiredCategory
) => {
  if (actionCategory === requiredCategory) {
    return {
      ...state,
      isLoading: false,
      stories: insertAd([
        ...state.stories,
        ...stories.map(item => getStory(item, requiredCategory))
      ])
    };
  }
  return state;
};

export const setIds = (state, ids, actionCategory, requiredCategory) => {
  if (actionCategory === requiredCategory) {
    return {
      ...state,
      ids: ids,
      stories: [],
      isLoading: false,
      refreshing: false,
      hasErrored: false
    };
  }
  return state;
};

const generateRandomId = () =>
  Math.random().toString(36).substring(2) + new Date().getTime().toString(36);

const insertAd = stories => {
  return [...stories, { ad: 'ad', id: generateRandomId() }];
};

const getStory = (item, category) => ({
  id: item.id,
  by: item.by,
  text: item.text,
  descendants: item.descendants,
  kids: item.kids,
  score: item.score,
  time: item.time,
  title: item.title,
  type: item.type,
  url: item.url,
  category
});
