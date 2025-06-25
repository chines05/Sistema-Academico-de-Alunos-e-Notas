import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'
import type { HomeScreenProps } from '../types/navigation'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = () => {
  const route = useRoute<HomeScreenProps['route']>()
  const [userData, setUserData] = useState(route.params.user)

  // Verifica dados no AsyncStorage ao carregar
  useEffect(() => {
    const loadStorageData = async () => {
      const storedUser = await AsyncStorage.getItem('@user_data')
      if (storedUser) {
        setUserData(JSON.parse(storedUser))
      }
    }
    loadStorageData()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bem-vindo, {userData.nome}!</Text>
      <Text style={styles.detail}>Matrícula: {userData.id}</Text>
      <Text style={styles.detail}>Email: {userData.email}</Text>
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
})

export default Home
