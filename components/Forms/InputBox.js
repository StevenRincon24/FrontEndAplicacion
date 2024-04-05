import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

const InputBox = ({ inputTitle, keyboardType, autoComplete, secureTextEntry = false, value, setValue, editable }) => {
  return (
    <View>
      <Text style={styles.inputTitle}>{inputTitle}</Text>
      <TextInput style={styles.inputBox}
        autoCorrect={false}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
        value={value}
        editable={editable}
        onChangeText={(text) => setValue(text)}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e1d5c9",
  },
  pageTitle: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
    color: "#1e2225",
    marginBottom: 20,
  },
  inputTitle: {
    color: "#ffffff",
    fontSize: 16,
    marginTop: 5,

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
    color: 'black',
    fontSize: 15,
    
  }
});

export default InputBox