import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Ionicons } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'
import * as Animatable from 'react-native-animatable'

import Input from 'src/components/Input'
import { colors } from 'src/utils/colors'
import api from 'src/utils/api'
import { forgotPasswordSchema } from 'src/schemas/forgotSchema'

type ForgotPasswordFormData = {
  email: string
}

const ForgotPassword = () => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setLoading(true)
    try {
      await api.post('/generate-new-password', { email: data.email })

      setEmailSent(true)
      Toast.show({
        type: 'success',
        text1: 'Email enviado com sucesso',
      })

      navigation.navigate('Login')
    } catch (error: any) {
      setEmailSent(true)
      Toast.show({
        type: 'success',
        text1: 'Email enviado com sucesso',
      })

      navigation.navigate('Login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Animatable.View animation="fadeInDown" duration={1000}>
            <Ionicons
              name="lock-closed-outline"
              size={80}
              color={colors.verde}
              style={styles.icon}
            />
            <Text style={styles.title}>Redefinir Senha</Text>
            <Text style={styles.subtitle}>
              {emailSent
                ? 'Verifique seu email para continuar'
                : 'Digite seu email institucional para receber o link de redefinição'}
            </Text>
          </Animatable.View>
        </View>

        {!emailSent ? (
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

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color={colors.branco} />
              ) : (
                <Text style={styles.buttonText}>ENVIAR LINK</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.successContainer}>
            <Ionicons
              name="checkmark-circle-outline"
              size={60}
              color={colors.verde}
              style={styles.successIcon}
            />
            <Text style={styles.successText}>
              Um email com instruções para redefinir sua senha foi enviado para
              o endereço fornecido.
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.backLink}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color={colors.verde} />
          <Text style={styles.backLinkText}>Voltar para o login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.branco,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.verdeEscuro,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  button: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.verde,
    marginTop: 20,
    elevation: 3,
    shadowColor: colors.verde,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: colors.branco,
    fontSize: 16,
    fontWeight: 'bold',
  },
  successContainer: {
    alignItems: 'center',
    padding: 20,
    marginVertical: 20,
  },
  successIcon: {
    marginBottom: 20,
  },
  successText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
  },
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  backLinkText: {
    color: colors.verde,
    fontSize: 16,
    marginLeft: 8,
  },
})

export default ForgotPassword
