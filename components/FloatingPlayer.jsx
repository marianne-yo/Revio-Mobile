import React, { useState, useEffect } from 'react';
import { StyleSheet, Pressable, Dimensions, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMusic } from '../lib/context/MusicContext';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const PLAYER_WIDTH = 80;
const PLAYER_HEIGHT = 80;
const PADDING = 20;

const FloatingPlayer = ({ mode = 'floating' }) => {
  const [expanded, setExpanded] = useState(false);
  const [isRight, setIsRight] = useState(true);

  const { currentTrack, isPlaying, togglePlayPause, playNext, playPrev } = useMusic();
  const insets = useSafeAreaInsets();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (mode === 'floating') {
      translateX.value = SCREEN_WIDTH - PLAYER_WIDTH - PADDING;
      translateY.value = SCREEN_HEIGHT - PLAYER_HEIGHT - (insets?.bottom ?? 0) - PADDING;
    }
  }, [insets, mode]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.offsetX = translateX.value;
      ctx.offsetY = translateY.value;
    },
    onActive: (event, ctx) => {
      const leftLimit = PADDING;
      const rightLimit = SCREEN_WIDTH - PLAYER_WIDTH;
      const topLimit = insets.top + PADDING;
      const bottomLimit = SCREEN_HEIGHT - PLAYER_HEIGHT - insets.bottom - PADDING;

      const rawX = ctx.offsetX + event.translationX;
      const rawY = ctx.offsetY + event.translationY;

      translateX.value = Math.min(Math.max(rawX, leftLimit), rightLimit);
      translateY.value = Math.min(Math.max(rawY, topLimit), bottomLimit);
    },
    onEnd: () => {
      const dockedRight = translateX.value > SCREEN_WIDTH / 2;
      runOnJS(setIsRight)(dockedRight);
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  if (!currentTrack) return null;

  const PlayerContent = (
    <Pressable
      onPress={() => setExpanded(!expanded)}
      style={[
        styles.container,
        expanded && styles.expanded,
        isRight && expanded && mode === 'floating' && { transform: [{ translateX: -50 }] },
      ]}
    >
      {expanded ? (
        <>
          <Pressable onPress={playPrev}>
            <Ionicons name="play-skip-back" size={24} color="#fff" />
          </Pressable>
          <Pressable onPress={togglePlayPause}>
            <Ionicons name={isPlaying ? 'pause' : 'play'} size={28} color="#fff" />
          </Pressable>
          <Pressable onPress={playNext}>
            <Ionicons name="play-skip-forward" size={24} color="#fff" />
          </Pressable>
        </>
      ) : (
        <Ionicons name="musical-notes" size={28} color="#fff" />
      )}
    </Pressable>
  );

  if (mode === 'inline') {
    return <View style={styles.inlineWrapper}>{PlayerContent}</View>;
  }

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.wrapper, animatedStyle]}>
        {PlayerContent}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default FloatingPlayer;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    zIndex: 999,
  },
  inlineWrapper: {
    margin: 10,
    alignSelf: 'flex-end',
  },
  container: {
    backgroundColor: '#6849a7',
    padding: 15,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6849a7',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  expanded: {
    flexDirection: 'row',
    borderRadius: 30,
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    maxWidth: SCREEN_WIDTH - 2 * PADDING,
  },
});
