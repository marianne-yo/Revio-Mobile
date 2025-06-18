import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Toast, { BaseToast } from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import { MusicProvider } from '../lib/context/MusicContext';
import { auth } from '../lib/firebaseConfig'; // Import Firebase auth instance
import { onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged
import { usePathname } from 'expo-router';
import FloatingPlayer from '../components/FloatingPlayer';
import MusicPlayerBar from '../components/MusicPlayerBar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
        <Ionicons name="checkmark-circle" size={24} color="#4CAF50" style={{paddingLeft: 10}} />
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
        <Ionicons name="close-circle" size={24} color="#FF5252" style={{paddingLeft: 10}} />
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
        <Ionicons name="information-circle" size={24} color="#FFD700" style={{paddingLeft: 10}}/>
      )}
    />
  ),
};

const RootLayout = () => {
  const [user, setUser] = useState(null); //default current user is null
  const [appReady, setAppReady] = useState(false); // New state to manage app readiness
// appReady is a state variable is introduced to prevent rendering the main application 
// before the authentication state has been determined.
// This avoids flickering or incorrect redirects.

  useEffect(() => {
                  //It subscribes to changes in the user's sign-in state.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); //this updates the user state
      setAppReady(true); // Set app as ready once auth state is checked
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

    const pathname = usePathname();
    const isFocusScreen = pathname.includes('/Focus');
// This if block ensures that nothing is rendered until the
// authentication state has been determined.
  if (!appReady) {
    // You might want to render a loading spinner or splash screen here
    return null; 
  }


  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <MusicProvider>
          <Stack screenOptions={{
            headerStyle: { backgroundColor: 'blue' },
            headerTintColor: "#ffffff",
            backgroundColor: "red"
          }}>
            {user ? (
              <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
            ) : (
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            )}
            <Stack.Screen name="(flashcards)" options={{ headerShown: false }} />
            <Stack.Screen name="(reviewer)" options={{ headerShown: false }} />
            <Stack.Screen name="(modals)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack>

          <Toast config={toastConfig} />
        </MusicProvider>
      </GestureHandlerRootView>
    </>
  );
};

export default RootLayout;
const styles = StyleSheet.create({});