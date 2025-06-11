import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import Spacer from '../../components/Spacer';
import PomodoroTimer from '../../components/PomodoroTimer';

const StandardReviewerResult = () => {
  const router = useRouter();
  const { file } = useLocalSearchParams();
  let parsed = null;
  try {
    parsed = file ? JSON.parse(file) : null;
  } catch (err) {
    console.warn('Invalid file param:', err);
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.backContainer}>
        <Ionicons 
        style={{justifyContent: 'center'}}
        name="arrow-back" size={24} color="white" onPress={() => router.back()} />
        <ThemedText style={styles.backText}>Back</ThemedText>
      </View>

      {parsed ? (
      <>
        <PomodoroTimer duration={25 * 60} />
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
  );
};

export default StandardReviewerResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0D0D14',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  section: {
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 18,
    color: '#B5B5FF',
    marginBottom: 5,
    fontWeight: 'bold'
  },
  bulletText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 10
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'flex-start'
  },
  backText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 5,
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  }
});

