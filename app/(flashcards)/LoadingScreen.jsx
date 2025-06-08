// app/(flashcards)/LoadingScreen.jsx
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';

const LoadingScreen = () => {
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
    fontFamily: 'Poppins_700Bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtext: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#cccccc',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
