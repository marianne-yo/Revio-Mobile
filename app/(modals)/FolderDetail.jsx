import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ThemedView from '../../components/ThemedView';
import Spacer from '../../components/Spacer';
import ThemedText from '../../components/ThemedText';
import Separator from '../../components/Separator';
import { getFolderReviewers } from '../../lib/data/reviewerFlashcards';
import useCustomFonts from '../../hooks/useCustomFonts' //imported fonts
const FolderDetail = () => {
  const router = useRouter();
  const { folder } = useLocalSearchParams();
  const [fontsLoaded] = useCustomFonts();
  if (!fontsLoaded) return null;
  
  const folderMap = {
    'acronym mnemonics flashcards': 'AcronymMnemonics',
    'terms and definitions flashcards': 'TermsAndCondition',
    'summarized reviewers': 'SummarizedReviewers'
  };

  const folderId = folderMap[folder?.toLowerCase()];
  const files = getFolderReviewers(folderId);

  if (!folderId) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>Invalid folder selected.</ThemedText>
      </ThemedView>
    );
  }

  const openFile = (file) => {
    if (file.questions) {
      router.push('/(flashcards)/TDFlashcardsResult?file=' + encodeURIComponent(JSON.stringify(file)));
    } else if (file.sections) {
      // Decide based on some logic (e.g. ID or metadata)
      const isAI = file.id.startsWith('ai'); // Example condition
      const screen = isAI ? 'SumAIReviewerResult' : 'StandardReviewerResult';
      router.push(`/(reviewer)/${screen}?file=` + encodeURIComponent(JSON.stringify(file)));
    } else {
      router.push('/(flashcards)/ACFlashcardsResult?file=' + encodeURIComponent(JSON.stringify(file)));
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Spacer />
      <View style={styles.backContainer}>
        <Ionicons name="arrow-back" size={24} color="white" onPress={() => router.back()} />
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
            <Text style={styles.fileText}>{item.title}</Text>
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
    marginHorizontal: 5,
    marginTop: 5
  },
});