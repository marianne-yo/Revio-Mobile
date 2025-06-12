import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Pressable, Text, Modal, Animated } from 'react-native'; //a modal renders an overlay popup anywhere in app
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import Spacer from '../components/Spacer';

const POMODORO_TIME = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;
const MAX_POMOS = 4;

const PomodoroTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(POMODORO_TIME);
  const [isBreak, setIsBreak] = useState(false);
  const [pomoCount, setPomoCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false); {/* the ModalVisible controls whether the modal is shown */}
  const [modalMessage, setModalMessage] = useState(''); {/*the ModalMessage ets the actual alert text shown to user*/}
  const intervalRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const [modalIcon, setModalIcon] = useState('timer-outline'); // default icon

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            handleSessionEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleSessionEnd = async () => {
    await playSound();

    if (isBreak) {
      setTimeLeft(POMODORO_TIME);
      setIsBreak(false);
      showModal('Break finished! Back to work! 💻', 'laptop-outline'); //this shows the modal(popup alert)
    } else {
      const newCount = pomoCount + 1;
      setPomoCount(newCount);

      if (newCount >= MAX_POMOS) {
        setTimeLeft(LONG_BREAK);
        setPomoCount(0);
        showModal('Take a long break! You’ve completed 4 Pomodoros. 🌴', 'walk-outline'); //this shows the modal(popup alert)
      } else {
        setTimeLeft(SHORT_BREAK);
        showModal('Break time! Drink some water 💧', 'cafe-outline'); //this shows the modal(popup alert)
      }

      setIsBreak(true);
    }

    setIsRunning(true);
  };

  const handleSkip = async () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    await handleSessionEnd();
    await playSound();
  };

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/notification.mp3')
      );
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate(status => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error('Failed to play sound:', error);
    }
  };

  const getTotalTime = () => {
    return isBreak ? (pomoCount === 0 ? LONG_BREAK : SHORT_BREAK) : POMODORO_TIME;
  };

  const progress = 1 - timeLeft / getTotalTime();

  const showModal = (message, icon = 'timer-outline') => {
    setModalMessage(message);
    setModalIcon(icon);
    setModalVisible(true);

    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 5,
    }).start();
//this sets timeout for the modal pop up
    setTimeout(() => {
      setModalVisible(false);
    }, 3000);
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
        <View
          style={[
            styles.progressFill,
            { flex: progress },
            isBreak && pomoCount !== 0 && { backgroundColor: '#FFD700' }
          ]}
        />
        <View style={{ flex: 1 - progress }} />
      </View>
    </View>
  );
};

export default PomodoroTimer;

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
