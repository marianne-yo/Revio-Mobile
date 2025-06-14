import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FloatingPlayer = ({ track, isPlaying, onPlayPause, onNext, onPrev }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Pressable onPress={() => setExpanded(!expanded)} style={styles.wrapper}>
      <View style={[styles.container, expanded && styles.expanded]}>
        {expanded ? (
          <>
            <Pressable onPress={onPrev}>
              <Ionicons name="play-skip-back" size={24} color="#fff" />
            </Pressable>
            <Pressable onPress={onPlayPause}>
              <Ionicons name={isPlaying ? "pause" : "play"} size={28} color="#fff" />
            </Pressable>
            <Pressable onPress={onNext}>
              <Ionicons name="play-skip-forward" size={24} color="#fff" />
            </Pressable>
          </>
        ) : (
          <Ionicons name="musical-notes" size={28} color="#fff" />
        )}
      </View>
    </Pressable>
  );
};

export default FloatingPlayer;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 999,
  },
  container: {
    backgroundColor: '#5C5C76',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expanded: {
    flexDirection: 'row',
    borderRadius: 20,
    gap: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
  }
});
