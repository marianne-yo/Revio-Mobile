import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
//themed comoponents
import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import Separator from '../../components/Separator'

import useCustomFonts from '../../hooks/useCustomFonts'
//firebase functions
import { signOut } from 'firebase/auth'
import { auth, db } from '../../lib/firebaseConfig';
import { deleteUser } from 'firebase/auth';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router'; //imports router

const router = useRouter();
const Settings = () => {
  const [fontsLoaded] = useCustomFonts();
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');

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
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, Delete",
          style: "destructive",
          onPress: async () => {
            const user = auth.currentUser;

            if (user) {
              try {
                // Deletes Firestore user document
                const userDocRef = doc(db, 'users', user.uid);
                await deleteDoc(userDocRef);

                // Deletes Firebase Auth user
                await deleteUser(user);

                Alert.alert("Account Deleted", "Your account has been permanently deleted.");
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

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        setUserEmail(user.email || "Email not available")

        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()){
            setUsername(userDocSnap.data().username || 'N/A')
          } else {
            setUsername('N/A')
          }
        } catch (error) {
          console.error("Error fetching username: ", error)
          setUsername("Error fetching username")
        }

      } else {
        setUserEmail('No user signed in')
        setUsername('No user signed in')
      }
    };
    
    fetchUserData();

    const unsubscribe = auth.onAuthStateChanged(fetchUserData);
    return () => unsubscribe();
  }, []);
  



  return (
    <ThemedView style={styles.container}>
      <Spacer height={10}/>
      <ThemedText
        style={styles.title}>
        SETTINGS
      </ThemedText>
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
          width: '100%',
          padding: 5,
          alignContent: 'center'
          }]}>
          <ThemedText style={styles.STbtnText}>
            Choose Avatar
          </ThemedText>
        </ThemedButton>
        <Spacer height={5} />

        <ThemedText style={styles.subTitle} > Username</ThemedText>
         <ThemedTextInput
           style={{ width: '100%', marginBottom: 20, borderRadius: 5,
            borderWidth: 0, backgroundColor: '#252533'
           }}
           value={username}
           editable={false}
         />
         
         <ThemedText style={styles.subTitle} > Email </ThemedText>
         <ThemedTextInput
          style={{ width: '100%', marginBottom: 20, borderRadius: 5,
            borderWidth: 0, backgroundColor: '#252533'
          }}
           value={userEmail}
           editable={false}
         />
         
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
    fontFamily: 'Poppins-Bold'
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
    padding: 20,
    maxHeight: '50%',
    width: '100%'
  },
  STbtnText:{
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    padding: 5
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