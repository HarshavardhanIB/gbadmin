"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleRcDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
// const config = {
//   name: 'googleRC',
//   connector: 'rest',
//   baseURL: '',
//   crud: false
// };
const config = {
    name: 'googleRC',
    connector: 'rest',
    crud: true,
    options: {
        headers: {
            //accept: 'application/json',
            'content-type': 'application/x-www-form-urlencoded',
        },
    },
    operations: [
        {
            template: {
                method: 'POST',
                url: 'https://www.google.com/recaptcha/api/siteverify',
                // body: {
                //   secret: '{secretkey}',
                //   response: '{sitekey}',
                // },
                query: {
                    secret: '{secretkey}',
                    response: '{sitekey}',
                },
                // responsePath: '$.result.addressMatches[*].coordinates',
            },
            functions: {
                validate: ['secretkey', 'sitekey'],
            },
        },
    ],
    disableMigration: true,
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let GoogleRcDataSource = class GoogleRcDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
GoogleRcDataSource.dataSourceName = 'googleRC';
GoogleRcDataSource.defaultConfig = config;
GoogleRcDataSource = tslib_1.__decorate([
    (0, core_1.lifeCycleObserver)('datasource'),
    tslib_1.__param(0, (0, core_1.inject)('datasources.config.googleRC', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], GoogleRcDataSource);
exports.GoogleRcDataSource = GoogleRcDataSource;
//# sourceMappingURL=google-rc.datasource.js.map