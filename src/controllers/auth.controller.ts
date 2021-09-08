import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {register as registerModel, findUserByEmail, genCodeForgot, updateForgotPassword} from "../models/user.models"
import response from "../helpers/stdResponse"
import { validationResult } from "express-validator"


const {APP_KEY} = process.env

export interface FindEmail {
    user: object | any[]
  }

export const login = async (req: Request, res: Response) => {
  const {email, password} = req.body
  const results:any = await findUserByEmail(email)
  const checkEmail = results[0][0]
  if(!checkEmail) {
    return response(res, "email already in use", 500)
  } else {
    const compare = await bcrypt.compare(password, checkEmail.password)
    if(compare) {
        const token = jwt.sign({id: checkEmail.id, email:checkEmail.email}, APP_KEY || "")
        return response(res, "login success", 200, {token})
    } else {
      return response(res, "wrong email or password", 404)
    }
  }
  
}

export const register = async (req: Request, res: Response) => {
    const result:any = validationResult(req)
    if (!result.isEmpty()) {
      return response(res, result.errors[0].msg, 404)
    }
    const email = req.body.email
    const name = req.body.name
    const password = req.body.password
    const user:any = await findUserByEmail(email)
    const checkEmail = user[0][0]
    if(checkEmail){
        return response(res,"email already in use", 500)
    } else {
        const resPassword = await bcrypt.hash(password, await bcrypt.genSalt())
    const data = { email, password: resPassword, name }
    await registerModel(data)
    return response(res, "Register SuccesFully, You can Login Now", 200)
    }
}

export const generateForgotcode = async (req: Request, res: Response) => {
    const email = req.body.email
    const user:any = await findUserByEmail(email)
    const checkEmail = user[0][0]
    if(!checkEmail){
        return response(res,"email not match any record", 500)
    } else {
    const codeForgot:any = Math.floor(100000 + Math.random() * 900000)
    const data = {code: codeForgot, email}
    await genCodeForgot(data)
    return response(res, `Here your code ${codeForgot}`, 200)
    }
}

export const updateForgot = async (req: Request, res: Response) => {
    const code:any = req.params.code
    const password:any = req.body.password
    const resPassword:any = await bcrypt.hash(password, await bcrypt.genSalt())
    const data = {password: resPassword, code}
    const results:any = await updateForgotPassword(data)
    if(results[0].affectedRows <= 0) {
        return response(res,"Wrong code", 500)
    }else {
        return response(res,"Update Password Success", 200)
    }
   
}