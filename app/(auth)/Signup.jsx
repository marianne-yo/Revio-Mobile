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
            
            <ThemedText title={true} style={styles.title}>
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
                keyboardType="email-address"
                // onChangeText={setEmail}
                // value={email}
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
                // onChangeText={setEmail}
                // value={email}
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
                // onChangeText={setPassword}
                // value={password}
                secureTextEntry
                placeholderColor='#fff'
            />

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
                style={{ width: '80%', marginBottom: 20, borderRadius: 10}}
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
        alignItems: 'center', // This centers all children by default
        padding: 5
    },
    title:{
        textAlign:'left', // This only works if the text's container has a width
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30,
        width: '80%',
    },
    subtext:{
        fontSize: 18,
        fontWeight: 'regular',
    },
    smalltext:{
        color: '#ffffff',
        fontSize: 10,
        fontStyle:'italic',
        fontWeight:'300'
    }
})