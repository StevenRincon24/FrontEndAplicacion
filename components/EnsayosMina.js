import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import EnsayosCard from './EnsayosCard'
import FooterMenu from './Menus/FooterMenu'
import axios from 'axios'
import Constants from 'expo-constants'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import { useNavigation } from '@react-navigation/native'
import { API_URL } from "@env"
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
const EnsayosMina = () => {
    // ESTADOS
    const [ensayos, setEnsayos] = useState([])
    const [loading, showLoading] = useState(false)
    const navigation = useNavigation()

    const getEnsayosMina = async () => {
        try {
            showLoading(true)
            const { data } = await axios.get(`${API_URL}/enasyo/ensayos-mina`)
            showLoading(false)
            setEnsayos(data?.ensayosMina)
        } catch (error) {
            console.log(error)
            showLoading(false)
            alert(error)
        }
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const formattedDay = day < 10 ? '0' + day : day;
        const formattedMonth = month < 10 ? '0' + month : month;

        return formattedDay + '/' + formattedMonth + '/' + year;
    };
    const exportExcel = async () => {
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(ensayos.map(item => ({
            "Código interno del ensayo": item.informacionInternaEnsayo,
            "Código externo del ensayo": item.informacionExternaEnsayo,
            "Fecha muestreo": formatDate(item.fechaMuestreo),
            "Información geoespación X": item.informacionGeoespacionY,
            "Información geoespación Y": item.informacionGeoespacionZ,
            "Información geoespación Z": item.informacionGeoespacionZ,
            "Porcentaje CH4": item.porcentajeCH4,
            "Porcentaje CaO": item.porcentajeCaO,
            "Porcentaje SiO2": item.porcentajeSiO2,
            "Fecha análisis": formatDate(item.fechaAnalisis),
            "Fecha recepción del ensayo": formatDate(item.fechaRecepcion),
            "Fecha entrega de resultados": formatDate(item.fechaRecepcion),
            "Laboratorio encargado del ensayo": item.laboratorioEncargado,
            "Observaciones muestra": item.observacionMuestra,
            "Fecha registro": formatDate(item.createdAt)
        })));
        XLSX.utils.book_append_sheet(wb, ws, "Ensayos", true);
        const base64 = XLSX.write(wb, { bookType: "xlsx", type: "base64" });

        try {
            const downloadDir = FileSystem.cacheDirectory;

            const fileName = 'Registro ensayos de laboratorio.xlsx';

            const fileUri = downloadDir + fileName;

            await FileSystem.writeAsStringAsync(fileUri, base64, { encoding: FileSystem.EncodingType.Base64 });

            await Sharing.shareAsync(fileUri);
        } catch (error) {
            console.error('Error al exportar y compartir el archivo:', error);
        }
    }

    // INICIAL
    useEffect(() => {
        getEnsayosMina()
    }, [])

    return (
        <ImageBackground source={require('../assets/Fondo_1.png')} style={[styles.container, { justifyContent: "center", paddingTop: Constants.statusBarHeight }]}>

            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../assets/Logo_APP.png')} style={{ width: 100, height: 100 }} />
                </View>
                <View style={{
                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                }}>
                    <Text style={styles.heading}>Ensayos de la mina</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('CrearEnsayo')}
                        style={[styles.buttonContainer, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}
                    >
                        <FontAwesome5 name="plus-square" style={styles.iconStyle} />
                        <Text style={{ color: 'white' }} >{" "}Añadir</Text>
                    </TouchableOpacity>

                </View>
                <TouchableOpacity style={styles.buttonContainerExcel} onPress={exportExcel}>
                    <FontAwesome5 name="file-excel" size={20} color="white" />

                    <Text style={styles.buttonText}>Exportar datos</Text>
                </TouchableOpacity>
                <ScrollView>
                    <EnsayosCard ensayos={ensayos} ensayosMinaScreen={true} />
                </ScrollView>


                <View style={styles.footerContainer}>
                    <FooterMenu />
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footerContainer: {
        marginTop: 30,
    }, heading: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: "center",
        color: "#fff",
        marginBottom: 1,

    }, iconStyle: {
        marginBottom: 3,
        alignSelf: 'center',
        fontSize: 20,
        color: 'white',
    }, buttonContainer: {
        backgroundColor: '#007bff',
        borderRadius: 100,
        padding: 10,
        marginHorizontal: 10,
    }, buttonContainerExcel: {
        backgroundColor: '#007bff',
        borderRadius: 100,
        padding: 10,
        marginHorizontal: 100,
        alignItems: 'center',
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        marginTop: 15
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        padding: 5

    }
})

export default EnsayosMina