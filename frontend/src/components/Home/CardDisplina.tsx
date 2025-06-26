import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../../utils/colors'

const CardDisplina = ({ disciplina, handleVerNotas }: any) => {
  return (
    <View key={disciplina.id} style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="book" size={24} color={colors.verde} />
        <View style={styles.disciplinaInfo}>
          <Text style={styles.disciplinaNome}>{disciplina.nome}</Text>
          <Text style={styles.disciplinaSemestre}>
            {disciplina.semestre} º semestre
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          handleVerNotas(disciplina.id, disciplina.nome, disciplina.semestre)
        }
      >
        <Text style={styles.buttonText}>Ver notas</Text>
        <Ionicons name="chevron-forward" size={20} color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
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
})

export default CardDisplina
