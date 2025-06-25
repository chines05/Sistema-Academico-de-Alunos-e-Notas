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
          let iconName: string

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline'
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline'
          } else {
            iconName = 'alert-circle'
          }

          // Ícone com círculo de fundo quando ativo
          return (
            <View style={focused ? styles.activeIconContainer : null}>
              <Ionicons name={iconName} size={size} color={color} />
            </View>
          )
        },
        tabBarActiveTintColor: colors.verde, // Verde do IFNMG
        tabBarInactiveTintColor: colors.cinza, // Cinza para itens inativos
        tabBarStyle: {
          backgroundColor: colors.branco, // Fundo branco
          borderWidth: 1,
          borderTopWidth: 1,
          elevation: 10, // Sombra mais pronunciada
          height: 70,
          shadowColor: colors.verdeEscuro,
          shadowOffset: { width: 0, height: -5 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          position: 'absolute',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingHorizontal: 20,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 5,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
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
