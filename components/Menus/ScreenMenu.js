import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../screens/auth/Login';
import Home from '../../screens/Home';
import Register from '../../screens/auth/Register';
import { AuthContext } from '../../context/authContext';
import HeaderMenu from './HeaderMenu';
import Ensayo from '../../screens/Ensayo';
import Account from '../../screens/Account';
import EnsayosMina from '../EnsayosMina';
import Gases from '../../screens/Gases';
import Calculos from '../../screens/Calculos';
import ConcentracionGases from '../../screens/ConcentracionGases';
import GraficaOxigeno from '../Graficas/GraficaOxigeno';
import Principal from '../../screens/Principal';
import HistorialPolvoInerte from '../../screens/PolvoInerte/RegistrosPolvoInerte';
import HistorialPolvoCarbon from '../../screens/PolvoCarbon/RegsistrosPolvoCarbon';
import GraficaPolvoInerte from '../Graficas/GraficaPolvoInerte';
const ScreenMenu = () => {
    // ESTADO GLOBAL
    const { state } = useContext(AuthContext);

    // CONDICION DE AUTENTIFICACION
    const authenticatedUser = state?.user && state?.token;
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName="Login">
            {authenticatedUser ? (
                <>
                    <Stack.Screen name="Principal" component={Principal} options={{
                        title: 'Principal',
                        headerRight: () => <HeaderMenu />
                    }} />
                    <Stack.Screen name="Home" component={Home} options={{
                        title: 'Historial de registros',
                        headerRight: () => <HeaderMenu />
                    }} />
                    <Stack.Screen name="Ensayos" component={EnsayosMina} options={{
                        headerBackTitle: 'Lista de ensayos',
                        headerRight: () => <HeaderMenu />

                    }} />

                    <Stack.Screen name="CrearEnsayo" component={Ensayo} options={{
                        headerBackTitle: 'Agregar ensayo',
                        headerRight: () => <HeaderMenu />

                    }} />


                    <Stack.Screen name="Account" component={Account} options={{
                        headerBackTitle: 'Cuenta',
                        headerRight: () => <HeaderMenu />

                    }} />
                    <Stack.Screen name="ListaEnsayos" component={EnsayosMina} options={{
                        headerBackTitle: 'Lista Ensayos',
                        headerRight: () => <HeaderMenu />
                    }} />


                    <Stack.Screen name="Gases" component={Gases} options={{
                        headerBackTitle: 'Gases',
                        headerRight: () => <HeaderMenu />

                    }} />

                    <Stack.Screen name="Calculos" component={Calculos} options={{
                        headerBackTitle: 'Cálculos',
                        headerRight: () => <HeaderMenu />

                    }} />

                    <Stack.Screen name="Concentración Gases" component={ConcentracionGases} options={{
                        headerBackTitle: 'Concentración de gases en la mina',
                        headerRight: () => <HeaderMenu />
                    }} />

                    <Stack.Screen name="Graficas" component={GraficaOxigeno} options={{
                        headerBackTitle: 'Dashboards',
                        headerRight: () => <HeaderMenu />
                    }} />
                    <Stack.Screen name="Registro Polvo Inerte" component={HistorialPolvoInerte} options={{
                        headerBackTitle: 'Registro Polvo Inerte',
                        headerRight: () => <HeaderMenu />

                    }} />

                    <Stack.Screen name="Registros Polvo Carbon" component={HistorialPolvoCarbon} options={{
                        headerBackTitle: 'Registro Polvo Inerte',
                        headerRight: () => <HeaderMenu />

                    }} />

                    <Stack.Screen name="Grafica Polvo Inerte" component={GraficaPolvoInerte} options={{
                        headerBackTitle: 'Graficas Polvo Inerte',
                        headerRight: () => <HeaderMenu />

                    }} />
                </>
            ) : (
                <>
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />

                </>
            )}
        </Stack.Navigator>
    )
}

export default ScreenMenu
