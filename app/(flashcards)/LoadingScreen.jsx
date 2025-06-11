import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import useCustomFonts from '../../hooks/useCustomFonts'
const LoadingScreen = () => {
  const [fontsLoaded] = useCustomFonts();
  if (!fontsLoaded) return null;
  return (
    <ThemedView style={styles.container}>
      <ActivityIndicator size="large" color="#B5B5FF" style={styles.spinner} />
      <ThemedText style={styles.title}>Generating Flashcards...</ThemedText>
      <ThemedText style={styles.subtext}>
        Please wait while we work our AI magic. This might take a few seconds!
      </ThemedText>
    </ThemedView>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  spinner: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtext: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#cccccc',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
