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
const datasources_1 = require("./datasources");
const keys_1 = require("./keys");
const error_handler_middleware_1 = require("./middleware/error-handler.middleware");
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
        this.component(authentication_1.AuthenticationComponent);
        // Mount jwt component
        this.component(authentication_jwt_1.JWTAuthenticationComponent);
        // Bind datasource
        this.dataSource(datasources_1.DbDataSource, authentication_jwt_1.UserServiceBindings.DATASOURCE_NAME);
        this.bind(keys_1.TokenServiceBindings.TOKEN_SERVICE).toClass(jwt_service_1.JWTService);
        this.bind(keys_1.TokenServiceBindings.TOKEN_SECRET).to(keys_1.TokenServiceConstants.TOKEN_SECRET_VALUE);
        this.bind(keys_1.TokenServiceBindings.TOKEN_EXPIRES_IN).to(keys_1.TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE);
        this.add((0, core_1.createBindingFromClass)(error_handler_middleware_1.ErrorHandlerMiddlewareProvider));
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