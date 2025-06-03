import { Pressable, StyleSheet } from 'react-native'
import { Colors } from '../constants/Colors'

function ThemedSecondaryButton ({ style, children, ...props }) {
    return (
        <Pressable 
            style={({ pressed }) => [styles.btn, pressed && styles.pressed, style]}
            {...props}
        >
            {({ pressed }) => 
                typeof children === 'function' ? children(pressed) : children
            }
        </Pressable>
    )
}

export default ThemedSecondaryButton

export const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#12121A',
        borderColor: '#B1B1B1',
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        marginVertical: 10,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pressed: {
        backgroundColor: Colors.primary,
    }
})
