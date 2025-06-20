import { StyleSheet, Text, View } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router';
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'

const ACIntenseMode = () => {
    const router = useRouter();
  return (
    <ThemedView style={styles.container}>
        <View style={styles.backContainer}>
            <Ionicons name="arrow-back" size={24} color="white" onPress={() => router.back()} />
            <ThemedText style={styles.backText}>Back</ThemedText>
        </View>
    </ThemedView>
  )
}

export default ACIntenseMode

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 30
    },
    backContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    backText: {
        fontSize: 16,
        color: 'white',
        alignSelf: 'center',
        justifyContent:'center',
        marginHorizontal: 5,
        marginTop: 5
    },
})