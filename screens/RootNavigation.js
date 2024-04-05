import { View, Text } from 'react-native'
import React from 'react'
import { AuthProvider } from '../context/authContext'
import ScreenMenu from '../components/Menus/ScreenMenu'
import { EnsayoProvider } from '../context/ensayoContext'
import { GasesProvider } from '../context/gasesContext'
import { MasaPolvoCarbonProvider } from '../context/masaPolvoCarbonContext'
import { PolvoCarbonProvider } from '../context/polvoCarbonContext'
import { AlertNotificationRoot } from 'react-native-alert-notification';

const RootNavigation = () => {
  return (
    <AuthProvider>
      <EnsayoProvider>
        <GasesProvider>
          <MasaPolvoCarbonProvider>
            <PolvoCarbonProvider>
              <AlertNotificationRoot>
                <ScreenMenu />
              </AlertNotificationRoot>
            </PolvoCarbonProvider>
          </MasaPolvoCarbonProvider>
        </GasesProvider>
      </EnsayoProvider>
    </AuthProvider>
  )
}

export default RootNavigation