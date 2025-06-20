import { Stack, usePathname } from 'expo-router';
import { StatusBar, View } from 'react-native';
import FloatingPlayer from '../../components/FloatingPlayer'; // adjust path as needed

export default function ReviewerLayout() {
  const pathname = usePathname();

  // Optional: Only show on specific /reviewer subpages
  const showFloatingPlayer = !pathname.includes('/reviewer/StandardReviewerResult'); // example condition

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false, animation: 'none' }} />
      {showFloatingPlayer && <FloatingPlayer />}
    </View>
  );
}
