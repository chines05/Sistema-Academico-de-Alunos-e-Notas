import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { HomeProps } from '../types/types'
import { colors } from '../utils/colors'

// Dados mockados de disciplinas (substitua pelos dados reais da sua API)
const disciplinas = [
  { id: 1, nome: 'Programação Mobile', semestre: '2023.1', codigo: 'COMP123' },
  { id: 2, nome: 'Banco de Dados', semestre: '2023.1', codigo: 'COMP456' },
  {
    id: 3,
    nome: 'Inteligência Artificial',
    semestre: '2023.1',
    codigo: 'COMP789',
  },
]

const Home = () => {
  const route = useRoute()
  const { user, token } = route.params as HomeProps
  const navigation = useNavigation()

  const handleVerNotas = (disciplinaId: number) => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Disciplina',
          params: {
            user,
            disciplinaId,
            token,
          },
        },
      ],
    })
  }

  if (!token || !user) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Erro: Dados de autenticação inválidos</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header Institucional */}
        <View style={styles.header}>
          <Image
            source={require('../assets/imgs/logo-ifnmg.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Sistema Acadêmico</Text>
        </View>

        {/* Saudação ao usuário */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>
            Bem-vindo, {user.nome.split(' ')[0]}!
          </Text>
          <Text style={styles.subtitle}>Suas disciplinas matriculadas</Text>
        </View>

        {/* Lista de Disciplinas */}
        <View style={styles.disciplinasContainer}>
          {disciplinas.map((disciplina) => (
            <View key={disciplina.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="book" size={24} color={colors.verde} />
                <Text style={styles.disciplinaNome}>{disciplina.nome}</Text>
              </View>

              <View style={styles.cardBody}>
                <View style={styles.infoRow}>
                  <Ionicons name="calendar" size={16} color="#666" />
                  <Text style={styles.infoText}>{disciplina.semestre}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="barcode" size={16} color="#666" />
                  <Text style={styles.infoText}>{disciplina.codigo}</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleVerNotas(disciplina.id)}
              >
                <Text style={styles.buttonText}>Ver notas</Text>
                <Ionicons name="chevron-forward" size={20} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Rodapé Institucional */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            IFNMG © {new Date().getFullYear()} - Todos os direitos reservados
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.branco,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 70,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logo: {
    width: 150,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    color: colors.verde,
    fontWeight: 'bold',
  },
  greetingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.verdeEscuro,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  disciplinasContainer: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 12,
  },
  disciplinaNome: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    color: colors.verdeEscuro,
  },
  cardBody: {
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: colors.verde,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
})

export default Home
