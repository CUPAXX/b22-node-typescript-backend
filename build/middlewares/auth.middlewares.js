"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// tslint:disable-next-line: ban-types
var authMiddleware = function (req, res, next) {
    var payload = req.headers.authorization;
    if (payload) {
        // tslint:disable-next-line: no-unused-expression
        "Bearer token";
        var token = payload.slice(7);
        try {
            var verify = jsonwebtoken_1.default.verify(token, process.env.APP_KEY || "");
            req.authUser = verify;
            next();
        }
        catch (e) {
            return res.json({
                success: false,
                message: "Auth Error"
            });
        }
    }
    return res.json({
        success: false,
        message: "Unauth"
    });
};
exports.default = authMiddleware;
