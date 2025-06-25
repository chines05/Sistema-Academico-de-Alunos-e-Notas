import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { UserType } from './types'

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Login: undefined
      Register: undefined
      AppTabs: {
        user: UserType
        token: string
      }
      Disciplina: {
        user: UserType
        disciplinaId: number
        token: string
      }
    }
  }
}

export type HomeScreenProps = NativeStackScreenProps<RootParamList, 'Home'>
