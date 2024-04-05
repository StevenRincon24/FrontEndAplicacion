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

const Login = ({ navigation }) => {

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
        try {
            setLoading(true)
            if (!constrasenhiaMina || !nitMina) {
                setLoading(false);
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Datos vacíos',
                    textBody: 'Todos los datos son obligatarios',
                    button: 'OK',
                });
                return
            }
            const { data } = await axios.post(`${API_URL}/auth/login`, { nitMina, constrasenhiaMina })
            setState(data);
            await AsyncStorage.setItem('@auth', JSON.stringify(data));
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: "Bienvenido",
                textBody: `${data.user.nombreMina}`,
                button: 'OK',
            });

            navigation.navigate("Principal")
            setLoading(false)
        } catch (error) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: error.response.data.message,
                button: 'OK',
            });
            setLoading(false)
            return
        }

    };

    // TEMP FUNCION LOCAL STORAGE
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
                            <Text style={styles.pageTitle}>Inicio de sesión</Text>
                            <Text style={styles.subtitulo}>
                                Inicia sesión con el NIT de tu empresa
                            </Text>
                            <InputBox inputTitle={"Nit"} value={nitMina} setValue={setNit} />
                            <InputBox inputTitle={"Contraseña"} secureTextEntry={true} autoComplete="password" value={constrasenhiaMina} setValue={setPassword} />
                            <SubmitButton btnTitle={"Iniciar sesión"} loading={loading} handleSubmit={handleSubmit} />
                            <Text style={styles.link}>Aún no tiene cuenta,{" "} <Text style={styles.linkText} onPress={() => navigation.navigate('Register')}>Registrate aquí</Text>{" "}</Text>

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


export default Login