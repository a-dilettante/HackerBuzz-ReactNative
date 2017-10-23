import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Easing
} from 'react-native';
import { darkTheme } from '../../styles';
import StoryCommentPlaceholder from '../../components/StoryCommentPlaceholder';
import { convertTimestamp } from '../../utils';
import HTMLView from 'react-native-htmlview';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome';
import Shine from '../../utils/animations/shine';

export default class Comment extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      spinValue: new Animated.Value(0)
    };
    this._animated = new Animated.Value(0.25);
  }

  componentDidMount() {
    Animated.timing(this._animated, {
      toValue: 1,
      duration: 750,
      useNativeDriver: true
    }).start();
  }

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
    this.state.collapsed
      ? this.animateExpandComment()
      : this.animateCollapseComment();
  };

  animateCollapseComment = () => {
    Animated.timing(this.state.spinValue, {
      toValue: 1,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  };

  animateExpandComment = () => {
    Animated.timing(this.state.spinValue, {
      toValue: 0,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  };

  render() {
    const { deleted, text, kids, by, time } = this.props.comment;
    const { collapsed } = this.state;
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg']
    });
    const {
      container,
      textContainer,
      authorContainer,
      subCommentContainer,
      commentLine,
      author,
      timeAgo,
      divider,
      placeholder
    } = styles;

    if (deleted) {
      return null;
    }

    const hasReplies = kids && kids.length;

    const containerStyles = [container, { opacity: this._animated }];

    return (
      <StoryCommentPlaceholder
        style={placeholder}
        customAnimate={Shine}
        onReady={text !== undefined}
      >
        <Animated.View style={containerStyles}>
          <TouchableWithoutFeedback onPress={this.toggleExpanded}>
            <View style={authorContainer}>
              <Animated.View
                style={{
                  padding: 5,
                  marginRight: 5,
                  transform: [{ rotate: spin }]
                }}
              >
                <Icon
                  size={14}
                  name={'chevron-circle-down'}
                  color={darkTheme.storyTitle}
                />
              </Animated.View>
              <Text style={author}>
                {by}
              </Text>
              <Text style={divider}>●</Text>
              <Text style={timeAgo}>
                {convertTimestamp(time)}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <Collapsible collapsedHeight={0} collapsed={collapsed} duration={600}>
            <Animated.View style={textContainer}>
              <HTMLView
                value={`<blockquote>${text}</blockquote>`}
                stylesheet={HTMLstyles}
              />
            </Animated.View>
          </Collapsible>
          {hasReplies &&
            <View style={{ marginLeft: 10, marginTop: 5 }}>
              {kids.map(
                kid =>
                  kid.id &&
                  <Collapsible key={kid.id} collapsed={collapsed}>
                    <Animated.View key={kid.id} style={subCommentContainer}>
                      <Animated.View style={commentLine} />
                      <Comment key={kid.id} comment={kid} />
                    </Animated.View>
                  </Collapsible>
              )}
            </View>}
        </Animated.View>
      </StoryCommentPlaceholder>
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
    backgroundColor: darkTheme.storyBackground
  },
  authorContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginBottom: 5,
    marginRight: 10
  },
  subCommentContainer: {
    marginTop: -5,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  commentLine: {
    backgroundColor: '#333333',
    width: 1,
    marginTop: 10,
    marginBottom: 5
  },
  divider: {
    color: darkTheme.storyDivider,
    fontSize: 5,
    padding: 10
  },
  author: {
    color: darkTheme.storyAuthor,
    fontSize: 15,
    paddingTop: 5,
    fontWeight: '500'
  },
  timeAgo: {
    color: darkTheme.storyTimeAgo,
    fontSize: 15,
    paddingTop: 5
  },
  placeholder: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: darkTheme.storyPlaceholderBackground
  }
});
