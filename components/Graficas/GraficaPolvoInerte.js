import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Image, KeyboardAvoidingView } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import axios from 'axios';
import Constants from 'expo-constants';
import FooterMenu from '../Menus/FooterMenu';
import { API_URL } from "@env";

const GraficaPolvoInerte = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/calculos/lista-polvo-inerte-mina`);
                setData(response.data.masaPolvoCarbon);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const formatDecimalData = (data) => {
        return data.map(item => ({
            value: parseFloat(item),
            dataPointText: item % 1 === 0 ? item.toString() : item.toFixed(1) // Si es decimal, muestra solo un dígito
        }));
    };



    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ImageBackground source={require('../../assets/Fondo_1.png')} style={[styles.container, { justifyContent: "center", paddingTop: Constants.statusBarHeight }]}>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../assets/Logo_APP.png')} style={{ width: 100, height: 100 }} />
                    </View>
                    <ScrollView>
                        <View>
                            <Text style={styles.pageTitle}>Historial</Text>
                        </View>

                        <View>
                            <Text style={styles.heading}>En la gráfica se puede observar los registros de cada uno de los cálculos realizados para saber la cantidad de polvo inerte para inertizar</Text>
                        </View>
                        <View style={styles.chartContainer}>
                            <LineChart
                                data={formatDecimalData(data.length > 0 ? data.map(item => parseFloat(item.masaPolvoCarbon)) : [])}
                                data2={formatDecimalData(data.length > 0 ? data.map(item => parseFloat(item.porcentajePolvoInerte)) : [])}
                                data3={formatDecimalData(data.length > 0 ? data.map(item => parseFloat(item.masaPolvoInerte)) : [])}
                                height={300}
                                maxValue={100}
                                spacing={44}
                                initialSpacing={0}
                                color1="skyblue"
                                color2="orange"
                                color3="green"
                                textColor1="green"
                                dataPointsHeight={6}
                                dataPointsWidth={6}
                                dataPointsColor1="blue"
                                dataPointsColor2="red"
                                dataPointsColor3="black"
                                textShiftY={-2}
                                textShiftX={-5}
                                textFontSize={11}
                            />
                            <View style={styles.legendContainer}>
                                <View style={styles.legendItem}>
                                    <View style={[styles.legendColor, { backgroundColor: 'skyblue' }]} />
                                    <Text style={styles.legendText}>Masa de Polvo de Carbono (Kg)</Text>
                                </View>
                            </View>
                            <View style={styles.legendContainer}>

                                <View style={styles.legendItem}>
                                    <View style={[styles.legendColor, { backgroundColor: 'orange' }]} />
                                    <Text style={styles.legendText}>Porcentaje de Polvo Inerte (%)</Text>
                                </View>
                            </View>

                            <View style={styles.legendContainer}>
                                <View style={styles.legendItem}>
                                    <View style={[styles.legendColor, { backgroundColor: 'green' }]} />
                                    <Text style={styles.legendText}>Masa de Polvo Inerte (Kg)</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.footerContainer}>
                        <FooterMenu />
                    </View>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footerContainer: {
        marginTop: 30,
    },
    pageTitle: {
        fontSize: 35,
        textAlign: 'center',
        color: 'black',
        marginBottom: 10,
        color: '#fff',
        marginHorizontal: 20,
        marginVertical: 10
    },
    chartContainer: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 20
    },
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    legendColor: {
        width: 10,
        height: 10,
        marginRight: 5,
    },
    legendText: {
        fontSize: 14,
    },
    heading: {
        fontSize: 15,
        textAlign: "center",
        color: "#fff",
        marginBottom: 1,
        marginBottom: 10

    },
});

export default GraficaPolvoInerte;
