import React, { useState } from 'react'
import {
  View,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import api from '../utils/api'
import Input from '../components/Input'
import { colors } from '../utils/colors'
import { Ionicons } from '@expo/vector-icons'
import { RegisterFormData, registerSchema } from '../schemas/registerSchema'
import Toast from 'react-native-toast-message'

const { width } = Dimensions.get('window')

const Register = () => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nome: '',
      email: '',
      cpf: '',
      senha: '',
      confirmarSenha: '',
    },
  })

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true)
    try {
      const { data: response } = await api.post('/auth/register', data)

      if (!response.user) {
        throw new Error('Cadastro incompleto')
      }

      Toast.show({
        type: 'success',
        text1: response.message,
      })

      navigation.navigate('Login')
    } catch (error: any) {
      Alert.alert('Erro', error.response?.data?.erro || 'Falha no cadastro')
      console.error('Erro no cadastro:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.branco }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Image
              source={require('../assets/imgs/logo-ifnmg.jpg')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Cadastro no Sistema</Text>
            <Text style={styles.subtitle}>Crie sua conta acadêmica</Text>
          </View>

          <View style={styles.formContainer}>
            <Controller
              control={control}
              name="nome"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Nome Completo"
                  icon="person-outline"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.nome}
                  autoCapitalize="words"
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Email Institucional"
                  icon="mail-outline"
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
              name="cpf"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="CPF (apenas números)"
                  icon="id-card-outline"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.cpf}
                  keyboardType="numeric"
                />
              )}
            />

            <Controller
              control={control}
              name="senha"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Senha"
                  icon="lock-closed-outline"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.senha}
                  secureTextEntry
                />
              )}
            />

            <Controller
              control={control}
              name="confirmarSenha"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Confirmar Senha"
                  icon="lock-closed-outline"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.confirmarSenha}
                  secureTextEntry
                />
              )}
            />

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color={colors.branco} />
              ) : (
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>CADASTRAR</Text>
                  <Ionicons name="person-add" size={20} color={colors.branco} />
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={styles.loginLink}
              activeOpacity={0.6}
            >
              <Text style={styles.linkText}>
                Já tem uma conta?{' '}
                <Text style={styles.linkTextBold}>Faça login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          IFNMG © {new Date().getFullYear()}
        </Text>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.3,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    color: colors.verde,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  formContainer: {
    paddingHorizontal: 30,
    marginTop: 10,
  },
  button: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    backgroundColor: colors.verde,
    flexDirection: 'row',
    elevation: 3,
    shadowColor: colors.verde,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.branco,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginRight: 10,
  },
  loginLink: {
    marginTop: 20,
    alignSelf: 'center',
  },
  linkText: {
    color: '#666',
    fontSize: 14,
  },
  linkTextBold: {
    color: colors.vermelho,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  footer: {
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerText: {
    color: '#666',
    fontSize: 12,
  },
})

export default Register
