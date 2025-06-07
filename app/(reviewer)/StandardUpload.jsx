import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons"

import * as DocumentPicker from 'expo-document-picker';
import { Alert } from 'react-native';

import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import ThemedLogo from '../../components/ThemedLogo'
import Separator from '../../components/Separator'
import ThemedSecondaryButton from '../../components/ThemedSecondaryButton'
import { Colors } from '../../constants/Colors'
import { useFonts } from '@expo-google-fonts/poppins';
import React from 'react';

import { Poppins_100Thin, Poppins_400Regular, Poppins_500Medium, 
  Poppins_600SemiBold, Poppins_600SemiBold_Italic, 
  Poppins_700Bold, Poppins_900Black } from '@expo-google-fonts/poppins';

const StandardUpload = () => {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_100Thin,
        Poppins_600SemiBold_Italic,
        Poppins_900Black,
        Poppins_700Bold,
        Poppins_600SemiBold
  })
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


      <ThemedText style={styles.title}>Reviewer Generator</ThemedText>
      <ThemedText style={styles.subTitle}>Standard Summarization</ThemedText>
      <ThemedText style={styles.desc}>
        Revio will summarize your files for you! Revio will also 
        provide you a Pomodoro timer to help you focus!
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
};


export default StandardUpload

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 30
  },
  title:{
    fontSize: 36,
    fontFamily: 'Poppins_700Bold',
    
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
    fontFamily: 'Poppins_300Light',
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
    fontFamily: 'Poppins_400Regular'
  },
  subTitle:{
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold'

  }


})