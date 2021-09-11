"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var response = function (res, message, status, success, data) {
    if (message === void 0) { message = ""; }
    if (status === void 0) { status = 200; }
    if (success === void 0) { success = true; }
    var returnData = {
        success: success,
        message: message,
        data: data
    };
    if (status >= 400) {
        success = false;
    }
    if (data !== null) {
        returnData.data = data;
    }
    return res.status(status).json(returnData);
};
exports.default = response;
