import { View, Text, StyleSheet } from 'react-native'
import React, {useContext} from 'react'
import Constants from 'expo-constants'
import FooterMenu from '../components/Menus/FooterMenu'
const About = () => {


  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(state, null, 4)}</Text>
      <FooterMenu/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        margin:10,
        marginTop:Constants.statusBarHeight
    }
})


export default About