import { TokenService } from "@loopback/authentication";
import { BindingKey } from "@loopback/core";

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
