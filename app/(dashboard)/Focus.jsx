import React from 'react';
import { StyleSheet, FlatList, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import TrackItem from '../../components/TrackItem';
import MusicPlayerBar from '../../components/MusicPlayerBar';
import { focusSongs } from '../../lib/data/focusSongs';
import { useMusic } from '../../lib/context/MusicContext'; //import context

const Focus = () => {
  const { playTrack, currentTrack } = useMusic(); // from the music context

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.header}>FOCUS</ThemedText>
      <Image source={require('../../assets/focusimage.jpg')} style={styles.coverImage} />
      <ThemedText style={styles.albumTitle}>40 Hz Focus Music{"\n"}(Binaural Beats)</ThemedText>
      
      <View style={styles.artistRow}>
        <Ionicons name="musical-notes-outline" size={18} color="#fff" />
        <ThemedText style={styles.artist}>  Miracle Tones</ThemedText>
      </View>
      
      <ThemedText style={styles.meta}>2024 · 5 songs</ThemedText>

      <FlatList
        data={focusSongs}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TrackItem track={item} onPlay={() => playTrack(index)} />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {currentTrack && <MusicPlayerBar />}
    </ThemedView>
  );
};

export default Focus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    marginBottom: 16,
  },
  coverImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 10,
  },
  albumTitle: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    marginTop: 5,
  },
  artistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  artist: {
    color: '#bbb',
    fontFamily: 'Poppins-Regular'
  },
  meta: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 10,
    fontFamily: 'Poppins-Light'
  }
});
