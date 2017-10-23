import React from 'react';
import { View } from 'react-native';
import Placeholder from 'rn-placeholder';

const StoryItemPlaceholder = ({ style, showScore }) => {
  const color = 'rgba(1, 1, 1, 0.25)';
  return (
    <View style={style}>
      <View
        style={{
          width: 2.5,
          backgroundColor: color,
          marginRight: 5
        }}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          marginTop: 10,
          marginLeft: 5,
          marginBottom: 10
        }}
      >
        <View
          style={{
            width: showScore ? '90%' : '95%',
            height: 15,
            backgroundColor: color,
            marginBottom: 5
          }}
        />
        <View
          style={{
            width: '33%',
            height: 15,
            backgroundColor: color,
            marginBottom: 7.5
          }}
        />
        <View
          style={{
            height: 7.5,
            width: 50,
            backgroundColor: color,
            marginBottom: 5
          }}
        />
        <View
          style={{
            height: 7.5,
            width: 50,
            backgroundColor: color
          }}
        />
      </View>
      {showScore &&
        <View
          style={{
            margin: 5,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around'
          }}
        >
          <View
            style={{
              height: 15,
              width: 27.5,
              backgroundColor: color,
              marginBottom: 5
            }}
          />
          <View
            style={{
              height: 15,
              width: 27.5,
              backgroundColor: color
            }}
          />
        </View>}
    </View>
  );
};

export default Placeholder.connect(StoryItemPlaceholder);
