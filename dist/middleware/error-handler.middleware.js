"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlerMiddlewareProvider = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const util_1 = tslib_1.__importDefault(require("util"));
const maxLogfileSize = 5 * 1024 * 1024; //(5) MB
let logfilePath = __dirname + '/debug.log';
logfilePath = path_1.default.join(__dirname, '..', '..', 'logs', 'debug.log');
console.log(logfilePath);
const logFile = fs_1.default.createWriteStream(logfilePath, { flags: 'w' });
const logStdout = process.stdout;
let ErrorHandlerMiddlewareProvider = class ErrorHandlerMiddlewareProvider {
    constructor(logError) {
        this.logError = logError;
    }
    async value() {
        const middleware = async (ctx, next) => {
            try {
                console.log("context.requestedBaseUrl and context.basePath");
                console.log(ctx.request.baseUrl, ctx.request.ips);
                return await next();
            }
            catch (err) {
                // Any error handling goes here
                return this.handleError(ctx, err);
            }
        };
        return middleware;
    }
    handleError(context, err) {
        // We simply log the error although more complex scenarios can be performed
        // such as customizing errors for a specific endpoint
        console.log(err.statusCode);
        const { size } = fs_1.default.statSync(logfilePath);
        console.log(`Error log file size: ${size}`);
        if (size >= maxLogfileSize) {
            fs_1.default.truncateSync(logfilePath, 0);
        }
        if (err.statusCode != 404) { //404s dont log into file, directly display
            logFile.write(new Date().toISOString() + ":" + util_1.default.format(err.message) + '\n');
        }
        // else {
        //   logFile.write(new Date().toISOString() + ":" + util.format(err) + '\n');
        // }
        //logStdout.write(util.format(err) + '\n');
        this.logError(err, err.statusCode, context.request);
        if (err.statusCode == 404) {
            throw { statusCode: err.statusCode, status: err.status, message: 'Sorry! The resource you are looking for is not found.' };
        }
        else {
            throw err;
        }
    }
};
ErrorHandlerMiddlewareProvider = tslib_1.__decorate([
    (0, core_1.injectable)((0, rest_1.asMiddleware)({
        group: 'validationError',
        upstreamGroups: rest_1.RestMiddlewareGroups.SEND_RESPONSE,
        downstreamGroups: rest_1.RestMiddlewareGroups.CORS,
    })),
    tslib_1.__param(0, (0, core_1.inject)(rest_1.RestBindings.SequenceActions.LOG_ERROR)),
    tslib_1.__metadata("design:paramtypes", [Function])
], ErrorHandlerMiddlewareProvider);
exports.ErrorHandlerMiddlewareProvider = ErrorHandlerMiddlewareProvider;
//# sourceMappingURL=error-handler.middleware.js.map