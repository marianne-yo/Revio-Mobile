import { Stack } from 'expo-router'
import { StatusBar } from 'react-native'
import Toast from 'react-native-toast-message';
export default function AuthLayout() {
    return(
        <>
            <StatusBar style='auto' />
            <Stack 
                screenOptions={{headerShown: false, animation:'none'}}
            />
            <Toast />
        </>
    )
}