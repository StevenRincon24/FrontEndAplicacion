import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { createContext } from 'react'

const PolvoCarbonContext = createContext()

const PolvoCarbonProvider = ({ children }) => {

    const [loading, setLoading] = useState(false)
    const [polvoCarbon, setPolvoCarbon] = useState([])

    const getCalculosPolvoCarbon = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get('http://192.168.18.225:8080/api/v1/polvo-carbon/lista-concentracion-polvo-carbon')
            setLoading(false)
            setPolvoCarbon(data?.polvoCarbon)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }

    useEffect(() => {
        getCalculosPolvoCarbon()
    }, [])

    return (
        <PolvoCarbonContext.Provider value={{ polvoCarbon, setPolvoCarbon, getCalculosPolvoCarbon }}>
            {children}
        </PolvoCarbonContext.Provider>
    )
}

export { PolvoCarbonContext, PolvoCarbonProvider }