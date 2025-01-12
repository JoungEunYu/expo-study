import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function AboutScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>About Us</Text>
      <Button title="Go to Details" onPress={() => router.push('../src/pages/details')} />
    </View>
  );
}
