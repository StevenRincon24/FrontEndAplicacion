import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation, useRoute } from '@react-navigation/native'

const MenuPrincipal = () => {
    const navigation = useNavigation()
    const route = useRoute()

    return (
        <View style={styles.container}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={styles.scrollContent}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.menuItem}>
                    <FontAwesome5 name="sign-in-alt" style={styles.iconStyle} color={route.name === 'Login' ? 'white' : 'black'} />
                    <Text style={{ color: route.name === 'Login' ? 'white' : 'black', fontWeight: 'bold' }}>Iniciar sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.menuItem}>
                    <FontAwesome5 name="user-plus" style={styles.iconStyle} color={route.name === 'Register' ? 'white' : 'black'} />
                    <Text style={{ color: route.name === 'Register' ? 'white' : 'black', fontWeight: 'bold' }}>Registrarse</Text>
                </TouchableOpacity>

                {/*<TouchableOpacity onPress={() => navigation.navigate('ResetPass')} style={styles.menuItem}>
                    <FontAwesome5 name="lock-open" style={styles.iconStyle} color={route.name === 'PasswordRecovery' ? 'white' : 'black'} />
                    <Text style={{ color: route.name === 'PasswordRecovery' ? 'white' : 'black', fontWeight: 'bold' }}>Recuperar contraseña</Text>
                </TouchableOpacity>*/}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0366d6',
        height: 60,
        alignItems: 'center',
        paddingLeft: 1,
    },
    menuItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconStyle: {
        marginBottom: 3,
        fontSize: 20
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 10,
    },
})

export default MenuPrincipal
