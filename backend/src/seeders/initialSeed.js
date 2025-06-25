import db from '../config/database.js'
import bcrypt from 'bcrypt'

async function seed() {
  try {
    // Limpa tabelas (cuidado em produção!)
    await db.query('SET FOREIGN_KEY_CHECKS = 0')
    await db.query('TRUNCATE TABLE notas')
    await db.query('TRUNCATE TABLE matriculas')
    await db.query('TRUNCATE TABLE disciplinas')
    await db.query('TRUNCATE TABLE alunos')
    await db.query('SET FOREIGN_KEY_CHECKS = 1')

    // Cadastra alunos
    const senhaPadrao = await bcrypt.hash('senha123', 10)
    const [alunos] = await db.query(
      `INSERT INTO alunos (nome, cpf, email, senha) VALUES 
       ('João Silva', '11122233344', 'joao@ifnmg.edu.br', ?),
       ('Maria Oliveira', '22233344455', 'maria@ifnmg.edu.br', ?)`,
      [senhaPadrao, senhaPadrao]
    )

    // Cadastra disciplinas
    const [disciplinas] = await db.query(
      `INSERT INTO disciplinas (nome, semestre) VALUES
       ('Programação Web', '2023.1'),
       ('Banco de Dados', '2023.1'),
       ('Logica Matematica', '2023.1')`
    )

    // Cria matrículas
    await db.query(
      `INSERT INTO matriculas (aluno_id, disciplina_id, semestre) VALUES
       (1, 1, '2023.1'),
       (1, 2, '2023.1'),
       (2, 1, '2023.1'),
       (2, 3, '2023.1')`
    )

    // Insere notas
    await db.query(
      `INSERT INTO notas (aluno_id, disciplina_id, semestre, nota1, nota2, nota3) VALUES
       (1, 1, '2023.1', 8.5, 7.0, 9.2),
       (1, 2, '2023.1', 6.0, 7.5, 8.0),
       (2, 1, '2023.1', 9.0, 8.5, 9.8),
       (2, 3, '2023.1', 7.0, 7.5, 8.0)`
    )

    console.log('✅ Banco de dados populado com dados de teste!')
  } catch (error) {
    console.error('❌ Erro ao popular banco:', error)
  } finally {
    process.exit()
  }
}

seed()
