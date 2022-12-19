/// <reference types="http-errors" />
/// <reference types="express" />
import { Provider } from '@loopback/core';
import { HttpErrors, LogError, Middleware, MiddlewareContext, Response } from '@loopback/rest';
export declare class ErrorHandlerMiddlewareProvider implements Provider<Middleware> {
    protected logError: LogError;
    constructor(logError: LogError);
    value(): Promise<Middleware>;
    handleError(context: MiddlewareContext, err: HttpErrors.HttpError): Response;
}
