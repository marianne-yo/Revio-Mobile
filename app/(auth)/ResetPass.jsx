import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
//icon imports
import { Ionicons } from '@expo/vector-icons';
//Themed components
import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
//imported the fonts
import useCustomFonts from '../../hooks/useCustomFonts'

const ResetPass = () => {
  const [fontsLoaded] = useCustomFonts();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  if (!fontsLoaded) return null;
  
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>
        Reset Password
      </ThemedText>
      <ThemedText style={styles.subText}>New Password</ThemedText>
      
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

    <ThemedText style={styles.subText}>Re-enter Password</ThemedText>
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

      <ThemedButton style={{borderRadius: 10}}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </ThemedButton>

    </ThemedView>
  )
}

export default ResetPass

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title:{
    textAlign:'left',
    fontSize: 32,
    margin: 10,
    marginBottom: 5,
    fontFamily: 'Poppins-SemiBold',
    alignSelf:'flex-start',
    paddingHorizontal: 30
  },
  subText:{
    textAlign:'left',
    fontSize: 20,
    margin: 10,
    fontFamily: 'Poppins-Regular',
    alignSelf:'flex-start',
    paddingHorizontal: 30
  },
  buttonText: {
    color: '#200448',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Bold'
  },
})