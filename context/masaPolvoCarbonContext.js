import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { createContext } from 'react'

const MasaPolvoCarbonContext = createContext()

const MasaPolvoCarbonProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [masaPolvoCarbon, setMasaPolvoCarbon] = useState([])

    const getCalculos = async () => {
        console.log("getCalculos")
        setLoading(true)
        try {
            const { data } = await axios.get('http://192.168.18.225:8080/api/v1/calculos/lista-calculos')
            setLoading(false)
            setMasaPolvoCarbon(data?.masaPolvoCarbon)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getCalculos()
    }, [])
    return (
        <MasaPolvoCarbonContext.Provider value={{ masaPolvoCarbon, setMasaPolvoCarbon, getCalculos }}>
            {children}
        </MasaPolvoCarbonContext.Provider>
    )
}

export { MasaPolvoCarbonContext, MasaPolvoCarbonProvider }