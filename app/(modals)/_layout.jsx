import { Stack } from 'expo-router';
import { StatusBar } from 'react-native'
export default function ModalLayout() {
  return (
        <>
          <StatusBar style='auto' />
          <Stack screenOptions={{ presentation: 'modal', headerShown: false }}>
            {/* All modals will go here */}
          </Stack>
        </>
  );
}
