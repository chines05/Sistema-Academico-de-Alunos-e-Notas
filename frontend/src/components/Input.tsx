import React, { useState } from 'react'
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from 'src/utils/colors'

interface InputProps {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  onBlur: () => void
  error?: any
  icon?: keyof typeof Ionicons.glyphMap
  secureTextEntry?: boolean
  keyboardType?: 'default' | 'numeric' | 'email-address'
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
}

const Input = ({
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  icon,
  secureTextEntry = false,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={error ? colors.vermelho : '#666'}
            style={styles.icon}
          />
        )}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          style={[styles.input, error && styles.inputErrorText]}
          secureTextEntry={secureTextEntry && !showPassword}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye-outline'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        )}
        {error && !secureTextEntry && (
          <Ionicons
            name="alert-circle"
            size={18}
            color={colors.vermelho}
            style={styles.errorIcon}
          />
        )}
      </View>
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
  },
  inputError: {
    borderColor: colors.vermelho,
    backgroundColor: '#fff9f9',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#333',
    fontSize: 15,
    paddingVertical: 0,
  },
  inputErrorText: {
    color: colors.vermelho,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  errorIcon: {
    marginLeft: 10,
  },
  errorText: {
    color: colors.vermelho,
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
})

export default Input
