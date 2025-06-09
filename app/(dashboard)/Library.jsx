import { StyleSheet, Text, TouchableWithoutFeedback, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native'

import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import ThemedLogo from '../../components/ThemedLogo'
import Separator from '../../components/Separator'
import ThemedSecondaryButton from '../../components/ThemedSecondaryButton'

import useCustomFonts from '../../hooks/useCustomFonts'

//this makes the predefined folders
const folders = [
  { id: 'a1', name: 'Acronym Mnemonics Flashcards'},
  { id: 'q2', name: 'Terms and Definitions Flashcards'},
  { id: 's3', name: 'Summarized Reviewers'},
]

const Library = () => {
  const navigation = useNavigation();
  const [fontsLoaded] = useCustomFonts();

  if (!fontsLoaded) return null; // prevent flashing default font

  const renderFolder = ({ item }) => (
    <TouchableOpacity
      style={styles.folder}
      onPress={() => navigation.navigate('FolderDetail', { folder: item.name })}
    >
      <Ionicons name='folder' size={32} style={styles.folderIcon} />
      <Text style={styles.folderText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <Spacer height={30} />
      <ThemedText style={styles.title}>LIBRARY</ThemedText>
      <Separator style={styles.separator} />
      <Spacer height={20} />
      <FlatList
        data={folders}
        renderItem={renderFolder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.folderList}
      />
    </ThemedView>
  );
};

export default Library

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0D0D14',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 50,
    padding: 30,
  },
  title: {
    fontSize: 36,
    color: '#fff',
    textAlign: 'left',
    fontFamily: 'Poppins-Bold'
  },
  separator: {
    // borderBottomColor: '#cccccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
    // marginVertical: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  folderList: {
    // paddingBottom: 20,
    width: '100%',
  },
  folder: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#1A1A2E',
    borderBottomColor: '#959393',
    borderBottomWidth: 0.5,
    padding: 15,
    marginBottom: 5,
    width: '100%',
  },
  folderIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    color: '#F8F6FA',
  },
  folderText: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
});
