import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons"
//for the upload a file btn
import * as DocumentPicker from 'expo-document-picker';
import { Alert } from 'react-native';
//themed componenets
import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import Separator from '../../components/Separator'
import { Colors } from '../../constants/Colors'
import React from 'react';
import useCustomFonts from '../../hooks/useCustomFonts'

const AcronymUpload = () => {
  const router = useRouter();
  const [fontsLoaded] = useCustomFonts();
  if (!fontsLoaded) return null;

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/pdf',                                                         // PDF
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

      <ThemedText style={styles.title}>Acronym Mnemonics</ThemedText>
      <ThemedText style={styles.desc}>
        Acronym mnemonics is a powerful tool that enhances memory and 
        recall by associating information with memorable phrases or 
        words, making learning easier and more efficient
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
      {/* temporary just to view the loading screen */}
      <ThemedButton onPress={() => router.push("/LoadingScreen")}
        style={[{
          borderRadius: 7, 
          borderColor:"#B5B5FF",
          borderWidth: 1 , 
          backgroundColor:'#2E2E40',
          width: '100%',
          padding: 15
        }]}
      >
        <ThemedText >Loading Screen</ThemedText>
      </ThemedButton>
      {/* temporary just to view the result of the flashcards */}
      <ThemedButton onPress={() => router.push('/ACFlashcardsResult')}
        style={[{
          borderRadius: 7, 
          borderColor:"#B5B5FF",
          borderWidth: 1 , 
          backgroundColor:'#2E2E40',
          width: '100%',
          padding: 15
        }]}
      >
        <ThemedText >Results</ThemedText>
      </ThemedButton>
      {/* temporary just to view the editor */}
      <ThemedButton onPress={() => router.push('/ACFlashcardsEditor')}
        style={[{
          borderRadius: 7, 
          borderColor:"#B5B5FF",
          borderWidth: 1 , 
          backgroundColor:'#2E2E40',
          width: '100%',
          padding: 15
        }]}
      >
        <ThemedText >Editor</ThemedText>
      </ThemedButton>
    </ThemedView>
  );
};

export default AcronymUpload

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