import { View, TextInput, useColorScheme, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../constants/Colors';
import useCustomFonts from '../hooks/useCustomFonts'

const ThemedTextInput = ({ style, rightIcon, ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  // const [fontsLoaded] = useCustomFonts();
  // if (!fontsLoaded) return null;
  return (
    <View style={[styles.inputWrapper, { backgroundColor: theme.txtInputColor, borderColor: theme.txtInputBorder }, style]}>
      <TextInput
        style={[styles.input, { color: theme.text}]}
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
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent:'center',
    alignContent: 'center'
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    paddingVertical: 5,     
    textAlignVertical: 'center', 
  },
  iconWrapper: {
    marginLeft: 10,
  }
});

export default ThemedTextInput;
