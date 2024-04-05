import { View, Text, StyleSheet, Alert, Platform } from 'react-native'
import React, { useState } from 'react'
import moment from 'moment'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'
import { DataTable } from 'react-native-paper';


const PolvoCarbonCard = ({ polvoCarbon }) => {
    return (
        <View>
            {polvoCarbon?.map((registrosPolvoCarbon, i) => (
                <View key={i} style={styles.card}>
                    <DataTable>

                        <DataTable.Row style={{ borderBottomWidth: 0 }}>
                            <DataTable.Cell style={[styles.tableData, { flex: 4 }]}>Masa polvo de carbón recolectado</DataTable.Cell>
                            <DataTable.Cell style={styles.tableData}>{registrosPolvoCarbon?.masaPolvoCarbonRecolectado} {" g/m³"}</DataTable.Cell>

                        </DataTable.Row>

                        <DataTable.Row style={{ borderBottomWidth: 0 }}>
                            <DataTable.Cell style={[styles.tableData, { flex: 4 }]}>Área transversal de la galería (m²)</DataTable.Cell>
                            <DataTable.Cell style={styles.tableData}>{registrosPolvoCarbon?.areaGaleria} {" m²"}</DataTable.Cell>

                        </DataTable.Row>

                        <DataTable.Row style={{ borderBottomWidth: 0 }}>
                            <DataTable.Cell style={[styles.tableData, { flex: 4 }]}>Longitud estación (m)</DataTable.Cell>
                            <DataTable.Cell style={styles.tableData}>{registrosPolvoCarbon?.areaGaleria} {" m"}</DataTable.Cell>

                        </DataTable.Row>

                        <DataTable.Row style={{ borderBottomWidth: 0 }}>
                            <DataTable.Cell style={[styles.tableData, { flex: 5 }]}>Concentración polvo de carbón</DataTable.Cell>
                            <DataTable.Cell style={[
                                styles.tableData,
                                {
                                    flex: 2,
                                    backgroundColor: registrosPolvoCarbon && registrosPolvoCarbon.concentracionPolvoCarbon > 50 ? 'red' : 'green'
                                }
                            ]}>
                                {registrosPolvoCarbon?.concentracionPolvoCarbon ? Number(registrosPolvoCarbon.concentracionPolvoCarbon).toFixed(1) : ''} {" g/m³"}
                            </DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>

                    <View style={styles.footer}>
                        <Text style={styles.tableData}>
                            <FontAwesome5 name='calendar' /> Fecha:{" "}{moment(registrosPolvoCarbon?.createdAt).format('DD/MM/YYYY')}
                        </Text>
                        <Text style={styles.tableData}>
                            <FontAwesome5 name='clock' /> Hora:{" "}{moment(registrosPolvoCarbon?.createdAt).format('HH:mm:ss')}
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

export default PolvoCarbonCard;