import db from "../helpers/db"
import { BasicUser, User, Email, Code, Forgot } from "../types/user.types";

const table = "user"



export const register = async (data: BasicUser) => {
    return (await db).execute(`
        INSERT INTO ${table} (name, email, password) VALUES (?, ?, ?)`
        , [data.name, data.email, data.password])
}

export const findUserByEmail = async (email: Email) => {
     return  (await db).execute(`
        SELECT * from ${table} WHERE email=?`
        , [email])
}

export const findUserById = async (id: number) => {
    return  (await db).execute(`
       SELECT * from ${table} WHERE id=?`
       , [id])
}

export const genCodeForgot = async (data: Code) => {
    return (await db).execute(`
    UPDATE user SET forgotCode=? where email=?`, [data.code, data.email])
}

export const updateForgotPassword = async (data: Forgot) => {
    return (await db).execute(`
    UPDATE user SET password=? where forgotCode=? and email=?`, [data.password, data.code, data.email])
}