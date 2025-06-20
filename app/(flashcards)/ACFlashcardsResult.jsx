import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Pressable, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';

import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import ThemedButton from '../../components/ThemedButton';
import Spacer from '../../components/Spacer';
import ThemedFlashcard from '../../components/ThemedFlashcard';
import useCustomFonts from '../../hooks/useCustomFonts';
import FloatingPlayer from '../../components/FloatingPlayer';

const ACFlashcardResult = () => {
  const router = useRouter();
  const { file } = useLocalSearchParams();
  const parsedCard = file ? JSON.parse(file) : null;
  const [fontsLoaded] = useCustomFonts();
  if (!fontsLoaded) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flashcards, setFlashcards] = useState([]);
  const [intensePressed, setIntensePressed] = useState(false);
  const endMessageAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (currentIndex === flashcards.length - 1) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Animated.timing(endMessageAnim, {
        toValue: 3,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      endMessageAnim.setValue(0);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (parsedCard?.cards) {
      setFlashcards(parsedCard.cards);
    } else if (parsedCard?.questions) {
      setFlashcards(parsedCard.questions);
    } else if (parsedCard?.content) {
      setFlashcards([parsedCard]);
    }
  }, []);

  const currentCard = flashcards[currentIndex];

  if (!currentCard) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>No flashcards available.</ThemedText>
      </ThemedView>
    );
  }

  const isAcronym = currentCard?.content !== undefined;

  const frontContent = isAcronym ? (
    <View style={styles.squareContainer}>
      <ThemedText style={styles.cardTitle}>{currentCard.title}</ThemedText>
      {currentCard.content.map(({ letter, word }, index) => {
        const trimmedWord = word.startsWith(letter) ? word.slice(1) : word;
        return (
          <ThemedText key={`${letter}-${index}`} style={{ color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 16 }}>
            <Text style={{ color: '#E5FF00' }}>{letter}</Text>{trimmedWord}
          </ThemedText>
        );
      })}
    </View>
  ) : (
    <View style={styles.squareContainer}>
      <ThemedText style={styles.cardTitle}>{currentCard?.question}</ThemedText>
    </View>
  );

  const backContent = isAcronym ? (
    <View style={styles.squareContainer2}>
      <ThemedText style={{ color: '#fff', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins-SemiBold' }}>
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
    <View style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <View style={styles.backContainer}>
          <Ionicons name="arrow-back" size={24} color="white" onPress={() => router.back()} />
          <ThemedText style={styles.backText}>Back</ThemedText>
        </View>

        <ThemedText style={styles.title}>{parsedCard?.title || 'Flashcard'}</ThemedText>
        <ThemedText style={styles.subtext}>Tap to flip to reveal the answer</ThemedText>

        <Spacer height={10}/>
        <ThemedFlashcard frontContent={frontContent} backContent={backContent} />

        <Spacer />

        <View style={styles.pagination}>
          <Pressable onPress={() => setCurrentIndex((i) => Math.max(i - 1, 0))} disabled={currentIndex === 0}>
            <Ionicons name="arrow-back-circle" size={50} color="#B5B5FF" />
          </Pressable>

          <Spacer width={20} />

          <Pressable onPress={() => setCurrentIndex((i) => Math.min(i + 1, flashcards.length - 1))} disabled={currentIndex === flashcards.length - 1}>
            <Ionicons name="arrow-forward-circle" size={50} color="#B5B5FF" />
          </Pressable>
        </View>

        <Spacer height={10}/>
        <Animated.View
          style={[
            styles.endMessageCtn,
            {
              opacity: endMessageAnim,
              transform: [
                {
                  scale: endMessageAnim.interpolate({
                    inputRange: [0, 2],
                    outputRange: [0.90, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <ThemedText style={styles.endMessage}>
            You've reached the end of the flashcards! {'\n'}
            ⸜(｡˃ ᵕ ˂ )⸝♡
          </ThemedText>
        </Animated.View>

        <Spacer height={10} />
        <View style={styles.actions}>
          <ThemedButton style={styles.editBtn}>
            <ThemedText style={styles.btnText}>Edit</ThemedText>
          </ThemedButton>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/(flashcards)/ACIntenseMode",
                params: { file: JSON.stringify({ cards: flashcards }) }, // ✅ All cards
              })
            }
            onPressIn={() => setIntensePressed(true)}
            onPressOut={() => setIntensePressed(false)}
            style={[styles.intenseBtn, intensePressed && { backgroundColor: '#F14C4C', borderColor: '#F14C4C' }]}
          >
            <ThemedText style={[styles.intenseText, intensePressed && { color: '#200448' }]}>
              Intense Mode
            </ThemedText>
          </Pressable>
          <FloatingPlayer mode='inline' />
        </View>
      </ThemedView>
    </View>
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
  intenseBtn: { 
    borderWidth: 1, 
    borderColor: '#F14C4C', 
    backgroundColor: 'transparent', 
    paddingHorizontal: 12, 
    paddingVertical: 10, 
    borderRadius: 12, 
    width: '40%' 
  },
  intenseText: { 
    color: '#fff', 
    fontFamily: 'Poppins-Bold', 
    fontSize: 14, 
    textAlign: 'center' 
  },
  backContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  backText: { 
    fontSize: 16,
    color: 'white', 
    marginHorizontal: 5, 
    marginTop: 5 
  },
  squareContainer: { 
    width: '100%', 
    maxHeight: 'auto',
    height: 'auto',
    backgroundColor: '#5C5C76', 
    padding: 16, 
    borderRadius: 10, 
    borderColor: '#565656', 
    borderWidth: 1, 
    alignItems: 'center' 
  },
  squareContainer2: { 
    width: '100%', 
    height: 'auto', 
    backgroundColor: '#2E2E40', 
    padding: 16, 
    borderRadius: 10, 
    borderColor: '#565656', 
    borderWidth: 1, 
    alignItems: 'center', 
    height: '100%', 
    justifyContent: 'center' 
  },
  endMessage: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 11,
    padding: 5,
    color: '#9470CE'
  },
  endMessageCtn:{
    justifyContent: 'center',
    alignSelf: 'center',
    width: '80%',
    textAlign: 'center',
    backgroundColor: '#F8F3A6',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E6D9A2'
  }
});
