import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, Alert, View, 
    KeyboardAvoidingView,
    Platform,
    ScrollView
 } from 'react-native';
import React from 'react'
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
//icon imports
import { Ionicons } from '@expo/vector-icons';
//firebase imports
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebaseConfig';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { sendEmailVerification } from 'firebase/auth';
//themed imports
import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import { Poppins_100Thin, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_900Black, useFonts } from '@expo-google-fonts/poppins';

const Signup = () => {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_100Thin,
        Poppins_600SemiBold_Italic,
        Poppins_900Black,
        Poppins_700Bold
    })
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const router = useRouter();

    const [confirmPassword, setConfirmPassword] = useState('');

    const handlTemporarySuc = () => {
        router.push('/SignupSuccess')
    }
    // Basic regex for email
    const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Username must be at least 3 chars, only letters/numbers/underscores
    const isValidUsername = (username) =>
    /^[a-zA-Z0-9_]{3,}$/.test(username);

    // Password must be at least 6 characters
    const isValidPassword = (password) =>
    /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const getPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++; // symbols

        switch (strength) {
            case 0:
            case 1: return { label: 'Weak', color: 'red' };
            case 2: return { label: 'Okay', color: 'orange' };
            case 3: return { label: 'Strong', color: 'green' };
            case 4: return { label: 'Very Strong', color: 'teal' };
            default: return { label: '', color: 'gray' };
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
            Alert.alert(
            "Invalid Username",
            "Username must be at least 3 characters and only include letters, numbers, or underscores."
            );
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


        try {
            // 🔎 Check if username already exists
            const qUsername = query(collection(db, 'users'), where('username', '==', username.toLowerCase()));
            const qEmail = query(collection(db, 'users'), where('email', '==', email.toLowerCase()));

            const [usernameSnap, emailSnap] = await Promise.all([
            getDocs(qUsername),
            getDocs(qEmail)
            ]);

            if (!usernameSnap.empty) {
            Alert.alert("Username Taken", "Please choose another username.");
            return;
            }

            if (!emailSnap.empty) {
            Alert.alert("Email Already In Use", "Try logging in instead.");
            return;
            }

            if (password !== confirmPassword) {
                Alert.alert("Passwords Don't Match", "Please re-enter your password.");
                return;
            }


            // creates user and save info
            const userCredential = await createUserWithEmailAndPassword(auth, email.toLowerCase(), password);
            const uid = userCredential.user.uid;

            await setDoc(doc(db, 'users', uid), {
            username: username.toLowerCase(),
            email: email.toLowerCase()
            });

            await sendEmailVerification(userCredential.user);
            Alert.alert(
            "Verify Your Email",
            "A verification link has been sent to your email. Please verify before logging in."
            );
            router.replace('/Login');
        } catch (err) {
            console.error("Signup Error:", err.message);
            Alert.alert("Signup Failed", err.message);
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
                    
                    <ThemedText title={true} bold style={styles.title}>
                        Create account
                    </ThemedText>

                    {/* Username */}
                    <View style={{ width: '80%', alignItems: 'flex-start' }}>
                        <ThemedText title={true} style={styles.subtext}>
                            Username
                        </ThemedText>
                    </View>
                    <Spacer height={10}/>
                    <ThemedTextInput
                        style={{ width: '80%', marginBottom: 20, borderRadius: 10}}
                        placeholder="Username"
                        onChangeText={setUsername}
                        value={username}
                        placeholderColor='#fff'
                    />

                    {/* email */}
                    <View style={{ width: '80%', alignItems: 'flex-start' }}>
                        <ThemedText title={true} style={styles.subtext}>
                            Email
                        </ThemedText>
                    </View>
                    <Spacer height={10}/>
                    <ThemedTextInput
                        style={{ width: '80%', marginBottom: 20, borderRadius: 10}}
                        placeholder="Email"
                        keyboardType="email-address"
                        onChangeText={setEmail}
                        value={email}
                        placeholderColor='#fff'
                    />

                    {/* Password */}
                    <View style={{ width: '80%', alignItems: 'flex-start' }}>
                        <ThemedText title={true} style={styles.subtext}>
                            Password
                        </ThemedText>
                    </View>
                    <Spacer height={10}/>
                    <ThemedTextInput
                        style={{ width: '80%', marginBottom: 20, borderRadius: 10}}
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
                        placeholderColor='#fff'
                    />
                    {password.length > 0 && (
                    <Text style={{
                        color: getPasswordStrength(password).color,
                        fontSize: 12,
                        marginBottom: 10,
                        fontWeight: 'bold'
                    }}>
                        Password Strength: {getPasswordStrength(password).label}
                    </Text>
                    )}


                    <View style={{ width: '80%', alignItems: 'flex-start' }}>
                        <Text style={styles.smalltext}>At least 1 uppercase</Text>
                        <Text style={styles.smalltext}>At least 1 number</Text>
                        <Text style={styles.smalltext}>At least 8 character</Text>
                    </View>

                    <Spacer height={10}/>
                    {/* Re-enter Password */}
                    <View style={{ width: '80%', alignItems: 'flex-start' }}>
                        <ThemedText title={true} style={styles.subtext}>
                            Re-enter password
                        </ThemedText>
                    </View>
                    <Spacer height={10}/>
                    <ThemedTextInput
                        style={{ width: '80%', marginBottom: 10, borderRadius: 10 }}
                        placeholder="Re-enter Password"
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                        secureTextEntry={!showConfirmPassword}
                        rightIcon={
                            <Ionicons 
                            name={showConfirmPassword ? 'eye-off' : 'eye'}
                            size={20}
                            color="gray"
                            onPress={() => setShowConfirmPassword(prev => !prev)}
                            />
                        }
                        placeholderColor="#fff"
                    />

                    {confirmPassword.length > 0 && (
                        <Text style={{ 
                            color: password === confirmPassword ? 'green' : 'red',
                            marginBottom: 10
                        }}>
                            {password === confirmPassword ? "Passwords match" : "Passwords do not match"}
                        </Text>
                        )}




                    <ThemedButton style={{ borderRadius: 10 }} onPress={handleSubmit}>
                        <ThemedText bold style={{
                            color: '#200448',
                            textAlign: 'center',
                            fontSize: 14,
                        }}>
                            Sign Up
                        </ThemedText>
                    </ThemedButton>


                    <Spacer height={20}/>

                    <Link href='/Login' >
                        <ThemedText style={styles.link}>Back to login</ThemedText>
                    </Link>

                    <ThemedButton style={{ borderRadius: 10 }} onPress={handlTemporarySuc}>
                        <ThemedText bold style={{
                            color: '#200448',
                            textAlign: 'center',
                            fontSize: 14,
                        }}>
                            Temporary Success
                        </ThemedText>
                    </ThemedButton>

                </ThemedView>
            </ScrollView>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default Signup

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    title:{
        textAlign:'left',
        fontSize: 32,
        fontFamily: 'Poppins_700Bold',
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20,
        width: '80%',
    },
    subtext:{
        fontSize: 18,
        fontWeight: 'regular',
        fontFamily: 'Poppins_400Regular'
    },
    smalltext:{
        color: '#ffffff',
        fontSize: 10,
        fontStyle:'italic',
        fontWeight:'300',
        fontFamily: 'Poppins_400Regular'
    },
    link:{
        fontSize: 14
    }
})