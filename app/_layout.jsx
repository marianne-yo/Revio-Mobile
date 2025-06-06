import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const RootLayout = () => {
  return (
    <>
        <Stack screenOptions={{
            headerStyle:{backgroundColor: 'blue'},
            headerTintColor: "ffffff",
            backgroundColor: "red"
        }}>

            <Stack.Screen name="(auth)" options={{headerShown: false}} />
            <Stack.Screen name="(dashboard)" options={{headerShown: false}} />
            <Stack.Screen name="index" options={{headerShown: false}} />
            
        </Stack>
    </>
  )
}

export default RootLayout

const styles = StyleSheet.create({})