import { Link, router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface indexProps {}

const index = ({}: indexProps) => {
  return (
    <View>
      <Text>dsagsdi</Text>
      <Pressable onPress={() => {}}>
        <Text>Go to user2</Text>
      </Pressable>
    </View>
  );
};

export default index;