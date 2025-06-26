import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from 'src/pages/Login'
import Register from 'src/pages/Register'
import Disciplina from 'src/pages/Disciplina'
import AppTabs from 'src/app/routes/AppTabs'

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
