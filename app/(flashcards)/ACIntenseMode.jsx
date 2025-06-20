import { StyleSheet, View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import IntenseTimer from '../../components/IntenseTimer';
import ThemedIntenseFlashcard from '../../components/ThemedIntenseFlashcard';
const ACIntenseMode = () => {
  const router = useRouter();
  const { file } = useLocalSearchParams();
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
    if (file) {
        try {
        const parsed = JSON.parse(file);
        if (parsed?.cards?.length > 0) {
            setFlashcards(parsed.cards);
        } else {
            console.warn("No cards found in parsed data", parsed);
        }
        } catch (error) {
        console.error("Failed to parse flashcard data", error);
        }
    }
    }, [file]);

  if (!flashcards.length) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading flashcards...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <View style={styles.backContainer}>
          <Ionicons name="arrow-back" size={24} color="white" onPress={() => router.back()} />
          <ThemedText style={styles.backText}>Back</ThemedText>
        </View>

        <IntenseTimer
          flashcards={flashcards}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />

        <ThemedIntenseFlashcard
        card={flashcards[currentIndex]}
        onSwipeLeft={() => setCurrentIndex((prev) => Math.min(prev + 1, flashcards.length - 1))}
        onSwipeRight={() => setCurrentIndex((prev) => Math.min(prev + 1, flashcards.length - 1))}
        />

      </ThemedView>
    </View>
  );
};


export default ACIntenseMode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 30
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
