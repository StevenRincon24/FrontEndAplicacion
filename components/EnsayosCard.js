import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import moment from 'moment';
import { DataTable } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import EditModal from './EditModal';
import { API_URL } from "@env"
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

const EnsayosCard = ({ ensayos, ensayosMinaScreen }) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [ensayo, setEnsayo] = useState({});

    const handleDeleteProp = (id) => {
        Alert.alert(
            '¿Desea eliminar este ensayo?',
            '',
            [
                { text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Si', onPress: () => deleteEnsayo(id) },
            ],
            { cancelable: false }
        );
    };

    const deleteEnsayo = async (id) => {
        try {
            setLoading(true);
            const { data } = await axios.delete(`${API_URL}/enasyo/deleteEnsayo/${id}`);
            setLoading(false);
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Datos eliminado',
                textBody: 'El ensayo de laboratorio ha sido eliminado del sistema',
                button: 'OK',
            });
            navigation.push('Ensayos');
        } catch (err) {
            setLoading(false);
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: 'Ha ocurrido un error en el proceso. Por favor, inténtelo de nuevo más tarde ', err,
                button: 'OK',
            });
            alert(err);
        }
    };

    return (
        <View>
            {ensayosMinaScreen && <EditModal modalVisible={modalVisible} setModalVisible={setModalVisible} ensayo={ensayo} />}
            {ensayos?.map((ensayo, i) => (
                <View key={i} style={styles.card}>
                    {ensayosMinaScreen &&
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Text style={{ marginHorizontal: 20 }}>
                                <FontAwesome5 name='pen' size={20} color='black' onPress={() => { setEnsayo(ensayo), setModalVisible(true) }} />
                            </Text>

                            <Text >
                                <FontAwesome5 name='trash' size={20} color='red' onPress={() => handleDeleteProp(ensayo._id)} />
                            </Text>
                        </View>}

                    <Text style={styles.title}>
                        Información interna del ensayo: {ensayo.informacionInternaEnsayo}
                    </Text>
                    <Text style={styles.hr}></Text>
                    <DataTable>
                        <DataTable.Row>
                            <DataTable.Cell>Información externa</DataTable.Cell>
                            <DataTable.Cell>{ensayo?.informacionExternaEnsayo}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Fecha muestreo</DataTable.Cell>
                            <DataTable.Cell>{moment(ensayo.fechaMuestreo).format('DD/MM/YYYY')}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Coordenada X</DataTable.Cell>
                            <DataTable.Cell>{ensayo?.informacionGeoespacionX}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Coordenada Y</DataTable.Cell>
                            <DataTable.Cell>{ensayo?.informacionGeoespacionY}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Coordenada Z</DataTable.Cell>
                            <DataTable.Cell>{ensayo?.informacionGeoespacionZ}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Laboratorio encargado</DataTable.Cell>
                            <DataTable.Cell>{ensayo?.laboratorioEncargado}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Porcentaje CH₄</DataTable.Cell>
                            <DataTable.Cell>{ensayo?.porcentajeCH4} %</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Porcentaje SiO₂</DataTable.Cell>
                            <DataTable.Cell>{ensayo?.porcentajeSiO2} %</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Porcentaje CaO</DataTable.Cell>
                            <DataTable.Cell>{ensayo?.porcentajeCaO} %</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Fecha Analisis</DataTable.Cell>
                            <DataTable.Cell>{ensayo ? moment(ensayo.fechaAnalisis).format('DD/MM/YYYY') : ''}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Fecha Recepcion</DataTable.Cell>
                            <DataTable.Cell>{ensayo ? moment(ensayo.fechaRecepcion).format('DD/MM/YYYY') : ''}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Fecha Entrega Resultados</DataTable.Cell>
                            <DataTable.Cell>{ensayo ? moment(ensayo.fechaEntregaResultados).format('DD/MM/YYYY') : ''}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Observaciones muestra</DataTable.Cell>
                            <DataTable.Cell>{ensayo?.observacionMuestra}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Fecha de registro</DataTable.Cell>
                            <DataTable.Cell>{moment(ensayo?.createdAt).format('DD/MM/YYYY')}</DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 10,
        borderWidth: 0.2,
        borderColor: "gray",
        marginVertical: 10,
        color: "green"
    }, title: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: "center",
        marginBottom: 5,
        marginTop: 10,
        color: "black"
    }, hr: {
        borderBottomColor: 'black',
        borderBottomWidth: 3,
    }, text: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 16,

    }, subtext: {
        color: "white",
    }
});

export default EnsayosCard;
