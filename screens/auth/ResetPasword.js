import { View, Text, StyleSheet, TextInput, ScrollView, Alert, SafeAreaView, ImageBackground, Image, KeyboardAvoidingView } from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"; import { API_URL } from "@env"
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MenuPrincipal from "../../components/Menus/MenuPrincipal";

const ResetPassword = ({ navigation }) => {

    const apiUrl = process.env.API_URL
    // ESTADO GLOBAL
    const { state, setState } = useContext(AuthContext);

    // Estados
    const [constrasenhiaMina, setPassword] = useState('');
    const [nitMina, setNit] = useState('');
    const [loading, setLoading] = useState(false);
    // FUNCION

    // FUNCION BOTON
    const handleSubmit = async () => {
        console.log(nitMina, "HOLA")
        try {
            setLoading(true)
            if ( !nitMina) {
                setLoading(false);
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Datos vacíos',
                    textBody: 'Todos los datos son obligatarios',
                    button: 'OK',
                });
                return
            }
            const { data } = await axios.put(`${API_URL}/auth/reset-password`, { nitMina })
            console.log(data, "HOLA")
            setState(data);
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: "Cambio de contraseña realizado",
                textBody: 'La nueva contraseña se ha enviado al correo registrado',
                button: 'OK',
            });

            navigation.navigate("Login")
            setLoading(false)
        } catch (error) {
            console.log(error)
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: 'Error en el servidor, inténtelo de nuevo mas tarde',
                button: 'OK',
            });
            setLoading(false)
            navigation.navigate("Login")
            return
        }

    };

    const getLocalStorage = async () => {
        let data = await AsyncStorage.getItem('@auth');
    };
    getLocalStorage();
    return (
        <SafeAreaProvider style={{ flex: 1 }}>

            <KeyboardAvoidingView style={{ flex: 1 }}
                behavior="padding">
                <ImageBackground source={require('../../assets/Fondo_1.png')} style={[styles.container]}>
                    <View style={styles.container}>
                        <View style={styles.formContainer}>
                            <View style={{ alignItems: 'center' }}>
                                <Image source={require('../../assets/Logo_APP.png')}
                                    style={{ width: 100, height: 100 }}
                                />
                            </View>
                            <Text style={styles.pageTitle}>Recuperar contraseña</Text>
                            <Text style={styles.subtitulo}>
                                Ingrese el NIT de la empresa.
                            </Text>
                            <InputBox inputTitle={"Nit"} value={nitMina} setValue={setNit} />
                            <SubmitButton btnTitle={"Recuperar contraseña"} loading={loading} handleSubmit={handleSubmit} />

                        </View>
                        <Text>
                            {/*JSON.stringify({name, email, password, confirmPassword, nameProject, nit, municipio, tituloMinero}, null, 4)*/}
                        </Text>
                    </View>
                </ImageBackground>
                <View>
                    <MenuPrincipal />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaProvider>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginTop: 50,
    },
    pageTitle: {
        fontSize: 40,
        textAlign: "center",
        color: "#FFFFFF",
        marginBottom: 5,
    },
    inputBox: {
        height: 40,
        marginBottom: 20,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        marginTop: 10,
        paddingLeft: 10,
        color: "#af9f85",
    },
    formContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 20
    },
    link: {
        textAlign: "right",
        color: '#ffffff',

    },
    linkText: {
        color: '#ffffff',
        textDecorationLine: "underline",
    },
    subtitulo: {
        fontSize: 20,
        textAlign: "center",
        color: "#BCACAC",
        marginTop: 1,
        marginBottom: 5
    },
});


export default ResetPassword