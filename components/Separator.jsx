import React from 'react';
import { View, StyleSheet } from 'react-native';

const Separator = ({ style, ...props }) => {
  return (
    <View style={[styles.separator, style]} {...props} />
    
  );
};

const styles = StyleSheet.create({
  separator: {
    borderBottomColor: '#cccccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '60%',
    marginVertical: 10,
  },
});

export default Separator;