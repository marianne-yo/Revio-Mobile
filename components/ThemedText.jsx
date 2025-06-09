import { Text, useColorScheme } from 'react-native'
import { Colors } from '../constants/Colors'
import React from 'react';
import useCustomFonts from '../hooks/useCustomFonts'


const ThemedText = ({ style, title = false, bold = false, ...props }) => {
  const [fontsLoaded] = useCustomFonts();

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  if (!fontsLoaded) return null;

  const textColor = title ? theme.title : theme.text;

  // pick font weight
  const fontFamily = bold || title
    ? 'Poppins-Bold'
    : 'Poppins-Regular';

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