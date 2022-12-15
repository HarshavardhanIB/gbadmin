// Copyright IBM Corp. and LoopBack contributors 2018,2020. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { BootMixin } from '@loopback/boot';
import { ApplicationConfig, createBindingFromClass } from '@loopback/core';
import { RepositoryMixin } from '@loopback/repository';
import { Request, Response, RestApplication } from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import { ServiceMixin } from '@loopback/service-proxy';
import morgan from 'morgan';
import path from 'path';
import { MySequence } from './sequence';
import { AuthenticationComponent } from '@loopback/authentication';
import { JWTService } from './services/jwt.service'
import {
  JWTAuthenticationComponent,
  // JWTService,
  SECURITY_SCHEME_SPEC,
  // TokenServiceBindings,
  // TokenServiceConstants,
  UserServiceBindings,
} from '@loopback/authentication-jwt';

import { DbDataSource } from './datasources';
import { TokenServiceBindings, TokenServiceConstants } from './keys';
import { ErrorHandlerMiddlewareProvider } from './middleware/error-handler.middleware'
export { ApplicationConfig };

export class GroupBenfitsAdminPortalApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    this.setupLogging();
    this.component(AuthenticationComponent);
    // Mount jwt component
    this.component(JWTAuthenticationComponent);
    // Bind datasource
    this.dataSource(DbDataSource, UserServiceBindings.DATASOURCE_NAME);
    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);
    this.bind(TokenServiceBindings.TOKEN_SECRET).to(TokenServiceConstants.TOKEN_SECRET_VALUE)
    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE);
    this.add(createBindingFromClass(ErrorHandlerMiddlewareProvider));
  }

  private setupLogging() {
    // Register `morgan` express middleware
    // Create a middleware factory wrapper for `morgan(format, options)`
    const morganFactory = (config?: morgan.Options<Request, Response>) => {
      this.debug('Morgan configuration', config);
      return morgan('combined', config);
    };

    // Print out logs using `debug`
    const defaultConfig: morgan.Options<Request, Response> = {
      stream: {
        write: str => {
          this._debug(str);
        },
      },
    };
    this.expressMiddleware(morganFactory, defaultConfig, {
      injectConfiguration: 'watch',
      key: 'middleware.morgan',
    });
  }
}
