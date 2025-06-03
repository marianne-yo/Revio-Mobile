import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { useState } from 'react'
import { useRouter } from 'expo-router'

import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import ThemedLogo from '../../components/ThemedLogo'
import Separator from '../../components/Separator'
import ThemedSecondaryButton from '../../components/ThemedSecondaryButton'
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter();

    const handleSubmit = () => {
        console.log("login form is submitted", email, password)
    }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={styles.container}>

            <ThemedLogo style={styles.logo}/>

            <Spacer height={5}/>
            <ThemedText title={true} style={[styles.title]}>
                Hello!
            </ThemedText>

            <ThemedTextInput 
                style={{ width: '80%', marginBottom: 20}}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={setEmail}
                value={email}
                placeholderColor='#fff'
            />

            <ThemedTextInput 
                style={{ width: '80%', marginBottom: 20}}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />

            <ThemedButton onPress={handleSubmit}>
                <Text style={{
                    color: '#200448', 
                    textAlign: 'center',
                    fontSize: 14,
                    fontWeight: 'bold',
                }}>
                    Login
                </Text>
            </ThemedButton>

            <Link href='/ForgotPass' style={styles.link}>
                <ThemedText>Forgot Password?</ThemedText>
            </Link>

            <Separator />

            <ThemedSecondaryButton onPress={() => router.push('/Signup')}>
                {(pressed) => (
                    <Text style={{
                        color: pressed ? '#200448' : '#B5B5FF',
                        textAlign: 'center',
                        fontSize: 14,
                        fontWeight: '600',
                    }}>
                        Signup
                    </Text>
                )}
            </ThemedSecondaryButton>

        </ThemedView>
    </TouchableWithoutFeedback>
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
        marginBottom: 30,
        fontWeight:'bold',
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

    }
})