import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, ImageBackground, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import FooterMenu from '../components/Menus/FooterMenu';
import InputBox from '../components/Forms/InputBox';
import SubmitButton from '../components/Forms/SubmitButton';
import { EnsayoContext } from '../context/ensayoContext';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { API_URL } from "@env"
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

const Ensayo = ({ navigation }) => {
  const { ensayos, setEnsayos } = useContext(EnsayoContext);

  const [fechaMuestreo, setFechaMuestreo] = useState(new Date());
  const [fechaAnalisis, setFechaAnalisis] = useState(new Date());
  const [fechaRecepcion, setFechaRecepcion] = useState(new Date());
  const [fechaEntregaResultados, setFechaEntregaResultados] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [datePickerVisibleMuestreo, setDatePickerVisibleMuestreo] = useState(false);
  const [datePickerVisibleAnalisis, setDatePickerVisibleAnalisis] = useState(false);
  const [datePickerVisibleRecepcion, setDatePickerVisibleRecepcion] = useState(false);
  const [datePickerVisibleEntregaResultados, setDatePickerVisibleEntregaResultados] = useState(false);
  const [observacionMuestra, setObservacionMuestra] = useState('');
  const [informacionInternaEnsayo, setinformacionInternaEnsayo] = useState('');
  const [informacionExternaEnsayo, setinformacionExternaEnsayo] = useState('');
  const [informacionGeoespacionX, setInformacionGeoespacionX] = useState('');
  const [informacionGeoespacionY, setInformacionGeoespacionY] = useState('');
  const [informacionGeoespacionZ, setInformacionGeoespacionZ] = useState('');
  const [porcentajeCH4, setPorcentajeCH4] = useState('');
  const [porcentajeCaO, setPorcentajeCaO] = useState('');
  const [porcentajeSiO2, setPorcentajeSiO2] = useState('');
  const [laboratorioEncargado, setLaboratorioEncargado] = useState('');
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const checkConnectionAndUploadData = async () => {
      console.log(AsyncStorage.getItem('pendingData'))

      try {
        const connectionInfo = await NetInfo.fetch();
        setIsConnected(connectionInfo.isConnected);
        if (connectionInfo.isConnected) {
          const pendingData = await AsyncStorage.getItem('pendingData');
          if (pendingData) {
            const data = JSON.parse(pendingData);
            await axios.post(`${API_URL}/enasyo/createEnsayo`, data);
            await AsyncStorage.removeItem('pendingData');
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Registro subido',
              textBody: 'Datos pendientes subidos con éxito',
              button: 'OK',
            });
          }
        }
      } catch (error) {
        console.log(AsyncStorage.getItem('pendingData'))
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: 'Ha ocurrido un error al subir los datos pendientes. Por favor, inténtelo de nuevo más tarde.',
          button: 'OK',
        });
      }
    };
    checkConnectionAndUploadData();

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const saveDataLocally = async (data) => {
    try {
      let pendingData = await AsyncStorage.getItem('pendingData');
      pendingData = pendingData ? JSON.parse(pendingData) : [];
      pendingData.push(data);
      await AsyncStorage.setItem('pendingData', JSON.stringify(pendingData));
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Ha ocurrido un error al guardar los datos localmente',
        button: 'OK',
      });
      {/*      console.error('Error saving data locally: ', error);*/ }
    }
  };

  const showDatePicker = (fieldName) => {
    switch (fieldName) {
      case 'fechaMuestreo':
        setDatePickerVisibleMuestreo(true);
        break;
      case 'fechaAnalisis':
        setDatePickerVisibleAnalisis(true);
        break;
      case 'fechaRecepcion':
        setDatePickerVisibleRecepcion(true);
        break;
      case 'fechaEntregaResultados':
        setDatePickerVisibleEntregaResultados(true);
        break;
      default:
        break;
    }
  };

  const hideDatePicker = (fieldName) => {
    switch (fieldName) {
      case 'fechaMuestreo':
        setDatePickerVisibleMuestreo(false);
        break;
      case 'fechaAnalisis':
        setDatePickerVisibleAnalisis(false);
        break;
      case 'fechaRecepcion':
        setDatePickerVisibleRecepcion(false);
        break;
      case 'fechaEntregaResultados':
        setDatePickerVisibleEntregaResultados(false);
        break;
      default:
        break;
    }
  };

  const handleConfirm = (date, fieldName) => {
    switch (fieldName) {
      case 'fechaMuestreo':
        setFechaMuestreo(date);
        hideDatePicker(fieldName);
        break;
      case 'fechaAnalisis':
        setFechaAnalisis(date);
        hideDatePicker(fieldName);
        break;
      case 'fechaRecepcion':
        setFechaRecepcion(date);
        hideDatePicker(fieldName);
        break;
      case 'fechaEntregaResultados':
        setFechaEntregaResultados(date);
        hideDatePicker(fieldName);
        break;
      default:
        break;
    }
  };

  const formatDate = (date) => {
    if (!date) return "Seleccionar una fecha";
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!fechaMuestreo || !informacionGeoespacionX || !informacionGeoespacionY || !informacionGeoespacionZ || !fechaAnalisis || !fechaRecepcion || !fechaEntregaResultados || !laboratorioEncargado || !porcentajeCH4 || !porcentajeCaO || !porcentajeSiO2) {
        setLoading(false);
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Datos incompletos',
          textBody: 'Verifica que todos los datos esten completos.',
          button: 'OK',
        });
      }

      if (fechaMuestreo > fechaAnalisis || fechaMuestreo > fechaEntregaResultados || fechaMuestreo > fechaRecepcion || fechaMuestreo > new Date()) {
        setLoading(false);
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Revisa las fechas incompletos',
          textBody: 'La fecha de muestreo no puede ser mayor a las demás.',
          button: 'OK',
        });
        return
      }
      if (fechaRecepcion > fechaEntregaResultados) {
        setLoading(false);
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Revisa las fechas incompletos',
          textBody: 'La fecha de recepcion no puede ser mayor a la fecha de analisis.',
          button: 'OK',
        });
        return
      }

      const response = await axios.post(`${API_URL}/enasyo/createEnsayo`, {
        informacionInternaEnsayo,
        informacionExternaEnsayo,
        fechaMuestreo,
        informacionGeoespacionX,
        informacionGeoespacionY,
        informacionGeoespacionZ,
        fechaAnalisis,
        fechaRecepcion,
        fechaEntregaResultados,
        porcentajeCH4,
        porcentajeCaO,
        porcentajeSiO2,
        observacionMuestra,
        laboratorioEncargado
      });

      if (response.data.success && response.data.ensayos) {

        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Registro Exitoso',
          textBody: 'El registro de ensayo de laboratorio se ha guardo satisfactoriamente',
          button: 'OK',
        });
        {/*        alert(response.data.message);*/ }
        setEnsayos([...ensayos, response.data.ensayo]);
        navigation.push('Ensayos');

        return
      } else {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: 'Error en el sistema, por favor intentalo más tarde',
          button: 'OK',
        });
        navigation.push('Ensayos');
        return
      }

    } catch (e) {
      // En caso de error de red u otros errores
      // Guarda los datos localmente si hay un error de conexión
      saveDataLocally({
        informacionInternaEnsayo,
        informacionExternaEnsayo,
        fechaMuestreo,
        informacionGeoespacionX,
        informacionGeoespacionY,
        informacionGeoespacionZ,
        fechaAnalisis,
        fechaRecepcion,
        fechaEntregaResultados,
        porcentajeCH4,
        porcentajeCaO,
        porcentajeSiO2,
        observacionMuestra,
        laboratorioEncargado
      });
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Sin conexión a internet',
        textBody: 'Los datos se guardarán localmente y se subirán cuando haya conexión a Internet',
        button: 'OK',
      });
    } finally {
      setLoading(false);
    }
  };




  return (
    <ImageBackground source={require('../assets/Fondo_1.png')} style={[styles.container, { justifyContent: "center", paddingTop: Constants.statusBarHeight + 10 }]}>
      <View style={styles.container}>
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <Image source={require('../assets/Logo_APP.png')} style={{ width: 200, height: 200 }} />
          </View>
          <View style={styles.formContainer}>

            <Text style={styles.heading}>Información del ensayo de laboratorio</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
              <View style={{ width: "95%" }}>
                <InputBox inputTitle={"Información interna del ítem de ensayo"} value={informacionInternaEnsayo} setValue={setinformacionInternaEnsayo} />

              </View>

            </View>


            <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20, marginBottom: 20 }}>
              <View style={{ width: "95%" }}>
                <InputBox inputTitle={"Información externa del ítem de ensayo"} value={informacionExternaEnsayo} setValue={setinformacionExternaEnsayo} />
              </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 20 }}>
              <View style={{ width: "95%" }}>
                <InputBox inputTitle={"Laboratorio encargado de realizar el ensayo"} value={laboratorioEncargado} setValue={setLaboratorioEncargado} />
              </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
              <View style={{ width: "45%" }}>
                <Text style={styles.inputTitle}>Fecha muestreo</Text>
                <TouchableOpacity style={styles.inputBtn} onPress={() => showDatePicker('fechaMuestreo')}>

                  <Text style={styles.dateText}>
                    {formatDate(fechaMuestreo)}
                  </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  date={fechaMuestreo}
                  isVisible={datePickerVisibleMuestreo}
                  mode="date"
                  onConfirm={(date) => handleConfirm(date, 'fechaMuestreo')}
                  onCancel={hideDatePicker}
                />
              </View>
              <View style={{ width: "45%" }}>
                <Text style={styles.inputTitle}>Fecha análisis</Text>
                <TouchableOpacity style={styles.inputBtn} onPress={() => showDatePicker('fechaAnalisis')}>

                  <Text style={styles.dateText}>
                    {formatDate(fechaAnalisis)}
                  </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  date={fechaAnalisis}
                  isVisible={datePickerVisibleAnalisis}
                  mode="date"
                  onConfirm={(date) => handleConfirm(date, 'fechaAnalisis')}
                  onCancel={hideDatePicker}
                />
              </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
              <View style={{ width: "30%" }}>
                <InputBox inputTitle={"Coordenada X"} value={informacionGeoespacionX} setValue={setInformacionGeoespacionX} keyboardType="numeric"
                />
              </View>
              <View style={{ width: "30%" }}>
                <InputBox inputTitle={"Coordenada Y"} value={informacionGeoespacionY} setValue={setInformacionGeoespacionY} keyboardType="numeric"
                />
              </View>
              <View style={{ width: "30%" }}>
                <InputBox inputTitle={"Coordenada Z"} value={informacionGeoespacionZ} setValue={setInformacionGeoespacionZ} keyboardType="numeric"
                />
              </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
              <View style={{ width: "30%" }}>
                <InputBox inputTitle={"% CH₄"} value={porcentajeCH4} setValue={setPorcentajeCH4} keyboardType="numeric"
                />
              </View>
              <View style={{ width: "30%" }}>
                <InputBox inputTitle={"% CaO"} value={porcentajeCaO} setValue={setPorcentajeCaO} keyboardType="numeric"
                />
              </View>
              <View style={{ width: "30%" }}>
                <InputBox inputTitle={"SiO₂"} value={porcentajeSiO2} setValue={setPorcentajeSiO2} keyboardType="numeric"
                />
              </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
              <View style={{ width: "40%" }}>
                <Text style={styles.inputTitle}>Fecha recepción</Text>
                <TouchableOpacity style={styles.inputBtn} onPress={() => showDatePicker('fechaRecepcion')}>

                  <Text style={styles.dateText}>
                    {formatDate(fechaRecepcion)}
                  </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  date={fechaRecepcion}
                  isVisible={datePickerVisibleRecepcion}
                  mode="date"
                  onConfirm={(date) => handleConfirm(date, 'fechaRecepcion')}
                  onCancel={hideDatePicker}
                />
              </View>
              <View style={{ width: "50%" }}>
                <Text style={styles.inputTitle}>Fecha entrega resultados</Text>
                <TouchableOpacity style={styles.inputBtn} onPress={() => showDatePicker('fechaEntregaResultados')}>

                  <Text style={styles.dateText}>
                    {formatDate(fechaEntregaResultados)}
                  </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  date={fechaEntregaResultados}
                  isVisible={datePickerVisibleEntregaResultados}
                  mode="date"
                  onConfirm={(date) => handleConfirm(date, 'fechaEntregaResultados')}
                  onCancel={hideDatePicker}
                />
              </View>

            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
              <View style={{ width: "95%" }}>
                <Text style={styles.inputTitle}>Observación de la muestra</Text>
                <TextInput style={styles.inputBox2} value={observacionMuestra} onChangeText={(text) => setObservacionMuestra(text)} multiline={true} numberOfLines={5} />
              </View>

            </View>

            <View>
              <SubmitButton btnTitle={"Aceptar"} loading={loading} handleSubmit={handleSubmit} />
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.footerContainer}>
        <FooterMenu />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  inputTitle: {
    color: "#ffffff",
    fontSize: 16,
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
  },
  footerContainer: {
    marginTop: 20,
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 0
  },
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
  inputBox2: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    paddingStart: 30,
    width: "100%",
    alignSelf: "center",
    borderRadius: 100,
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: '#2685BF',
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
  }
})

export default Ensayo
