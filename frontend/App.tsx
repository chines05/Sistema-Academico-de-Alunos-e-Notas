import Routes from './src/app/routes/'
import { NavigationContainer } from '@react-navigation/native'
import { ToastWrapper } from './src/components/toast'

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
      <ToastWrapper />
    </>
  )
}
