import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import {
  fetchComments,
  fetchMoreComments,
  fetchCommentsClean
} from '../../actions/CommentActions';
import { darkTheme } from '../../styles';
import CommentList from './CommentList';

const commentKidsLimit = 4;
import Icon from 'react-native-vector-icons/FontAwesome';
import ShareStory from '../../components/ShareStory';

import values from 'lodash/values';

export class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      start: 0,
      end: 4,
      isSharing: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { descendants } = navigation.state.params.story;
    return {
      headerLeft: Story.backButton(navigation),
      headerRight: Story.shareButton(navigation),
      title: descendants !== undefined
        ? descendants != 1
            ? `${descendants} Comments`
            : `${descendants} Comment`
        : 'Job',
      headerTitleStyle: { color: darkTheme.headerTitle },
      headerStyle: {
        backgroundColor: darkTheme.headerBackground,
        borderBottomColor: darkTheme.tabBarOutline,
        borderBottomWidth: 0.5
      },
      headerTintColor: darkTheme.headerBackButton
    };
  };

  static backButton = navigation => {
    const { key } = navigation.state;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(NavigationActions.back({ key }));
        }}
      >
        <Icon
          style={{ padding: 10 }}
          name={'chevron-left'}
          size={22}
          color={darkTheme.headerTitle}
        />
      </TouchableOpacity>
    );
  };

  static shareButton = navigation => {
    return (
      <TouchableOpacity onPress={_ => Story.showShareModal(navigation)}>
        <Icon
          style={{ padding: 10 }}
          name={'share-alt'}
          size={22}
          color={darkTheme.headerTitle}
        />
      </TouchableOpacity>
    );
  };

  static showShareModal = navigation => {
    const { setParams } = navigation;
    setParams({ isSharing: !navigation.state.params.isSharing });
  };

  componentDidMount() {
    this.checkIfRefreshNeeded();
  }

  checkIfRefreshNeeded = () => {
    const { comments } = this.props.comments;
    const { kids } = this.props.navigation.state.params.story;

    if (kids) {
      const matchingId = comments.filter(comment => comment.id == kids[0]);

      if (matchingId.length === 0) {
        this.props.fetchCommentsClean();
        this.loadMoreComments();
      }
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFetching !== this.state.refreshing) {
      this.setState({ refreshing: false });
    }
  }

  fetchComments = () => {
    const { story } = this.props.navigation.state.params;
    this.props.fetchComments(story);
  };

  getItems = (ids, start, end) => {
    const { id } = this.props.navigation.state.params.story;

    if (ids !== undefined && ids.length > 0) {
      const kidIds = ids.slice(start, end);
      if (kidIds.length > 0) {
        this.props.fetchMoreComments(id, kidIds);
      }
    }
  };

  handleLoadMore = () => {
    const { isFetching, commentsByHash } = this.props;
    const shouldLoadMore =
      commentsByHash !== undefined &&
      commentsByHash.length > this.state.start &&
      commentsByHash.length <= this.state.end;

    if (!isFetching && shouldLoadMore) {
      this.setState(
        {
          start: this.state.start + commentKidsLimit,
          end: this.state.end + commentKidsLimit
        },
        () => {
          this.loadMoreComments();
        }
      );
    }
  };

  loadMoreComments = () => {
    const { kids } = this.props.navigation.state.params.story;
    const { start, end } = this.state;
    this.getItems(kids, start, end);
  };

  handleRefresh = () => {
    const { kids } = this.props.navigation.state.params.story;
    if (kids) {
      this.setState({ refreshing: true }, () => {
        this.fetchComments();
      });
    }
  };

  _keyExtractor = item => (item.id ? item.id : item);

  render() {
    const { navigation, isFetching, hasErrored, commentsByHash } = this.props;
    const { story } = navigation.state.params;

    return (
      <View style={{ flex: 1 }}>
        <CommentList
          comments={values(commentsByHash)}
          kids={story.kids}
          navigation={navigation}
          handleLoadMore={this.handleLoadMore}
          handleRefresh={this.handleRefresh}
          isFetching={isFetching}
          hasErrored={hasErrored}
        />
        {story &&
          <ShareStory
            story={story}
            showShareModal={Story.showShareModal}
            navigation={navigation}
          />}
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.navigation.state.params.story;
  const { comments } = state;
  const { isFetching, hasErrored, byStoryHash } = comments;

  const commentsByHash = byStoryHash[id];

  return { comments, commentsByHash, isFetching, hasErrored };
};

const mapDispatchToProps = dispatch => ({
  fetchComments: item => dispatch(fetchComments(item)),
  fetchMoreComments: (storyId, ids) =>
    dispatch(fetchMoreComments(storyId, ids)),
  fetchCommentsClean: () => dispatch(fetchCommentsClean())
});

export default connect(mapStateToProps, mapDispatchToProps)(Story);
