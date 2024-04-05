import { View, Text, StyleSheet, Alert, Platform } from 'react-native'
import React, { useState } from 'react'
import moment from 'moment'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'
import { DataTable } from 'react-native-paper';


const GasesCard = ({ gases1 }) => {
    return (
        <View>
            {gases1?.map((gases2, i) => (
                <View key={i} style={styles.card}>
                    <Text style={styles.tableData}>
                        Frente de trabajo: {gases2.frenteTrabajo}
                    </Text>
                    <DataTable>

                        <DataTable.Header>
                            <DataTable.Cell style={[styles.tableHeader, { flex: 2 }]}>Gas</DataTable.Cell>
                            <DataTable.Cell style={[styles.tableData, { flex: 4 }]}>Valor</DataTable.Cell>
                            <DataTable.Cell style={[styles.tableData, { flex: 4 }]}>Unidades</DataTable.Cell>
                            <DataTable.Cell style={[styles.tableData, { flex: 4 }]}>Alarma</DataTable.Cell>

                        </DataTable.Header>

                        <DataTable.Row style={{ borderBottomWidth: 0 }}>
                            <DataTable.Cell style={[styles.tableData, { flex: 2 }]}>O₂</DataTable.Cell>
                            <DataTable.Cell style={[styles.tableData, { flex: 4 }]}>{gases2?.porcentajeOxigeno}</DataTable.Cell>
                            <DataTable.Cell style={[styles.tableData, { flex: 4 }]}>%</DataTable.Cell>
                            <View style={[styles.tableData, { flex: 4, backgroundColor: gases2?.porcentajeOxigeno < 19.5 || gases2?.porcentajeOxigeno > 23.5 ? 'red' : 'green' }]}>
                                <Text style={{ color: gases2?.porcentajeOxigeno < 19.5 || gases2?.porcentajeOxigeno > 23.5 ? 'white' : 'white' }}>
                                    {gases2?.porcentajeOxigeno < 19.5 ? 'ALTO' : (gases2?.porcentajeOxigeno > 23.5 ? 'ALTO' : 'Normal')}
                                </Text>
                            </View>
                        </DataTable.Row>


                        <DataTable.Row style={{ borderBottomWidth: 0 }}>
                            <DataTable.Cell style={[styles.tableData, { flex: 2 }]}>CO</DataTable.Cell>
                            <DataTable.Cell style={[styles.tableData, { flex: 4 }]}>{gases2?.porcentajeMonoxidoCarbon}</DataTable.Cell>
                            <DataTable.Cell style={[styles.tableData, { flex: 4 }]}>PPM</DataTable.Cell>
                            <View style={[styles.tableData, { flex: 4, backgroundColor: gases2?.porcentajeMonoxidoCarbon < 25 || gases2?.porcentajeMonoxidoCarbon > 50 ? 'red' : 'green' }]}>
                                <Text style={{ color: gases2?.porcentajeMonoxidoCarbon < 25 || gases2?.porcentajeMonoxidoCarbon > 50 ? 'white' : 'white' }}>
                                    {gases2?.porcentajeMonoxidoCarbon < 25 ? 'ALTO' : (gases2?.porcentajeMonoxidoCarbon > 50 ? 'ALTO' : 'Normal')}
                                </Text>
                            </View>
                        </DataTable.Row>

                        <DataTable.Row style={{ borderBottomWidth: 0 }}>
                            <DataTable.Cell style={[styles.tableData, { flex: 2 }]}> CO₂</DataTable.Cell>
                            <DataTable.Cell style={[styles.tableData, { flex: 4 }]}>{gases2?.porcentajeDioxidoCarbono}</DataTable.Cell>
                            <DataTable.Cell style={[styles.tableData, { flex: 4 }]}>%</DataTable.Cell>
                            <View style={[styles.tableData, { flex: 4, backgroundColor: gases2?.porcentajeDioxidoCarbono < 0.5 || gases2?.porcentajeDioxidoCarbono > 1 ? 'red' : 'green' }]}>
                                <Text style={{ color: gases2?.porcentajeDioxidoCarbono < 0.5 || gases2?.porcentajeDioxidoCarbono > 1 ? 'white' : 'white' }}>
                                    {gases2?.porcentajeDioxidoCarbono < 0.5 ? 'ALTO' : (gases2?.porcentajeDioxidoCarbono > 1 ? 'ALTO' : 'Normal')}
                                </Text>
                            </View>

                        </DataTable.Row>

                        <DataTable.Row style={{ borderBottomWidth: 0 }}>
                            <DataTable.Cell style={[styles.tableData, { flex: 2 }]}>CH₄</DataTable.Cell>
                            <DataTable.Cell style={[styles.tableData, { flex: 4 }]}>{gases2?.porcentajeMetano}</DataTable.Cell>
                            <DataTable.Cell style={[styles.tableData, { flex: 4 }]}>%</DataTable.Cell>
                            <View style={[styles.tableData, { flex: 4, backgroundColor: gases2?.porcentajeMetano < 0.5 || gases2?.porcentajeMetano > 1 ? 'red' : 'green' }]}>
                                <Text style={{ color: gases2?.porcentajeMetano < 0.5 || gases2?.porcentajeMetano > 1 ? 'white' : 'white' }}>
                                    {gases2?.porcentajeMetano < 0.5 ? 'ALTO' : (gases2?.porcentajeMetano > 1 ? 'ALTO' : 'Normal')}
                                </Text>
                            </View>

                        </DataTable.Row>

                        <DataTable.Row style={{ borderBottomWidth: 0 }}>
                            <DataTable.Cell style={[styles.tableData, { flex: 2 }]}>H₂S</DataTable.Cell>
                            <DataTable.Cell style={[styles.tableData, { flex: 4 }]}>{gases2?.porcentajeAcidoSulfhidrico}</DataTable.Cell>
                            <DataTable.Cell style={[styles.tableData, { flex: 4 }]}>PPM</DataTable.Cell>
                            <View style={[styles.tableData, { flex: 4, backgroundColor: gases2?.porcentajeAcidoSulfhidrico < 1 || gases2?.porcentajeAcidoSulfhidrico > 5 ? 'red' : 'green' }]}>
                                <Text style={{ color: gases2?.porcentajeAcidoSulfhidrico < 1 || gases2?.porcentajeAcidoSulfhidrico > 5 ? 'white' : 'white' }}>
                                    {gases2?.porcentajeAcidoSulfhidrico < 1 ? 'ALTO' : (gases2?.porcentajeAcidoSulfhidrico > 5 ? 'ALTO' : 'Normal')}
                                </Text>
                            </View>

                        </DataTable.Row>
                        <DataTable.Row style={{ borderBottomWidth: 0 }}>
                            <DataTable.Cell style={[styles.tableData, { flex: 2 }]}>NO₂</DataTable.Cell>
                            <DataTable.Cell style={[styles.tableData, { flex: 4 }]}>{gases2?.gasesNitrosos}</DataTable.Cell>
                            <DataTable.Cell style={[styles.tableData, { flex: 4 }]}>PPM</DataTable.Cell>
                            <View style={[styles.tableData, { flex: 4, backgroundColor: gases2?.gasesNitrosos < 3 || gases2?.gasesNitrosos > 6 ? 'red' : 'green' }]}>
                                <Text style={{ color: gases2?.gasesNitrosos < 3 || gases2?.gasesNitrosos > 6 ? 'white' : 'white' }}>
                                    {gases2?.gasesNitrosos < 3 ? 'ALTO' : (gases2?.gasesNitrosos > 6 ? 'ALTO' : 'Normal')}
                                </Text>
                            </View>
                        </DataTable.Row>

                        <DataTable.Row style={{ borderBottomWidth: 0 }}>
                            <DataTable.Cell style={[styles.tableData, { flex: 2 }]}>NO</DataTable.Cell>
                            <DataTable.Cell style={[styles.tableData, { flex: 4 }]}>{gases2?.porcentajeOxigenoNitrogeno}</DataTable.Cell>
                            <DataTable.Cell style={[styles.tableData, { flex: 4 }]}>PPM</DataTable.Cell>
                            <View style={[styles.tableData, { flex: 4, backgroundColor: gases2?.porcentajeOxigenoNitrogeno < 3 || gases2?.porcentajeOxigenoNitrogeno > 6 ? 'red' : 'green' }]}>
                                <Text style={{ color: gases2?.porcentajeOxigenoNitrogeno < 3 || gases2?.porcentajeOxigenoNitrogeno > 6 ? 'white' : 'white' }}>
                                    {gases2?.porcentajeOxigenoNitrogeno < 3 ? 'ALTO' : (gases2?.porcentajeOxigenoNitrogeno > 6 ? 'ALTO' : 'Normal')}
                                </Text>
                            </View>
                        </DataTable.Row>
                    </DataTable>

                    <View style={styles.footer}>
                        <Text style={styles.tableData}>
                            <FontAwesome5 name='calendar' /> Fecha:{" "}{moment(gases2?.createdAt).format('DD/MM/YYYY')}
                        </Text>
                        <Text style={styles.tableData}>
                            <FontAwesome5 name='clock' /> Hora:{" "}{moment(gases2?.createdAt).format('HH:mm:ss')}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "white",
        marginVertical: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: "center",
        marginBottom: 10,
        marginTop: 10,
        color: "black"
    },
    tableHeader: {
        ...Platform.select({
            ios: {
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                padding: 10,
                borderRadius: 5,
                marginBottom: 5,
                margin: 2,
                textAlignVertical: 'center',
                textAlign: 'center',
                justifyContent: 'center'
            },
            android: {
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                padding: 10,
                borderRadius: 5,
                marginBottom: 5,
                margin: 2,
                textAlignVertical: 'center',
                textAlign: 'center',
                justifyContent: 'center'
            },
        }),
    },
    tableData: {
        ...Platform.select({
            ios: {
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                padding: 10,
                borderRadius: 5,
                marginBottom: 5,
                marginTop: 5,
                margin: 2,
                textAlignVertical: 'center',
                textAlign: 'center',
                justifyContent: 'center'
            },
            android: {
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                padding: 10,
                marginBottom: 5,
                marginTop: 5,
                margin: 2,
                textAlignVertical: 'center',
                textAlign: 'center',
                justifyContent: 'center'
            },
        }),
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: "white",
        marginTop: 10,
        marginBottom: 10,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerText: {
        color: "black",
    },
});

export default GasesCard;