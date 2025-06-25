import db from '../config/database.js'

export const getMediasAluno = async (req, res) => {
  try {
    const { alunoId, disciplinaId } = req.params

    const [medias] = await db.query(
      `
      SELECT 
        d.id AS disciplina_id,
        d.nome AS disciplina_nome,
        d.semestre,
        n.nota1,
        n.nota2,
        n.nota3,
        ROUND((n.nota1 + n.nota2 + n.nota3) / 3, 1) AS media,
        CASE 
          WHEN (n.nota1 + n.nota2 + n.nota3) / 3 >= 6 THEN 'Aprovado'
          ELSE 'Reprovado'
        END AS status
      FROM notas n
      JOIN disciplinas d ON n.disciplina_id = d.id
      WHERE n.aluno_id = ? AND n.disciplina_id = ?
      ORDER BY d.semestre, d.nome
    `,
      [alunoId, disciplinaId]
    )

    if (medias.length === 0) {
      return res.status(404).send({
        message: 'Nenhuma nota encontrada para o aluno nessa disciplina',
      })
    }

    res.status(200).send(medias)
  } catch (error) {
    console.error('Erro ao calcular médias:', error)
    res.status(500).send({
      erro: 'Erro ao calcular médias',
      detalhes: process.env.NODE_ENV === 'development' ? error.message : null,
    })
  }
}
