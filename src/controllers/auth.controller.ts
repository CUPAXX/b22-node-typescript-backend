import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {register as registerModel, findUserByEmail, genCodeForgot, updateForgotPassword, findUserById} from "../models/user.models"
import response from "../helpers/stdResponse"
import { validationResult } from "express-validator"
import nodemailer from "nodemailer"


const {APP_KEY} = process.env

export interface FindEmail {
    user: object | any[]
  }

export const login = async (req: Request, res: Response) => {
  const result:any = validationResult(req)
    if (!result.isEmpty()) {
      return response(res, result.errors[0].msg, 404)
    }
  const {email, password} = req.body
  const results:any = await findUserByEmail(email)
  const checkEmail = results[0][0]
  if(!checkEmail) {
    return response(res, "Wrong email or password", 404, false)
  } else {
    const compare = await bcrypt.compare(password, checkEmail.password)
    if(compare) {
        const token = jwt.sign({id: checkEmail.id, email:checkEmail.email}, APP_KEY || "")
        return response(res, "login success", 200, true, {token})
    } else {
      return response(res, "wrong email or password", 404, false)
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
        return response(res,"email already in use", 500, false)
    } else {
        const resPassword = await bcrypt.hash(password, await bcrypt.genSalt())
    const data = { email, password: resPassword, name }
    await registerModel(data)
    return response(res, "Register SuccesFully, You can Login Now", 200, true)
    }
}

export const generateForgotcode = async (req: Request, res: Response) => {
    const {email} = req.body   
    const user:any = await findUserByEmail(email)
    const checkEmail = user[0][0]
    if(!checkEmail){
        return response(res,"email not match any record", 404, false)
    } else {
      const codeForgot:any = Math.floor(100000 + Math.random() * 900000)

      const transporter = nodemailer.createTransport({
        host: process.env.HOST_SMTP,
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      })
      const info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Verification Code Simple AUTH Apps",
        text: `This is your Verification Code : ${codeForgot}`,
      })
      try {
        if (info.messageId) {
          const data = {code: codeForgot, email}
          await genCodeForgot(data)
          return response(res, `Here your code ${codeForgot}`, 200, true)
        }
      } catch (error) {
        return response(res,"Error bro", 404, false)
      }
    }
}

export const getProfileUser = async (req: Request, res: Response) => {
  const email = req.body.email
  const result:any = await findUserByEmail(email)
  return response(res, `Profile User`, 200, true, result[0][0])
}

export const updateForgot = async (req: Request, res: Response) => {
  const result:any = validationResult(req)
    if (!result.isEmpty()) {
      return response(res, result.errors[0].msg, 404, false)
    }
    const code:any = req.params.code
    const password:any = req.body.password
    const email: any = req.body.email
    const resPassword:any = await bcrypt.hash(password, await bcrypt.genSalt())
    const data = {password: resPassword, code, email}
    const results:any = await updateForgotPassword(data)
    const resetCode = ""
    const updateData = {code: resetCode, email}
    console.log("")
    await genCodeForgot(updateData)
    if(results[0].affectedRows <= 0) {
        return response(res,"Wrong code or email", 500, false)
    } else {
        return response(res,"Update Password Success", 200, true)
    }
}