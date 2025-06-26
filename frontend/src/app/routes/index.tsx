import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../../pages/Login'
import Register from '../../pages/Register'
import Disciplina from '../../pages/Disciplina'
import AppTabs from './AppTabs'

const Stack = createNativeStackNavigator()

const Routes = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="AppTabs" component={AppTabs} />
    <Stack.Screen name="Disciplina" component={Disciplina} />
  </Stack.Navigator>
)

export default Routes
