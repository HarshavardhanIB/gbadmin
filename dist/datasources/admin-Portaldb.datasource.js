"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GbadminDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
// import dotenv from 'dotenv';
// dotenv.config();
const config = {
    name: 'gbadmin',
    connector: 'mysql',
    // url: 'mysql://root:Sql@2022@localhost:3306/adminp',
    // host: 'localhost',
    // port: 3306,
    // user: 'root',
    // password: 'Sql@2022',
    // database: 'gdadmin'
    url: '',
    host: process.env.dbhost || 'localhost',
    port: process.env.dbport || 3306,
    user: process.env.dbuser || "root",
    password: process.env.dbpassword || 'Sql@2022',
    database: process.env.database || 'gbadmin'
    // 'gbadmin'
};
console.log("db config>>>", config);
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let GbadminDataSource = class GbadminDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
GbadminDataSource.dataSourceName = 'gbadmin';
GbadminDataSource.defaultConfig = config;
GbadminDataSource = tslib_1.__decorate([
    (0, core_1.lifeCycleObserver)('datasource'),
    tslib_1.__param(0, (0, core_1.inject)('datasources.config.gbadmin', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], GbadminDataSource);
exports.GbadminDataSource = GbadminDataSource;
//# sourceMappingURL=admin-Portaldb.datasource.js.map