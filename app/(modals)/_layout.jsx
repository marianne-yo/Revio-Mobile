import { Stack } from 'expo-router';

export default function ModalLayout() {
  return (
    <Stack screenOptions={{ presentation: 'modal', headerShown: false }}>
      {/* All modals will go here */}
    </Stack>
  );
}
