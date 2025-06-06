import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, Alert, View, 
    KeyboardAvoidingView,
    Platform,
    ScrollView
 } from 'react-native';
import React from 'react'
import { Link } from 'expo-router'
import { useState } from 'react'
import { useRouter } from 'expo-router'
//icon imports
import { Ionicons } from '@expo/vector-icons';
//firebase imports
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../lib/firebaseConfig';
import { sendEmailVerification } from 'firebase/auth';

import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import ThemedLogo from '../../components/ThemedLogo'
import Separator from '../../components/Separator'
import ThemedSecondaryButton from '../../components/ThemedSecondaryButton'

import { Poppins_100Thin, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_900Black, useFonts } from '@expo-google-fonts/poppins';

const Login = () => {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_100Thin,
        Poppins_600SemiBold_Italic,
        Poppins_900Black,
        Poppins_700Bold,
        Poppins_600SemiBold
    })
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [unverifiedUser, setUnverifiedUser] = useState(null);


    const handleSubmit = async () => {
        if (!emailOrUsername || !password) {
            Alert.alert('Missing fields', 'Please enter all fields');
            return;
        }

        let loginEmail = emailOrUsername;

        // If it's not an email, looks up the username
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrUsername);
        if (!isEmail) {
            try {
                const q = query(collection(db, 'users'), where('username', '==', emailOrUsername.toLowerCase()));
                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) {
                    Alert.alert('Login Failed', 'Username not found');
                    return;
                }
                loginEmail = querySnapshot.docs[0].data().email;
            } catch (err) {
                console.error('Username lookup error:', err);
                Alert.alert('Login Failed', 'Could not find matching user');
                return;
            }
        }

        // Try logging in with the email
        try {
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, password);

        if (!userCredential.user.emailVerified) {
            setUnverifiedUser(userCredential.user); // save user for resend
            Alert.alert("Email Not Verified", "Please verify your email before logging in.");
            return;
        }
        // Alert.alert('Success', `Welcome ${userCredential.user.email}`);
        router.replace('/StudyTools');
        } catch (err) {
        console.error('Login error:', err.message);
        Alert.alert('Login Failed', err.message);
        }
    };

  return (
    <KeyboardAvoidingView 
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled">
                    <ThemedView style={styles.container}>

                        <ThemedLogo style={styles.logo}/>

                        <Spacer height={5}/>
                        <ThemedText title={true} style={[styles.title]}>
                            Hello!
                        </ThemedText>

                        <ThemedTextInput 
                                style={{ width: '80%', marginBottom: 20 }}
                                placeholder="Email or Username"
                                onChangeText={setEmailOrUsername}
                                value={emailOrUsername}
                            />

                            <ThemedTextInput 
                            style={{ width: '80%', marginBottom: 20 }}
                            placeholder="Password"
                            onChangeText={setPassword}
                            value={password}
                            secureTextEntry={!showPassword}
                            rightIcon={
                                <Ionicons 
                                name={showPassword ? 'eye-off' : 'eye'} 
                                size={20} 
                                color="gray" 
                                onPress={() => setShowPassword(prev => !prev)} 
                                />
                            }
                            />

                            <ThemedButton onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Login</Text>
                            </ThemedButton>

                            {unverifiedUser && (
                            <ThemedButton
                                onPress={async () => {
                                try {
                                    await sendEmailVerification(unverifiedUser);
                                    Alert.alert("Verification Email Sent", "Please check your inbox.");
                                } catch (err) {
                                    Alert.alert("Error", "Could not send verification email.");
                                    console.error("Resend verification error:", err.message);
                                }
                                }}
                                style={{ marginTop: 20 }}
                            >
                                <Text style={styles.buttonText}>Resend Verification Email</Text>
                            </ThemedButton>
                            )}


                        <Link href='/ForgotPass' style={styles.link}>
                            <ThemedText>Forgot Password?</ThemedText>
                        </Link>

                        <Separator />

                        <ThemedSecondaryButton onPress={() => router.push('/Signup')}>
                            {(pressed) => (
                                <Text style={{
                                    color: pressed ? '#200448' : '#B5B5FF',
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    fontSize: 14,
                                    fontFamily: 'Poppins_600SemiBold',
                                }}>
                                    Signup
                                </Text>
                            )}
                        </ThemedSecondaryButton>
                    </ThemedView>
            </ScrollView>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title:{
        textAlign:'left',
        fontSize: 48,
        marginBottom: 10,
        fontFamily: 'Poppins_700Bold',
        alignSelf:'flex-start',
        paddingHorizontal: 40
    },
    logo:{
        width: 170,
        height: 170
    },
    link:{
        fontSize: 10,
        fontWeight: 'medium',
        padding: 20,
        color: '#C7E1FF'

    },
    buttonText: {
        color: '#200448',
        textAlign: 'center',
        fontSize: 14,
        // fontWeight: '600',
        fontFamily: 'Poppins_700Bold',
    }
})