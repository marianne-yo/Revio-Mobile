import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: '#1E1E2E',
        borderLeftColor: '#4CAF50',
        borderRadius: 8,
        minHeight: null,
        alignItems: 'center',
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        flex: 1,
        justifyContent: 'center',
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
      }}
      text2Style={{
        fontSize: 14,
        color: '#ccc',
      }}
      renderLeadingIcon={() => (
        <Ionicons name="checkmark-circle" size={24} color="#4CAF50" style={{marginLeft: 10}}/>
      )}
    />
  ),
  error: (props) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: '#1E1E2E',
        borderLeftColor: '#FF5252',
        borderRadius: 8,
        minHeight: null,
        alignItems: 'center',
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        flex: 1,
        justifyContent: 'center',
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
      }}
      text2Style={{
        fontSize: 14,
        color: '#ccc',
      }}
      renderLeadingIcon={() => (
        <Ionicons name="close-circle" size={24} color="#FF5252" style={{marginLeft: 10}} />
      )}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: '#1E1E2E',
        borderLeftColor: '#FFD700',
        borderRadius: 8,
        minHeight: null,
        alignItems: 'center',
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        flex: 1,
        justifyContent: 'center',
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
      }}
      text2Style={{
        fontSize: 14,
        color: '#ccc',
      }}
      renderLeadingIcon={() => (
        <Ionicons name="information-circle" size={24} color="#FFD700" style={{marginLeft: 10}} />
      )}
    />
  ),
};

export default function AuthLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false, animation: 'none' }} />
      <Toast config={toastConfig} />
    </>
  );
}
