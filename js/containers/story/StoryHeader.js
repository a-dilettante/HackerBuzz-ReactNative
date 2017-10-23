import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HTMLView from 'react-native-htmlview';
import { darkTheme } from '../../styles';
import { convertTimestamp } from '../../utils';
import { openURL } from '../../network/web';
import { connect } from 'react-redux';
import { favoriteStory, unfavoriteStory } from '../../actions/FavoriteActions';

class StoryHeader extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
    this.scaleValue = new Animated.Value(0);
  }

  handleFavoriteStory = () => {
    this.animateBackgroundColor();
    this.scaleButton();
    this.toggleFavoriteStory();
  };

  toggleFavoriteStory = () => {
    const { isFavorited } = this.props;
    !isFavorited ? this.favoriteStory() : this.unfavoriteStory();
  };

  favoriteStory = () => {
    const { story } = this.props;
    this.props.favoriteStory(story);
  };

  unfavoriteStory = () => {
    const { story } = this.props;
    this.props.unfavoriteStory(story.id);
  };

  scaleButton = () => {
    this.scaleValue.setValue(0);
    Animated.timing(this.scaleValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.easeOutBack
    }).start();
  };

  animateBackgroundColor = () => {
    Animated.timing(this.animatedValue, {
      toValue: this.props.isFavorited ? 0 : 1,
      duration: 300,
      easting: Easing.linear
    }).start();
  };

  render() {
    const { story } = this.props;
    const { isFavorited } = this.props;
    const {
      container,
      headerContainer,
      textContainer,
      commentsContainer,
      favoriteStoryContainer,
      title,
      author,
      timeAgo
    } = styles;

    var bgColor = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', darkTheme.savedStory]
    });

    const buttonScale = this.scaleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.05, 1]
    });

    return (
      <View style={container}>
        <View style={headerContainer}>
          <View style={textContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={_ => openURL(story.url)}
            >
              <Text style={title}>
                {story.title}
              </Text>
            </TouchableOpacity>
            {story.text !== undefined &&
              <View
                style={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}
              >
                <HTMLView
                  value={`<blockquote>${story.text}</blockquote>`}
                  stylesheet={HTMLstyles}
                />
              </View>}
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <View style={{ flexDirection: 'column' }}>
                <Text style={author}>
                  {story.by}
                </Text>
                <View style={commentsContainer}>
                  <Icon
                    style={{ alignSelf: 'center', marginRight: 5 }}
                    size={14}
                    name={'clock-o'}
                    color={darkTheme.storyTimeAgo}
                  />
                  <Text style={timeAgo}>
                    {convertTimestamp(story.time)}
                  </Text>
                </View>
              </View>
              <Animated.View
                style={[
                  favoriteStoryContainer,
                  { backgroundColor: bgColor },
                  { transform: [{ scale: buttonScale }] }
                ]}
              >
                <Icon.Button
                  color="white"
                  name={isFavorited ? 'heart' : 'heart-o'}
                  activeOpacity={0.5}
                  backgroundColor={
                    isFavorited ? darkTheme.savedStory : 'transparent'
                  }
                  underlayColor="transparent"
                  iconStyle={{ marginRight: !isFavorited ? 10 : 0 }}
                  onPress={this.handleFavoriteStory}
                >
                  {!isFavorited && 'Favorite'}
                </Icon.Button>
              </Animated.View>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 5,
            height: 1,
            width: '100%',
            backgroundColor: darkTheme.storyDividingLine
          }}
        />
      </View>
    );
  }
}

const HTMLstyles = StyleSheet.create({
  blockquote: {
    color: darkTheme.commentText
  },
  a: {
    fontWeight: '300',
    color: darkTheme.commentURL
  },
  p: {
    color: darkTheme.commentText
  },
  i: {
    fontStyle: 'italic',
    color: darkTheme.commentText
  },
  b: {
    color: darkTheme.commentText,
    fontWeight: '500'
  },
  code: {
    fontFamily: 'Menlo',
    color: darkTheme.commentText
  },
  pre: {
    fontFamily: 'Menlo',
    color: darkTheme.commentText
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: darkTheme.headerCommentBackground
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  commentsContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    marginBottom: 5
  },
  favoriteStoryContainer: {
    borderWidth: 1,
    borderColor: darkTheme.savedStory,
    borderRadius: 4,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    marginRight: 10,
    marginBottom: 5,
    height: '70%'
  },
  commentsText: {
    color: darkTheme.storyTimeAgo,
    marginLeft: 5,
    fontSize: 17.5,
    fontWeight: '600',
    alignSelf: 'center'
  },
  title: {
    color: darkTheme.storyTitle,
    fontSize: 30,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    marginRight: 10
  },
  author: {
    color: darkTheme.storyAuthor,
    fontSize: 20,
    marginBottom: 5,
    paddingLeft: 10
  },
  divider: {
    color: darkTheme.storyDivider,
    fontSize: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5
  },
  timeAgo: {
    color: darkTheme.storyTimeAgo,
    fontSize: 17.5
  }
});

const mapStateToProps = (state, headerProps) => {
  const { byId } = state.favorites;
  const { story } = headerProps;

  const isFavorited = byId.filter(id => id === story.id).length > 0;

  return { isFavorited };
};

const mapDispatchToProps = dispatch => ({
  favoriteStory: story => dispatch(favoriteStory(story)),
  unfavoriteStory: id => dispatch(unfavoriteStory(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryHeader);
