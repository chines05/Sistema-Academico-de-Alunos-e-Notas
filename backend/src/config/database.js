import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const db = mysql
  .createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'academico_ifnmg',
  })
  .promise()

db.connect()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!')
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err)
  })

export default db
