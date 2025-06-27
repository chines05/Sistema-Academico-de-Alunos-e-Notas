import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import api from 'src/utils/api'
import Toast from 'react-native-toast-message'
import {
  DisciplinaRouteParamsType,
  MediaDisciplinaType,
  NotasPorDisciplinaType,
} from 'src/types/types'
import { colors } from 'src/utils/colors'
import Header from 'src/components/Header'

const Disciplina = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { user, disciplina, token } = route.params as DisciplinaRouteParamsType
  const [mediaDisciplina, setMediaDisciplina] =
    useState<MediaDisciplinaType | null>(null)
  const [notasUser, setNotasUser] = useState<NotasPorDisciplinaType | null>(
    null
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const [mediaResponse, notasResponse] = await Promise.all([
          api.get(`/alunos/${user.id}/disciplinas/${disciplina.id}/media`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get(`/alunos/${user.id}/disciplinas/${disciplina.id}/notas`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])

        setMediaDisciplina(mediaResponse.data)
        setNotasUser(notasResponse.data)
      } catch (error) {
        setError('Erro ao carregar dados da disciplina')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user.id, disciplina.id, token])

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
        <Text style={styles.loadingText}>
          Carregando dados da disciplina...
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color={colors.verde} />
          <Text style={styles.backButtonText}>Voltar para Disciplinas</Text>
        </TouchableOpacity>
      </View>
    )
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContainer,
            styles.emptyScrollContainer,
          ]}
        >
          <Header title={disciplina.nome} />

          <View style={styles.emptyContainer}>
            <Ionicons
              name="alert-circle-outline"
              size={60}
              color={colors.vermelho}
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyTitle}>Ops! Algo deu errado</Text>
            <Text style={styles.emptyText}>{error}</Text>

            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={20} color={colors.branco} />
              <Text style={styles.emptyButtonText}>
                Voltar para disciplinas
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.emptySecondaryButton}
              onPress={() => {
                setError(null)
                setLoading(true)
              }}
            >
              <Ionicons name="refresh" size={20} color={colors.verde} />
              <Text style={styles.emptySecondaryButtonText}>
                Tentar novamente
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header title={disciplina.nome} />

        <View style={styles.chipContainer}>
          <View style={[styles.chip, styles.chipSemestre]}>
            <Ionicons name="calendar" size={16} color="white" />
            <Text style={styles.chipText}>{disciplina.semestre}º semestre</Text>
          </View>
        </View>

        {notasUser?.notas && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Suas Notas</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>1ª Avaliação:</Text>
              <Text style={styles.infoValue}>{notasUser.notas.nota1}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>2ª Avaliação:</Text>
              <Text style={styles.infoValue}>{notasUser.notas.nota2}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>3ª Avaliação:</Text>
              <Text style={styles.infoValue}>{notasUser.notas.nota3}</Text>
            </View>
          </View>
        )}

        {mediaDisciplina?.media && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Média da Disciplina</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Média Final:</Text>
              <Text
                style={[
                  styles.infoValue,
                  mediaDisciplina.status === 'aprovado'
                    ? styles.successText
                    : styles.errorText,
                ]}
              >
                {mediaDisciplina.media}
              </Text>
            </View>

            <View style={styles.statusContainer}>
              <Ionicons
                name={
                  mediaDisciplina.status === 'aprovado'
                    ? 'checkmark-circle'
                    : 'close-circle'
                }
                size={24}
                color={
                  mediaDisciplina.status === 'aprovado'
                    ? colors.verde
                    : colors.vermelho
                }
              />
              <Text
                style={[
                  styles.statusText,
                  mediaDisciplina.status === 'aprovado'
                    ? styles.successText
                    : styles.errorText,
                ]}
              >
                {mediaDisciplina.status === 'aprovado'
                  ? 'Aprovado'
                  : 'Reprovado'}
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color={colors.verde} />
          <Text style={styles.backButtonText}>Voltar para Disciplinas</Text>
        </TouchableOpacity>
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
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.verde,
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 30,
    marginHorizontal: 5,
  },
  chipSemestre: {
    backgroundColor: colors.verde,
  },
  chipText: {
    color: colors.branco,
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
  },
  card: {
    backgroundColor: colors.branco,
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: colors.verde,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.verdeEscuro,
    marginBottom: 15,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#555',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    paddingTop: 10,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  successText: {
    color: colors.verde,
  },
  errorText: {
    color: colors.vermelho,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    padding: 15,
  },
  backButtonText: {
    color: colors.verde,
    fontSize: 16,
    marginLeft: 8,
  },
  emptyScrollContainer: {
    justifyContent: 'center',
    flex: 1,
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
    color: colors.vermelho,
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.vermelho,
    padding: 15,
    borderRadius: 8,
    width: '80%',
    marginBottom: 15,
  },
  emptyButtonText: {
    color: colors.branco,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  emptySecondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.verde,
    width: '80%',
  },
  emptySecondaryButtonText: {
    color: colors.verde,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
})

export default Disciplina
