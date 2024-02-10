import React from 'react';
import Login from './screens/Login'; 
import Nurse from './screens/Nurse';
import Patient from "./screens/Patient";
import Module from './screens/Module';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Select Account Type" component={Login}/>
        <Stack.Screen name="Nurse" component={Nurse} options={{ headerBackTitle: 'Logout' }}/>
        <Stack.Screen name="Patient" component={Patient} options={{ headerBackTitle: 'Logout' }}/>
        <Stack.Screen name="Module" component={Module} options={{ headerBackTitle: 'Back' }}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
 

}

