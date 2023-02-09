"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupBenefitzDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const config = {
    name: 'groupBenefitz',
    connector: 'mysql',
    url: process.env.DB_URL || '',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '3306',
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'Sql@2022',
    database: process.env.DB_NAME || 'group_benefitz',
    //dateStrings: ['DATE'], // added this as suggested by @bajtos
    dateStrings: true,
    disableMigration: true,
};
console.log(config);
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let GroupBenefitzDataSource = class GroupBenefitzDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
GroupBenefitzDataSource.dataSourceName = 'groupBenefitz';
GroupBenefitzDataSource.defaultConfig = config;
GroupBenefitzDataSource = tslib_1.__decorate([
    (0, core_1.lifeCycleObserver)('datasource'),
    tslib_1.__param(0, (0, core_1.inject)('datasources.config.groupBenefitz', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], GroupBenefitzDataSource);
exports.GroupBenefitzDataSource = GroupBenefitzDataSource;
//# sourceMappingURL=group-benefitz.datasource.js.map