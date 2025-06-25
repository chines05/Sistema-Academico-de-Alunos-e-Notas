import { NativeStackScreenProps } from '@react-navigation/native-stack'

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Login: undefined
      Register: undefined
      Home: {
        user: {
          id: number
          nome: string
          email: string
        }
        token: string
      }
    }
  }
}

export type HomeScreenProps = NativeStackScreenProps<RootParamList, 'Home'>
