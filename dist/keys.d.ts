import { TokenService } from "@loopback/authentication";
import { BindingKey } from "@loopback/core";
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
