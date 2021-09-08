import { Router } from "express"
import { generateForgotcode, login, register, updateForgot } from "../controllers/auth.controller"
const auth = Router()
import schema from "../helpers/validator/register.validator"
import {checkSchema} from "express-validator"

auth.post("/login", login)
auth.post("/register", register)
auth.post("/forgot-code", generateForgotcode)
auth.patch("/forgot-update/:code", updateForgot)

export default auth
