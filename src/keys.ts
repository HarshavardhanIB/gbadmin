import { TokenService } from "@loopback/authentication";
import { BindingKey } from "@loopback/core";
import { FileUploadHandler } from './types';
export namespace TokenServiceBindings {

  export const TOKEN_SECRET = BindingKey.create<string>(
    'authentication.jwt.secret',

  );

  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(

    'authentication.jwt.expiresIn',

  );

  export const TOKEN_SERVICE = BindingKey.create<TokenService>(

    'services.jwt.service',

  );

}
export namespace TokenServiceConstants {
  export const TOKEN_SECRET_ROUNDS = 10;
  export const TOKEN_SECRET_VALUE = 'IDEABYTES';
  export const TOKEN_EXPIRES_IN_VALUE = '24h';
}
/**
 * Binding key for the file upload service
 */
export const FILE_UPLOAD_SERVICE = BindingKey.create<FileUploadHandler>(
  'services.FileUpload',
);

/**
 * Binding key for the storage directory
 */
export const STORAGE_DIRECTORY = BindingKey.create<string>('storage.directory');
