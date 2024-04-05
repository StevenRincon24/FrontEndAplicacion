import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation, useRoute } from '@react-navigation/native'
const FooterMenu = () => {
  const navigation = useNavigation()
  const route = useRoute()
  return (

    <View style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal >
        <TouchableOpacity onPress={() => navigation.navigate('Principal')} >
          <FontAwesome5 name="chart-line" style={styles.iconStyle} color={(route.name === 'Home' || route.name === 'Graficas' || route.name === 'Principal' || route.name === 'Registro Polvo Inerte' || route.name === 'Registros Polvo Carbon') ? 'white' : 'black'} />
          <Text style={{ color: (route.name === 'Home' || route.name === 'Graficas' || route.name === 'Principal' || route.name === 'Registro Polvo Inerte' || route.name === 'Registros Polvo Carbon') ? 'white' : 'black', fontWeight: 'bold' }}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Ensayos')} style={styles.menuItem}>
          <FontAwesome5 name="flask" style={styles.iconStyle} color={(route.name === 'Ensayos' || route.name === 'CrearEnsayo') ? 'white' : 'black'} />
          <Text style={{ color: (route.name === 'Ensayos' || route.name === 'CrearEnsayo') ? 'white' : 'black', fontWeight: 'bold' }}>Ensayos</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Calculos')} style={styles.menuItem}>
          <FontAwesome5 name="calculator" style={styles.iconStyle} color={(route.name === 'Calculos' || route.name === 'Concentración Gases') ? 'white' : 'black'} />

          <Text style={{ color: (route.name === 'Calculos' || route.name === 'Concentración Gases') ? 'white' : 'black', fontWeight: 'bold' }}>Realizar cálculos</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Account')} style={styles.menuItem}>
          <FontAwesome5 name="user" style={styles.iconStyle} color={route.name === 'Account' ? 'white' : 'black'} />
          <Text style={{ color: route.name === 'Account' ? 'white' : 'black', fontWeight: 'bold' }}>Cuenta</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#0366d6',
    height: 60,
    alignItems: 'center',
    width: '100%',
    paddingLeft: 1,



  },
  menuItem: {
    marginHorizontal: 25,
  },
  iconStyle: {
    marginBottom: 3,
    alignSelf: 'center',
    fontSize: 20
  },
  scroll: {
    paddingBottom: 25,
  },
})

export default FooterMenu