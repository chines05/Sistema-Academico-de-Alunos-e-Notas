import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../../utils/colors'
import Home from '../../pages/Home'
import Profile from '../../pages/Profile'

const Tab = createBottomTabNavigator()

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

export default AppTabs
