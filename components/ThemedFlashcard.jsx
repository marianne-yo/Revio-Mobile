import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, withTiming, interpolate,} from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native';

const ThemedFlashcard = ({ frontContent, backContent, height = 245, width = '100%' }) => {
  const rotate = useSharedValue(0);

  const flipCard = () => {
    rotate.value = withTiming(rotate.value === 0 ? 180 : 0, { duration: 500 });
  };

  const frontAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      {
        rotateY: `${interpolate(rotate.value, [0, 180], [0, 180])}deg`,
      },
    ],
    backfaceVisibility: 'hidden',
    position: 'absolute',
    width: '100%',
    height: '120%',
  }));

  const backAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      {
        rotateY: `${interpolate(rotate.value, [0, 180], [180, 360])}deg`,
      },
    ],
    backfaceVisibility: 'hidden',
    position: 'absolute',
    width: '100%',
    height: '120%',
    backgroundColor: '#5C5C76',
  }));

  return (
    <TouchableWithoutFeedback onPress={flipCard}>
      <View style={[styles.cardWrapper, { height, width }]}>
        <Animated.View style={[styles.cardBase, styles.cardFront, frontAnimatedStyle]}>
          {frontContent}
        </Animated.View>
        <Animated.View style={[styles.cardBase, styles.cardBack, backAnimatedStyle]}>
          {backContent}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

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
    maxHeight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardFront: {
    zIndex: 2,
    backgroundColor: '#2E2E40'
  },
  cardBack: {
    zIndex: 1,
  },
});

export default ThemedFlashcard;
