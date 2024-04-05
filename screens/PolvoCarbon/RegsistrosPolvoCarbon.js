import { View, Text, StyleSheet, ScrollView, ImageBackground, Image, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import axios from 'axios'
import Constants from 'expo-constants'
import FooterMenu from '../../components/Menus/FooterMenu'
import GasesCard from '../../components/GasesCard'
import { API_URL } from "@env"
import PolvoCarbonCard from './PolvoCarbonCard'
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
const HistorialPolvoCarbon = ({ navigation }) => {
    // ESTADOS
    const [registrosPolvoCarbon, setregistrosPolvoCarbon] = useState([])
    const [loading, showLoading] = useState(false)

    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        getHistoricoPolvoCarbon()
        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }, [])

    const getHistoricoPolvoCarbon = async () => {
        try {
            showLoading(true)
            const { data } = await axios.get(`${API_URL}/polvo-carbon/lista-concentracion-polvo-carbon`)
            console.log({ data })
            showLoading(false)
            setregistrosPolvoCarbon(data?.polvoCarbon)
        } catch (error) {
            console.log(error)
            showLoading(false)
            alert(error)
        }
    }

    // INICIAL
    useEffect(() => {
        getHistoricoPolvoCarbon()
    }, [])

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
        let ws = XLSX.utils.json_to_sheet(registrosPolvoCarbon.map(item => ({
            "masa polvo carbon recolectado": item.masaPolvoCarbonRecolectado,
            "area galeria": item.longitudEstacion,
            "longitud Estacion": item.longitudEstacion,
            "Concentracion polvo carbon": item.concentracionPolvoCarbon,
            "Fecha registro": formatDate(item.createdAt)
        })));
        XLSX.utils.book_append_sheet(wb, ws, "Concentración polvo de carbón", true);
        const base64 = XLSX.write(wb, { bookType: "xlsx", type: "base64" });

        try {
            const downloadDir = FileSystem.cacheDirectory;

            const fileName = 'Registro concentracion polvo de carbon.xlsx';

            const fileUri = downloadDir + fileName;

            await FileSystem.writeAsStringAsync(fileUri, base64, { encoding: FileSystem.EncodingType.Base64 });

            await Sharing.shareAsync(fileUri);
        } catch (error) {
            console.error('Error al exportar y compartir el archivo:', error);
        }
    }
    return (
        <ImageBackground source={require('../../assets/Fondo_1.png')} style={[styles.container, { justifyContent: "center", paddingTop: Constants.statusBarHeight }]}>

            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../assets/Logo_APP.png')} style={{ width: 100, height: 100 }} />
                </View>
                <View style={{
                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                }}>
                    <Text style={styles.heading}>Registros concentración polvo de carbón</Text>

                </View>
                <TouchableOpacity style={styles.buttonContainerExcel} onPress={exportExcel}>
                    <FontAwesome5 name="file-excel" size={20} color="white" />

                    <Text style={styles.buttonText}>Exportar datos</Text>
                </TouchableOpacity>
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    <PolvoCarbonCard polvoCarbon={registrosPolvoCarbon} ensayosMinaScreen={true} />
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
        fontSize: 23,
        textAlign: "center",
        color: "#fff",
        marginBottom: 5,
        marginTop: 10,

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
    },
    buttonContainerExcel: {
        backgroundColor: '#007bff',
        borderRadius: 100,
        padding: 10,
        marginHorizontal: 100,
        alignItems: 'center',
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        marginTop: 10
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        padding: 5

    }
})

export default HistorialPolvoCarbon