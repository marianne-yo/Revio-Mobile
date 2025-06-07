import { Stack } from 'expo-router';
import { StatusBar } from 'react-native'

export default function ReviewerLayout() {
  return (
        <>
            <StatusBar style='auto' />
            <Stack 
                screenOptions={{headerShown: false, animation:'none'}}
            />
        </>
  );
}
