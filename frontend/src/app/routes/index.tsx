import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from '../../pages/Login'
import Register from '../../pages/Register'
import Home from '../../pages/Home'

const Stack = createNativeStackNavigator()

const Routes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  )
}

export default Routes
