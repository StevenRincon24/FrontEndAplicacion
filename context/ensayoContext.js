import React, {useContext, useState, useEffect} from 'react'
import axios from 'axios'
import { createContext } from 'react'

// CONTEXT
const EnsayoContext = createContext()
const EnsayoProvider = ({ children }) => {
    // state
    const [loading, setLoading] = useState(false)
    const [ensayos, setEnsayos] = useState([])

    // GET DATA
    const getEnsayos = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get('http://192.168.18.225:8080/api/v1/enasyo/ensayos')
            setLoading(false)
            setEnsayos(data?.ensayos)
        } catch (error) {
            setLoading(false)
        }
    }

    // DATA INICIAL
    useEffect(() => {
        getEnsayos()
    },[])
    return (
        <EnsayoContext.Provider value={{ ensayos, setEnsayos, getEnsayos }}>
            {children}
        </EnsayoContext.Provider>
    )
}

export { EnsayoContext, EnsayoProvider }
