import {Request, Response} from "express"
import jwt, {JwtPayload} from "jsonwebtoken"

interface AuthRequest extends Request {
    authUser: string | JwtPayload
}

// tslint:disable-next-line: ban-types
const authMiddleware = (req: AuthRequest, res: Response, next: Function) => {
    const payload = req.headers.authorization
    if(payload) {
        // tslint:disable-next-line: no-unused-expression
        "Bearer token"
        const token = payload.slice(7)
        try{
            const verify = jwt.verify(token, process.env.APP_KEY || "")
            req.authUser = verify
            next()
        } catch(e){
            return res.json({
                success: false,
                message: "Auth Error"
            })
        }
    }
    return res.json({
        success: false,
        message: "Unauth"
    })
}

export default authMiddleware