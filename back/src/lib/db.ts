import mysql from 'mysql2/promise'

export interface IUser{
    name: string,
    email: string,
    gender: string,
    phone: string,
}
export enum ErrorType{NO_ERR, CONN_ERR, QUERY_ERR}

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
     * Rejects a ErrorType on error */
    private async query(instruction: string): Promise<mysql.RowDataPacket[]>{
        let error: ErrorType = ErrorType.NO_ERR,    // No error set by default
            result: mysql.RowDataPacket[],
            connection: mysql.Connection;
        try{
            connection = await this.connect()
            try{
                result = (await connection.query(instruction))[0] as mysql.RowDataPacket[]
            }
            // Query failed
            catch(e){
                error = ErrorType.QUERY_ERR
                console.error(e)
            }
            connection.end()
        }
        // Connection failed
        catch(e){
            error = ErrorType.CONN_ERR
            console.error(e)
        }
        return new Promise((resolve, reject) => {
            if(error == ErrorType.NO_ERR)
                resolve(result)
            else
                reject(error)
        })
    }

    /* Inserts a user in the database. */
    insert({name, email, gender, phone}: IUser): Promise<mysql.RowDataPacket[]>{
        const instruction = 'INSERT INTO users (name, email, gender, phone) ' +
            `VALUES("${name}", "${email}", "${gender}", "${phone}")`   
        
        return this.query(instruction)
    }

    /* Updates the user of the specified id */
    update(id: number, {name, email, gender, phone}: IUser): Promise<mysql.RowDataPacket[]>{
        const instruction = 'UPDATE users ' +
            `SET name = "${name}", email = "${email}", gender = "${gender}", phone = "${phone}" ` +
            `WHERE id = ${id}`
        return this.query(instruction)
    }

    /* Returns all entries in users table. */
    selectAll(): Promise<mysql.RowDataPacket[]>{
        const instruction = 'SELECT * FROM users'
        return this.query(instruction)
    }

    /* Deletes the user of the specified id */
    remove(id: number): Promise<mysql.RowDataPacket[]>{
        const instruction = 'DELETE FROM users ' +
            `WHERE id = ${id}`
        return this.query(instruction)
    }
}