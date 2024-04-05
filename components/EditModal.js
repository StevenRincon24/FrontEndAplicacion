import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import { API_URL } from "@env"
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const EditModal = ({ modalVisible, setModalVisible, ensayo }) => {
    const navigation = useNavigation();
    const [informacionGeoespacionX, setInformacionGeoespacionX] = useState('');
    const [informacionGeoespacionY, setInformacionGeoespacionY] = useState('');
    const [informacionGeoespacionZ, setInformacionGeoespacionZ] = useState('');

    const [fechaMuestreo, setFechaMuestreo] = useState('');
    const [fechaAnalisis, setFechaAnalisis] = useState('');
    const [fechaRecepcion, setFechaRecepcion] = useState('');
    const [fechaEntregaResultados, setFechaEntregaResultados] = useState('');

    const [observacionMuestra, setObservacionMuestra] = useState('');
    const [informacionInternaEnsayo, setInformacionInternaEnsayo] = useState('');
    const [informacionExternaEnsayo, setInformacionExternaEnsayo] = useState('');

    const [loading, setLoading] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setSelectedDate(date);
        setFechaEntregaResultados(date);
        hideDatePicker();
    };
    // HANDLE UPDATE
    const updateEnsayoHandler = async (id) => {
        try {
            setLoading(true);
            const { data } = await axios.put(`${API_URL}/enasyo/update-Ensayo/${id}`, {
                informacionInternaEnsayo,
                informacionExternaEnsayo,
                fechaMuestreo,
                informacionGeoespacionX,
                informacionGeoespacionY,
                informacionGeoespacionZ,
                fechaAnalisis,
                fechaRecepcion,
                fechaEntregaResultados,
                observacionMuestra,
            });
            setLoading(false);
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Actualización satisfactoria',
                textBody: 'Su registro se ha actualizado satisfactoriamente.',
                button: 'OK',
            });
            navigation.push("Ensayos")
        } catch (error) {
            setLoading(false);
            console.log(error);
            alert(error);
        }

    }

    // INITIAL DATA
    useEffect(() => {
        setInformacionGeoespacionX(ensayo?.informacionGeoespacionX);
        setInformacionGeoespacionY(ensayo?.informacionGeoespacionY);
        setInformacionGeoespacionZ(ensayo?.informacionGeoespacionZ);
        setFechaMuestreo(ensayo?.fechaMuestreo);
        setFechaAnalisis(ensayo?.fechaAnalisis);
        setFechaRecepcion(ensayo?.fechaRecepcion);
        setFechaEntregaResultados(ensayo?.fechaEntregaResultados);
        setObservacionMuestra(ensayo?.observacionMuestra);
        setInformacionInternaEnsayo(ensayo?.informacionInternaEnsayo);
        setInformacionExternaEnsayo(ensayo?.informacionExternaEnsayo);
    }, [ensayo]);
    return (
        <View style={styles.centeredView}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <ScrollView>

                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                            {/* <Text>{JSON.stringify(ensayo, null, 4)}</Text> */}
                            <Text style={styles.modalText}>Actualizar</Text>
                            {/* <Text>
                                {JSON.stringify(ensayo, null, 4)}
                            </Text> */}
                            <Text>Identificación interna:</Text>
                            <TextInput style={styles.inputBox} value={informacionInternaEnsayo} editable={false} />

                            <Text>Identificación externa:</Text>
                            <TextInput style={styles.inputBox} value={informacionExternaEnsayo} editable={false} />

                            <Text>Fecha muestreo:</Text>
                            <TextInput style={styles.inputBox} value={moment(fechaMuestreo).format('DD/MM/YYYY')} onChangeText={(text) => setFechaMuestreo(text)} editable={false} />
                            <Text>Fecha analisis:</Text>
                            <TextInput style={styles.inputBox} value={moment(fechaAnalisis).format('DD/MM/YYYY')} onChangeText={(text) => setFechaAnalisis(text)} editable={false} />
                            <Text>Coordenada X:</Text>
                            <TextInput style={styles.inputBox} value={informacionGeoespacionX} onChangeText={(text) => setInformacionGeoespacionX(text)} />
                            <Text>Coordenada Y:</Text>
                            <TextInput style={styles.inputBox} value={informacionGeoespacionY} onChangeText={(text) => setInformacionGeoespacionY(text)} />
                            <Text>Coordenada Z:</Text>
                            <TextInput style={styles.inputBox} value={informacionGeoespacionZ} onChangeText={(text) => setInformacionGeoespacionZ(text)} />
                            <Text>Fecha recepcion:</Text>
                            <TextInput style={styles.inputBox} value={moment(fechaRecepcion).format('DD/MM/YYYY')} onChangeText={(text) => setFechaRecepcion(text)} editable={false} />
                            <View>
                                <Text>Fecha entrega resultados:</Text>
                                <TextInput
                                    style={styles.inputBox}
                                    value={moment(fechaEntregaResultados).format('DD/MM/YYYY')}
                                    onTouchStart={showDatePicker}
                                />
                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                />
                            </View><Text>Observacion:</Text>
                            <TextInput style={styles.inputBox2} value={observacionMuestra} onChangeText={(text) => setObservacionMuestra(text)} multiline={true} numberOfLines={5} />
                            <View style={styles.buttonContainer}>

                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => { updateEnsayoHandler(ensayo && ensayo._id), setModalVisible(!modalVisible) }}>
                                    <Text style={styles.textStyle}>{loading ? "Cargando..." : "Actualizar"}</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textStyle}>Cancelar</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </ScrollView>

            </Modal>

        </View>
    )

}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: "45%",
        margin: 10
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
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
        marginBottom: 10
    },
    inputBox2: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        marginTop: 10,
        paddingLeft: 10,
        paddingStart: 40,
        width: "100%",
        borderRadius: 100,
        backgroundColor: "white",
        borderWidth: 3,
        borderColor: '#2685BF',
        marginBottom: 10
    },
    buttonContainer: {
        flexDirection: 'row',
    }
});
export default EditModal