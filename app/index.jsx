import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

//Themed Components
import ThemedView from '../components/ThemedView'
import Spacer from '../components/Spacer'
import ThemedText from '../components/ThemedText'

const index = () => {
  return (
    <ThemedView style={styles.container}>
      {/* <Logo></Logo> */}
      <Spacer height={10}/>

      <ThemedText>Hello World!</ThemedText>
    </ThemedView>
  )
}

export default index

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        fontSize: 32,
        fontWeight: 'bold',
    },
    quote:{
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    link:{
        fontWeight: 'bold',
        marginVertical: 10,
        color: 'white'
    }
})