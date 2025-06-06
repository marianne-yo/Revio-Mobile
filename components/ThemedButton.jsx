import { Pressable, StyleSheet } from 'react-native'
import { Colors } from '../constants/Colors'
import React from 'react';
function ThemedButton({ style, children, ...props }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.btn, pressed && styles.pressed, style]}
      {...props}
    >
      {({ pressed }) => 
        React.cloneElement(children, {
          style: [
            children.props.style,
            { color: pressed ? '#B5B5FF' : children.props.style?.color }
          ]
        })
      }
    </Pressable>
  );
}


export default ThemedButton

export const styles = StyleSheet.create({
    btn:{
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 20,
        marginVertical: 10,
        width: '80%',
    },
    pressed:{
        backgroundColor: '#200448',
        color: '#B5B5FF',
    }
})