import { Text, useColorScheme } from 'react-native'
import { Colors } from '../constants/Colors'
import { Poppins_100Thin, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_900Black, useFonts } from '@expo-google-fonts/poppins';
import React from 'react';

const ThemedText = ({ style, title = false, bold = false, ...props }) => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    // add others if needed
  });

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  const textColor = title ? theme.title : theme.text;

  // pick font weight
  const fontFamily = bold || title
    ? 'Poppins_700Bold'
    : 'Poppins_400Regular';

  return (
    <Text
      style={[
        { color: textColor, fontFamily },
        style
      ]}
      {...props}
    />
  );
};


export default ThemedText