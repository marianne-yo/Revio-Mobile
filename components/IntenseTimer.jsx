import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Pressable, Text, Modal, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import Spacer from '../components/Spacer';

const IntenseTimer = ({ flashcards = [] }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const [modalMessage, setModalMessage] = useState("Time's up! Intense mode complete");
  const [modalIcon, setModalIcon] = useState('alarm-outline');
  const scaleAnim = useRef(new Animated.Value(0.7)).current;

  const totalTime = flashcards.length * 30;
  const progress = totalTime === 0 ? 0 : (totalTime - timeLeft) / totalTime;

  useEffect(() => {
    setTimeLeft(flashcards.length * 30);
  }, [flashcards]);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            showModal();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const showModal = () => {
    setModalVisible(true);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 5,
    }).start();
  };

  const handleSkip = () => {
    setTimeLeft(0);
    setIsRunning(false);
    showModal();
  };

  return (
    <View style={styles.container}>
      {/* Custom Modal Alert */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalBox, { transform: [{ scale: scaleAnim }] }]}>
            <Ionicons name={modalIcon} size={28} color="#B5B5FF" style={{ marginBottom: 10 }} />
            <Text style={styles.modalText}>{modalMessage}</Text>
            <Pressable style={styles.modalBtn} onPress={() => setModalVisible(false)}>
              <Text style={{ color: '#fff', fontWeight: '600' }}>Got it</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Modal>

      {/* Controls */}
      <View style={{ width: '100%', alignItems: 'flex-end' }}>
        <View style={styles.controls}>
          <Pressable onPress={() => setIsRunning(!isRunning)} style={styles.controlBtn}>
            <Ionicons name={isRunning ? 'pause' : 'play'} size={15} color="#fff" />
          </Pressable>

          <Pressable onPress={handleSkip} style={styles.controlBtn}>
            <Ionicons name="play-skip-forward" size={15} color="#fff" />
          </Pressable>
        </View>
      </View>

      <Spacer height={10} />

      {/* Progress bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { flex: progress }]} />
        <View style={{ flex: 1 - progress }} />
      </View>
    </View>
  );
};

export default IntenseTimer;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  progressBar: {
    flexDirection: 'row',
    height: 10,
    width: '100%',
    backgroundColor: '#444',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressFill: {
    backgroundColor: '#B5B5FF',
  },
  controls: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-end',
  },
  controlBtn: {
    backgroundColor: '#2E2E40',
    borderRadius: 30,
    padding: 5,
    width: '15%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modalBox: {
    backgroundColor: '#1E1E2E',
    padding: 25,
    borderRadius: 15,
    borderColor: '#CBC3E3',
    borderWidth: 0.5,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalBtn: {
    backgroundColor: '#B5B5FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8
  }
});
