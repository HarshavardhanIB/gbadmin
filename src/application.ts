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
import { AuthenticationComponent, registerAuthenticationStrategy } from '@loopback/authentication';
import { JWTService } from './services/jwt.service'
import {
  JWTAuthenticationComponent,
  // JWTService,
  SECURITY_SCHEME_SPEC,
  // TokenServiceBindings,
  // TokenServiceConstants,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import multer from 'multer';
import { DbDataSource } from './datasources';
import { FILE_UPLOAD_SERVICE, STORAGE_DIRECTORY, TokenServiceBindings, TokenServiceConstants } from './keys';
import { ErrorHandlerMiddlewareProvider } from './middleware/error-handler.middleware'
import { JWTAuthenticationStrategy } from './authentication.stratageys/jwt.strategy';
import { AuthorizationComponent } from '@loopback/authorization';
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
    // this.component(AuthenticationComponent);
    // this.component(AuthorizationComponent);
    // Mount jwt component
    this.component(JWTAuthenticationComponent);
    // Bind datasource
    this.dataSource(DbDataSource, UserServiceBindings.DATASOURCE_NAME);
    // this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);
    // this.bind(TokenServiceBindings.TOKEN_SECRET).to(TokenServiceConstants.TOKEN_SECRET_VALUE)
    // this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE);
    this.add(createBindingFromClass(ErrorHandlerMiddlewareProvider));
    this.component(RestExplorerComponent);
    this.component(AuthenticationComponent);
    this.component(AuthorizationComponent);
    this.add(createBindingFromClass(JWTAuthenticationStrategy));
    registerAuthenticationStrategy(this, JWTAuthenticationStrategy);
    // Configure file upload with multer options
    this.configureFileUpload(options.fileStorageDirectory);
    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // this.static('/app/externalData', path.join(__dirname, '../support/extdata'));

    this.static('/app/server', path.join(__dirname, '../public/server'));

    this.static('/app/resources', path.join(__dirname, '../public/resources'));



    this.static('/app/temp/externalData', path.join(__dirname, '../support/extdata'));

    this.static('/app/temp/bankCheque/', path.join(__dirname, '../support/customer/bank'));
    this.static('/tmp', path.join(__dirname, '../uploads'));

    this.setUpBindings();
  }
  /**

  * Configure `multer` options for file upload

  */

  protected configureFileUpload(destination?: string) {

    // Upload files to `dist/uploads` by default

    destination = destination ?? path.join(__dirname, '../uploads');

    console.log(destination);

    this.bind(STORAGE_DIRECTORY).to(destination);

    const multerOptions: multer.Options = {

      storage: multer.diskStorage({

        destination,

        // Use the original file name as is

        filename: (req, file, cb) => {

          cb(null, file.originalname);

        },

      }),

      //limits

      //   limits: {

      //     fileSize: 1024 * 1024

      // }

    };

    // Configure the file upload service with multer options

    this.configure(FILE_UPLOAD_SERVICE).to(multerOptions);




  }
  private setUpBindings() {
    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);
    this.bind(TokenServiceBindings.TOKEN_SECRET).to(TokenServiceConstants.TOKEN_SECRET_VALUE)
    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE);
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
