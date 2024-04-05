import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const SubmitButton = ({ btnTitle, handleSubmit, loading }) => {
  return (
    <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>

      <Text style={styles.btnText}>{loading ? "Cargando..." : btnTitle}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  submitBtn: {
    backgroundColor: "#2685BF",
    padding: 10,
    height: 50,
    marginHorizontal: 25,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: "center",
    borderRadius: 80,
  },
  btnText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "400",
    fontSize: 20
  }
})
export default SubmitButton