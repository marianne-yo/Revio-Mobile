import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMusic } from '../lib/context/MusicContext'; // get the playback controls from the context

const MusicPlayerBar = ({ track }) => {
  const { currentTrack, isPlaying, togglePlayPause, playNext, playPrev } = useMusic();

  const safeTrack = track || currentTrack;

  if (!safeTrack) return null;

  return (
    <View style={styles.player}>
      <View style={{ flex: 1, marginHorizontal: 10 }}>
        <Text style={styles.trackName} numberOfLines={1}>{safeTrack.title}</Text>
        <Text style={styles.artist} numberOfLines={1}>{safeTrack.artist || 'Miracle Tones'}</Text>
      </View>

      <Pressable onPress={playPrev} style={styles.controls}>
        <Ionicons name="play-back" size={24} color="#fff" />
      </Pressable>

      <Pressable onPress={togglePlayPause} style={styles.controls}>
        <Ionicons name={isPlaying ? "pause" : "play"} size={28} color="#fff" />
      </Pressable>

      <Pressable onPress={playNext} style={styles.controls}>
        <Ionicons name="play-forward" size={24} color="#fff" />
      </Pressable>
    </View>
  );
};



export default MusicPlayerBar;

const styles = StyleSheet.create({
  player: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: '#2E2E40',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    left: 20,
    right: 20,
    elevation: 5,
    width: '100%'
  },
  trackName: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
  },
  artist: {
    color: '#ccc',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  controls: {
    padding: 5
  }
});