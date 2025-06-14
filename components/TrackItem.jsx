import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TrackItem = ({ track, onPlay }) => (
  <TouchableOpacity style={styles.trackItem} onPress={onPlay}>
    <Ionicons name="play-circle-outline" size={24} color="#B5B5FF" />
    <View style={{ marginLeft: 10 }}>
      <Text style={styles.title}>{track.title}</Text>
      <Text style={styles.artist}>{track.artist}</Text>
    </View>
  </TouchableOpacity>
);

export default TrackItem;

const styles = StyleSheet.create({
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    fontSize: 14,
  },
  artist: {
    fontFamily: 'Poppins-Light',
    color: '#aaa',
    fontSize: 12,
  },
});
