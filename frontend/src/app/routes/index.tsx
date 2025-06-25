import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import Home from '../../pages/Home'
import Login from '../../pages/Login'
import Register from '../../pages/Register'
import Profile from '../../pages/Profile'
import Disciplina from '../../pages/Disciplina'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const AppTabs = ({ route }: any) => {
  const { user, token } = route.params || {}

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, string> = {
            Home: 'home',
            Profile: 'person',
          }
          return (
            <Ionicons
              name={(icons[route.name] as any) || 'alert-circle'}
              size={size}
              color={color}
            />
          )
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#F3F4F6',
          borderTopWidth: 1,
          elevation: 2,
          height: 70,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{ user, token }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{ user, token }}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  )
}

const Routes = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="AppTabs" component={AppTabs} />
    <Stack.Screen name="Disciplina" component={Disciplina} />
  </Stack.Navigator>
)

export default Routes
