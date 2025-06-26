import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import Home from '../../pages/Home'
import Login from '../../pages/Login'
import Register from '../../pages/Register'
import Profile from '../../pages/Profile'
import Disciplina from '../../pages/Disciplina'
import { StyleSheet, View } from 'react-native'
import { colors } from '../../utils/colors'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const AppTabs = ({ route }: any) => {
  const { user, token } = route.params || {}

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          type IoniconsName = React.ComponentProps<typeof Ionicons>['name']
          let iconName: IoniconsName

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline'
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline'
          } else {
            iconName = 'alert-circle'
          }

          return (
            <View style={focused ? styles.activeIconContainer : null}>
              <Ionicons name={iconName} size={size} color={color} />
            </View>
          )
        },
        tabBarActiveTintColor: colors.verde,
        tabBarInactiveTintColor: colors.cinza,
        tabBarStyle: {
          backgroundColor: colors.branco,
          borderTopWidth: 1,
          height: 70,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{ user, token }}
        options={{
          headerShown: false,
          tabBarLabel: 'Início',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{ user, token }}
        options={{
          headerShown: false,
          tabBarLabel: 'Perfil',
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  activeIconContainer: {
    backgroundColor: colors.verdeClaro + '20',
    borderRadius: 30,
  },
})

const Routes = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="AppTabs" component={AppTabs} />
    <Stack.Screen name="Disciplina" component={Disciplina} />
  </Stack.Navigator>
)

export default Routes
