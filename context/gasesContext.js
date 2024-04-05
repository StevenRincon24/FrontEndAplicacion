import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { createContext } from 'react'

// CONTEXT
const GasesContext = createContext()
const GasesProvider = ({ children }) => {
    // state
    const [loading, setLoading] = useState(false)
    const [gases, setGases] = useState([])

    // GET DATA
    const getGases = async () => {
        console.log("ENTRA")
        setLoading(true)
        try {
            const { data } = await axios.get('http://192.168.18.225:8080/api/v1/gases/gases')
            setLoading(false)
            setGases(data?.gases)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    // DATA INICIAL
    useEffect(() => {
        getGases()
    }, [])
    return (
        <GasesContext.Provider value={{ gases, setGases, getGases }}>
            {children}
        </GasesContext.Provider>
    )
}

export { GasesContext, GasesProvider }
