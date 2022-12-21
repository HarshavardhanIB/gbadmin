"use strict";
// Copyright IBM Corp. and LoopBack contributors 2018,2020. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupBenfitsAdminPortalApplication = void 0;
const tslib_1 = require("tslib");
const boot_1 = require("@loopback/boot");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const rest_explorer_1 = require("@loopback/rest-explorer");
const service_proxy_1 = require("@loopback/service-proxy");
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const path_1 = tslib_1.__importDefault(require("path"));
const sequence_1 = require("./sequence");
const authentication_1 = require("@loopback/authentication");
const jwt_service_1 = require("./services/jwt.service");
const authentication_jwt_1 = require("@loopback/authentication-jwt");
const multer_1 = tslib_1.__importDefault(require("multer"));
const datasources_1 = require("./datasources");
const keys_1 = require("./keys");
const error_handler_middleware_1 = require("./middleware/error-handler.middleware");
const jwt_strategy_1 = require("./authentication.stratageys/jwt.strategy");
const authorization_1 = require("@loopback/authorization");
class GroupBenfitsAdminPortalApplication extends (0, boot_1.BootMixin)((0, service_proxy_1.ServiceMixin)((0, repository_1.RepositoryMixin)(rest_1.RestApplication))) {
    constructor(options = {}) {
        super(options);
        // Set up the custom sequence
        this.sequence(sequence_1.MySequence);
        // Set up default home page
        this.static('/', path_1.default.join(__dirname, '../public'));
        // Customize @loopback/rest-explorer configuration here
        this.configure(rest_explorer_1.RestExplorerBindings.COMPONENT).to({
            path: '/explorer',
        });
        this.component(rest_explorer_1.RestExplorerComponent);
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
        this.component(authentication_jwt_1.JWTAuthenticationComponent);
        // Bind datasource
        this.dataSource(datasources_1.DbDataSource, authentication_jwt_1.UserServiceBindings.DATASOURCE_NAME);
        // this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);
        // this.bind(TokenServiceBindings.TOKEN_SECRET).to(TokenServiceConstants.TOKEN_SECRET_VALUE)
        // this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE);
        this.add((0, core_1.createBindingFromClass)(error_handler_middleware_1.ErrorHandlerMiddlewareProvider));
        this.component(rest_explorer_1.RestExplorerComponent);
        this.component(authentication_1.AuthenticationComponent);
        this.component(authorization_1.AuthorizationComponent);
        this.add((0, core_1.createBindingFromClass)(jwt_strategy_1.JWTAuthenticationStrategy));
        (0, authentication_1.registerAuthenticationStrategy)(this, jwt_strategy_1.JWTAuthenticationStrategy);
        // Configure file upload with multer options
        this.configureFileUpload(options.fileStorageDirectory);
        // Set up default home page
        this.static('/', path_1.default.join(__dirname, '../public'));
        // this.static('/app/externalData', path.join(__dirname, '../support/extdata'));
        this.static('/app/server', path_1.default.join(__dirname, '../public/server'));
        this.static('/app/resources', path_1.default.join(__dirname, '../public/resources'));
        this.static('/app/temp/externalData', path_1.default.join(__dirname, '../support/extdata'));
        this.static('/app/temp/bankCheque/', path_1.default.join(__dirname, '../support/customer/bank'));
        this.static('/tmp', path_1.default.join(__dirname, '../uploads'));
        this.setUpBindings();
    }
    /**
  
    * Configure `multer` options for file upload
  
    */
    configureFileUpload(destination) {
        // Upload files to `dist/uploads` by default
        destination = destination !== null && destination !== void 0 ? destination : path_1.default.join(__dirname, '../uploads');
        console.log(destination);
        this.bind(keys_1.STORAGE_DIRECTORY).to(destination);
        const multerOptions = {
            storage: multer_1.default.diskStorage({
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
        this.configure(keys_1.FILE_UPLOAD_SERVICE).to(multerOptions);
    }
    setUpBindings() {
        this.bind(keys_1.TokenServiceBindings.TOKEN_SERVICE).toClass(jwt_service_1.JWTService);
        this.bind(keys_1.TokenServiceBindings.TOKEN_SECRET).to(keys_1.TokenServiceConstants.TOKEN_SECRET_VALUE);
        this.bind(keys_1.TokenServiceBindings.TOKEN_EXPIRES_IN).to(keys_1.TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE);
    }
    setupLogging() {
        // Register `morgan` express middleware
        // Create a middleware factory wrapper for `morgan(format, options)`
        const morganFactory = (config) => {
            this.debug('Morgan configuration', config);
            return (0, morgan_1.default)('combined', config);
        };
        // Print out logs using `debug`
        const defaultConfig = {
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
exports.GroupBenfitsAdminPortalApplication = GroupBenfitsAdminPortalApplication;
//# sourceMappingURL=application.js.map