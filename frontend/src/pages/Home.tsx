import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import { colors } from 'src/utils/colors'
import Toast from 'react-native-toast-message'
import api from 'src/utils/api'
import CardDisciplina from 'src/components/Home/CardDisplina'
import Header from 'src/components/Header'
import { DisciplinaAlunoType, DisciplinaRouteParamsType } from 'src/types/types'

const Home = () => {
  const route = useRoute()
  const { user: userParam, token } = route.params as DisciplinaRouteParamsType
  const [user, setUser] = useState(userParam)
  const [disciplinas, setDisciplinas] = useState<DisciplinaAlunoType | null>(
    null
  )
  const [loading, setLoading] = useState(true)
  const [semestres, setSemestres] = useState<string[]>([])
  const [semestreSelecionado, setSemestreSelecionado] =
    useState<string>('Todos')
  const navigation = useNavigation()

  useEffect(() => {
    setUser(userParam)
  }, [userParam])

  const handleVerNotas = (
    disciplinaId: number,
    disciplinaNome: string,
    semestre: string
  ) => {
    navigation.navigate('Disciplina', {
      user,
      disciplina: {
        id: disciplinaId,
        nome: disciplinaNome,
        semestre: semestre,
      },
      token,
    })
  }

  const loadDisciplinas = async () => {
    try {
      setLoading(true)
      const { data } = await api.get(`/alunos/${user.id}/disciplinas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setDisciplinas(data)

      const todosSemestres = [
        'Todos',
        ...(Array.from(
          new Set(data.disciplinas.map((d: any) => d.semestre))
        ) as string[]),
      ]
      setSemestres(todosSemestres)
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.response?.data?.message || 'Erro ao carregar disciplinas',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDisciplinas()
  }, [token, user.id])

  const disciplinasFiltradas =
    semestreSelecionado === 'Todos'
      ? disciplinas?.disciplinas
      : disciplinas?.disciplinas?.filter(
          (d) => d.semestre === semestreSelecionado
        )

  if (!token || !user) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Erro: Dados de autenticação inválidos</Text>
      </View>
    )
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.verde} />
        <Text style={styles.loadingText}>Carregando suas disciplinas...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header title="Minhas Disciplinas" />

        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>
            Bem-vindo, {user.nome.split(' ')[0]}!
          </Text>
          <Text style={styles.subtitle}>Suas disciplinas matriculadas</Text>
        </View>

        {semestres.length > 1 && (
          <View style={styles.filtroContainer}>
            <Text style={styles.filtroLabel}>Filtrar por semestre:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={semestreSelecionado}
                onValueChange={(itemValue) => setSemestreSelecionado(itemValue)}
                style={styles.picker}
                dropdownIconColor={colors.verde}
              >
                {semestres.map((semestre) => (
                  <Picker.Item
                    key={semestre}
                    label={
                      semestre === 'Todos' ? 'Todos' : `Semestre ${semestre}`
                    }
                    value={semestre}
                  />
                ))}
              </Picker>
            </View>
          </View>
        )}

        <View style={styles.disciplinasContainer}>
          {disciplinasFiltradas && disciplinasFiltradas.length > 0 ? (
            disciplinasFiltradas.map((disciplina) => (
              <CardDisciplina
                key={disciplina.id}
                disciplina={{
                  ...disciplina,
                  semestre: Number(disciplina.semestre), // Converte para número se necessário
                }}
                handleVerNotas={handleVerNotas}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons
                name="school-outline"
                size={60}
                color={colors.verde}
                style={styles.emptyIcon}
              />
              <Text style={styles.emptyTitle}>
                {semestreSelecionado === 'Todos'
                  ? 'Nenhuma disciplina encontrada'
                  : `Nenhuma disciplina no semestre ${semestreSelecionado}`}
              </Text>
              <Text style={styles.emptyText}>
                {semestreSelecionado === 'Todos'
                  ? 'Você não está matriculado em nenhuma disciplina'
                  : `Você não tem disciplinas no semestre ${semestreSelecionado}`}
              </Text>
            </View>
          )}
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
    paddingTop: 50,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.branco,
  },
  loadingText: {
    marginTop: 15,
    color: colors.verdeEscuro,
    fontSize: 16,
  },
  greetingContainer: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    backgroundColor: colors.branco,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.verdeEscuro,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  filtroContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  filtroLabel: {
    fontSize: 16,
    color: colors.verdeEscuro,
    marginBottom: 8,
    fontWeight: '500',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.verde,
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 50,
    color: colors.verdeEscuro,
    backgroundColor: colors.branco,
  },
  disciplinasContainer: {
    paddingHorizontal: 20,
    marginTop: 5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: colors.verde,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  disciplinaInfo: {
    flex: 1,
    marginLeft: 12,
  },
  disciplinaNome: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.verdeEscuro,
  },
  disciplinaSemestre: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  button: {
    backgroundColor: colors.verde,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginTop: 20,
  },
  emptyIcon: {
    opacity: 0.7,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.verdeEscuro,
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
})

export default Home
