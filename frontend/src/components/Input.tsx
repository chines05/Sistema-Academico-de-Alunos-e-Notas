import React from 'react'
import { TextInput, View, Text, StyleSheet } from 'react-native'

interface InputProps {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  onBlur: () => void
  error?: any
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
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
}: InputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        style={[styles.input, error && styles.inputError]}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
})

export default Input
