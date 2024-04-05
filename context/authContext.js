import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// CONTEXT
const AuthContext = createContext();

// Provider
const AuthProvider = ({ children }) => {
    // DATA GLOBAL
    const [state, setState] = useState({
        user: null,
        token: "",
    });

    // FUNCIONES AXIOS SETTINGS
    axios.defaults.baseURL = 'http://192.168.0.10:8000/api/v1';
    axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    // INICIAL LOCAL STORAGE LOCAL
    useEffect(() => {
        const loadLocalStorageDate = async () => {
            let data = await AsyncStorage.getItem('@auth')
            let loginData = JSON.parse(data)
            setState({
                ...state,
                user: loginData.user?.user,
                token: loginData.token?.token
            })
        }
        loadLocalStorageDate();
    }, []);

    return (
        <AuthContext.Provider value={{ state, setState }}>
            {children}
        </AuthContext.Provider>
    );
}


export { AuthContext, AuthProvider };