import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { darkTheme } from '../styles';

export default class ShareItem extends Component {
  handleOnPress = () => {
    this.props.onPress();
  };

  render() {
    const { container, actionIcon, text } = styles;
    const { icon, color, name } = this.props;
    return (
      <TouchableOpacity onPress={this.handleOnPress}>
        <View style={container}>
          <Icon style={actionIcon} size={20} name={icon} color={color} />
          <Text style={text}>
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: darkTheme.tabInactiveBackground,
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionIcon: {
    width: 25,
    margin: 15
  },
  text: {
    margin: 15,
    fontSize: 15,
    fontWeight: '600',
    color: 'white'
  }
});
