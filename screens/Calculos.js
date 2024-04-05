import React, { useContext, useState } from 'react';
import { View, Text, KeyboardAvoidingView, ImageBackground, StyleSheet, Image, ScrollView, TouchableOpacity, Modal, Pressable, TextInput, Alert } from 'react-native';
import FooterMenu from '../components/Menus/FooterMenu';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import { MasaPolvoCarbonContext } from '../context/masaPolvoCarbonContext';
import { PolvoCarbonContext } from '../context/polvoCarbonContext';
import { API_URL } from "@env"
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

const Calculos = () => {
  const navigation = useNavigation()
  const { calculos, setCalculos } = useContext(MasaPolvoCarbonContext);
  const { calculosPolvoCarbon, setCalculosPolvoCarbon } = useContext(PolvoCarbonContext);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);

  const [loading, setLoading] = useState('');

  // ESTADOS PARA LOS CALCULOS DE LA CANTIDAD DE POLVO INERTE
  const [masaPolvoCarbon, setMasaPolvoCarbon] = useState('');
  const [porcentajePolvoInerte, setPorcentajePolvoInerte] = useState('');

  // ESTADOS PARA LOS CALCULOS DE LA DETERMINACIÓN DE CONCENTRACIÓN POLVO DE CARBON
  const [masaPolvoCarbonRecolectado, setMasaPolvoCarbonRecolectado] = useState('')
  const [areaGaleria, setAreaGaleria] = useState('')
  const [longitudEstacion, setLongitudEstacion] = useState('')

  // Función para calcular las coordenadas de los círculos
  const calculateCirclePosition = (index, totalCircles) => {
    const centerX = 150; // Centro x del círculo grande
    const centerY = 150; // Centro y del círculo grande
    const radius = 105; // Radio del círculo grande
    const angle = (Math.PI * 2 * index) / totalCircles; // Ángulo de posición del círculo pequeño
    const x = centerX + radius * Math.cos(angle); // Coordenada x
    const y = centerY + radius * Math.sin(angle); // Coordenada y
    return { x, y };
  };

  // Número total de círculos pequeños
  const totalCircles = 3;

  // Textos para los círculos pequeños
  const circleTexts = [
    'Concentración polvo de carbón',
    'Cantidad polvo inerte',
    'Gases',
    'Tasa depósito polvo de carbón',
    'Texto 5'
  ];

  // Íconos para los círculos pequeños
  const circleIcons = [
    'skull-crossbones',
    'burn',
    'wind',
    'tachometer-alt',
  ];

  const polvoCarbon = async () => {
    setLoading(false);
    try {
      setLoading(true);
      // VALIDACION
      if (!masaPolvoCarbon || !porcentajePolvoInerte) {
        setLoading(false);
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Datos incompletos',
          textBody: 'Para realizar el cálculo, debes escribir todos los datos.',
          button: 'OK',
        });
      }
      {/*const { data } = await axios.post('http://192.168.18.225:8080/api/v1/calculos/masa-polvo-inerte', { masaPolvoCarbon, porcentajePolvoInerte });*/ }
      const { data } = await axios.post(`${API_URL}/calculos/masa-polvo-inerte`, { masaPolvoCarbon, porcentajePolvoInerte });
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Exito',
        textBody: `Cálculo realizado, La cantidad de polvo inerte de caliza necesaria es: ${data.masaPC.masaPolvoInerte.toFixed(1)} Kg`,
        button: 'OK',
      });

      {/*alert(data && data.message)*/ }
      setLoading(false)
      navigation.push("Calculos")

    } catch (e) {

      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Ha ocurrido un error durante el proceso. Por favor, inténtelo de nuevo más tarde.',
        button: 'OK',
      });
      setLoading(false);
    }
  }

  const concentracionPolvoCarbon = async () => {
    setLoading(false);
    try {
      setLoading(true);
      // VALIDACION
      if (!masaPolvoCarbonRecolectado || !areaGaleria) {
        setLoading(false);
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Datos incompletos',
          textBody: 'Para realizar el cálculo, debes escribir todos los datos.',
          button: 'OK',
        });
        return;
      }
      const { data } = await axios.post(`${API_URL}/polvo-carbon/concentracion-polvo-carbon`, { masaPolvoCarbonRecolectado, areaGaleria, longitudEstacion });
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Exito',
        textBody: `Cálculo realizado, La concentración de polvo de carbón es: ${data.polvoCarbon.concentracionPolvoCarbon} Kg`,

        button: 'OK',
      });
      {/*alert(data && data.message)*/ }
      setLoading(false)
      navigation.push("Calculos")

    } catch (e) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Ha ocurrido un error durante el proceso. Por favor, inténtelo de nuevo más tarde.',
        button: 'OK',
      });
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ImageBackground source={require('../assets/Fondo_1.png')} style={[styles.container]}>
        <View style={styles.container}>
          <ScrollView>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
              <Image source={require('../assets/Logo_APP.png')} style={{ width: 200, height: 200 }} />
            </View>
            <Text style={styles.pageTitle}>Cálculos</Text>
            <Text style={styles.subtitulo}>Seleccione la opción que desea realizar</Text>
            <View style={styles.containerCircle}>
              {/* Círculos pequeños */}
              {[...Array(totalCircles)].map((_, index) => {
                const { x, y } = calculateCirclePosition(index, totalCircles);
                return (
                  <View key={index} style={[styles.circleContainer, { left: x - 45, top: y - 45 }]}>
                    <TouchableOpacity onPress={() => {
                      switch (index) {
                        case 0:
                          setModalVisible1(true);
                          break;
                        case 1:
                          setModalVisible2(true);
                          break;
                        case 2:
                          navigation.navigate("Concentración Gases")
                          break;
                        case 3:
                          setModalVisible4(true);
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
              {/* Círculo grande central */}
              <View style={[styles.circleContainer, styles.centralCircle]}>
                <Image source={require('../assets/Logo_APP.png')} style={{ width: 100, height: 100, borderRadius: 50 }} />
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
      <View>
        <FooterMenu />
      </View>

      {/* Modales */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          setModalVisible1(!modalVisible1);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.formContainer}>
              <Text style={styles.modalText}>Cantidad polvo de carbón</Text>
              <Text style={styles.subtitulo}>Datos para poder calcular un aproximado de la concentración de polvo presente en el sitio de muestreo</Text>
              <Text>Masa polvo de carbón (gr)</Text>
              <TextInput style={styles.inputBox} keyboardType="numeric" value={masaPolvoCarbonRecolectado} onChangeText={setMasaPolvoCarbonRecolectado} ></TextInput>

              <Text>Área transversal de la galería (m²)</Text>
              <TextInput style={styles.inputBox} keyboardType="numeric" value={areaGaleria} onChangeText={setAreaGaleria} ></TextInput>

              <Text>Longitud de la estación (m)</Text>
              <TextInput style={styles.inputBox} keyboardType="numeric" value={longitudEstacion} onChangeText={setLongitudEstacion} ></TextInput>
              <View style={styles.buttonContainer}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => { concentracionPolvoCarbon(); setModalVisible1(!modalVisible1) }}
                >
                  <Text style={styles.textStyle}>{loading ? "Cargando..." : "Calcular"}</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible1(!modalVisible1)}>
                  <Text style={styles.textStyle}>Cancelar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.formContainer}>
              <Text style={styles.modalText}>Cantidad de polvo inerte de cáliza</Text>
              <Text style={styles.subtitulo}>Datos para calcular la cantidad de polvo inerte de cáliza para mitigar explosión por polvo de carbón</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-around", alignContent: "center" }}>
                <View style={{ width: "50%" }} >
                  <Text>Masa polvo de carbón</Text>
                  <TextInput style={styles.inputBox} keyboardType="numeric" value={masaPolvoCarbon} onChangeText={setMasaPolvoCarbon} />
                </View>
                <View style={{ width: "50%", marginLeft: "10%" }}>
                  <Text>Unidades</Text>
                  <TextInput style={styles.inputBox2} value='Kg' editable={false}></TextInput>

                </View>

              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-around", alignContent: "center" }}>
                <View style={{ width: "50%" }} >
                  <Text>Porcentaje polvo inerte</Text>
                  <TextInput style={styles.inputBox} keyboardType="numeric" value={porcentajePolvoInerte} onChangeText={setPorcentajePolvoInerte}></TextInput>
                </View>
                <View style={{ width: "50%" }} >
                  <Text>{" "}</Text>
                  <Text>{" "}</Text>
                  <TextInput style={styles.inputBox2} value='%' editable={false}></TextInput>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => { polvoCarbon(); setModalVisible2(!modalVisible2) }}
                >
                  <Text style={styles.textStyle}>{loading ? "Cargando..." : "Calcular"}</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible2(!modalVisible2)}>
                  <Text style={styles.textStyle}>Cancelar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible3}
        onRequestClose={() => {
          setModalVisible3(!modalVisible3);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Modal 3</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible3(!modalVisible3)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible4}
        onRequestClose={() => {
          setModalVisible4(!modalVisible4);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.formContainer}>
              <Text style={styles.modalText}>Modal 1</Text>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible4(!modalVisible4)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: "#fff",
    marginTop: 1,
    marginBottom: 15,
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
  circleText2: {
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
    textAlignVertical: 'bottom',
    marginTop: 5,
  },
  centralCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.0)",
    left: 100,
    top: 100,
  },
  pageTitle: {
    fontSize: 40,
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 5,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
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
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  formContainer: {
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20
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
    color: "black",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    paddingStart: 30,
    height: 50,
    width: "50%",
    borderRadius: 100,
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: '#2685BF',
    marginBottom: 10,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "45%",
    margin: 10
  },

});

export default Calculos;
