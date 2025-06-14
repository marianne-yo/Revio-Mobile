import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import React from 'react';
import Toast, { BaseToast } from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import { MusicProvider } from '../lib/context/MusicContext';
const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: '#1E1E2E',
        borderLeftColor: '#4CAF50',
        borderRadius: 8,
        minHeight: null,
        alignItems: 'center',
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        flex: 1,
        justifyContent: 'center',
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
      }}
      text2Style={{
        fontSize: 14,
        color: '#ccc',
      }}
      renderLeadingIcon={() => (
        <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
      )}
    />
  ),
  error: (props) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: '#1E1E2E',
        borderLeftColor: '#FF5252',
        borderRadius: 8,
        minHeight: null,
        alignItems: 'center',
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        flex: 1,
        justifyContent: 'center',
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
      }}
      text2Style={{
        fontSize: 14,
        color: '#ccc',
      }}
      renderLeadingIcon={() => (
        <Ionicons name="close-circle" size={24} color="#FF5252" />
      )}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: '#1E1E2E',
        borderLeftColor: '#FFD700',
        borderRadius: 8,
        minHeight: null,
        alignItems: 'center',
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        flex: 1,
        justifyContent: 'center',
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
      }}
      text2Style={{
        fontSize: 14,
        color: '#ccc',
      }}
      renderLeadingIcon={() => (
        <Ionicons name="information-circle" size={24} color="#FFD700" />
      )}
    />
  ),
};

const RootLayout = () => {
  return (
    <>
    <MusicProvider>
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
      </Stack>
      <Toast config={toastConfig} />
    </MusicProvider>
    </>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
