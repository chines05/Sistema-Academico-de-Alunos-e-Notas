import React, { useState } from 'react'
import {
  View,
  TextInput,
  Button,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import api from '../utils/api'

const Register = () => {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()

  const handleRegister = async () => {
    if (!nome || !email || !cpf || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos')
      return
    }

    if (cpf.length !== 11 || !/^\d+$/.test(cpf)) {
      Alert.alert('Erro', 'CPF inválido (deve ter 11 dígitos)')
      return
    }

    setLoading(true)
    try {
      const { data } = await api.post('/auth/register', {
        nome,
        email,
        cpf,
        senha,
      })

      if (!data.user || !data.message) {
        throw new Error('Cadastro incompleto')
      }

      Alert.alert('Sucesso', data.message)
      navigation.navigate('Login')
    } catch (error: any) {
      Alert.alert('Erro', error.response?.data?.erro || 'Falha no cadastro')
      console.error('Erro no cadastro:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro IFNMG</Text>

      <TextInput
        placeholder="Nome Completo"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        autoCapitalize="words"
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="CPF (apenas números)"
        value={cpf}
        onChangeText={setCpf}
        style={styles.input}
        keyboardType="number-pad"
        maxLength={11}
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
        secureTextEntry
      />

      <Button
        title={loading ? 'Cadastrando...' : 'Cadastrar'}
        onPress={handleRegister}
        disabled={loading}
      />

      <TouchableOpacity
        style={styles.loginLink}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginLinkText}>Já tem conta? Faça login</Text>
      </TouchableOpacity>
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
  registerLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerLinkText: {
    color: '#3498db',
    fontSize: 16,
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginLinkText: {
    color: '#3498db',
    fontSize: 16,
  },
})

export default Register
