import fs from 'fs';
import path from 'path'
import { pool } from './db.js'
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

const { sign } = jwt

const dirname = "./test.js"

const initializeTestDb = () => {
    console.log("dirname", dirname)
    console.log("alempi ")
    const sql = fs.readFileSync(path.resolve(dirname,'../todo.sql'), 'utf8')
    pool.query(sql)
}

const insertTestUser = (email,password) => {
    hash(password,10,(error,hashedPassword) => {
        pool.query('insert into account (email,password) values ($1,$2)',
            [email,hashedPassword])
    })
}

const getToken = (email) => {
    return sign({user: email},process.env.JWT_SECRET_KEY)
}

export { initializeTestDb,insertTestUser, getToken }