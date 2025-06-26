import db from '../config/database.js'
import bcrypt from 'bcrypt'

async function seed() {
  try {
    await db.query('SET FOREIGN_KEY_CHECKS = 0')
    await db.query('TRUNCATE TABLE notas')
    await db.query('TRUNCATE TABLE matriculas')
    await db.query('TRUNCATE TABLE disciplinas')
    await db.query('TRUNCATE TABLE alunos')
    await db.query('SET FOREIGN_KEY_CHECKS = 1')

    const senhaPadrao = await bcrypt.hash('Senha123', 10)
    await db.query(
      `INSERT INTO alunos (nome, cpf, email, senha) VALUES 
       ('Chines Porto', '11122233344', 'chines@aluno.ifnmg.edu.br', ?),
       ('Gabriel Martins', '22233344455', 'gabriel@aluno.ifnmg.edu.br', ?),
       ('Joaquim Silva', '33344455566', 'joaquim@aluno.ifnmg.edu.br', ?),
       ('Maria Oliveira', '44455566677', 'maria@ifnmg.edu.br', ?),
       ('Ana Souza', '55566677788', 'ana@aluno.ifnmg.edu.br', ?),
       ('Pedro Costa', '66677788899', 'pedro@ifnmg.edu.br', ?),
       ('Lucas Santos', '77788899900', 'lucas@aluno.ifnmg.edu.br', ?),
       ('Carolina Almeida', '88899900011', 'carolina@ifnmg.edu.br', ?),
       ('Fernanda Oliveira', '99900011122', 'fernanda@aluno.ifnmg.edu.br', ?)`,
      [
        senhaPadrao,
        senhaPadrao,
        senhaPadrao,
        senhaPadrao,
        senhaPadrao,
        senhaPadrao,
        senhaPadrao,
        senhaPadrao,
        senhaPadrao,
      ]
    )

    await db.query(
      `INSERT INTO disciplinas (nome, semestre) VALUES
       ('Programação Web', '1'),
       ('Banco de Dados', '2'),
       ('Logica Matematica', '3'),
       ('Redes de Computadores', '4'),
       ('Sistemas Operacionais', '5'),
       ('Engenharia de Software', '6'),
       ('Inteligência Artificial', '2'),
       ('Desenvolvimento Móvel', '3'),
       ('Segurança da Informação', '5')`
    )

    await db.query(
      `INSERT INTO matriculas (aluno_id, disciplina_id, semestre) VALUES
        (1, 1, '1'),
        (1, 2, '1'),
        (2, 1, '1'),
        (2, 3, '1'),
        (3, 2, '2'),
        (3, 4, '2'),
        (4, 5, '3'),
        (4, 6, '3'),
        (5, 7, '4'),
        (5, 8, '4')`
    )

    await db.query(
      `INSERT INTO notas (aluno_id, disciplina_id, semestre, nota1, nota2, nota3) VALUES
       (1, 1, '1', 7, 8, 9),
       (1, 2, '1', 1, 3, 7),
       (2, 1, '1', 7, 4, 3),
       (2, 3, '1', 8, 4, 7),
       (3, 2, '2', 7, 8, 9),
       (3, 4, '2', 1, 2, 5),
       (4, 5, '3', 9, 3, 4),
       (4, 6, '3', 7, 8, 9),
       (5, 7, '4', 3, 5, 7),
       (5, 8, '4', 7, 8, 9)`
    )

    console.log('✅ Banco de dados populado com dados de teste!')
  } catch (error) {
    console.error('❌ Erro ao popular banco:', error)
  } finally {
    process.exit()
  }
}

seed()
