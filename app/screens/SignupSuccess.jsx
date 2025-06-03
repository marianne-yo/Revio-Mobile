import { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const SignupSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/Login'); // auto redirect
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Ionicons name="checkmark" size={64} color="#0d0d14" />
      </View>
      <Text style={styles.successText}>Account created successfully!</Text>
      <Text style={styles.subText}>Welcome!</Text>
    </View>
  );
};

export default SignupSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d14',
    alignItems: 'center',
    justifyContent: 'center'
  },
  circle: {
    backgroundColor: '#32CD32',
    borderRadius: 100,
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30
  },
  successText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  subText: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 8
  }
});
