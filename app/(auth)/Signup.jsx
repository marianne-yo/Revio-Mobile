import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'

const Signup = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={styles.container}>
            <Spacer />
            <ThemedText title={true} style={styles.title}>
                Create account
            </ThemedText>

            {/* Username */}
            <ThemedText title={true} style={styles.subtext}>
                Username
            </ThemedText>
            <Spacer height={10}/>
            <ThemedTextInput 
                style={{ width: '80%', marginBottom: 20}}
                placeholder="Username"
                keyboardType="email-address"
                // onChangeText={setEmail}
                // value={email}
                placeholderColor='#fff'
            />

            {/* email */}
            <ThemedText title={true} style={styles.subtext}>
                Email
            </ThemedText>
            <Spacer height={10}/>
            <ThemedTextInput 
                style={{ width: '80%', marginBottom: 20}}
                placeholder="Email"
                keyboardType="email-address"
                // onChangeText={setEmail}
                // value={email}
                placeholderColor='#fff'
            />

            {/* Password */}
            <ThemedText title={true} style={styles.subtext}>
                Password
            </ThemedText>
            <Spacer height={10}/>
            <ThemedTextInput 
                style={{ width: '80%', marginBottom: 20}}
                placeholder="Password"
                // onChangeText={setPassword}
                // value={password}
                secureTextEntry
                placeholderColor='#fff'
            />

            <Text style={styles.smalltext}>At least 1 uppercase</Text>
            <Text style={styles.smalltext}>At least 1 number</Text>
            <Text style={styles.smalltext}>At least 8 character</Text>

            <Spacer height={10}/>
            {/* Re-enter Password */}
            <ThemedText title={true} style={styles.subtext}>
                Re-enter password
            </ThemedText>
            <Spacer height={10}/>
            <ThemedTextInput 
                style={{ width: '80%', marginBottom: 20}}
                placeholder="Password"
                // onChangeText={setPassword}
                // value={password}
                secureTextEntry
                placeholderColor='#fff'
            />

            <ThemedButton style={{borderRadius: 10}}>
                <Text style={{
                    color: '#200448', 
                    textAlign: 'center',
                    fontSize: 14,
                    fontWeight: 'bold',
                }}>
                    Sign Up
                </Text>
            </ThemedButton>


        </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default Signup

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title:{
        textAlign:'left',
        fontSize: 32,
        marginBottom: 30,
    },
    subtext:{
        fontSize: 20,
        textAlign: 'left'
    },
    smalltext:{
        // alignContent:'flex-start',
        // alignSelf:'flex-start',
        color: '#ffffff',
        fontSize:10,
        fontStyle:'italic',
        fontWeight:'300'
    }
})