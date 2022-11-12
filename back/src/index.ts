import { config } from 'dotenv'
import express from 'express'
import MySqlConnector, {ErrorType} from './lib/db'
config()

const app = express()
const cred = {
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'crud_react'
}
const mysql = new MySqlConnector(cred)

/* CORS config */
app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
    next()
})

app.use(express.json())

app.get('/users', (_req, res) => {
    mysql.selectAll()
        .then(result => res.send(result))
        .catch(() => res.sendStatus(500))  
})

// TODO: check for dupe email
app.post('/users', (req, res) => {
    mysql.insert(req.body)
        .then(() => res.send())
        .catch(e => {
            if(e == ErrorType.QUERY_ERR)
                res.sendStatus(400)
            else
                res.sendStatus(500)
        })
})

app.put('/users', (req, res) => {
    const id = req.body.id
    delete req.body.id
    mysql.update(id, req.body)
        .then(() => res.sendStatus(200))
        .catch(e => {
            if(e == ErrorType.QUERY_ERR)
                res.sendStatus(400)
            else
                res.sendStatus(500)
        })
})

app.delete('/users', (req, res) => {
    mysql.remove(req.body.id)
        .then(() => res.sendStatus(200))
        .catch(e => {
            if(e == ErrorType.QUERY_ERR)
                res.sendStatus(400)
            else
                res.sendStatus(500)
        })
})

const port = 3001
app.listen(port, () => console.log('Server running at port ' + port))