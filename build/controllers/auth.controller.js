"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateForgot = exports.getProfileUser = exports.generateForgotcode = exports.register = exports.login = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_models_1 = require("../models/user.models");
var stdResponse_1 = __importDefault(require("../helpers/stdResponse"));
var express_validator_1 = require("express-validator");
var nodemailer_1 = __importDefault(require("nodemailer"));
var APP_KEY = process.env.APP_KEY;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, _a, email, password, results, checkEmail, compare, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                result = (0, express_validator_1.validationResult)(req);
                if (!result.isEmpty()) {
                    return [2 /*return*/, (0, stdResponse_1.default)(res, result.errors[0].msg, 404)];
                }
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, (0, user_models_1.findUserByEmail)(email)];
            case 1:
                results = _b.sent();
                checkEmail = results[0][0];
                if (!!checkEmail) return [3 /*break*/, 2];
                return [2 /*return*/, (0, stdResponse_1.default)(res, "Wrong email or password", 404, false)];
            case 2: return [4 /*yield*/, bcrypt_1.default.compare(password, checkEmail.password)];
            case 3:
                compare = _b.sent();
                if (compare) {
                    token = jsonwebtoken_1.default.sign({ id: checkEmail.id, email: checkEmail.email }, APP_KEY || "");
                    return [2 /*return*/, (0, stdResponse_1.default)(res, "login success", 200, true, { token: token })];
                }
                else {
                    return [2 /*return*/, (0, stdResponse_1.default)(res, "wrong email or password", 404, false)];
                }
                _b.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, email, name, password, user, checkEmail, resPassword, _a, _b, _c, data;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                result = (0, express_validator_1.validationResult)(req);
                if (!result.isEmpty()) {
                    return [2 /*return*/, (0, stdResponse_1.default)(res, result.errors[0].msg, 404)];
                }
                email = req.body.email;
                name = req.body.name;
                password = req.body.password;
                return [4 /*yield*/, (0, user_models_1.findUserByEmail)(email)];
            case 1:
                user = _d.sent();
                checkEmail = user[0][0];
                if (!checkEmail) return [3 /*break*/, 2];
                return [2 /*return*/, (0, stdResponse_1.default)(res, "email already in use", 500, false)];
            case 2:
                _b = (_a = bcrypt_1.default).hash;
                _c = [password];
                return [4 /*yield*/, bcrypt_1.default.genSalt()];
            case 3: return [4 /*yield*/, _b.apply(_a, _c.concat([_d.sent()]))];
            case 4:
                resPassword = _d.sent();
                data = { email: email, password: resPassword, name: name };
                return [4 /*yield*/, (0, user_models_1.register)(data)];
            case 5:
                _d.sent();
                return [2 /*return*/, (0, stdResponse_1.default)(res, "Register SuccesFully, You can Login Now", 200, true)];
        }
    });
}); };
exports.register = register;
var generateForgotcode = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, checkEmail, codeForgot, transporter, info, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                return [4 /*yield*/, (0, user_models_1.findUserByEmail)(email)];
            case 1:
                user = _a.sent();
                checkEmail = user[0][0];
                if (!!checkEmail) return [3 /*break*/, 2];
                return [2 /*return*/, (0, stdResponse_1.default)(res, "email not match any record", 404, false)];
            case 2:
                codeForgot = Math.floor(100000 + Math.random() * 900000);
                transporter = nodemailer_1.default.createTransport({
                    host: process.env.HOST_SMTP,
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD,
                    },
                });
                return [4 /*yield*/, transporter.sendMail({
                        from: process.env.EMAIL,
                        to: email,
                        subject: "Verification Code Simple AUTH Apps",
                        text: "This is your Verification Code : " + codeForgot,
                    })];
            case 3:
                info = _a.sent();
                _a.label = 4;
            case 4:
                _a.trys.push([4, 7, , 8]);
                if (!info.messageId) return [3 /*break*/, 6];
                data = { code: codeForgot, email: email };
                return [4 /*yield*/, (0, user_models_1.genCodeForgot)(data)];
            case 5:
                _a.sent();
                return [2 /*return*/, (0, stdResponse_1.default)(res, "Here your code " + codeForgot, 200, true)];
            case 6: return [3 /*break*/, 8];
            case 7:
                error_1 = _a.sent();
                return [2 /*return*/, (0, stdResponse_1.default)(res, "Error bro", 404, false)];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.generateForgotcode = generateForgotcode;
var getProfileUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                return [4 /*yield*/, (0, user_models_1.findUserByEmail)(email)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, (0, stdResponse_1.default)(res, "Profile User", 200, true, result[0][0])];
        }
    });
}); };
exports.getProfileUser = getProfileUser;
var updateForgot = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, code, password, email, resPassword, _a, _b, _c, data, results, resetCode, updateData;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                result = (0, express_validator_1.validationResult)(req);
                if (!result.isEmpty()) {
                    return [2 /*return*/, (0, stdResponse_1.default)(res, result.errors[0].msg, 404, false)];
                }
                code = req.params.code;
                password = req.body.password;
                email = req.body.email;
                _b = (_a = bcrypt_1.default).hash;
                _c = [password];
                return [4 /*yield*/, bcrypt_1.default.genSalt()];
            case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d.sent()]))];
            case 2:
                resPassword = _d.sent();
                data = { password: resPassword, code: code, email: email };
                return [4 /*yield*/, (0, user_models_1.updateForgotPassword)(data)];
            case 3:
                results = _d.sent();
                resetCode = "";
                updateData = { code: resetCode, email: email };
                return [4 /*yield*/, (0, user_models_1.genCodeForgot)(updateData)];
            case 4:
                _d.sent();
                if (results[0].affectedRows <= 0) {
                    return [2 /*return*/, (0, stdResponse_1.default)(res, "Wrong code or email", 500, false)];
                }
                else {
                    return [2 /*return*/, (0, stdResponse_1.default)(res, "Update Password Success", 200, true)];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.updateForgot = updateForgot;
