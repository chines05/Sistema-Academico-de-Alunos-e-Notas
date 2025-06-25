import React, { useState } from 'react'
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import api from '../utils/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = () => {
  const [email, setEmail] = useState('chines@aluno.ifnmg.edu.br')
  const [senha, setSenha] = useState('chines05')
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha email e senha')
      return
    }

    setLoading(true)
    try {
      const { data } = await api.post('/auth/login', { email, senha })

      const token = data.token
      if (!token) {
        Alert.alert('Erro', 'Token de autenticação inválido')
        return
      }

      const user = {
        id: data.id,
        nome: data.nome,
        email: data.email,
      }

      await AsyncStorage.multiSet([
        ['@auth_token', token],
        ['@user_data', JSON.stringify(user)],
      ])

      navigation.navigate('Home', {
        user,
        token,
      })
    } catch (error) {
      Alert.alert('Erro', 'Credenciais inválidas')
      console.error('Erro no login:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login IFNMG</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
        secureTextEntry
      />

      <Button
        title={loading ? 'Carregando...' : 'Entrar'}
        onPress={handleLogin}
        disabled={loading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 15,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
})

export default Login
