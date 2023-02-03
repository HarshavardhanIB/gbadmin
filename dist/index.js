"use strict";
// Copyright IBM Corp. and LoopBack contributors 2018,2020. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const tslib_1 = require("tslib");
const application_1 = require("./application");
// re-exports for our benchmark, not needed for the tutorial itself
tslib_1.__exportStar(require("@loopback/rest"), exports);
tslib_1.__exportStar(require("./application"), exports);
tslib_1.__exportStar(require("./models"), exports);
tslib_1.__exportStar(require("./repositories"), exports);
// import dotenv from "dotenv";
require("dotenv/config");
// let config: any = dotenv.config();
// console.log(config);
async function main(options = {}) {
    let config = require('dotenv').config();
    const app = new application_1.GroupBenfitsAdminPortalApplication(options);
    await app.boot();
    await app.start();
    // console.log(">>>>", process.env.PORT);
    // console.log(">>>>", process.env.dburl);
    const url = app.restServer.url;
    console.log(`Server is running at ${url}`);
    // config = dotenv.config();
    // console.log(config);
    return app;
}
exports.main = main;
if (require.main === module) {
    // Run the application
    const config = {
        rest: {
            port: +((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3002),
            host: process.env.HOST,
            basePath: '/api/ap',
            gracePeriodForClose: 5000,
            openApiSpec: {
                // useful when used with OpenAPI-to-GraphQL to locate your application
                setServersFromRequest: true,
            },
        },
    };
    main(config).catch(err => {
        console.error('Cannot start the application.', err);
        process.exit(1);
    });
}
//# sourceMappingURL=index.js.map