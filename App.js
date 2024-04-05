import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RootNavigation from "./screens/RootNavigation";
import { StatusBar } from 'expo-status-bar';
import { AlertNotificationRoot } from 'react-native-alert-notification';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>

        <RootNavigation />
      </NavigationContainer>

    </>
  );
}
