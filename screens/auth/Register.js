import { View, Text, StyleSheet, TextInput, ScrollView, Alert, SafeAreaView, ImageBackground, Image, Platform, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";
import axios from "axios";
import Constants from "expo-constants";
import MunicipalitiesBoyaca from "../../hooks/municipiosBoyaca";
import RNPickerSelect from 'react-native-picker-select';
import { API_URL } from "@env"
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MenuPrincipal from "../../components/Menus/MenuPrincipal";
import * as Location from 'expo-location';

const Register = ({ navigation }) => {
    // Estados
    const [nombreMina, setName] = useState('');
    const [emailMina, setEmail] = useState('');
    const [constrasenhiaMina, setPassword] = useState('');
    const [direccionMina, setDireccionMina] = useState('');
    const [proyectoMina, setNameProject] = useState('');
    const [nitMina, setNit] = useState('');
    const [municipioMina, setMunicipio] = useState('');
    const [tituloMina, setTituloMinero] = useState('');
    const [loading, setLoading] = useState(false);

    const municipalities = MunicipalitiesBoyaca.map(municipality => ({
        label: municipality,
        value: municipality
    }));


    // FUNCION BOTON
    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (!nombreMina || !emailMina || !constrasenhiaMina || !direccionMina || !proyectoMina || !nitMina || !municipioMina || !tituloMina) {
                setLoading(false);
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Datos incompletos',
                    textBody: 'Verifica que todos los datos estén completos.',
                    button: 'OK',
                });
                return;
            }
            // Obtener la ubicación actual
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLoading(false);
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Permiso de ubicación',
                    textBody: 'Se requiere permiso de ubicación para continuar.',
                    button: 'OK',
                });
                return;
            }

            // Verificar si el usuario ha aceptado el permiso de ubicación
            let isLocationEnabled = await Location.hasServicesEnabledAsync();
            if (!isLocationEnabled) {
                setLoading(false);
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Ubicación desactivada',
                    textBody: 'Para registrar, necesitamos que habilites tu ubicación.',
                    button: 'OK',
                });
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            console.log(latitude,
                longitude);

            const { data } = await axios.post(`${API_URL}/auth/register`, {
                nombreMina,
                nitMina,
                emailMina,
                constrasenhiaMina,
                municipioMina,
                direccionMina,
                proyectoMina,
                tituloMina,
                latitude,
                longitude
            });
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Registro Exitoso',
                textBody: 'Su registro ha sido completado con éxito.',
                button: 'OK',
            });
            setLoading(false);
            navigation.navigate('Login');
        } catch (error) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: error.response.data.message,
                button: 'OK',
            });
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior="padding">
            <ImageBackground source={require('../../assets/Fondo_1.png')} style={[styles.container]}>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.overlay}>

                            <View style={styles.formContainer}>
                                <View style={{ alignItems: 'center' }}>
                                    <Image source={require('../../assets/Logo_APP.png')}
                                        style={{ width: 100, height: 100 }}
                                    />
                                </View>
                                <Text style={styles.pageTitle}>Registrar empresa</Text>
                                <InputBox inputTitle={"Name"} value={nombreMina} setValue={setName} />
                                <InputBox inputTitle={"Nit"} value={nitMina} setValue={setNit} />
                                <InputBox inputTitle={"Contraseña"} secureTextEntry={true} autoComplete="password" value={constrasenhiaMina} setValue={setPassword} />
                                <InputBox inputTitle={"Email"} keyboardType={"email-address"} autoComplete="email" value={emailMina} setValue={setEmail} />
                                <View>
                                    <Text style={styles.inputTitle}>Municipio</Text>
                                    <RNPickerSelect
                                        onValueChange={(value) => setMunicipio(value)}
                                        items={municipalities}
                                        placeholder={{ label: 'Selecciona un municipio', value: null }}
                                        style={styles.select}
                                    />
                                </View>
                                <InputBox inputTitle={"Direccion"} value={direccionMina} setValue={setDireccionMina} />
                                <InputBox inputTitle={"Nombre proyecto"} value={proyectoMina} setValue={setNameProject} />
                                <InputBox inputTitle={"Nombre título minero"} value={tituloMina} setValue={setTituloMinero} />
                                <SubmitButton btnTitle={"Registrarse"} loading={loading} handleSubmit={handleSubmit} />
                                <Text style={styles.link}>Ya tiene cuenta {" "}, <Text style={styles.linkText} onPress={() => navigation.navigate("Login")}>Inicia sesión</Text>{" "}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

            </ImageBackground>
            <View>
                <MenuPrincipal />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
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
        fontSize: 20,
        textAlign: "right",
    },
    linkText: {
        fontSize: 20,
        color: '#0366d6',
        textDecorationLine: "underline",
    },
    inputTitle: {
        color: "#ffffff",
        fontSize: 16,
        marginTop: 5,
    },
    select: {
        ...Platform.select({
            ios: {
                color: 'white',
                borderWidth: 3,
                borderColor: '#2685BF',
            },
            android: {
                olor: 'white',
                borderWidth: 3,
                borderColor: '#2685BF',
            },
        }),
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
});

export default Register;
