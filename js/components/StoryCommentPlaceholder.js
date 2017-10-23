import React from 'react';
import { View, Text } from 'react-native';
import Placeholder from 'rn-placeholder';

const StoryCommentPlaceholder = ({ style }) => {
  const color = 'rgba(1, 1, 1, 0.25)';
  return (
    <View style={style}>
      <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
        <View
          style={{
            height: 15,
            width: '15%',
            backgroundColor: color
          }}
        />
        <Text
          style={{
            fontSize: 10,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 2,
            color
          }}
        >
          ●
        </Text>
        <View
          style={{
            height: 15,
            width: '10%',
            backgroundColor: color
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          marginLeft: 10,
          marginRight: 10
        }}
      >
        <View
          style={{
            flex: 1,
            height: 200,
            backgroundColor: color,
            marginBottom: 5
          }}
        />
      </View>
    </View>
  );
};

export default Placeholder.connect(StoryCommentPlaceholder);
