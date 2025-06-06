// components/ThemedTextInput.jsx
import { View, TextInput, useColorScheme, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../constants/Colors';
import { Poppins_100Thin, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_900Black, useFonts } from '@expo-google-fonts/poppins';

const ThemedTextInput = ({ style, rightIcon, ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  const [fontsLoaded] = useFonts({
          Poppins_400Regular,
          Poppins_500Medium,
          Poppins_100Thin,
          Poppins_600SemiBold_Italic,
          Poppins_900Black,
          Poppins_700Bold,
          Poppins_300Light
      })
  return (
    <View style={[styles.inputWrapper, { backgroundColor: theme.txtInputColor, borderColor: theme.txtInputBorder }, style]}>
      <TextInput
        style={[styles.input, { color: theme.text, fontFamily: 'Poppins_300Light' }]}
        placeholderTextColor={theme.placeholderColor ?? '#aaa'}
        {...props}
      />
      {rightIcon && (
        <View style={styles.iconWrapper}>
          {rightIcon}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
    justifyContent:'center',
    alignContent: 'center'
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins_300Light',
    paddingVertical: 5,     // ✅ adjust this for vertical alignment
    textAlignVertical: 'center', // ✅ fixes Android vertical alignment
  },

  iconWrapper: {
    marginLeft: 10,
  }
});

export default ThemedTextInput;
