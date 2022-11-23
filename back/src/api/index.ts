import { config } from 'dotenv'
import express from 'express'
import cors from 'cors'
import MySqlConnector from './lib/db'
import { validateEmail } from './lib/utils'
import type * as t from './lib/types'

config()

const app = express()
const cred = {
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,   // Remember to create a .env file at the project root
    database: 'crud_react'
}
const mysql = new MySqlConnector(cred)

app.use(cors())
app.use(express.json())

app.get('/users', (_req, res) => {
    mysql.selectAll()
        .then(result => res.send(result))
        .catch(() => res.sendStatus(500))  
})

/* Responds with 201 when data has been inserted.
 * Responds with 200 when data has not been inserted due to duplicate e-mail
 */
app.post('/users', async (req, res) => {
    // Error
    if(!validateEmail(req.body.email))
        res.status(200).send({error: {
            code: 2,
            message: 'Invalid e-mail format'
        }})
    else{
        try{
            const emails = await mysql.selectAll('email')
            let dupe = false
            for(let obj of emails){
                if(obj.email as string === req.body.email as string){
                        dupe = true
                        break
                }
            }
            if(!dupe){
                const resultHeader = await mysql.insert(req.body)
                res.status(201).send({
                    id: resultHeader.insertId,
                    ...req.body
                })
            }
            else
                // Error
                res.status(200).send({
                    error: {
                        code: 1,
                        message: 'E-mail is duplicate.'
                    }
                })
        }
        catch(e){
            if(e === 'QUERY_ERR')
                res.sendStatus(400)
            else
                res.sendStatus(500)
        }
    }
})

app.put('/users/:id', async (req, res) => {
    // Error
    if(!validateEmail(req.body.email))
        res.status(200).send({error: {
            code: 2,
            message: 'Invalid e-mail format'
        }})
    else{
        const id = req.body.id
        delete req.body.id
        let dupe = false
        try{
            const emails = await mysql.selectAllBut(id, 'email')
            for(let obj of emails){
                if(obj.email as string === req.body.email as string){
                        dupe = true
                        break
                }
            }
            if(!dupe){
                await mysql.update(id, req.body)
                res.sendStatus(204)
            }
            else
                // Error
                res.status(200).send({
                    error: {
                        code: 1,
                        message: 'E-mail is duplicate.'
                    }
                })
        }
        catch(e){
            if(e as t.Error === 'QUERY_ERR')
                res.sendStatus(400)
            else
                res.sendStatus(500)
        }
    }
})

app.delete('/users', (req, res) => {
    mysql.remove(req.body.id)
        .then(() => res.sendStatus(204))
        .catch(e => {
            if(e as t.Error === 'QUERY_ERR')
                res.sendStatus(400)
            else
                res.sendStatus(500)
        })
})

const port = 3001
app.listen(port, () => console.log('Server running at port ' + port))