import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { StatusBar } from 'expo-status-bar';

const HeaderMenu = () => {
    const { state, setState } = useContext(AuthContext)

    // LOGOUT
    const hamdleLogout = async () => {
        setState({ token: '', user: null })
        await AsyncStorage.removeItem('@auth')
        Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Cerrando sesión...",
            textBody: "Vuelva pronto!!!",
            button: 'OK',
        });
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={hamdleLogout}>
                <FontAwesome5 name="sign-out-alt" color={'red'} style={styles.iconStyle} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-between',


    },
    iconStyle: {
        marginBottom: 3,
        alignSelf: 'center',
        fontSize: 20
    }
})

export default HeaderMenu