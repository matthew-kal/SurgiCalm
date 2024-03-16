import React from 'react';
import Login from './screens/Login'; 
import Nurse from './screens/Nurse';
import Patient from "./screens/Patient";
import Words from './screens/Words';
import Yoga from './screens/Yoga';
import Breathe from './screens/Breathe';
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
        <Stack.Screen name="Words" component={Words} options={{ headerBackTitle: 'Back' }}/>
        <Stack.Screen name="Breathe" component={Breathe} options={{ headerBackTitle: 'Back' }}/>
        <Stack.Screen name="Yoga" component={Yoga} options={{ headerBackTitle: 'Back' }}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
 

}

