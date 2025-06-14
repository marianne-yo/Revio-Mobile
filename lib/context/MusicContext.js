import React, { createContext, useState, useContext } from 'react';
import { Audio } from 'expo-av';
import { focusSongs } from '../data/focusSongs';

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentTrack = focusSongs[currentTrackIndex];

  const playTrack = async (index) => {
    if (sound) await sound.unloadAsync();
    const { sound: newSound } = await Audio.Sound.createAsync(focusSongs[index].file);
    setSound(newSound);
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    await newSound.playAsync();
  };

  const togglePlayPause = async () => {
    if (!sound) return;
    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const playNext = () => {
    const nextIndex = (currentTrackIndex + 1) % focusSongs.length;
    playTrack(nextIndex);
  };

  const playPrev = () => {
    const prevIndex = (currentTrackIndex - 1 + focusSongs.length) % focusSongs.length;
    playTrack(prevIndex);
  };

  return (
  <MusicContext.Provider
    value={{ currentTrack, isPlaying, playTrack, togglePlayPause, playNext, playPrev }}
  >
    {children}
  </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
