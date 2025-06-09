import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons"

import * as DocumentPicker from 'expo-document-picker';
import { Alert } from 'react-native';

import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import { Colors } from '../../constants/Colors'
import React from 'react';

import useCustomFonts from '../../hooks/useCustomFonts'

const TDUpload = () => {
    const router = useRouter();
    const [fontsLoaded] = useCustomFonts();
    if (!fontsLoaded) return null; // prevent flashing default font
    const handleFileUpload = async () => {
        try {
        const result = await DocumentPicker.getDocumentAsync({
            type: [
            'application/pdf',                        // PDF
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
            'application/vnd.openxmlformats-officedocument.presentationml.presentation' // PPTX
            ],
            copyToCacheDirectory: true,
            multiple: false
        });


        if (result.canceled) {
            console.log('User cancelled the picker');
            return;
        }

        const file = result.assets[0]; // file.uri, file.name, file.size
        console.log('Selected file:', file);

        // Do something with the file
        Alert.alert('File Selected', file.name);

        } catch (err) {
        console.error('File upload error:', err);
        Alert.alert('Error', 'Something went wrong while selecting the file.');
        }
    };
  return (
    <ThemedView style={styles.container}>
      <View style={styles.backContainer}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          onPress={() => router.back()}
        />
        <ThemedText style={styles.backText}>Back</ThemedText>
      </View>


      <ThemedText style={styles.title}>Terms and Definition</ThemedText>
      <ThemedText style={styles.desc}>
        Revio will help you memorizing terms and definitions. The study technique associated
        with flashcards is the Leitner study technique. The Leitner System is a spaced repetition technique for learning with flashcards.
      </ThemedText>

      <Spacer height={20}/>
      <View style={styles.uploadContainer}>
        <ThemedButton onPress={handleFileUpload} style={{ backgroundColor: '#B5B5FF', borderRadius: 4 }}>
          <ThemedText style={{ textAlign: 'center', color: '#200448', fontWeight: 'bold' }}>
            Upload File
          </ThemedText>
      </ThemedButton>
      <ThemedText style={styles.uploadSmallText}>Please upload a  file with .docx , .pdf , .ppt</ThemedText>
      </View>
    </ThemedView>
  );
}

export default TDUpload

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 30
  },
  title:{
    fontSize: 36,
    fontFamily: 'Poppins-Bold',
    
  },
  separator: {
    borderBottomColor: '#cccccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
    marginVertical: 10,
  },
  uploadContainer: {
  backgroundColor: '#2E2E40',
  borderColor: '#565656',
  borderWidth: 1,
  borderRadius: 7,
  width: '100%',
  paddingVertical: 20,
  justifyContent: 'center',
  alignItems: 'center'
  },
  uploadSmallText:{
    fontSize: 10,
    fontFamily: 'Poppins-Light',
    fontStyle: 'italic',
    color: '#d3d3d3'
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  backText: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    justifyContent:'center',
    marginHorizontal: 5,
    marginTop: 5
  },
  desc:{
    fontSize: 12,
    fontFamily: 'Poppins-Regular'
  }
})