import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

import ThemedView from '../../components/ThemedView';
import Spacer from '../../components/Spacer';
import ThemedText from '../../components/ThemedText';
import Separator from '../../components/Separator';
import useCustomFonts from '../../hooks/useCustomFonts';

const SignupSuccess = () => {
  const [fontsLoaded] = useCustomFonts();
  const router = useRouter();
  const { username } = useLocalSearchParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/Login'); // redirect after 5s
    }, 5000);

    return () => clearTimeout(timer); // cleanup
  }, []);

  if (!fontsLoaded) return null;

  return (
    <ThemedView style={styles.container}>
      <Ionicons name="checkmark-circle" size={125} style={styles.icon} />
      <ThemedText style={styles.title}>Account Created Successfully!</ThemedText>
      <ThemedText style={styles.subText}>
        Welcome, {username ?? 'user'} {/* fallback if no username */}
      </ThemedText>
    </ThemedView>
  );
};

export default SignupSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    margin: 10,
    marginBottom: 5,
    fontFamily: 'Poppins-SemiBold',
    alignSelf: 'center',
    paddingHorizontal: 30,
  },
  subText: {
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
    paddingHorizontal: 30,
  },
  icon: {
    color: '#87FF66',
  },
});
