import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import Constants from 'expo-constants'
import FooterMenu from '../components/Menus/FooterMenu'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native';

const Principal = () => {
    const totalCircles = 4;
    const navigation = useNavigation();

    // Textos para los círculos pequeños
    const circleTexts = [
        'Historial de gases',
        'Históricos de gases',
        'Históricos Polvo de carbón',
        'Históricos Polvo inerte',
    ];


    const circleIcons = [
        'list',
        'history',
        'burn',
        'circle',
    ];

    // Función para calcular las coordenadas de los círculos
    const calculateCirclePosition = (index, totalCircles) => {
        const centerX = 150;
        const centerY = 150;
        const radius = 100;
        const angle = (Math.PI * 2 * index) / totalCircles;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        return { x, y };
    };

    return (
        <ImageBackground source={require('../assets/Fondo_1.png')} style={[styles.container, { paddingTop: Constants.statusBarHeight }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../assets/Logo_APP.png')} style={{ width: 150, height: 150 }} />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/*<Text style={styles.pageTitle}>Principal</Text>*/}
                <Text style={styles.pageTitle}>Seleccione la opción que desea realizar</Text>
                <View style={styles.containerCircle}>
                    {[...Array(totalCircles)].map((_, index) => {
                        const { x, y } = calculateCirclePosition(index, totalCircles);
                        return (
                            <View key={index} style={[styles.circleContainer, { left: x - 45, top: y - 45 }]}>
                                <TouchableOpacity onPress={() => {
                                    switch (index) {
                                        case 0:
                                            navigation.navigate('Home');
                                            break;
                                        case 1:
                                            navigation.navigate('Graficas');
                                            break;
                                        case 2:
                                            navigation.navigate('Registros Polvo Carbon');
                                            break;
                                        case 3:
                                            navigation.navigate('Registro Polvo Inerte');
                                            break;
                                        default:
                                            break;
                                    }
                                }} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <FontAwesome5 name={circleIcons[index]} size={24} color="white" />
                                    <Text style={styles.circleText}>{circleTexts[index]}</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
            <FooterMenu />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        marginTop: 20,
        alignItems: 'center',
    },
    containerCircle: {
        position: 'relative',
        width: 300,
        height: 300,
    },
    subtitulo: {
        fontSize: 15,
        textAlign: "center",
        color: "#BCACAC",
        marginTop: 1,
        marginBottom: 5
    },
    circleContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#0366d6',
    },
    circleText: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
        textAlignVertical: 'bottom',
        marginTop: 5,
    },
    pageTitle: {
        fontSize: 30,
        textAlign: "center",
        color: "#FFFFFF",
        marginBottom: 35,
    },
});

export default Principal;
