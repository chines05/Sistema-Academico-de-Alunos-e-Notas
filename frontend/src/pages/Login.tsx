import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginFormData } from 'src/schemas/loginSchema'
import api from 'src/utils/api'
import { useNavigation } from '@react-navigation/native'
import Input from 'src/components/Input'
import { colors } from 'src/utils/colors'
import { Ionicons } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'
import * as Animatable from 'react-native-animatable'

const { width } = Dimensions.get('window')

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
      senha: 'Chines05',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { data: response } = await api.post('/auth/login', data)

      if (!response.token || !response.user) {
        throw new Error('Dados incompletos na resposta')
      }

      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'AppTabs',
            params: {
              user: response.user,
              token: response.token,
            },
          },
        ],
      })

      Toast.show({
        type: 'success',
        text1: response.message,
      })
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.response?.data?.erro || 'Falha ao realizar login',
      })
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.branco }]}
    >
      <View style={styles.content}>
        <Animatable.View animation="zoomIn" delay={200} style={styles.header}>
          <Image
            source={require('src/assets/imgs/logo-ifnmg-almenara.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Sistema Acadêmico</Text>
          <Text style={styles.subtitle}>Acesse sua conta</Text>
        </Animatable.View>

        <View style={styles.formContainer}>
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
            name="senha"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Senha"
                icon="lock-closed-outline"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                error={errors.senha}
              />
            )}
          />

          <TouchableOpacity
            style={[styles.button, isSubmitting && styles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            activeOpacity={0.8}
          >
            {isSubmitting ? (
              <ActivityIndicator color={colors.branco} />
            ) : (
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>ENTRAR</Text>
                <Ionicons
                  name="arrow-forward"
                  size={20}
                  color={colors.branco}
                />
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={styles.registerLink}
            activeOpacity={0.6}
          >
            <Text style={styles.linkText}>
              Não possui cadastro?{' '}
              <Text style={styles.linkTextBold}>Crie sua conta</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>

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
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 60,
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
  registerLink: {
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

export default Login
