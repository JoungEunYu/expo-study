import { Stack } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import React from 'react';

const RootLayout = () => {
  return (
    <>
      <Stack>
        {/* <Stack.Screen name="index" options={{title: 'Home'}} />
      <Stack.Screen name="about" options={{title: 'About'}} /> */}

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
};

export default RootLayout;