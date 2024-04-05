import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ImageBackground, ScrollView, Image } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import axios from 'axios';
import FooterMenu from '../Menus/FooterMenu';
import RNPickerSelect from 'react-native-picker-select';
import Constants from 'expo-constants'
import SubmitButton from '../Forms/SubmitButton';
import frentesTrabajo from '../../hooks/frentes';
import { API_URL } from "@env"
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

const GraficaOxigeno = () => {

    const [chartData, setChartData] = useState([]);
    const [charDataMonoxido, setChartDataMonoxido] = useState([]);
    const [charDataDioxido, setChartDataDioxido] = useState([]);
    const [charDataMetano, setChartDataMetano] = useState([]);
    const [charDataAcido, setChartDataAcido] = useState([]);
    const [charDataAcidoNitroso, setChartDataAcidoNitrroso] = useState([]);

    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const [loading, setLoading] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);


    useEffect(() => {
        if (buttonClicked) {
            fetchData();
            fetchDataMonoxido();
            fetchDataDioxido();
            fetchDataMetano();
            fetchDataAcido();
            fetchDataAcidoNitroso();
        }
    }, [buttonClicked]);

    const frentes = frentesTrabajo.map(frente => ({ label: frente, value: frente }));
    const formatDecimalData = (data) => {
        return data.map(item => ({
            value: parseFloat(item),
            dataPointText: item % 1 === 0 ? item.toString() : item.toFixed(1) // Si es decimal, muestra solo un dígito
        }));
    };
    const fetchData = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/gases/gases/porcentajeOxigeno/${selectedMonth}/${selectedYear}`
            );
            const formattedData = response.data.map(frente => ({
                data: formatDecimalData(frente.data.map(dataPoint => parseFloat(dataPoint.y)))
            }));

            setChartData(formattedData);
        } catch (error) {
        }
    };


    const fetchDataMonoxido = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/gases/gasesMonoxido/porcentajeMonoxidoCarbon/${selectedMonth}/${selectedYear}`

            );
            const formattedData = response.data.map(frente => ({
                data: formatDecimalData(frente.data.map(dataPoint => parseFloat(dataPoint.y)))
            }));
            setChartDataMonoxido(formattedData);

        } catch (error) {
        }
    };

    const fetchDataDioxido = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/gases/gasesDioxido/porcentajeDioxidoCarbono/${selectedMonth}/${selectedYear}`

            );
            const formattedData = response.data.map(frente => ({
                data: formatDecimalData(frente.data.map(dataPoint => parseFloat(dataPoint.y)))
            }));
            setChartDataDioxido(formattedData);
        } catch (error) {
        }
    };

    const fetchDataMetano = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/gases/gasesMetano/porcentajeMetano/${selectedMonth}/${selectedYear}`

            );
            const formattedData = response.data.map(frente => ({
                data: formatDecimalData(frente.data.map(dataPoint => parseFloat(dataPoint.y)))
            }));
            setChartDataMetano(formattedData);
        } catch (error) {
        }
    };

    const fetchDataAcido = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/gases/gasesAcido/porcentajeAcidoSulfhidrico/${selectedMonth}/${selectedYear}`

            );
            const formattedData = response.data.map(frente => ({
                data: formatDecimalData(frente.data.map(dataPoint => parseFloat(dataPoint.y)))
            }));
            setChartDataAcido(formattedData);
        } catch (error) {
        }
    };


    const fetchDataAcidoNitroso = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/gases/gasesNitrico/gasesNitrosos/${selectedMonth}/${selectedYear}`

            );
            const formattedData = response.data.map(frente => ({
                data: formatDecimalData(frente.data.map(dataPoint => parseFloat(dataPoint.y)))
            }));
            setChartDataAcidoNitrroso(formattedData);
        } catch (error) {
        }
    };

    const formatDate = (dateString) => {
        return dateString.split('T')[0].split('-')[2];
    };

    const months = [
        { label: 'Enero', value: '01' },
        { label: 'Febrero', value: '02' },
        { label: 'Marzo', value: '03' },
        { label: 'Abril', value: '04' },
        { label: 'Mayo', value: '05' },
        { label: 'Junio', value: '06' },
        { label: 'Julio', value: '07' },
        { label: 'Agosto', value: '08' },
        { label: 'Septiembre', value: '09' },
        { label: 'Octubre', value: '10' },
        { label: 'Noviembre', value: '11' },
        { label: 'Diciembre', value: '12' }
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from(new Array(10), (val, index) => (currentYear - index).toString());


    const handleSubmit = async () => {
        if (selectedMonth && selectedYear) {
            setLoading(true);
            setButtonClicked(true);

            await fetchData();
            await fetchDataMonoxido();
            await fetchDataDioxido();
            await fetchDataMetano();
            await fetchDataAcido();
            await fetchDataAcidoNitroso();
            setLoading(false);
        } else {
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Datos vacíos',
                textBody: 'Debes seleccionar un mes y un año',
                button: 'OK',
            });
        }
    }

    const getMonthName = (monthNumber) => {
        return months.find(month => month.value === monthNumber)?.label.toLowerCase();;
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
                            <Text style={styles.subtitulo}>Selecciona el mes y el año que deseas ver</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", marginHorizontal: 20 }}>
                            <View style={{ width: "50%" }} >
                                <Text>{""}</Text>
                                <RNPickerSelect
                                    placeholder={{ label: 'Mes', value: null }}
                                    onValueChange={(value) => setSelectedMonth(value)}
                                    items={months}
                                    style={{
                                        inputIOS: {
                                            color: 'white',
                                            borderWidth: 3,
                                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                                        },
                                        inputAndroid: {
                                            color: 'white',
                                            borderWidth: 3,
                                            backgroundColor: "rgba(255, 255, 255, 0.2)",

                                        },
                                        placeholder: {
                                            color: 'white',
                                        }
                                    }}
                                />

                            </View>
                            <View style={{ width: "40%" }} >
                                <Text>{""}</Text>
                                <RNPickerSelect
                                    placeholder={{ label: 'Año', value: null }}
                                    onValueChange={(value) => setSelectedYear(value)}
                                    items={years.map(year => ({ label: year, value: year }))}
                                    style={{
                                        inputIOS: {
                                            color: 'white',
                                            borderWidth: 3,
                                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                                        },
                                        inputAndroid: {
                                            color: 'white',
                                            borderWidth: 3,
                                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                                        },
                                        placeholder: {
                                            color: 'white',
                                        }
                                    }}
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-around", marginHorizontal: 20 }}>
                            <View style={{ width: "40%" }} >
                                <SubmitButton btnTitle={"Buscar"} loading={loading} handleSubmit={handleSubmit} />

                            </View>
                        </View>
                        {buttonClicked && (
                            <View>
                                {chartData.length > 0 ? (
                                    <View >
                                        <Text style={styles.pageTitle}>
                                            Historial del mes de {getMonthName(selectedMonth)} del año {selectedYear}
                                        </Text>
                                        <View style={styles.chartContainer}>
                                            <Text style={styles.chartTitle}>Porcentaje de Oxígeno</Text>

                                            {chartData.length > 0 && (
                                                <LineChart
                                                    data={chartData[0] ? chartData[0].data : []}
                                                    data2={chartData[1] ? chartData[1].data : []}
                                                    data3={chartData[2] ? chartData[2].data : []}
                                                    data4={chartData[3] ? chartData[3].data : []}
                                                    data5={chartData[4] ? chartData[4].data : []}
                                                    height={300}
                                                    minValue={10}
                                                    maxValue={30}
                                                    showVerticalLines
                                                    spacing={44}
                                                    initialSpacing={0}
                                                    color1="skyblue"
                                                    color2="orange"
                                                    color3="green"
                                                    color4="red"
                                                    color5="purple"
                                                    textColor2="orange"
                                                    textColor1="skyblue"
                                                    textColor3="green"
                                                    textColor4="red"
                                                    textColor5="purple"
                                                    dataPointsHeight={2}
                                                    dataPointsWidth={2}
                                                    dataPointsColor1="blue"
                                                    dataPointsColor2="red"
                                                    dataPointsColor3="black"
                                                    textShiftY={-2}
                                                    textShiftX={-5}
                                                    textFontSize={11}
                                                    xLabelsColor="black"
                                                    yLabelsColor="red"
                                                />

                                            )}
                                            <View style={styles.legendContainer}>
                                                <Text style={[styles.legendText, { color: 'skyblue' }]}>Frente 1</Text>
                                                <Text style={[styles.legendText, { color: 'orange' }]}>Frente 2</Text>
                                                <Text style={[styles.legendText, { color: 'green' }]}>Frente 3</Text>
                                                <Text style={[styles.legendText, { color: 'red' }]}>Frente 4</Text>
                                                <Text style={[styles.legendText, { color: 'purple' }]}>Frente 5</Text>
                                            </View>
                                        </View>



                                        <View style={styles.chartContainer}>
                                            <Text style={styles.chartTitle}>PPM de Monóxido de carbón</Text>

                                            {charDataMonoxido.length > 0 && (
                                                <LineChart
                                                    data={charDataMonoxido[0] ? charDataMonoxido[0].data : []}
                                                    data2={charDataMonoxido[1] ? charDataMonoxido[1].data : []}
                                                    data3={charDataMonoxido[2] ? charDataMonoxido[2].data : []}
                                                    data4={charDataMonoxido[3] ? charDataMonoxido[3].data : []}
                                                    data5={charDataMonoxido[4] ? charDataMonoxido[4].data : []}
                                                    height={300}
                                                    minValue={10}
                                                    maxValue={50}
                                                    showVerticalLines
                                                    spacing={44}
                                                    initialSpacing={0}
                                                    color1="skyblue"
                                                    color2="orange"
                                                    color3="green"
                                                    color4="red"
                                                    color5="purple"
                                                    textColor2="orange"
                                                    textColor1="skyblue"
                                                    textColor3="green"
                                                    textColor4="red"
                                                    textColor5="purple"
                                                    dataPointsHeight={2}
                                                    dataPointsWidth={2}
                                                    dataPointsColor1="blue"
                                                    dataPointsColor2="red"
                                                    dataPointsColor3="black"
                                                    textShiftY={-2}
                                                    textShiftX={-5}
                                                    textFontSize={11}
                                                    xLabelsColor="black"
                                                    yLabelsColor="red"
                                                />

                                            )}

                                            <View style={styles.legendContainer}>
                                                <Text style={[styles.legendText, { color: 'skyblue' }]}>Frente 1</Text>
                                                <Text style={[styles.legendText, { color: 'orange' }]}>Frente 2</Text>
                                                <Text style={[styles.legendText, { color: 'green' }]}>Frente 3</Text>
                                                <Text style={[styles.legendText, { color: 'red' }]}>Frente 4</Text>
                                                <Text style={[styles.legendText, { color: 'purple' }]}>Frente 5</Text>
                                            </View>
                                        </View>

                                        <View style={styles.chartContainer}>
                                            <Text style={styles.chartTitle}>Porcentaje de dióxido de carbón</Text>

                                            {charDataMonoxido.length > 0 && (
                                                <LineChart
                                                    data={charDataDioxido[0] ? charDataDioxido[0].data : []}
                                                    data2={charDataDioxido[1] ? charDataDioxido[1].data : []}
                                                    data3={charDataDioxido[2] ? charDataDioxido[2].data : []}
                                                    data4={charDataDioxido[3] ? charDataDioxido[3].data : []}
                                                    data5={charDataDioxido[4] ? charDataDioxido[4].data : []}
                                                    height={300}
                                                    maxValue={1.5}
                                                    showVerticalLines
                                                    spacing={50}
                                                    initialSpacing={0}
                                                    color1="skyblue"
                                                    color2="orange"
                                                    color3="green"
                                                    color4="red"
                                                    color5="purple"
                                                    textColor2="orange"
                                                    textColor1="skyblue"
                                                    textColor3="green"
                                                    textColor4="red"
                                                    textColor5="purple"
                                                    dataPointsHeight={2}
                                                    dataPointsWidth={2}
                                                    dataPointsColor1="blue"
                                                    dataPointsColor2="red"
                                                    dataPointsColor3="black"
                                                    textShiftY={-2}
                                                    textShiftX={-5}
                                                    textFontSize={11}
                                                    xLabelsColor="black"
                                                    yLabelsColor="red"
                                                />
                                            )}
                                            <View style={styles.legendContainer}>
                                                <Text style={[styles.legendText, { color: 'skyblue' }]}>Frente 1</Text>
                                                <Text style={[styles.legendText, { color: 'orange' }]}>Frente 2</Text>
                                                <Text style={[styles.legendText, { color: 'green' }]}>Frente 3</Text>
                                                <Text style={[styles.legendText, { color: 'red' }]}>Frente 4</Text>
                                                <Text style={[styles.legendText, { color: 'purple' }]}>Frente 5</Text>
                                            </View>
                                        </View>

                                        <View style={styles.chartContainer}>
                                            <Text style={styles.chartTitle}>Porcentaje de metano</Text>

                                            {charDataMetano.length > 0 && (
                                                <LineChart
                                                    data={charDataMetano[0] ? charDataMetano[0].data : []}
                                                    data2={charDataMetano[1] ? charDataMetano[1].data : []}
                                                    data3={charDataMetano[2] ? charDataMetano[2].data : []}
                                                    data4={charDataMetano[3] ? charDataMetano[3].data : []}
                                                    data5={charDataMetano[4] ? charDataMetano[4].data : []}
                                                    data6={charDataMetano[5] ? charDataMetano[5].data : []}
                                                    height={300}
                                                    maxValue={2}
                                                    showVerticalLines
                                                    spacing={44}
                                                    initialSpacing={0}
                                                    color1="skyblue"
                                                    color2="orange"
                                                    color3="green"
                                                    color4="red"
                                                    color5="purple"
                                                    textColor2="orange"
                                                    textColor1="skyblue"
                                                    textColor3="green"
                                                    textColor4="red"
                                                    textColor5="purple"
                                                    dataPointsHeight={2}
                                                    dataPointsWidth={2}
                                                    dataPointsColor1="blue"
                                                    dataPointsColor2="red"
                                                    dataPointsColor3="black"
                                                    textShiftY={-2}
                                                    textShiftX={-5}
                                                    textFontSize={11}
                                                    xLabelsColor="black"
                                                    yLabelsColor="red"
                                                />
                                            )}
                                            <View style={styles.legendContainer}>
                                                <Text style={[styles.legendText, { color: 'skyblue' }]}>Frente 1</Text>
                                                <Text style={[styles.legendText, { color: 'orange' }]}>Frente 2</Text>
                                                <Text style={[styles.legendText, { color: 'green' }]}>Frente 3</Text>
                                                <Text style={[styles.legendText, { color: 'red' }]}>Frente 4</Text>
                                                <Text style={[styles.legendText, { color: 'purple' }]}>Frente 5</Text>
                                            </View>
                                        </View>



                                        <View style={styles.chartContainer}>
                                            <Text style={styles.chartTitle}>PPM de ácido sulfhídrico</Text>

                                            {charDataAcido.length > 0 && (
                                                <LineChart
                                                    data={charDataAcido[0] ? charDataAcido[0].data : []}
                                                    data2={charDataAcido[1] ? charDataAcido[1].data : []}
                                                    data3={charDataAcido[2] ? charDataAcido[2].data : []}
                                                    data4={charDataAcido[3] ? charDataAcido[3].data : []}
                                                    data5={charDataAcido[4] ? charDataAcido[4].data : []}
                                                    data6={charDataAcido[5] ? charDataAcido[5].data : []}
                                                    height={300}
                                                    maxValue={7}
                                                    showVerticalLines
                                                    spacing={44}
                                                    initialSpacing={0}
                                                    color1="skyblue"
                                                    color2="orange"
                                                    color3="green"
                                                    color4="red"
                                                    color5="purple"
                                                    textColor2="orange"
                                                    textColor1="skyblue"
                                                    textColor3="green"
                                                    textColor4="red"
                                                    textColor5="purple"
                                                    dataPointsHeight={2}
                                                    dataPointsWidth={2}
                                                    dataPointsColor1="blue"
                                                    dataPointsColor2="red"
                                                    dataPointsColor3="black"
                                                    textShiftY={-2}
                                                    textShiftX={-5}
                                                    textFontSize={11}
                                                    xLabelsColor="black"
                                                    yLabelsColor="red"
                                                />
                                            )}
                                            <View style={styles.legendContainer}>
                                                <Text style={[styles.legendText, { color: 'skyblue' }]}>Frente 1</Text>
                                                <Text style={[styles.legendText, { color: 'orange' }]}>Frente 2</Text>
                                                <Text style={[styles.legendText, { color: 'green' }]}>Frente 3</Text>
                                                <Text style={[styles.legendText, { color: 'red' }]}>Frente 4</Text>
                                                <Text style={[styles.legendText, { color: 'purple' }]}>Frente 5</Text>
                                            </View>
                                        </View>

                                        <View style={styles.chartContainer}>
                                            <Text style={styles.chartTitle}>PPM de dióxido de nitrógeno</Text>

                                            {charDataAcidoNitroso.length > 0 && (
                                                <LineChart
                                                    data={charDataAcidoNitroso[0] ? charDataAcidoNitroso[0].data : []}
                                                    data2={charDataAcidoNitroso[1] ? charDataAcidoNitroso[1].data : []}
                                                    data3={charDataAcidoNitroso[2] ? charDataAcidoNitroso[2].data : []}
                                                    data4={charDataAcidoNitroso[3] ? charDataAcidoNitroso[3].data : []}
                                                    data5={charDataAcidoNitroso[4] ? charDataAcidoNitroso[4].data : []}
                                                    data6={charDataAcidoNitroso[5] ? charDataAcidoNitroso[5].data : []}
                                                    height={300}
                                                    maxValue={7}
                                                    showVerticalLines
                                                    spacing={44}
                                                    initialSpacing={0}
                                                    color1="skyblue"
                                                    color2="orange"
                                                    color3="green"
                                                    color4="red"
                                                    color5="purple"
                                                    textColor2="orange"
                                                    textColor1="skyblue"
                                                    textColor3="green"
                                                    textColor4="red"
                                                    textColor5="purple"
                                                    dataPointsHeight={2}
                                                    dataPointsWidth={2}
                                                    dataPointsColor1="blue"
                                                    dataPointsColor2="red"
                                                    dataPointsColor3="black"
                                                    textShiftY={-2}
                                                    textShiftX={-5}
                                                    textFontSize={11}
                                                    xLabelsColor="black"
                                                    yLabelsColor="red"
                                                />
                                            )}
                                            <View style={styles.legendContainer}>
                                                <Text style={[styles.legendText, { color: 'skyblue' }]}>Frente 1</Text>
                                                <Text style={[styles.legendText, { color: 'orange' }]}>Frente 2</Text>
                                                <Text style={[styles.legendText, { color: 'green' }]}>Frente 3</Text>
                                                <Text style={[styles.legendText, { color: 'red' }]}>Frente 4</Text>
                                                <Text style={[styles.legendText, { color: 'purple' }]}>Frente 5</Text>
                                            </View>
                                        </View>
                                    </View>
                                ) : (
                                    <Text style={styles.subtitulo1}>No hay datos disponibles para el mes seleccionado.</Text>
                                )}
                            </View>
                        )}
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
        marginBottom: 5,
        color: '#fff',
    },
    chartContainer: {
        flex: 1,
        marginTop: 10,
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 20
    },
    chartTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    axisLabelsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    yAxisLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    xAxisLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtitulo: {
        fontSize: 18,
        textAlign: "center",
        color: "rgba(255, 0, 0, 0.9)",
        marginTop: 1,
        marginBottom: 5
    }, legendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    legendText: {
        marginRight: 10,
    },
    subtitulo1: {
        fontSize: 20,
        textAlign: "center",
        color: "#BCACAC",
        marginTop: 1,
        marginBottom: 5
    },

});

export default GraficaOxigeno;
