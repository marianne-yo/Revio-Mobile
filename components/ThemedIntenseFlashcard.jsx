import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

const ThemedIntenseFlashcard = ({
  card,
  onSwipeLeft,
  onSwipeRight,
  height = 245,
  width = '100%',
}) => {
  const rotate = useSharedValue(0);
  const translateX = useSharedValue(0);

  const flipCard = () => {
    rotate.value = withTiming(rotate.value === 0 ? 180 : 0, { duration: 500 });
  };

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
    })
    .onEnd(() => {
      if (translateX.value > SWIPE_THRESHOLD) {
        runOnJS(onSwipeRight)?.();
      } else if (translateX.value < -SWIPE_THRESHOLD) {
        runOnJS(onSwipeLeft)?.();
      }
      translateX.value = withTiming(0);
    });

  const tap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      console.log('DOUBLE TAP DETECTED!');
      flipCard();
    });

  const gesture = Gesture.Simultaneous(tap, pan);

  const frontAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { perspective: 1000 },
      { rotateY: `${interpolate(rotate.value, [0, 180], [0, 180])}deg` },
    ],
    opacity: interpolate(rotate.value, [0, 90, 180], [1, 0, 0]),
    zIndex: rotate.value < 90 ? 1 : 0,
    backfaceVisibility: 'hidden',
    position: 'absolute',
    width: '100%',
    height: '100%',
  }));

  const backAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { perspective: 1000 },
      { rotateY: `${interpolate(rotate.value, [0, 180], [180, 360])}deg` },
    ],
    opacity: interpolate(rotate.value, [0, 90, 180], [0, 0, 1]),
    zIndex: rotate.value >= 90 ? 1 : 0,
    backfaceVisibility: 'hidden',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#5C5C76',
  }));

  useEffect(() => {
    rotate.value = 0;
    translateX.value = 0;
  }, [card]);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.cardWrapper, { height, width }]}>
        <Animated.View
          style={[styles.cardBase, styles.cardFront, frontAnimatedStyle]}
        >
          <Text style={styles.letterRow}>
            {card?.content?.map(({ letter }, index) => (
              <Text key={`${letter}-${index}`} style={styles.letter}>
                {letter}{' '}
              </Text>
            ))}
          </Text>
        </Animated.View>

        <Animated.View
          style={[styles.cardBase, styles.cardBack, backAnimatedStyle]}
        >
          <View>
            {card?.content?.map(({ letter, word }, index) => (
              <Text key={`${letter}-${index}`} style={styles.word}>
                <Text style={styles.letter}>{letter}</Text>
                {word.slice(1)}
              </Text>
            ))}
            <Text style={styles.keyPhrase}>{card?.keyPhrase}</Text>
          </View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default ThemedIntenseFlashcard;

const styles = StyleSheet.create({
  cardWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBase: {
    borderRadius: 10,
    borderColor: '#565656',
    borderWidth: 1,
    padding: 16,
    backgroundColor: '#2E2E40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardFront: { zIndex: 2 },
  cardBack: { zIndex: 1 },
  letterRow: {
    flexDirection: 'column',
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: '#E5FF00',
    letterSpacing: 8,
  },
  letter: {
    color: '#E5FF00',
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    flexDirection: 'column',
  },
  word: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  keyPhrase: {
    color: '#B5B5FF',
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    marginTop: 10,
    textAlign: 'center',
  },
});
