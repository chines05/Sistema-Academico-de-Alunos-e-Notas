import React from 'react'
import {
  View,
  Button,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginFormData } from '../schemas/auth'
import api from '../utils/api'
import { useNavigation } from '@react-navigation/native'
import Input from '../components/Input'

const Login = () => {
  const navigation = useNavigation()
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'chines@aluno.ifnmg.edu.br',
      senha: 'chines05',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await api.post('/auth/login', data)

      if (!response.data.token || !response.data.user) {
        throw new Error('Dados incompletos na resposta')
      }

      navigation.navigate('Home', {
        user: response.data.user,
        token: response.data.token,
      })

      ToastAndroid.show('Login realizado com sucesso', ToastAndroid.SHORT)
    } catch (error: any) {
      Alert.alert('Erro', error.response?.data?.erro || 'Credenciais inválidas')
      console.error('Erro no login:', error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login IFNMG</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />

      <Controller
        control={control}
        name="senha"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Senha"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry
            error={errors.senha}
          />
        )}
      />

      <Button
        title={isSubmitting ? 'Carregando...' : 'Entrar'}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      />

      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerLinkText}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  )
}

// Estilos (manter os mesmos do exemplo anterior)
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
  registerLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerLinkText: {
    color: '#3498db',
    fontSize: 16,
  },
})

export default Login
