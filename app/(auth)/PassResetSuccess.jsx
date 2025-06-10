import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import useCustomFonts from '../../hooks/useCustomFonts';

const PassResetSuccess = () => {
  const router = useRouter();
  const [fontsLoaded] = useCustomFonts();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/Login');
    }, 3000); // 3s delay

    return () => clearTimeout(timeout);
  }, []);

  if (!fontsLoaded) return null;

  return (
    <ThemedView style={styles.container}>
      <Ionicons name="checkmark-circle" size={125} style={styles.icon} />
      <ThemedText style={styles.title}>Password reset successful!</ThemedText>
    </ThemedView>
  );
};

export default PassResetSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    margin: 10,
    fontFamily: 'Poppins-SemiBold',
    paddingHorizontal: 30
  },
  icon: {
    color: '#87FF66'
  }
});
