import { StyleSheet, Text, View, TouchableWithoutFeedback, Button } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons"

import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import ThemedLogo from '../../components/ThemedLogo'
import Separator from '../../components/Separator'
import ThemedSecondaryButton from '../../components/ThemedSecondaryButton'
import { Colors } from '../../constants/Colors'

import { useRouter } from 'expo-router';

const StudyTools = () => {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
        
      <ThemedText
        style={styles.title}
      >
        Study Tools
      </ThemedText>

      <Spacer height={20}/>
      {/* flashcards maker */}
      <ThemedText
        style={styles.subText}
      >
        Flashcards Maker
      </ThemedText>

      <Spacer height={15}/>

      <ThemedText
        style={styles.desc}
      >
        Using mnemonics helps you memorize faster
      </ThemedText>

      <ThemedButton 
        onPress={() => router.push("/(flashcards)/AcronymUpload")}
        style={[{
          borderRadius: 7, 
          borderColor:"#565656",
          borderWidth: 1 , 
          backgroundColor:'#2E2E40',
          width: '100%',
          padding: 15
        }]}
      >
        <ThemedText style={styles.STbtnText}>
          Acronym Mnemonics
        </ThemedText>
      </ThemedButton>


      <Spacer height={10}/>

      <ThemedText
        style={styles.desc}
      >
        Utilize using Leitner technique in studying
      </ThemedText>
      <ThemedButton 
        onPress={() => router.push("/(flashcards)/TDUpload")}
        style={[{
          borderRadius: 7, 
          borderColor:"#565656",
          borderWidth: 1 , 
          backgroundColor:'#2E2E40',
          width: '100%',
          padding: 15
        }]}
      >
        <ThemedText style={styles.STbtnText}>
          Terms and Definitions
        </ThemedText>
      </ThemedButton>

      {/* reviewer generator */}
      <Spacer height={10}/>
      <ThemedText
        style={styles.subText}
      >
        Reviewer Generator
      </ThemedText>

      <Spacer height={15}/>

      <ThemedText
        style={styles.desc}
      >
        Study using a Pomodoro timer
      </ThemedText>

      <ThemedButton 
        onPress={() => router.push("/(reviewer)/StandardUpload")}
        style={[{
          borderRadius: 7, 
          borderColor:"#565656",
          borderWidth: 1 , 
          backgroundColor:'#2E2E40',
          width: '100%',
          padding: 15
        }]}
      >
        <ThemedText style={styles.STbtnText}>
          Standard Summarization
        </ThemedText>
      </ThemedButton>

      <Spacer height={1}/>

      <ThemedButton 
        onPress={() => router.push("/(reviewer)/SumAIUpload")}
        style={[{
          borderRadius: 7, 
          borderColor:"#B5B5BFF",
          borderWidth: 1 , 
          backgroundColor:'#2E2E40',
          width: '100%',
          padding: 15
        }]}
      >
        <ThemedText style={styles.STbtnText}>
          Summarization <Ionicons name='add' size={18} />  AI Explanation
        </ThemedText>
        
      </ThemedButton>

      <Spacer height={10}/>

    </ThemedView>
  )
}

export default StudyTools

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 30
  },
  title:{
    fontSize: 36,
    fontWeight: 'bold'
  },
  separator: {
    borderBottomColor: '#cccccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
    marginVertical: 10,
  },
  subText:{
    fontSize: 20,
    fontWeight: 'bold',
  },
  desc:{
    fontSize: 10,
    fontWeight: 'light'
  },
  STbutton:{
    backgroundColor: '#2E2E40',
    borderColor: '#565656',
    borderRadius: 7,
    borderWidth: 1,
    color: '##2E2E40'
  },
  STbtnText:{
    fontSize: 14,
    textAlign: 'center',
    color: '#ffffff'
  }
})