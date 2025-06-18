import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import Spacer from '../../components/Spacer';
import PomodoroTimer from '../../components/PomodoroTimer';
import FloatingPlayer from '../../components/FloatingPlayer';

const SumAIReviewerResult = () => {
  const router = useRouter();
  const { file } = useLocalSearchParams();
  let parsed = null;
  try {
    parsed = file ? JSON.parse(file) : null;
  } catch (err) {
    console.warn('Invalid file param:', err);
  }

  return (
    <View style={{flex: 1}}>
    <ThemedView style={styles.container}>
        <Spacer height={20}/>
        <View style={styles.backContainer}>
          <Ionicons 
          style={{justifyContent: 'center'}}
          name="arrow-back" size={24} color="white" onPress={() => router.back()} />
          <ThemedText style={styles.backText}>Back</ThemedText>
        </View>

        {parsed ? (
        <>
          <PomodoroTimer />
          <ScrollView>
            <ThemedText style={styles.title}>{parsed.title || 'Reviewer'}</ThemedText>
            <Spacer height={10} />
            {parsed.sections?.map((section, index) => (
              <View key={index} style={styles.section}>
                <ThemedText style={styles.sectionTitle}>{section.title}</ThemedText>
                {section.bullets.map((bullet, idx) => (
                  <ThemedText key={idx} style={styles.bulletText}>• {bullet}</ThemedText>
                ))}
                <Spacer height={15} />
              </View>
            ))}
          </ScrollView>
        </>
      ) : (
        <ThemedText style={{ color: 'white' }}>No data to display</ThemedText>
      )}
    </ThemedView>
      <FloatingPlayer />
    </View>
  );
};

export default SumAIReviewerResult;

const styles = StyleSheet.create({
  container: { 
    flex: 1, padding: 20, 
    justifyContent: 'center'
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  section: { marginBottom: 15 },
  sectionTitle: { fontSize: 18, color: '#FFA500', marginBottom: 5, fontWeight: 'bold' },
  bulletText: { color: '#fff', fontSize: 14, marginLeft: 10 },
  backContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'flex-start' },
  backText: { fontSize: 16, color: 'white', marginLeft: 5, justifyContent: 'center' }
});
