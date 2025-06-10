// --- ForgotPass.jsx logic update ---
import React, { useState } from 'react';
import { Alert, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, useColorScheme } from 'react-native';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import ThemedTextInput from '../../components/ThemedTextInput';
import ThemedButton from '../../components/ThemedButton';
import ThemedSecondaryButton from '../../components/ThemedSecondaryButton'
import useCustomFonts from '../../hooks/useCustomFonts';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../..//lib/firebaseConfig';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
const ForgotPass = () => {
  const [fontsLoaded] = useCustomFonts();
  const [email, setEmail] = useState('');
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const router = useRouter();
  if (!fontsLoaded) return null;

  const handleReset = async () => {
    if (!email) {
      Alert.alert('Missing Email', 'Please enter your email address.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email.toLowerCase());
      Alert.alert('Reset Email Sent!', 'Check your email to reset your password.');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Reset Password</ThemedText>
        <ThemedText style={styles.subText}>Email</ThemedText>

        <ThemedTextInput
          style={{ width: '80%', marginBottom: 20 }}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />

        <ThemedButton style={{ borderRadius: 10 }} onPress={handleReset}>
          <Text style={styles.buttonText}>Send Email</Text>
        </ThemedButton>

        <ThemedSecondaryButton style={styles.btnColor} onPress={() => router.push('/Login')}>
          <Text style={styles.backbtnText}>Back to login</Text>
        </ThemedSecondaryButton>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    textAlign: 'left',
    fontSize: 32,
    margin: 10,
    marginBottom: 5,
    fontFamily: 'Poppins-SemiBold',
    alignSelf: 'flex-start',
    paddingHorizontal: 30
  },
  subText: {
    textAlign: 'left',
    fontSize: 20,
    margin: 10,
    fontFamily: 'Poppins-Regular',
    alignSelf: 'flex-start',
    paddingHorizontal: 30
  },
  buttonText: {
    color: '#200448',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Bold'
  },
  backbtnText: {
    color: Colors.primary,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Bold'
  },
  btnColor:{
    backgroundColor: '#12121A', 
    borderRadius: 10, borderColor: '#9E9E9E',
    borderWidth: 1,
  }
});
