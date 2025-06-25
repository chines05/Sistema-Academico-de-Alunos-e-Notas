import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import type { HomeScreenProps } from '../types/navigation'
import api from '../utils/api'

const Home = () => {
  const route = useRoute<HomeScreenProps['route']>()
  const navigation = useNavigation()
  const { token, user } = route.params

  const handleLogout = async () => {
    try {
      await api.post(
        '/auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })

      ToastAndroid.show('Logout realizado com sucesso', ToastAndroid.SHORT)
    } catch (error: any) {
      console.error('Erro no logout:', error)
      ToastAndroid.show(
        error.response?.data?.erro || 'Erro ao sair',
        ToastAndroid.SHORT
      )
    }
  }

  if (!token || !user) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Erro: Dados de autenticação inválidos</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bem-vindo, {user.nome}!</Text>
      <Text style={styles.detail}>Matrícula: {user.id}</Text>
      <Text style={styles.detail}>Email: {user.email}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  welcome: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  detail: {
    fontSize: 18,
    marginVertical: 8,
    color: '#34495e',
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
  logoutButton: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#e74c3c',
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default Home
