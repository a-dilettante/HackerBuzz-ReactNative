import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchStories,
  fetchMoreStories,
  refreshStories
} from '../../actions/StoryActions';
import { favoriteStory, unfavoriteStory } from '../../actions/FavoriteActions';
import { StoryListErrorMessage } from './StoryListErrorMessage';

import StoryList from './StoryList';
const storyLimit = 20;

export class StoryListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      end: 20
    };
  }

  componentDidMount() {
    this.fetchStories();
  }

  componentWillReceiveProps(nextProps) {
    const { ids } = nextProps;
    const { start, end } = this.state;
    if (ids !== this.props.ids && start < storyLimit) {
      this.getItems(ids, start, end);
    } else if (JSON.stringify(ids) !== JSON.stringify(this.props.ids)) {
      this.setState({ start: 0, end: 20 });
      this.fetchStories();
    }
  }

  fetchStories = () => {
    const { category } = this.props;
    this.props.fetchStories(category);
  };

  getItems = (ids, start, end) => {
    const { category } = this.props;
    if (ids !== undefined) {
      const storyIds = ids.slice(start, end);
      if (storyIds.length > 0) {
        this.props.fetchMoreStories(storyIds, category);
      }
    }
  };

  handleLoadMore = () => {
    const { isLoading, stories, ids } = this.props;
    if (!isLoading && stories.length !== ids.length) {
      this.setState(
        {
          start: this.state.start + storyLimit,
          end: this.state.end + storyLimit
        },
        () => {
          this.loadMoreStories();
        }
      );
    }
  };

  handleRefresh = () => {
    this.refreshStories();
  };

  refreshStories = () => {
    const { category, ids } = this.props;
    this.props.refreshStories(category, ids);
  };

  loadMoreStories = () => {
    const { ids } = this.props;
    const { start, end } = this.state;
    this.getItems(ids, start, end);
  };

  handleLeftActionComplete = item => {
    const { byId } = this.props;
    const isFavorited = byId.filter(id => id === item.id).length > 0;
    isFavorited
      ? this.props.unfavoriteStory(item.id)
      : this.props.favoriteStory(item);
  };

  render() {
    const { stories, navigation, route, refreshing, hasErrored } = this.props;

    if (hasErrored) {
      return <StoryListErrorMessage handleTryAgain={this.handleRefresh} />;
    }
    return (
      <StoryList
        stories={stories}
        refreshing={refreshing}
        navigation={navigation}
        handleLoadMore={this.handleLoadMore}
        handleRefresh={this.handleRefresh}
        route={route}
        handleLeftActionComplete={this.handleLeftActionComplete}
      />
    );
  }
}

const getAppropriateReducer = (state, category) => {
  switch (category) {
    case 'topstories':
      return state.top;
    case 'beststories':
      return state.best;
    case 'askstories':
      return state.ask;
    case 'showstories':
      return state.show;
    case 'jobstories':
      return state.jobs;
    default:
      return state.new;
  }
};

const mapStateToProps = (state, ownProps) => {
  const { category } = ownProps;
  const reducer = getAppropriateReducer(state, category);

  const { stories, ids, isLoading, refreshing, hasErrored } = reducer;
  const { byId } = state.favorites;

  return { stories, ids, isLoading, refreshing, byId, hasErrored };
};

const mapDispatchToProps = dispatch => ({
  fetchStories: type => dispatch(fetchStories(type)),
  fetchMoreStories: (ids, category) =>
    dispatch(fetchMoreStories(ids, category)),
  refreshStories: (category, ids) => dispatch(refreshStories(category, ids)),
  favoriteStory: story => dispatch(favoriteStory(story)),
  unfavoriteStory: id => dispatch(unfavoriteStory(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryListContainer);
