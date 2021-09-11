import { Router } from "express"
import { body } from "express-validator";
import { generateForgotcode, getProfileUser, login, register, updateForgot } from "../controllers/auth.controller"
const auth = Router()

auth.post("/login", body("email").isEmail().withMessage("Please use a valid email"), login)
auth.post("/register", 
        body("email").isEmail().withMessage("Please use a valid email"),
        body("password").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i").withMessage("Password at least have 1 uppercase, 1 lowercase, 1 number and 8 character long"),
        // body("password").isLength({min: 7}).withMessage("must be at least 7 chars long"),
        register)
auth.post("/forgot-code", generateForgotcode)
auth.patch("/forgot-update/:code",body("password").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i").withMessage("Password at least have 1 uppercase, 1 lowercase, 1 number and 8 character long"), updateForgot)
auth.get("/profile", getProfileUser)
export default auth
