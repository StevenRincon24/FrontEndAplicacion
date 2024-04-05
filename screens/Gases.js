import { View, Text, StyleSheet, TextInput, ScrollView, ImageBackground, Image } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native';
import Constants from 'expo-constants'
import FooterMenu from '../components/Menus/FooterMenu'
import InputBox from '../components/Forms/InputBox'
import SubmitButton from '../components/Forms/SubmitButton'
import { EnsayoContext } from '../context/ensayoContext'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';

const Gases = () => {
    const { ensayos, setEnsayos } = useContext(EnsayoContext);
    const [pickerItems, setPickerItems] = useState([]);
    const [selectedEnsayo, setSelectedEnsayo] = useState(null);
    const [informacionInternaEnsayo, setInformacionInternaEnsayo] = useState('');
    const [informacionExternaEnsayo, setInformacionExternaEnsayo] = useState('');

    const [fechaMuestreo, setFechaMuestreo] = useState('');
    const [fechaAnalisis, setFechaAnalisis] = useState('');
    const [fechaRecepcion, setFechaRecepcion] = useState('');
    const [fechaEntregaResultados, setFechaEntregaResultados] = useState('');

    const [informacionGeoespacionX, setInformacionGeoespacionX] = useState('');
    const [informacionGeoespacionY, setInformacionGeoespacionY] = useState('');
    const [informacionGeoespacionZ, setInformacionGeoespacionZ] = useState('');

    const [porcentajech4, setPorcentajech4] = useState('');
    const [porcentajesiO2, setPorcentajesiO2] = useState('');
    const [porcentajeCao, setPorcentajeCao] = useState('');

    const getEnsayosMina = async () => {
        try {
            const { data } = await axios.get('http://192.168.18.225:8080/api/v1/enasyo/ensayos-mina')
            setEnsayos(data?.ensayosMina);
            const transformedData = data?.ensayosMina.map(ensayo => ({
                label: ensayo.informacionInternaEnsayo,
                value: ensayo
            }));
            setPickerItems(transformedData);
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    useEffect(() => {
        getEnsayosMina()
    }, [])

    const handleEnsayoChange = (value) => {
        setSelectedEnsayo(value);
        if (value) {
            setInformacionInternaEnsayo(value.informacionInternaEnsayo);
            setInformacionExternaEnsayo(value.informacionExternaEnsayo);
            setFechaMuestreo(value.fechaMuestreo);
            setFechaAnalisis(value.fechaAnalisis);
            setFechaRecepcion(value.fechaRecepcion);
            setFechaEntregaResultados(value.fechaEntregaResultados);
            setInformacionGeoespacionX(value.informacionGeoespacionX);
            setInformacionGeoespacionY(value.informacionGeoespacionY);
            setInformacionGeoespacionZ(value.informacionGeoespacionZ);
        } else {
            setInformacionInternaEnsayo('');
            setInformacionExternaEnsayo('');
            setFechaMuestreo('');
            setFechaAnalisis('');
            setFechaRecepcion('');
            setFechaEntregaResultados('');
            setInformacionGeoespacionX('');
            setInformacionGeoespacionY('');
            setInformacionGeoespacionZ('');
        }
    }

    return (
        <ImageBackground source={require('../assets/Fondo_1.png')} style={[styles.container, { justifyContent: "center", paddingTop: Constants.statusBarHeight + 10 }]}>

            <View style={styles.container}>
                <ScrollView>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={require('../assets/Logo_APP.png')} style={{ width: 200, height: 200 }} />
                    </View>
                    <View style={styles.formContainer}>
                        <RNPickerSelect
                            placeholder={{
                                label: 'Selecciona un ensayo',
                                value: null,
                            }}
                            onValueChange={handleEnsayoChange}
                            items={pickerItems}
                            style={{
                                inputIOS: {
                                    color: 'white',
                                },
                                inputAndroid: {
                                    color: 'white',
                                },
                                placeholder: {
                                    color: 'white',
                                }
                            }}
                        />
                        {selectedEnsayo && (
                            <>
                                <Text style={styles.heading2}>Porcentaje de gases para el ensayo {informacionInternaEnsayo}</Text>
                                <Text style={styles.subtitulo}>
                                    Datos de los gases presentes en la toma del ensayo
                                </Text>
                                <View>
                                    <Text style={styles.subtitulo2}>Información de gases</Text>
                                </View>

                                <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 5 }}>
                                    <View style={{ width: "30%" }}>
                                        <InputBox inputTitle={"%CH4"} value={porcentajech4} setValue={setPorcentajech4} keyboardType="numeric" // Agrega esta línea para permitir solo números
/>
                                    </View>
                                    <View style={{ width: "30%" }}>
                                        <InputBox inputTitle={"%CaO"} value={porcentajeCao} setValue={setPorcentajeCao} keyboardType="numeric" // Agrega esta línea para permitir solo números
/>
                                    </View>
                                    <View style={{ width: "30%" }}>
                                        <InputBox inputTitle={"%SiO2"} value={porcentajesiO2} setValue={setPorcentajesiO2} keyboardType="numeric" // Agrega esta línea para permitir solo números
/>
                                    </View>
                                </View>

                                <View>
                                    <Text style={styles.subtitulo2}>Datos generales del ensayo</Text>
                                </View>
                                <View style={styles.row}>

                                    <View style={styles.column}>
                                        <Text style={styles.heading}>Información interna del ensayo</Text>
                                        <TextInput
                                            style={styles.inputBox}
                                            value={informacionInternaEnsayo}
                                            onChangeText={setInformacionInternaEnsayo}
                                            editable={false}
                                        />
                                        <Text style={styles.heading}>Fecha muestreo</Text>
                                        <TextInput
                                            style={styles.inputBox}
                                            value={new Date(fechaMuestreo).toLocaleDateString('es-ES')}
                                            onChangeText={setFechaMuestreo}
                                            editable={false}
                                        />
                                        <Text style={styles.heading}>Fecha recepción</Text>

                                        <TextInput
                                            style={styles.inputBox}
                                            value={new Date(fechaRecepcion).toLocaleDateString('es-ES')}
                                            onChangeText={setFechaRecepcion}
                                            editable={false}
                                        />
                                    </View>
                                    <View style={styles.column}>
                                        <Text style={styles.heading}>Información externa del ensayo</Text>
                                        <TextInput
                                            style={styles.inputBox}
                                            value={informacionExternaEnsayo}
                                            onChangeText={setInformacionExternaEnsayo}
                                            editable={false}
                                        />
                                        <Text style={styles.heading}>Fecha análisis</Text>

                                        <TextInput
                                            style={styles.inputBox}
                                            value={new Date(fechaAnalisis).toLocaleDateString('es-ES')}
                                            onChangeText={setFechaAnalisis}
                                            editable={false}
                                        />
                                        <Text style={styles.heading}>Fecha entrega resultados</Text>

                                        <TextInput
                                            style={styles.inputBox}
                                            value={new Date(fechaEntregaResultados).toLocaleDateString('es-ES')}
                                            onChangeText={setFechaEntregaResultados}
                                            editable={false}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
                                    <View style={{ width: "30%" }}>
                                        <InputBox inputTitle={"Coordenada X"} value={informacionGeoespacionX} editable={false} />
                                    </View>
                                    <View style={{ width: "30%" }}>
                                        <InputBox inputTitle={"Coordenada Y"} value={informacionGeoespacionY} editable={false} />
                                    </View>
                                    <View style={{ width: "30%" }}>
                                        <InputBox inputTitle={"Coordenada Z"} value={informacionGeoespacionZ} editable={false} />
                                    </View>
                                </View>
                            </>
                        )}
                    </View>
                </ScrollView>
            </View>
            <View style={styles.footerContainer}>
                <FooterMenu />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    heading: {
        fontSize: 15,
        textAlign: "center",
        color: "#FFFFFF",
        marginTop: 10
    },
    heading2: {
        fontSize: 25,
        textAlign: "center",
        color: "#FFFFFF",
        marginTop: 10
    },
    inputTitle: {
        color: "#ffffff",
        fontSize: 16,
    },
    formContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 20,
    },
    footerContainer: {
        marginTop: 20,
        bottom: 0,
        left: 0,
        right: 0,
        marginBottom: 0
    },
    inputBtn: {
        padding: 10,
        paddingStart: 30,
        width: "100%",
        height: 50,
        marginTop: 10,
        borderRadius: 300,
        backgroundColor: "white",
        borderWidth: 3,
        borderColor: '#2685BF',
    },
    inputBox2: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        marginTop: 10,
        paddingLeft: 10,
        paddingStart: 30,
        width: "100%",
        alignSelf: "center",
        borderRadius: 100,
        backgroundColor: "white",
        borderWidth: 3,
        borderColor: '#2685BF',
    },
    inputBox: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        marginTop: 10,
        paddingLeft: 10,
        paddingStart: 30,
        width: "100%",
        height: 50,
        alignSelf: "center",
        borderRadius: 100,
        backgroundColor: "white",
        borderWidth: 3,
        borderColor: '#2685BF',
        color: 'black'
    }, row: {
        flexDirection: 'row',
    },
    column: {
        flex: 1,
        marginHorizontal: 5, // Ajusta el margen según sea necesario
    },
    subtitulo: {
        fontSize: 17,
        textAlign: "center",
        color: "#BCACAC",
        marginTop: 1,
        marginBottom: 5
    },
    subtitulo2: {
        fontSize: 25,
        textAlign: "center",
        color: "#fff",
        marginTop: 1,
        marginBottom: 5
    },
})

export default Gases
