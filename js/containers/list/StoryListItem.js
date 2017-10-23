import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated
} from 'react-native';
import { connect } from 'react-redux';
import { ScoreAndComments } from '../../components/ScoreAndComments';
import StoryItemPlaceholder from '../../components/StoryItemPlaceholder';
import { convertTimestamp } from '../../utils';
import { darkTheme } from '../../styles';
import Shine from '../../utils/animations/shine';

const ANIMATION_DURATION = 750;

export class StoryListItem extends PureComponent {
  constructor(props) {
    super(props);
    this._animated = new Animated.Value(0.25);
  }

  componentDidMount() {
    Animated.timing(this._animated, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      useNativeDriver: true
    }).start();
  }

  onTitlePress = (event, story) => {
    const { pageY } = event.nativeEvent;
    this.props.handleTitlePress(story, pageY);
  };

  renderStoryItem = (story, id, isFavorited) => {
    const {
      container,
      placeholder,
      textContainer,
      titleText,
      author,
      timeAgo,
      type
    } = styles;
    const { title, by, time, score, descendants } = story;

    const rowStyles = [styles.row, { opacity: this._animated }];

    return (
      <StoryItemPlaceholder
        style={placeholder}
        customAnimate={Shine}
        onReady={title !== undefined && id !== undefined}
        showScore={this.props.route !== 'JobStory'}
      >
        <Animated.View style={rowStyles}>
          <View style={container}>
            <View
              style={[
                type,
                {
                  backgroundColor: isFavorited
                    ? darkTheme.savedStory
                    : 'transparent'
                }
              ]}
            />
            <View style={textContainer}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={event => this.onTitlePress(event, story)}
              >
                <Text style={titleText}>
                  {title}
                </Text>
              </TouchableOpacity>
              <Text style={author}>
                {by}
              </Text>
              <Text style={timeAgo}>
                {convertTimestamp(time)}
              </Text>
            </View>
            <View>
              <ScoreAndComments
                score={score}
                comments={descendants}
                type={story.category}
              />
            </View>
          </View>
        </Animated.View>
      </StoryItemPlaceholder>
    );
  };

  render() {
    const { story, id, isFavorited } = this.props;
    return this.renderStoryItem(story, id, isFavorited);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: darkTheme.tabInactiveBackground
  },
  placeholder: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: darkTheme.storyPlaceholderBackground,
    flexDirection: 'row'
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 5,
    marginTop: 5,
    marginRight: 5
  },
  titleText: {
    color: darkTheme.storyTitle,
    fontSize: 20
  },
  author: {
    color: darkTheme.storyAuthor,
    fontSize: 15,
    paddingTop: 5
  },
  timeAgo: {
    color: darkTheme.storyTimeAgo,
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5
  },
  type: {
    width: 2,
    backgroundColor: darkTheme.storyType
  }
});

const mapStateToProps = (state, headerProps) => {
  const { byId } = state.favorites;
  const { story } = headerProps;

  const isFavorited = byId.filter(id => id === story.id).length > 0;

  return { isFavorited };
};

export default connect(mapStateToProps)(StoryListItem);
