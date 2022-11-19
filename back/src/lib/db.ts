import mysql from 'mysql2/promise'
import type * as t from './types'

export default class MySqlConnector{
    private credentials: mysql.ConnectionOptions
    
    constructor(credentials: mysql.ConnectionOptions){
        this.credentials = credentials
    }
    
    private async connect(): Promise<mysql.Connection>{
        let error = false, connection: mysql.Connection
        try{
            connection = await mysql.createConnection(this.credentials)
        }
        catch(e){
            console.error(e)
            error = true
        }
        return new Promise((resolve, reject) => {
            if(error)
                reject()
            else
                resolve(connection)
        })
    }
    
    /* Executes a mysql query and returns a Promise containing the result set. 
     * Rejects a ErrorType on error 
     * NOTE: can't find a better way to type the return type
    */
    private async query(instruction: string): Promise<mysql.RowDataPacket[] | mysql.ResultSetHeader>{
        let error: t.Error = 'NO_ERR',    // No error set by default
            result: mysql.RowDataPacket[] | mysql.ResultSetHeader,
            connection: mysql.Connection;
        try{
            connection = await this.connect()
            try{
                result = (await connection.query(instruction))[0] as mysql.RowDataPacket[] | mysql.ResultSetHeader
            }
            // Query failed
            catch(e){
                error = 'QUERY_ERR'
                console.error(e)
            }
            connection.end()
        }
        // Connection failed
        catch(e){
            error = 'CONN_ERR'
            console.error(e)
        }
        return new Promise((resolve, reject) => {
            if(error == 'NO_ERR')
                resolve(result)
            else
                reject(error)
        })
    }
    
    /* Returns all entries in users table. 
     * If no field is provided, it returns all fields */
    selectAll(field?: 'name' | 'email' | 'gender' | 'phone'): Promise<mysql.RowDataPacket[]>{
        let instruction = 'SELECT '
        instruction += field ? field : '*'
        instruction += ' FROM users'
        return this.query(instruction) as Promise<mysql.RowDataPacket[]>
    }
    
    /* Returns all entries in users table but the one of the specified id. 
     * If no field is provided, it returns all fields */
    selectAllBut(id: number, field?: 'name' | 'email' | 'gender' | 'phone'): Promise<mysql.RowDataPacket[]>{
        let instruction = 'SELECT '
        instruction += field ? field : '*'
        instruction += ' FROM users WHERE id != ' + id
        return this.query(instruction) as Promise<mysql.RowDataPacket[]>
    }

    /* Inserts a user in the database. */
    insert({name, email, gender, phone}: t.User): Promise<mysql.ResultSetHeader>{
        const instruction = 'INSERT INTO users (name, email, gender, phone) ' +
            `VALUES("${name}", "${email}", "${gender}", "${phone}")`   
        
        return this.query(instruction) as Promise<mysql.ResultSetHeader>
    }

    /* Updates the user of the specified id */
    update(id: number, {name, email, gender, phone}: t.User): Promise<mysql.ResultSetHeader>{
        const instruction = 'UPDATE users ' +
            `SET name = "${name}", email = "${email}", gender = "${gender}", phone = "${phone}" ` +
            `WHERE id = ${id}`
        
        return this.query(instruction) as Promise<mysql.ResultSetHeader>
    }


    /* Deletes the user of the specified id */
    remove(id: number): Promise<mysql.ResultSetHeader>{
        const instruction = 'DELETE FROM users ' +
            `WHERE id = ${id}`
        return this.query(instruction) as Promise<mysql.ResultSetHeader>
    }
}