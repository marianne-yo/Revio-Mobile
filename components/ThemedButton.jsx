import { Pressable, StyleSheet } from 'react-native'
import { Colors } from '../constants/Colors'

function ThemedButton({ style, ...props}) {
    
    return(
        <Pressable 
            style={({pressed}) => [styles.btn, pressed && styles.pressed, style]}
            {...props}
        />
    )
}

export default ThemedButton

const styles = StyleSheet.create({
    btn:{
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 20,
        marginVertical: 10,
        width: '80%',
    },
    pressed:{
        opacity: 0.5
    }
})