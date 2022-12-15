import { inject, injectable, Next, Provider } from '@loopback/core';
import {
  asMiddleware,
  HttpErrors,
  LogError,
  Middleware, MiddlewareContext, Response, RestBindings,
  RestMiddlewareGroups
} from '@loopback/rest';
import fs from 'fs';
import path from 'path';
import util from 'util';
const maxLogfileSize = 5 * 1024 * 1024; //(5) MB
let logfilePath = __dirname + '/debug.log';
logfilePath = path.join(__dirname, '..', '..', 'logs', 'debug.log')
console.log(logfilePath)
const logFile = fs.createWriteStream(logfilePath, { flags: 'w' });
const logStdout = process.stdout;
@injectable(
  asMiddleware({
    group: 'validationError',
    upstreamGroups: RestMiddlewareGroups.SEND_RESPONSE,
    downstreamGroups: RestMiddlewareGroups.CORS,
  }),
)
export class ErrorHandlerMiddlewareProvider implements Provider<Middleware> {
  constructor(
    @inject(RestBindings.SequenceActions.LOG_ERROR)
    protected logError: LogError,
  ) { }

  async value() {
    const middleware: Middleware = async (
      ctx: MiddlewareContext,
      next: Next,
    ) => {
      try {
        console.log("context.requestedBaseUrl and context.basePath")
        console.log(ctx.request.baseUrl, ctx.request.ips);
        return await next();
      } catch (err) {
        // Any error handling goes here
        return this.handleError(ctx, err);
      }
    };
    return middleware;
  }
  handleError(context: MiddlewareContext, err: HttpErrors.HttpError): Response {
    // We simply log the error although more complex scenarios can be performed
    // such as customizing errors for a specific endpoint
    console.log(err.statusCode);
    const { size } = fs.statSync(logfilePath);
    console.log(`Error log file size: ${size}`)
    if (size >= maxLogfileSize) {
      fs.truncateSync(logfilePath, 0)
    }
    if (err.statusCode != 404) { //404s dont log into file, directly display
      logFile.write(new Date().toISOString() + ":" + util.format(err.message) + '\n');
    }
    // else {
    //   logFile.write(new Date().toISOString() + ":" + util.format(err) + '\n');
    // }

    //logStdout.write(util.format(err) + '\n');
    this.logError(err, err.statusCode, context.request);
    if (err.statusCode == 404) {
      throw { statusCode: err.statusCode, status: err.status, message: 'Sorry! The resource you are looking for is not found.' }
    } else {
      throw err;
    }

  }

}
