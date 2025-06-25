import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { Ionicons } from '@expo/vector-icons'
import { colors } from './colors'

export const toastConfig = {
  success: ({ text1, props, ...rest }: any) => (
    <View style={styles.toastSuccess}>
      <Ionicons name="checkmark-circle" size={24} color="white" />
      <Text style={styles.toastText}>{text1}</Text>
    </View>
  ),
  error: ({ text1, props, ...rest }: any) => (
    <View style={styles.toastError}>
      <Ionicons name="alert-circle" size={24} color="white" />
      <Text style={styles.toastText}>{text1}</Text>
    </View>
  ),
}

const styles = StyleSheet.create({
  toastSuccess: {
    backgroundColor: colors.verde,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toastError: {
    backgroundColor: colors.vermelho,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toastText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '500',
  },
})

export const ToastWrapper = () => {
  return <Toast config={toastConfig} />
}
