import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import ThemedButton from '../../components/ThemedButton';
import Spacer from '../../components/Spacer';
import ThemedFlashcard from '../../components/ThemedFlashcard';
import useCustomFonts from '../../hooks/useCustomFonts' //imported fonts

const ACFlashcardResult = () => {
  const router = useRouter();
  const { file } = useLocalSearchParams();
  const parsedCard = file ? JSON.parse(file) : null;
  const [fontsLoaded] = useCustomFonts();
  if (!fontsLoaded) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    if (parsedCard?.questions) {
      setFlashcards(parsedCard.questions);
    } else if (parsedCard?.content) {
      setFlashcards([parsedCard]);
    }
  }, []);

  const currentCard = flashcards[currentIndex];
  const isAcronym = currentCard?.content !== undefined;

  const frontContent = isAcronym ? (
    <View style={styles.squareContainer}>
      <ThemedText style={styles.cardTitle}>{currentCard.title}</ThemedText>
      {currentCard.content.map(({ letter, word }) => (
        <ThemedText key={letter} style={{ color: '#fff' }}>
          <Text style={{ color: '#E5FF00' }}>{letter}</Text> {word}
        </ThemedText>
      ))}
    </View>
  ) : (
    <View style={styles.squareContainer}>
      <ThemedText style={styles.cardTitle}>{currentCard?.question}</ThemedText>
    </View>
  );

  const backContent = isAcronym ? (
    <View style={styles.squareContainer2}>
      <ThemedText style={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>
        Key Phrase: {currentCard.keyPhrase}
      </ThemedText>
    </View>
  ) : (
    <View style={styles.squareContainer2}>
      <ThemedText style={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>
        Answer: {currentCard?.answer}
      </ThemedText>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.backContainer}>
        <Ionicons name="arrow-back" size={24} color="white" onPress={() => router.back()} />
        <ThemedText style={styles.backText}>Back</ThemedText>
      </View>

      <ThemedText style={styles.title}>{parsedCard?.title || 'Flashcard'}</ThemedText>
      <ThemedText style={styles.subtext}>Tap to flip to reveal the answer</ThemedText>

      <ThemedFlashcard frontContent={frontContent} backContent={backContent} />

      <Spacer />

      <View style={styles.pagination}>
        <Pressable onPress={() => setCurrentIndex((i) => Math.max(i - 1, 0))} disabled={currentIndex === 0}>
          <Ionicons name="arrow-back-circle" size={40} color="#B5B5FF" />
        </Pressable>

        <Spacer width={20} />

        <Pressable onPress={() => setCurrentIndex((i) => Math.min(i + 1, flashcards.length - 1))} disabled={currentIndex === flashcards.length - 1}>
          <Ionicons name="arrow-forward-circle" size={40} color="#B5B5FF" />
        </Pressable>
      </View>

      <Spacer height={20} />
      <View style={styles.actions}>
        <ThemedButton style={styles.editBtn}><ThemedText style={styles.btnText}>Edit</ThemedText></ThemedButton>
        <ThemedButton style={styles.intenseBtn}><ThemedText style={styles.intenseText}>Intense Mode</ThemedText></ThemedButton>
        <ThemedButton style={styles.musicBtn}><Ionicons name="musical-notes" size={18} color="white" /></ThemedButton>
      </View>
    </ThemedView>
  );
};

export default ACFlashcardResult;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    justifyContent: 'center' 
  },
  title: { 
    fontSize: 32, 
    fontFamily: 'Poppins-Bold',
    marginBottom: 8 
  },
  subtext: { 
    fontSize: 12,
    color: '#999', 
    marginBottom: 20 
  },
  cardTitle: { 
    textAlign: 'center', 
    color: '#ccc', 
    fontFamily: 'Poppins-Bold', 
    marginBottom: 12 
  },
  pagination: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  actions: { flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: '100%' 
  },
  editBtn: { backgroundColor: '#B5B5FF', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, width: '30%' },
  btnText: { color: '#200448', fontFamily: 'Poppins-Bold', fontSize: 14, textAlign: 'center' },
  intenseBtn: { borderWidth: 1, borderColor: '#F14C4C', backgroundColor: 'transparent', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, width: '40%' },
  intenseText: { color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 14, textAlign: 'center' },
  musicBtn: { width: 44, height: 44, backgroundColor: '#B5B5FF', justifyContent: 'center', alignItems: 'center', borderRadius: 22 },
  backContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backText: { fontSize: 16, color: 'white', marginHorizontal: 5, marginTop: 5 },
  squareContainer: { width: '100%', backgroundColor: '#5C5C76', padding: 16, borderRadius: 10, borderColor: '#565656', borderWidth: 1, alignItems: 'center' },
  squareContainer2: { width: '100%', backgroundColor: '#2E2E40', padding: 16, borderRadius: 10, borderColor: '#565656', borderWidth: 1, alignItems: 'center' }
});
