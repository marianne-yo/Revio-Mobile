import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import ThemedButton from '../../components/ThemedButton';
import Spacer from '../../components/Spacer';
import ThemedFlashcard from '../../components/ThemedFlashcard';
import { mockFlashcards } from '../../lib/data/mockFlashcards';

const ACFlashcardResult = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCard = mockFlashcards[currentIndex];

  const handleNext = () => {
    if (currentIndex < mockFlashcards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const frontContent = (
    <View style={styles.squareContainer}>
        <ThemedText style={styles.cardTitle}>{currentCard.title}</ThemedText>
        {currentCard.content.map(({ letter, word }) => (
        <ThemedText key={letter} style={{ color: '#fff' }}>
            <Text style={{ color: '#E5FF00' }}>{letter}</Text> {word}
        </ThemedText>
        ))}
    </View>
    );

    const backContent = (
    <View style={styles.squareContainer2}>
        <ThemedText style={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>
        Key Phrase: {currentCard.keyPhrase}
        </ThemedText>
    </View>
    );

    <ThemedFlashcard frontContent={frontContent} backContent={backContent} />

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

      <ThemedText style={styles.title}>CC5 Process{"\n"}Models</ThemedText>
      <ThemedText style={styles.subtext}>Tap to flip to reveal the key phrase</ThemedText>

      <ThemedFlashcard
        frontContent={frontContent}
        backContent={backContent}
        />
     <Spacer />


      <View style={styles.pagination}>
        <Pressable onPress={handlePrev} disabled={currentIndex === 0}>
          <Ionicons name="arrow-back-circle" size={40} color="#B5B5FF" />
        </Pressable>
        <Spacer width={20} />
        <Pressable onPress={handleNext} disabled={currentIndex === mockFlashcards.length - 1}>
          <Ionicons name="arrow-forward-circle" size={40} color="#B5B5FF" />
        </Pressable>
      </View>

      <Spacer height={20} />
      <View style={styles.actions}>
        <ThemedButton style={styles.editBtn}>
          <ThemedText style={styles.btnText}>Edit</ThemedText>
        </ThemedButton>
        <ThemedButton style={styles.intenseBtn}>
          <ThemedText style={styles.intenseText}>Intense Mode</ThemedText>
        </ThemedButton>
        <ThemedButton style={styles.musicBtn}>
          <Ionicons name="musical-notes" size={18} color="white" />
        </ThemedButton>
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
        fontWeight: 'bold',
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
        fontWeight: 'bold',
        marginBottom: 12
    },
    cardBody: {
        paddingHorizontal: 10,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    editBtn: {
        backgroundColor: '#B5B5FF',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        width: '30%'
    },
    btnText: {
        color: '#200448',
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center'
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
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center'
    },
    musicBtn: {
        width: 44,
        height: 44,
        backgroundColor: '#B5B5FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22
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
    cardWrapper: {
        width: '100%',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        perspective: 1000
    },
    square: {
        width: 50,
        height: 50,
        backgroundColor: '#B5B5FF',
        borderRadius: 8,
        alignSelf: 'center',
        marginBottom: 12,
        },
    squareContainer: {
        width: '100%',
        backgroundColor: '#5C5C76',
        padding: 16,
        borderRadius: 10,
        borderColor: '#565656',
        borderWidth: 1,
        alignItems: 'center',
    },
    squareContainer2: {
        width: '100%',
        backgroundColor: '#2E2E40',
        padding: 16,
        borderRadius: 10,
        borderColor: '#565656',
        borderWidth: 1,
        alignItems: 'center',
    },


});
