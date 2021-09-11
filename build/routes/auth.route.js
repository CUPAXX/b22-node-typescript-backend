"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var auth_controller_1 = require("../controllers/auth.controller");
var auth = (0, express_1.Router)();
auth.post("/login", (0, express_validator_1.body)("email").isEmail().withMessage("Please use a valid email"), auth_controller_1.login);
auth.post("/register", (0, express_validator_1.body)("email").isEmail().withMessage("Please use a valid email"), (0, express_validator_1.body)("password").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i").withMessage("Password at least have 1 uppercase, 1 lowercase, 1 number and 8 character long"), 
// body("password").isLength({min: 7}).withMessage("must be at least 7 chars long"),
auth_controller_1.register);
auth.post("/forgot-code", auth_controller_1.generateForgotcode);
auth.patch("/forgot-update/:code", (0, express_validator_1.body)("password").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i").withMessage("Password at least have 1 uppercase, 1 lowercase, 1 number and 8 character long"), auth_controller_1.updateForgot);
auth.get("/profile", auth_controller_1.getProfileUser);
exports.default = auth;
