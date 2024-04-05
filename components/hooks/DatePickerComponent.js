import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';

const DatePickerComponent = ({ startDate, onSelectDate, fieldName }) => {
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const handleChangeDate = date => {
        setSelectedDate(date);
        onSelectDate(fieldName, date); // Pasa el fieldName junto con la fecha seleccionada
        setOpenDatePicker(false);
    };

    const handleOnPress = () => {
        setOpenDatePicker(!openDatePicker);
    };

    return (
        <View>
            <TouchableOpacity
                style={styles.inputBtn}
                onPress={handleOnPress}>
                <Text>{selectedDate || "Seleccionar fecha"}</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={openDatePicker}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <DatePicker
                            mode="calendar"
                            minimumDate={startDate}
                            selected={selectedDate}
                            onDateChanged={handleChangeDate}
                            onSelectedChange={date => setSelectedDate(date)}
                            options={{
                                backgroundColor: '#080516',
                                textHeaderColor: '#469ab6',
                                textDefaultColor: '#FFFFFF',
                                selectedTextColor: '#FFF',
                                mainColor: '#469ab6',
                                textSecondaryColor: '#FFFFFF',
                                borderColor: 'rgba(122, 146, 165, 0.1)',
                            }}
                        />

                        <TouchableOpacity onPress={handleOnPress}>
                            <Text style={{ color: 'white' }}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
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
    modalView: {
        margin: 20,
        backgroundColor: "#080516",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        padding: 35,
        width: "90%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default DatePickerComponent;
