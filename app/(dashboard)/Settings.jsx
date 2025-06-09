import { StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'

import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import ThemedLogo from '../../components/ThemedLogo'
import Separator from '../../components/Separator'

import useCustomFonts from '../../hooks/useCustomFonts'

import { signOut } from 'firebase/auth'
import { auth, db } from '../../lib/firebaseConfig'; // make sure this path is correct
import { useRouter } from 'expo-router';
import { deleteUser } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';


const router = useRouter();


const Settings = () => {
  const [fontsLoaded] = useCustomFonts();
  
  if (!fontsLoaded) return null;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/Login');
    } catch (error) {
      console.error('Logout Error:', error);
      Alert.alert('Logout Failed', 'Something went wrong while logging out.');
    }
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to permanently delete your account?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes, Delete",
          style: "destructive",
          onPress: async () => {
            const user = auth.currentUser;

            if (user) {
              try {
                await deleteUser(user);
                Alert.alert("Account Deleted", "Your account has been deleted.");
                router.replace('/Login');
              } catch (error) {
                console.error("Delete Account Error:", error);

                if (error.code === "auth/requires-recent-login") {
                  Alert.alert(
                    "Re-authentication Required",
                    "Please log in again to delete your account."
                  );
                  router.replace('/Login');
                } else {
                  Alert.alert("Error", "Could not delete account.");
                }
              }
            }
          }
        }
      ]
    );
  };


  return (
    <ThemedView style={styles.container}>
        
      <ThemedText
        style={styles.title}
      >
        SETTINGS
      </ThemedText>

      <Spacer height={10}/>
      <ThemedText style={styles.subText} >
        Account
      </ThemedText>

      <Spacer height={10}/>

      <ThemedView style={styles.ACcontainer}>
        {/* need a profile icon here */}
        <ThemedButton style={[{
          borderRadius: 7, 
          borderColor:"#565656",
          borderWidth: 1 ,
          width: '50%',
          padding: 15,
          alignContent: 'center'
          }]}>
          <ThemedText style={styles.STbtnText}>
            Upload Photo
          </ThemedText>
        </ThemedButton>
        <Spacer height={5} />
        <ThemedText style={styles.subTitle} > Username</ThemedText>

      </ThemedView>

      <Spacer height={20}/>

      <ThemedButton style={styles.logoutBtn} onPress={handleLogout}>
        <ThemedText style={styles.logoutTxt}>Logout</ThemedText>
      </ThemedButton>

      {/* Their document in users/{uid} from Firestore
      Their Firebase Auth account */}
      <ThemedButton style={styles.deleteBtn} onPress={handleDeleteAccount}>
        <ThemedText style={styles.deleteTxt}>Delete Account</ThemedText>
      </ThemedButton>

    </ThemedView>
  )
}

export default Settings

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 30
  },
  title:{
    fontSize: 36,
    fontWeight: 'bold'
  },
  subTitle:{
    fontSize: 15,
    fontWeight: 'regular'
  },
  separator: {
    borderBottomColor: '#cccccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
    marginVertical: 10,
  },
  subText:{
    fontSize: 20,
    fontWeight: 'bold',
  },
  desc:{
    fontSize: 10,
    fontWeight: 'light'
  },
  ACcontainer:{
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: "#B5B5B5",
    borderWidth: 2,
    borderRadius: 7,
    padding: 10,
    maxHeight: '50%',
    width: '100%'
  },
  STbtnText:{
    fontSize: 14,
    fontWeight: 'medium',
    textAlign: 'center'
  },
  deleteBtn:{
    backgroundColor: '#CD3232',
    width: '100%',
    justifyContent: 'center',
    borderRadius: 7
  },
  deleteTxt:{
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  logoutBtn:{
    width: '100%',
    justifyContent: 'center',
    borderRadius: 7
  },
  logoutTxt:{
    color: '#200448',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  }
})