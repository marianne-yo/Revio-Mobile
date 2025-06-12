import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import React from 'react';
import Toast from 'react-native-toast-message';
const RootLayout = () => {
  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: 'blue' },
      headerTintColor: "#ffffff",
      backgroundColor: "red"
    }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
      <Stack.Screen name="(flashcards)" options={{ headerShown: false }} />
      <Stack.Screen name="(reviewer)" options={{ headerShown: false }} />
      <Stack.Screen name="(modals)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Toast />
    </Stack>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
