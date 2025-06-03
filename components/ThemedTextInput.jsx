import {Text, View, TextInput, useColorScheme } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

const ThemedTextInput = ({style, ...props}) => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light

  return (
    <TextInput 
        style={[
            {
                backgroundColor: theme.txtInputColor,
                color: theme.text,
                padding: 20,
                borderRadius: 15,
                borderColor: theme.txtInputBorder,
                borderWidth: 1,
            },
            style
        ]}
        placeholderTextColor={theme.placeholderColor ?? '#aaa'}
        {...props}
    />
  )
}

export default ThemedTextInput
