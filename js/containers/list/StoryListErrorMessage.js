import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { darkTheme } from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export class StoryListErrorMessage extends Component {
  handleTryAgain = () => {
    this.props.handleTryAgain();
  };

  render() {
    const { container, icon, title, subtitle, button } = styles;
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={container}>
          <StatusBar barStyle="light-content" />
          <Icon
            style={icon}
            size={125}
            name={'frown-o'}
            color={darkTheme.storyTimeAgo}
          />
          <Text style={title}>
            Oops, something went wrong...
          </Text>
          <Text style={subtitle}>
            Please check your network connection.
          </Text>
          <View style={button}>
            <Icon.Button
              color="white"
              name={'refresh'}
              activeOpacity={0.5}
              backgroundColor={'transparent'}
              underlayColor="transparent"
              onPress={this.handleTryAgain}
            >
              {'Try Again'}
            </Icon.Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: darkTheme.storyBackground,
    margin: 15
  },
  title: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: '400',
    color: darkTheme.storyTimeAgo
  },
  subtitle: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: '300',
    color: darkTheme.storyTimeAgo
  },
  button: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: darkTheme.storyTitle,
    borderRadius: 4
  }
});
