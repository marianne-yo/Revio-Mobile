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
import FloatingPlayer from '../../components/FloatingPlayer';
const TDFlashcardsResult = () => {
  const router = useRouter();
  const { file } = useLocalSearchParams();
  const parsed = file ? JSON.parse(file) : null;
  const [fontsLoaded] = useCustomFonts();
  if (!fontsLoaded) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flashcards, setFlashcards] = useState([]);

  const [intensePressed, setIntensePressed] = useState(false);
  useEffect(() => {
    if (parsed?.questions) {
      setFlashcards(parsed.questions);
    }
  }, []);

  const currentCard = flashcards[currentIndex];

  const frontContent = (
    <View style={styles.cardContent}>
      <ThemedText style={styles.term}>{currentCard?.question}</ThemedText>
    </View>
  );

  const backContent = (
    <View style={styles.cardContentBack}>
      <ThemedText style={styles.definition}>{currentCard?.answer}</ThemedText>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <ThemedView style={styles.container}>
        <View style={styles.backContainer}>
          <Ionicons name="arrow-back" size={24} color="white" onPress={() => router.back()} />
          <ThemedText style={styles.backText}>Back</ThemedText>
        </View>

        <ThemedText style={styles.title}>{parsed?.title || 'Terms & Definitions'}</ThemedText>
        <Spacer height={10} />
        <ThemedText style={styles.subtext}>Tap to flip between Term and Definition</ThemedText>

        <ThemedFlashcard frontContent={frontContent} backContent={backContent} />

        <Spacer height={20} />
      {/* next and prev buttons for flashcards */}
        <View style={styles.pagination}>
          <Pressable onPress={() => setCurrentIndex(i => Math.max(i - 1, 0))} disabled={currentIndex === 0}>
            <Ionicons name="arrow-back-circle" size={50} color="#B5B5FF" />
          </Pressable>

          <Spacer width={20} />

          <Pressable onPress={() => setCurrentIndex(i => Math.min(i + 1, flashcards.length - 1))} disabled={currentIndex === flashcards.length - 1}>
            <Ionicons name="arrow-forward-circle" size={50} color="#B5B5FF" />
          </Pressable>
        </View>
        <Spacer width={20} />
        {/* controls */}
        <View style={styles.actions}>
          <ThemedButton style={styles.editBtn}>
            <ThemedText style={styles.btnText}>Edit</ThemedText>
          </ThemedButton>
          <Pressable
            onPressIn={() => setIntensePressed(true)}
            onPressOut={() => setIntensePressed(false)}
            style={[
              styles.intenseBtn,
              intensePressed && { backgroundColor: '#F14C4C', borderColor: '#F14C4C' }
            ]}
          >
            <ThemedText style={[
              styles.intenseText,
              intensePressed && { color: '#200448' }
            ]}>
              Intense Mode
            </ThemedText>
          </Pressable>
          <FloatingPlayer mode='inline' />
        </View>
      </ThemedView>
      
    </View>
  );
};

export default TDFlashcardsResult;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignContent: 'center' },
  title: { fontSize: 26, fontFamily: 'Poppins-Bold', marginBottom: 6, color: '#fff' },
  subtext: { fontSize: 12, color: '#999', fontFamily: 'Poppins-Regular' },
  backContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backText: { color: 'white', fontSize: 16, marginLeft: 8 },
  term: { color: '#fff', fontSize: 18, fontFamily: 'Poppins-SemiBold', textAlign: 'center' },
  definition: { color: '#fff', fontSize: 16, textAlign: 'center', fontFamily: 'Poppins-SemiBold' },
  cardContent: {
    backgroundColor: '#5C5C76',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    height: 215,
    justifyContent: 'center'
  },
  cardContentBack: {
    backgroundColor: '#2E2E40',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    height: 215,
    justifyContent: 'center'
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
    actions: { flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    alignItems: 'center', 
    width: '100%'
  },
  editBtn: {
    backgroundColor: '#B5B5FF',
    padding: 12,
    borderRadius: 12,
    width: '25%',
    alignItems: 'center',
    marginRight: 5
  },
  btnText: {
    color: '#200448',
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    textAlign: 'center',
  },
  intenseBtn: { borderWidth: 1, borderColor: '#F14C4C', backgroundColor: 'transparent', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, width: '40%' },
  intenseText: { color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 14, textAlign: 'center' },
  presseableBtn:{
    width: '50%'
  }
});
