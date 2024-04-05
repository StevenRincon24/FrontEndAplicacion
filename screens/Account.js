import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, ImageBackground } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import FooterMenu from '../components/Menus/FooterMenu'
import axios from 'axios'
import InputBox from '../components/Forms/InputBox'
import { API_URL } from "@env"
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const Account = () => {
  const { state, setState } = useContext(AuthContext);
  const { user, token } = state

  // LOCAL STATE
  const [nombreMina, setNameMina] = useState(user?.nombreMina);
  const [nitMina, setNitMina] = useState(user?.nitMina);
  const [emailMina, setEmailMina] = useState(user?.emailMina);
  const [municipioMina, setMunicipioMina] = useState(user?.municipioMina);
  const [direccionMina, setDireccionMina] = useState(user?.direccionMina);
  const [proyectoMina, setProyectoMina] = useState(user?.proyectoMina);
  const [constrasenhiaMina, setconstrasenhiaMina] = useState(user?.constrasenhiaMina);
  const [tituloMina, setTituloMina] = useState(user?.tituloMina);
  const [latitude, setLatidud] = useState(user?.latitude);
  const [longitude, setLongitude] = useState(user?.longitude);
  const [loading, setLoading] = useState(false);
  const [latitude1, setLatitude1] = useState(parseFloat(user?.latitude) || 0);
  const [longitude2, setLongitude1] = useState(parseFloat(user?.longitude) || 0);




  // HANDLE UPDATE
  const handleUpdate = async () => {
    try {
      setLoading(true)
      const { data } = await axios.put(`${API_URL}/auth/updateUser`, {
        nombreMina, nitMina, emailMina, municipioMina, direccionMina, proyectoMina, constrasenhiaMina, tituloMina
      }, {
        headers: {
          Authorization: `Bearer ${token && token}`
        }
      });
      setLoading(false);
      let UD = JSON.stringify(data);
      setState({ ...state, user: UD?.updateUser })
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Actualización exitosa',
        textBody: 'Se han actualizado sus datos correctamente, para verificar sus cambios, tienes que volver a iniciar sesión',
        button: 'OK',
      });

    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: error.response.data.message,
        button: 'OK',
      });
      setLoading(false);
      /*alert(error.response.data.message)
      setLoading(false)
      console.log(error)*/
    }
  }



  return (

    <KeyboardAvoidingView style={{ flex: 1 }}
      behavior="padding">
      <ImageBackground source={require('../assets/Fondo_1.png')} style={[styles.container]}>
        <ScrollView >
          <View style={styles.container} >
            <View style={styles.overlay}>
              <View style={styles.formContainer}>
                {/*<View style={{ alignItems: 'center' }}>
                  <Image source={{
                    uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                  }}
                    style={{ width: 200, height: 200 }}
                  />
                </View>*/}



                <Text style={styles.warningText}>Perfil: {nombreMina}</Text>
                <View style={styles.mapContainer}>
                  <Text style={styles.ubicacionText}>Ubicacion</Text>
                  <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}

                    initialRegion={{
                      latitude: latitude1,
                      longitude: longitude2,
                      latitudeDelta: 0.04,
                      longitudeDelta: 0.04,
                    }}
                  >
                    <Marker
                      coordinate={{
                        latitude: latitude1,
                        longitude: longitude2,
                      }}
                    />
                  </MapView>

                </View>
                <View style={styles.inputContainer}>
                  <InputBox inputTitle={"Nombre"} value={nombreMina} setValue={setNameMina} />
                </View>

                <View style={styles.inputContainer}>
                  <InputBox inputTitle={"Nit"} value={nitMina} setValue={setNitMina} editable={false} />
                </View>

                <View style={styles.inputContainer}>
                  <InputBox inputTitle={"Email"} value={emailMina} setValue={setEmailMina} />
                </View>

                <View style={styles.inputContainer}>
                  <InputBox inputTitle={"Contraseña"} secureTextEntry={true} value={constrasenhiaMina} setValue={setconstrasenhiaMina} />
                </View>

                <View style={styles.inputContainer}>
                  <InputBox inputTitle={"Municipio"} value={municipioMina} setValue={setMunicipioMina} editable={false} />
                </View>

                <View style={styles.inputContainer}>
                  <InputBox inputTitle={"Dirección"} value={direccionMina} setValue={setDireccionMina} editable={false} />
                </View>

                <View style={styles.inputContainer}>
                  <InputBox inputTitle={"Proyecto Mina"} value={proyectoMina} setValue={setProyectoMina} editable={false} />
                </View>

                <View style={styles.inputContainer}>
                  <InputBox inputTitle={"Título minero"} value={tituloMina} setValue={setTituloMina} editable={false} />
                </View>

                <View style={{ alignItems: 'center' }}>
                  <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
                    <Text style={styles.updateBtnText}>{loading ? "Cargando..." : "Actualizar perfil"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>


      </ImageBackground>
      <View>
        <FooterMenu />
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  warningText: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  ubicacionText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: "#FFFFFF",
  },
  inputContainer: {
    marginTop: 20,
  },
  inputBox: {
    width: 250,
    backgroundColor: 'white',
    marginLeft: 10,
    marginTop: 10,
    fontSize: 16,
    paddingLeft: 10,
    borderRadius: 5
  },
  inputText: {
    fontWeight: 'bold',
    color: "gray",
  },
  updateBtn: {
    backgroundColor: '#2685BF',
    padding: 10,
    height: 50,
    marginHorizontal: 25,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    borderRadius: 80,
  },
  updateBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },

  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,

  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  mapContainer: {
    height: 200,
    marginVertical: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },


})
export default Account