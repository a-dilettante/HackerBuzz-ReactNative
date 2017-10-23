import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking
} from 'react-native';
import { darkTheme } from '../../styles';
import { openTypeform } from '../../network/web';

export default class MoreContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false
    };
  }

  static navigationOptions = () => ({
    title: 'More'.toUpperCase(),
    headerTitleStyle: { color: darkTheme.headerTitle },
    headerStyle: { backgroundColor: darkTheme.headerBackground }
  });

  setModalState = currency => {
    const isModalVisible = !this.state.isModalVisible;
    this.setState({ isModalVisible, currency });
  };

  handleOnPress = currency => {
    this.setModalState(currency);
  };

  handleReviewOnPress = () => {
    Linking.openURL(
      'https://itunes.apple.com/app/id1292825792?action=write-review&mt=8'
    ).catch(() => {});
  };

  handleContactOnPress = () => {
    openTypeform();
  };

  render() {
    const {
      container,
      donateContainer,
      donateHeadline,
      body,
      contact,
      textContainer
    } = styles;

    return (
      <ScrollView
        style={{ backgroundColor: darkTheme.storyBackground }}
        contentContainerStyle={container}
      >
        <DonateModal
          style={{ width: 0, height: 0 }}
          isVisible={this.state.isModalVisible}
          setModalState={this.setModalState}
          currency={this.state.currency}
        />
        <View style={textContainer}>
          <Text style={donateHeadline}>
            About
          </Text>
          <Text style={body}>
            Built with ❤️ for RN.
          </Text>
        </View>
        <View style={textContainer}>
          <Text style={donateHeadline}>
            Contact
          </Text>
          <Text style={body}>
            Do you want to reach out or leave some feedback?
          </Text>
          <TouchableOpacity onPress={this.handleContactOnPress}>
            <Text style={contact}>
              Tap here!
            </Text>
          </TouchableOpacity>
        </View>
        <View style={donateContainer}>
          <View style={textContainer}>
            <Text style={donateHeadline}>
              Enjoying the App?
            </Text>
            <TouchableOpacity onPress={this.handleReviewOnPress}>
              <Text style={body}>
                Leave a review 😎
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: darkTheme.storyBackground,
    backfaceVisibility: 'visible'
  },
  donateContainer: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginBottom: 25
  },
  donateHeadline: {
    fontSize: 30,
    fontWeight: '400',
    color: darkTheme.storyAuthor
  },
  currenciesContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10
  },
  currencyContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'lightgray',
    padding: 5,
    justifyContent: 'space-between',
    flexDirection: 'column',
    margin: 10
  },
  currency: {
    color: 'white',
    fontSize: 25,
    fontWeight: '500',
    alignSelf: 'center',
    marginTop: 5
  },
  body: {
    marginTop: 5,
    marginRight: 5,
    fontSize: 20,
    fontWeight: '300',
    color: darkTheme.storyTimeAgo
  },
  contact: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: '500',
    color: darkTheme.storyTimeAgo
  },
  textContainer: {
    marginLeft: 10,
    marginTop: 10
  },
  image: {
    marginTop: 5,
    width: 40,
    height: 40,
    tintColor: darkTheme.storyTimeAgo,
    alignSelf: 'center'
  }
});
