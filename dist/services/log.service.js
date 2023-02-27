"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const util_1 = tslib_1.__importDefault(require("util"));
const maxLogfileSize = 10 * 1024 * 1024; //(10) MB
let LogService = class LogService {
    constructor( /* Add @inject to inject parameters */) { }
    /*
     * Add service methods here
     */
    async consoles(functionName, condition, result, err) {
        try {
            console.log("enter into logs");
            let logfilePath = __dirname + '/logs.log';
            logfilePath = path_1.default.join(__dirname, '..', '..', 'logs', 'logs.log');
            const logFile = fs_1.default.createWriteStream(logfilePath, { flags: 'w' });
            const { size } = fs_1.default.statSync(logfilePath);
            if (size >= maxLogfileSize) {
                fs_1.default.truncateSync(logfilePath, 0);
            }
            if (err != "") {
                logFile.write(new Date().toISOString() + ": function name :" + functionName + " " + condition + " " + util_1.default.format(err.message) + '\n');
            }
            else {
                logFile.write(new Date().toISOString() + ": function name :" + functionName + " " + condition + " " + '\n');
            }
        }
        catch (error) {
            console.log(error);
        }
        ;
    }
};
LogService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__metadata("design:paramtypes", [])
], LogService);
exports.LogService = LogService;
//# sourceMappingURL=log.service.js.map