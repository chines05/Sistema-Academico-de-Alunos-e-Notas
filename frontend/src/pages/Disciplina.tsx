import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import api from '../utils/api'
import Toast from 'react-native-toast-message'
import { HomeProps, NotaDisciplinaAlunoType } from '../types/types'
import { colors } from '../utils/colors'

const { width } = Dimensions.get('window')

const Disciplina = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { user, disciplina, token } = route.params as HomeProps
  const [notasUser, setNotasUser] = useState<NotaDisciplinaAlunoType>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const { data } = await api.get(
          `/notas/aluno/${user.id}/disciplina/${disciplina.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setNotasUser(data)
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Erro ao carregar notas',
          text2: 'Não foi possível obter os dados desta disciplina',
        })
        navigation.goBack()
      } finally {
        setLoading(false)
      }
    }

    fetchNotas()
  }, [disciplina.id, user.id, token])

  const calcularMedia = () => {
    const n1 = notasUser?.notas.nota1 || 0
    const n2 = notasUser?.notas.nota2 || 0
    const n3 = notasUser?.notas.nota3 || 0

    const media = n3 > 0 ? (n1 + n2 + n3) / 3 : (n1 + n2) / 2

    return {
      n1,
      n2,
      n3,
      media,
      status: media >= 6 ? 'Aprovado' : n3 > 0 ? 'Reprovado' : 'Em andamento',
    }
  }

  const dadosNotas = calcularMedia()

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
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Cabeçalho com gradiente */}
        <View style={styles.headerGradient}>
          <Text style={styles.disciplinaNome}>{disciplina.nome}</Text>
          <View style={styles.chipContainer}>
            <View style={[styles.chip, styles.chipTurma]}>
              <Ionicons name="people" size={16} color="white" />
              <Text style={styles.chipText}>Turma A</Text>
            </View>
            <View style={[styles.chip, styles.chipSemestre]}>
              <Ionicons name="calendar" size={16} color="white" />
              <Text style={styles.chipText}>2023/2</Text>
            </View>
          </View>
        </View>

        {/* Cartões de notas */}
        <View style={styles.cardsContainer}>
          <View style={styles.cardRow}>
            <View style={[styles.notaCard, styles.cardN1]}>
              <Text style={styles.notaCardTitle}>N1</Text>
              <Text style={styles.notaCardValue}>{dadosNotas.n1 || '--'}</Text>
              <Ionicons
                name="school"
                size={24}
                color="white"
                style={styles.notaIcon}
              />
            </View>

            <View style={[styles.notaCard, styles.cardN2]}>
              <Text style={styles.notaCardTitle}>N2</Text>
              <Text style={styles.notaCardValue}>{dadosNotas.n2 || '--'}</Text>
              <Ionicons
                name="school"
                size={24}
                color="white"
                style={styles.notaIcon}
              />
            </View>
          </View>

          <View style={styles.cardRow}>
            <View style={[styles.notaCard, styles.cardN3]}>
              <Text style={styles.notaCardTitle}>N3</Text>
              <Text style={styles.notaCardValue}>{dadosNotas.n3 || '--'}</Text>
              <Ionicons
                name="school"
                size={24}
                color="white"
                style={styles.notaIcon}
              />
            </View>

            <View style={[styles.notaCard, styles.cardMedia]}>
              <Text style={styles.notaCardTitle}>Média</Text>
              <Text
                style={[
                  styles.notaCardValue,
                  dadosNotas.status === 'Aprovado'
                    ? styles.textSuccess
                    : dadosNotas.status === 'Reprovado'
                    ? styles.textDanger
                    : styles.textWarning,
                ]}
              >
                {dadosNotas.media || '--'}
              </Text>
              <Ionicons
                name={
                  dadosNotas.status === 'Aprovado'
                    ? 'checkmark-circle'
                    : dadosNotas.status === 'Reprovado'
                    ? 'close-circle'
                    : 'time'
                }
                size={24}
                color={
                  dadosNotas.status === 'Aprovado'
                    ? colors.verdeClaro
                    : dadosNotas.status === 'Reprovado'
                    ? colors.vermelhoClaro
                    : colors.amarelo
                }
                style={styles.notaIcon}
              />
            </View>
          </View>
        </View>

        {/* Status e informações */}
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusBadge,
              dadosNotas.status === 'Aprovado'
                ? styles.badgeSuccess
                : dadosNotas.status === 'Reprovado'
                ? styles.badgeDanger
                : styles.badgeWarning,
            ]}
          >
            <Text style={styles.statusText}>{dadosNotas.status}</Text>
          </View>

          {dadosNotas?.status === 'Reprovado' && dadosNotas.n3 === 0 && (
            <View style={styles.alertBox}>
              <Ionicons name="warning" size={28} color={colors.vermelho} />
              <View style={styles.alertTextContainer}>
                <Text style={styles.alertTitle}>Atenção!</Text>
                <Text style={styles.alertText}>
                  Você precisa de{' '}
                  {((6 - dadosNotas.media * 0.6) / 0.4).toFixed(1)} na N3 para
                  aprovação
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Detalhes da disciplina */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Ionicons name="person" size={20} color={colors.verde} />
            <Text style={styles.detailText}>Prof. Carlos Silva</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time" size={20} color={colors.verde} />
            <Text style={styles.detailText}>60 horas</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="library" size={20} color={colors.verde} />
            <Text style={styles.detailText}>Sistemas de Informação</Text>
          </View>
        </View>

        {/* Gráfico de desempenho (simulado) */}
        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Seu Desempenho</Text>
          <View style={styles.chart}>
            <View
              style={[
                styles.chartBar,
                { height: '60%', backgroundColor: colors.verde },
              ]}
            >
              <Text style={styles.chartBarLabel}>N1</Text>
            </View>
            <View
              style={[
                styles.chartBar,
                { height: '75%', backgroundColor: colors.verde },
              ]}
            >
              <Text style={styles.chartBarLabel}>N2</Text>
            </View>
            <View
              style={[
                styles.chartBar,
                {
                  height: dadosNotas.n3 ? '40%' : '20%',
                  backgroundColor: dadosNotas.n3 ? colors.verde : colors.cinza,
                },
              ]}
            >
              <Text style={styles.chartBarLabel}>N3</Text>
            </View>
            <View
              style={[
                styles.chartBar,
                {
                  height: `${Math.min(100, dadosNotas.media * 10)}%`,
                  backgroundColor:
                    dadosNotas.media >= 6 ? colors.verde : colors.vermelho,
                },
              ]}
            >
              <Text style={styles.chartBarLabel}>Média</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={{ padding: 20, alignItems: 'center' }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.verde} />
          <Text style={{ color: colors.verde, fontSize: 16 }}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    paddingBottom: 30,
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.branco,
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  headerGradient: {
    padding: 25,
    paddingTop: 40,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  disciplinaNome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  chipTurma: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  chipSemestre: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  chipText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 14,
  },
  cardsContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  notaCard: {
    width: width / 2 - 25,
    borderRadius: 15,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardN1: {
    backgroundColor: '#4CAF50',
  },
  cardN2: {
    backgroundColor: '#2196F3',
  },
  cardN3: {
    backgroundColor: '#FF9800',
  },
  cardMedia: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  notaCardTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  notaCardValue: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  notaIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    opacity: 0.2,
  },
  textSuccess: {
    color: colors.verde,
  },
  textDanger: {
    color: colors.vermelho,
  },
  textWarning: {
    color: colors.amarelo,
  },
  statusContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statusBadge: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 20,
    marginBottom: 15,
  },
  badgeSuccess: {
    backgroundColor: colors.verdeClaro + '20',
    borderColor: colors.verde,
    borderWidth: 1,
  },
  badgeDanger: {
    backgroundColor: colors.vermelhoClaro + '20',
    borderColor: colors.vermelho,
    borderWidth: 1,
  },
  badgeWarning: {
    backgroundColor: colors.amareloClaro + '20',
    borderColor: colors.amarelo,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  alertBox: {
    flexDirection: 'row',
    backgroundColor: colors.vermelhoClaro + '10',
    borderLeftWidth: 4,
    borderLeftColor: colors.vermelho,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  alertTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  alertTitle: {
    color: colors.vermelho,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 3,
  },
  alertText: {
    color: colors.vermelhoEscuro,
  },
  detailsContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#555',
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.verdeEscuro,
    marginBottom: 15,
  },
  chart: {
    flexDirection: 'row',
    height: 200,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingTop: 20,
  },
  chartBar: {
    width: 40,
    borderRadius: 8,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 5,
  },
  chartBarLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
})

export default Disciplina
