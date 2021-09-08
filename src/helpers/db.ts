import * as dotenv from "dotenv"
import mysql from "mysql2/promise"
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectTimeout: 90000
})


// async function db () {
//     const conn = await mysql.createConnection({ 
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_DATABASE,
//         connectTimeout: 90000
//      });
//     await conn.end();
// }

export default  db