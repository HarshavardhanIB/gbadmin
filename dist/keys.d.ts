import { TokenService } from "@loopback/authentication";
import { BindingKey } from "@loopback/core";
import { FileUploadHandler } from './types';
export declare namespace TokenServiceBindings {
    const TOKEN_SECRET: BindingKey<string>;
    const TOKEN_EXPIRES_IN: BindingKey<string>;
    const TOKEN_SERVICE: BindingKey<TokenService>;
}
export declare namespace TokenServiceConstants {
    const TOKEN_SECRET_ROUNDS = 10;
    const TOKEN_SECRET_VALUE = "IDEABYTES";
    const TOKEN_EXPIRES_IN_VALUE = "24h";
}
/**
 * Binding key for the file upload service
 */
export declare const FILE_UPLOAD_SERVICE: BindingKey<FileUploadHandler>;
/**
 * Binding key for the storage directory
 */
export declare const STORAGE_DIRECTORY: BindingKey<string>;
