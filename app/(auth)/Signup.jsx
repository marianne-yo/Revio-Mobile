import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, Alert, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
//icons
import { Ionicons } from '@expo/vector-icons';
//firebase
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, db } from '../../lib/firebaseConfig';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
//themed components
import ThemedView from '../../components/ThemedView';
import Spacer from '../../components/Spacer';
import ThemedText from '../../components/ThemedText';
import ThemedTextInput from '../../components/ThemedTextInput';
import ThemedButton from '../../components/ThemedButton';
//imported the fonts
import useCustomFonts from '../../hooks/useCustomFonts';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const [fontsLoaded] = useCustomFonts();
  if (!fontsLoaded) return null;

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidUsername = (username) => /^[a-zA-Z0-9_]{3,}$/.test(username);
  const isValidPassword = (password) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    switch (strength) {
      case 0:
      case 1: return { label: 'Weak', color: 'red' };
      case 2: return { label: 'Okay', color: 'orange' };
      case 3: return { label: 'Strong', color: 'green' };
      case 4: return { label: 'Very Strong', color: 'teal' };
      default: return { label: '', color: 'gray' };
    }
  };

  const checkUsernameAvailability = async (name) => {
    setCheckingUsername(true);
    try {
      const q = query(collection(db, 'users'), where('username', '==', name.toLowerCase()));
      const snapshot = await getDocs(q);
      const available = snapshot.empty;
      setIsUsernameAvailable(available);
      return available;
    } catch (err) {
      console.error("Username check error:", err);
      return false;
    } finally {
      setCheckingUsername(false);
    }
  };

  const handleSubmit = async () => {
    if (!username || !email || !password) {
      Alert.alert("Missing Info", "All fields are required.");
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (!isValidUsername(username)) {
      Alert.alert("Invalid Username", "Username must be at least 3 characters and only include letters, numbers, or underscores.");
      return;
    }
    if (!isValidPassword(password)) {
      Alert.alert("Weak Password", "Password must contain at least 1 uppercase letter, 1 number, and be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Passwords Don't Match", "Please re-enter your password.");
      return;
    }

    const usernameAvailable = await checkUsernameAvailability(username);
    if (!usernameAvailable) {
      Alert.alert("Username Taken", "Please choose another username.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.toLowerCase(), password);
      const uid = userCredential.user.uid;
      await setDoc(doc(db, 'users', uid), {
        username: username.toLowerCase(),
        email: email.toLowerCase(),
      });
      await sendEmailVerification(userCredential.user);
      router.replace({ pathname: '/SignupSuccess', params: { username: username.toLowerCase() } });
    } catch (err) {
      console.error("Signup Error:", err.message);
      Alert.alert("Signup Failed", err.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <ThemedView style={styles.container}>
            <ThemedText title={true} bold style={styles.title}>Create account</ThemedText>

            <View style={{ width: '80%', alignItems: 'flex-start' }}>
              <ThemedText title={true} style={styles.subtext}>Username</ThemedText>
            </View>
            <Spacer height={10} />
            <ThemedTextInput
              style={{ width: '80%', marginBottom: 5, borderRadius: 10 }}
              placeholder="Username"
              onChangeText={(text) => {
                setUsername(text);
                if (text.length >= 3) checkUsernameAvailability(text);
                else setIsUsernameAvailable(null);
              }}
              value={username}
              placeholderColor='#fff'
            />

            {username.length >= 3 && (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                {checkingUsername ? (
                  <Ionicons name="time-outline" size={20} color="#999" style={{ marginRight: 5 }} />
                ) : isUsernameAvailable === null ? null : isUsernameAvailable ? (
                  <Ionicons name="checkmark-circle" size={20} color="green" style={{ marginRight: 5 }} />
                ) : (
                  <Ionicons name="close-circle" size={20} color="red" style={{ marginRight: 5 }} />
                )}
                <Text style={{ color: isUsernameAvailable === null ? '#999' : isUsernameAvailable ? 'green' : 'red', fontSize: 12 }}>
                  {checkingUsername ? 'Checking username...' : isUsernameAvailable ? 'Username is available' : 'Username is taken'}
                </Text>
              </View>
            )}

            <View style={{ width: '80%', alignItems: 'flex-start' }}>
              <ThemedText title={true} style={styles.subtext}>Email</ThemedText>
            </View>
            <Spacer height={10} />
            <ThemedTextInput
              style={{ width: '80%', marginBottom: 20, borderRadius: 10 }}
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
              placeholderColor='#fff'
            />

            <View style={{ width: '80%', alignItems: 'flex-start' }}>
              <ThemedText title={true} style={styles.subtext}>Password</ThemedText>
            </View>
            <Spacer height={10} />
            <ThemedTextInput
              style={{ width: '80%', marginBottom: 20, borderRadius: 10 }}
              placeholder="Password"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={!showPassword}
              rightIcon={
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="gray" onPress={() => setShowPassword(prev => !prev)} />
              }
              placeholderColor='#fff'
            />
            {password.length > 0 && (
              <Text style={{ color: getPasswordStrength(password).color, fontSize: 12, marginBottom: 10, fontWeight: 'bold' }}>
                Password Strength: {getPasswordStrength(password).label}
              </Text>
            )}

            <View style={{ width: '80%', alignItems: 'flex-start' }}>
              <Text style={styles.smalltext}>At least 1 uppercase</Text>
              <Text style={styles.smalltext}>At least 1 number</Text>
              <Text style={styles.smalltext}>At least 8 character</Text>
            </View>

            <Spacer height={10} />
            <View style={{ width: '80%', alignItems: 'flex-start' }}>
              <ThemedText title={true} style={styles.subtext}>Re-enter password</ThemedText>
            </View>
            <Spacer height={10} />
            <ThemedTextInput
              style={{ width: '80%', marginBottom: 10, borderRadius: 10 }}
              placeholder="Re-enter Password"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              secureTextEntry={!showConfirmPassword}
              rightIcon={
                <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={20} color="gray" onPress={() => setShowConfirmPassword(prev => !prev)} />
              }
              placeholderColor="#fff"
            />

            {confirmPassword.length > 0 && (
              <Text style={{ color: password === confirmPassword ? 'green' : 'red', marginBottom: 10 }}>
                {password === confirmPassword ? "Passwords match" : "Passwords do not match"}
              </Text>
            )}

            <ThemedButton style={{ borderRadius: 10 }} onPress={handleSubmit}>
              <ThemedText bold style={{ color: '#200448', textAlign: 'center', fontSize: 14 }}>Sign Up</ThemedText>
            </ThemedButton>

            <Spacer height={20} />
            <Link href='/Login'>
              <ThemedText style={styles.link}>Back to login</ThemedText>
            </Link>

          </ThemedView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  title: {
    textAlign: 'left',
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    width: '80%',
  },
  subtext: {
    fontSize: 18,
    fontWeight: 'regular',
    fontFamily: 'Poppins-Regular'
  },
  smalltext: {
    color: '#ffffff',
    fontSize: 10,
    fontStyle: 'italic',
    fontWeight: '300',
    fontFamily: 'Poppins-Regular'
  },
  link: {
    fontSize: 14
  }
});
