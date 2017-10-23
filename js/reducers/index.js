import { combineReducers } from 'redux';

import { NavigatorTabMain } from '../containers/main/navigationConfiguration';
import { NavigatorTabAsk } from '../containers/ask/navigationConfiguration';
import { NavigatorTabShow } from '../containers/show/navigationConfiguration';
import { NavigatorTabJobs } from '../containers/jobs/navigationConfiguration';
import { NavigatorTabMore } from '../containers/more/navigationConfiguration';

import { tabBarReducer } from '../containers/navigationConfiguration';
import CommentReducer from './CommentReducer';
import FavoritesReducer from './FavoritesReducer';

import {
  NewListReducer,
  TopListReducer,
  BestListReducer,
  AskListReducer,
  ShowListReducer,
  JobListReducer
} from './StoryListReducers';

const rootReducer = combineReducers({
  tabBar: tabBarReducer,
  tabMain: (state, action) =>
    NavigatorTabMain.router.getStateForAction(action, state),
  tabAsk: (state, action) =>
    NavigatorTabAsk.router.getStateForAction(action, state),
  tabShow: (state, action) =>
    NavigatorTabShow.router.getStateForAction(action, state),
  tabJobs: (state, action) =>
    NavigatorTabJobs.router.getStateForAction(action, state),
  tabMore: (state, action) =>
    NavigatorTabMore.router.getStateForAction(action, state),
  new: NewListReducer,
  top: TopListReducer,
  best: BestListReducer,
  ask: AskListReducer,
  show: ShowListReducer,
  jobs: JobListReducer,
  comments: CommentReducer,
  favorites: FavoritesReducer
});

export default rootReducer;
