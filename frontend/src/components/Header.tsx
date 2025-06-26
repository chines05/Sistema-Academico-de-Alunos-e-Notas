import { Image, StyleSheet, Text, View } from 'react-native'
import { colors } from '../utils/colors'

const Header = ({ title }: { title: string }) => {
  return (
    <View style={styles.header}>
      <Image
        source={require('../assets/imgs/logo-ifnmg-almenara.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  logo: {
    width: 160,
    height: 90,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    color: colors.verde,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
})

export default Header
