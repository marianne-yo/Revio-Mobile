// screens/FolderDetail.jsx
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ThemedView from '../../components/ThemedView';
import Spacer from '../../components/Spacer';
import ThemedText from '../../components/ThemedText';
import Separator from '../../components/Separator';

const placeholderFiles = {
  ac: [
    { id: '1', name: 'Software Process Models' },
    { id: '2', name: 'Networking Acronyms' },
  ],
  td: [
    { id: '3', name: 'Database Terms' },
    { id: '4', name: 'Security Definitions' },
  ],
  sr: [
    { id: '5', name: 'OOP Concepts' },
    { id: '6', name: 'Web Dev Summary' },
  ],
};

const FolderDetail = () => {
  const route = useRoute();
  const router = useRouter();
  const { folder } = useLocalSearchParams();

  if (!folder || typeof folder !== 'string') {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>Invalid folder selected.</ThemedText>
      </ThemedView>
    );
  }

  const folderKey = folder.toLowerCase().includes('acronym')
    ? 'ac'
    : folder.toLowerCase().includes('term')
    ? 'td'
    : 'sr';

  const files = placeholderFiles[folderKey];

  const openFile = (file) => {
    // eventually push to a screen to view/edit that flashcard
    navigation.navigate('FlashcardView', { file });
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

      <Spacer height={20} />
      <ThemedText style={styles.title}>{folder}</ThemedText>
      <Separator style={styles.separator} />
      <FlatList
        data={files}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.file} onPress={() => openFile(item)}>
            <Ionicons name='document-text-outline' size={24} color='#B5B5FF' style={{ marginRight: 10 }} />
            <Text style={styles.fileText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
};

export default FolderDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  separator: {
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
    width: '100%'
  },
  file: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#565656',
  },
  fileText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Poppins-Regular'
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
    justifyContent: 'center',
    marginHorizontal: 5,
    marginTop: 5
  },
});
