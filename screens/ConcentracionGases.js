import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, ImageBackground, ScrollView, Image, TextInput } from 'react-native';
import FooterMenu from '../components/Menus/FooterMenu';
import frentesTrabajo from '../hooks/frentes';
import RNPickerSelect from 'react-native-picker-select';
import InputBox from "../components/Forms/InputBox";
import SubmitButton from "../components/Forms/SubmitButton";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { GasesContext } from "../context/gasesContext";
import { API_URL } from "@env"
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

const ConcentracionGases = ({ navigation }) => {


    const { gases, setGases } = useContext(GasesContext);

    const [frenteTrabajo, setFrenteTrabajo] = useState('');
    const [mostrarInputsAdicionales, setMostrarInputsAdicionales] = useState(false);
    const frentes = frentesTrabajo.map(frente => ({ label: frente, value: frente }));
    // O2
    const [porcentajeOxigeno, setPorcentajeOxigeno] = useState('');
    // CO
    const [porcentajeMonoxidoCarbon, setPorcentajeMonoxidoCarbon] = useState(''); //
    // CO2
    const [porcentajeDioxidoCarbono, setPorcentajeDioxidoCarbono] = useState('');
    // CH4
    const [porcentajeMetano, setPorcentajeMetano] = useState('');
    // H2S
    const [porcentajeAcidoSulfhidrico, setAcidoSulfhidrico] = useState('');
    const [gasesNitrosos, setGasesNitrosos] = useState('');

    const [porcentajeOxigenoNitrogeno, setPorcentajeOxigenoNitrogeno] = useState('');

    // CAMBIO DE TEXTO BOTÓN
    const [loading, setLoading] = useState(false);
    // REVISAR CONEXION
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const checkConnectionAndUploadData = async () => {

            try {
                const connectionInfo = await NetInfo.fetch();
                setIsConnected(connectionInfo.isConnected);
                if (connectionInfo.isConnected) {
                    const pendingData = await AsyncStorage.getItem('pendingDataGases');
                    if (pendingData) {
                        const data = JSON.parse(pendingData);
                        await axios.post(`${API_URL}/gases/registroGases`, data);
                        await AsyncStorage.removeItem('pendingDataGases');
                        Dialog.show({
                            type: ALERT_TYPE.SUCCESS,
                            title: 'Registro Exitoso',
                            textBody: 'Su registro ha sido completado con éxito.',
                            button: 'OK',
                        });
                    }
                }
            } catch (error) {
                console.log(AsyncStorage.getItem('pendingDataGases'))
                console.error('Error al subir datos pendientes:', error);
            }
        };
        checkConnectionAndUploadData();

        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const saveDataLocally = async (data) => {
        try {
            let pendingData = await AsyncStorage.getItem('pendingDataGases');
            pendingData = pendingData ? JSON.parse(pendingData) : [];
            pendingData.push(data);
            await AsyncStorage.setItem('pendingDataGases', JSON.stringify(pendingData));
            console.log('Data saved locally');
        } catch (error) {
            console.error('Error saving data locally: ', error);
        }
    };


    const handleFrenteTrabajoChange = (value) => {
        setFrenteTrabajo(value);
        if (value !== 'Selecciona un frente de trabajo') {
            setMostrarInputsAdicionales(true);
        } else {
            setMostrarInputsAdicionales(false);
        }
    }

    const handleConcentracionGases = async () => {
        console.log('Register Data => ', { frenteTrabajo, porcentajeOxigeno, porcentajeMonoxidoCarbon, porcentajeDioxidoCarbono, porcentajeMetano, porcentajeAcidoSulfhidrico, porcentajeOxigenoNitrogeno })
        try {
            setLoading(true)
            if (!porcentajeOxigeno || !porcentajeMonoxidoCarbon || !porcentajeDioxidoCarbono || !porcentajeMetano || !porcentajeAcidoSulfhidrico || !gasesNitrosos || !porcentajeOxigenoNitrogeno) {
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Datos incompletos',
                    textBody: 'Verifica que todos los datos esten completos.',
                    button: 'OK',
                });
                setLoading(false)
                return
            }

            const response = await axios.post(`${API_URL}/gases/registroGases`, {
                frenteTrabajo,
                porcentajeOxigeno,
                porcentajeMonoxidoCarbon,
                porcentajeDioxidoCarbono,
                porcentajeMetano,
                porcentajeAcidoSulfhidrico,
                gasesNitrosos,
                porcentajeOxigenoNitrogeno
            });

            if (response.data.success && response.data.gases) {
                Dialog.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Registro de gases exitoso',
                    textBody: "Se han registrados los gases exitosamente.",
                    button: 'OK',
                });

                setGases([...gases, response.data.gases])
                navigation.navigate('Calculos');
            } else {
                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: 'Ha ocurrido un error durante el registro. Por favor, inténtelo de nuevo más tarde.',
                    button: 'OK',
                });
                {/*alert(response.data.message || 'Error al registrar los gases');*/ }
            }

        } catch (err) {
            saveDataLocally({
                frenteTrabajo,
                porcentajeOxigeno,
                porcentajeMonoxidoCarbon,
                porcentajeDioxidoCarbono,
                porcentajeMetano,
                porcentajeAcidoSulfhidrico,
                gasesNitrosos,
                porcentajeOxigenoNitrogeno
            })

            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Datos pendientes por subir',
                textBody: 'Los datos se guardarán localmente y se subirán cuando haya conexión a Internet',
                button: 'OK',
            });
            navigation.navigate('Calculos');
        } finally {
            setLoading(false);
        }
    }

    const cancelar = () => {
        navigation.push('Calculos');
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ImageBackground source={require('../assets/Fondo_1.png')} style={[styles.container]}>
                <ScrollView>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                        <Image source={require('../assets/Logo_APP.png')} style={{ width: 100, height: 100 }} />
                    </View>
                    <View style={styles.formContainer}>
                        <Text style={styles.pageTitle}>Concentración gases</Text>
                        <View>
                            <Text style={styles.inputTitle}>Frente de trabajo</Text>
                            <RNPickerSelect
                                onValueChange={(value) => handleFrenteTrabajoChange(value)}
                                items={frentes}
                                placeholder={{ label: 'Selecciona un frente de trabajo', value: null }}
                                style={{
                                    inputIOS: {
                                        color: 'white',
                                    },
                                    inputAndroid: {
                                        color: 'white',
                                        borderWidth: 1,
                                        borderColor: '#2685BF',
                                    },
                                    placeholder: {
                                        color: 'white',
                                    }
                                }}
                            />
                        </View>
                        {mostrarInputsAdicionales && (
                            <>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ width: "30%" }} >
                                        <InputBox inputTitle={"Porcentaje O₂"} value={porcentajeOxigeno} setValue={setPorcentajeOxigeno} keyboardType="numeric" />
                                    </View>
                                    <View style={{ width: "25%" }} >
                                        <Text style={styles.inputTitle}>{" "}</Text>
                                        <TextInput style={styles.inputBox2} value='%' editable={false}></TextInput>
                                    </View>

                                    <View style={{ width: "30%" }} >
                                        <InputBox inputTitle={"PPM CO"} value={porcentajeMonoxidoCarbon} setValue={setPorcentajeMonoxidoCarbon} keyboardType="numeric" />
                                    </View>
                                    <View style={{ width: "25%" }} >
                                        <Text style={styles.inputTitle}>{" "}</Text>
                                        <TextInput style={styles.inputBox2} value='PPM' editable={false}></TextInput>
                                    </View>
                                </View>

                                <View style={{ flexDirection: "row"}}>
                                    <View style={{ width: "30%" }} >
                                        <InputBox inputTitle={"Porcentaje CH₄"} value={porcentajeMetano} setValue={setPorcentajeMetano} keyboardType="numeric" />
                                    </View>
                                    <View style={{ width: "25%" }} >
                                        <Text style={styles.inputTitle}>{" "}</Text>
                                        <TextInput style={styles.inputBox2} value='%' editable={false}></TextInput>
                                    </View>

                                    <View style={{ width: "30%" }} >
                                        <InputBox inputTitle={"Porcentaje CO₂"} value={porcentajeDioxidoCarbono} setValue={setPorcentajeDioxidoCarbono} keyboardType="numeric" />
                                    </View>
                                    <View style={{ width: "25%" }} >
                                        <Text style={styles.inputTitle}>{" "}</Text>
                                        <TextInput style={styles.inputBox2} value='%' editable={false}></TextInput>
                                    </View>
                                </View>

                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ width: "30%" }} >
                                        <InputBox inputTitle={"PPM  H₂S"} value={porcentajeAcidoSulfhidrico} setValue={setAcidoSulfhidrico} keyboardType="numeric" />
                                    </View>
                                    <View style={{ width: "25%" }} >
                                        <Text style={styles.inputTitle}>{" "}</Text>
                                        <TextInput style={styles.inputBox2} value='PPM' editable={false}></TextInput>
                                    </View>

                                    <View style={{ width: "30%" }} >
                                        <InputBox inputTitle={"PPM NO₂"} value={gasesNitrosos} setValue={setGasesNitrosos} keyboardType="numeric" />
                                    </View>
                                    <View style={{ width: "25%" }} >
                                        <Text style={styles.inputTitle}>{" "}</Text>
                                        <TextInput style={styles.inputBox2} value='PPM' editable={false}></TextInput>
                                    </View>
                                </View>

                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ width: "30%" }} >
                                        <InputBox inputTitle={"Porcentaje  NO"} value={porcentajeOxigenoNitrogeno} setValue={setPorcentajeOxigenoNitrogeno} keyboardType="numeric" />
                                    </View>
                                    <View style={{ width: "25%" }} >
                                        <Text style={styles.inputTitle}>{" "}</Text>
                                        <TextInput style={styles.inputBox2} value='PPM' editable={false}></TextInput>
                                    </View>

                                    <View style={{ width: "30%" }} >
                                    </View>
                                    <View style={{ width: "25%" }} >
                                    </View>
                                </View>

                                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                    <View style={{ width: "50%" }} >
                                        <SubmitButton btnTitle={"Registrar"} handleSubmit={handleConcentracionGases} />
                                    </View>

                                    <View style={{ width: "50%" }} >
                                        <SubmitButton btnTitle={"Cancelar"} handleSubmit={cancelar} />
                                    </View>
                                </View>

                            </>
                        )}
                    </View>
                </ScrollView>
                <View>
                    <FooterMenu />
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pageTitle: {
        fontSize: 35,
        textAlign: "center",
        color: "#FFFFFF",
        marginBottom: 5,
    },

    input: {
        color: "white",
        borderWidth: 1,
        borderColor: '#2685BF',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    formContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 20,
        marginTop: 20,
    },
    inputBox: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        marginTop: 10,
        paddingLeft: 10,
        paddingStart: 30,
        width: "50%",
        height: 50,
        alignSelf: "center",
        borderRadius: 100,
        backgroundColor: "white",
        borderWidth: 3,
        borderColor: '#2685BF',
        marginBottom: 10
    },
    inputBox2: {
        backgroundColor: "#ffffff",
        color: "black",
        borderRadius: 10,
        marginTop: 10,
        paddingLeft: 10,
        paddingStart: 30,
        height: 50,
        width: "50%",
        borderRadius: 100,
        backgroundColor: "white",
        borderWidth: 3,
        marginBottom: 10,
    },

    inputBox3: {
        backgroundColor: "#ffffff",
        color: "black",
        borderRadius: 10,
        marginTop: 10,
        fontSize: 12,
        marginLeft: 10,
        paddingLeft: 10,
        paddingStart: 20,
        height: 50,
        width: "50%",
        borderRadius: 100,
        backgroundColor: "white",
        borderWidth: 3,
        marginBottom: 10,
    },
    inputTitle: {
        color: "#ffffff",
        fontSize: 16,
        marginTop: 5,

    },
})

export default ConcentracionGases;
