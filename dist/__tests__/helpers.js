"use strict";
// Copyright IBM Corp. and LoopBack contributors 2019,2020. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.givenCachingProxy = exports.HttpCachingProxy = void 0;
const tslib_1 = require("tslib");
const http_caching_proxy_1 = require("@loopback/http-caching-proxy");
Object.defineProperty(exports, "HttpCachingProxy", { enumerable: true, get: function () { return http_caching_proxy_1.HttpCachingProxy; } });
const path_1 = tslib_1.__importDefault(require("path"));
async function givenCachingProxy() {
    const proxy = new http_caching_proxy_1.HttpCachingProxy({
        cachePath: path_1.default.resolve(__dirname, '.http-cache'),
        logError: false,
        timeout: 5000,
    });
    await proxy.start();
    return proxy;
}
exports.givenCachingProxy = givenCachingProxy;
// export async function isGeoCoderServiceAvailable(service: Geocoder) {
//   try {
//     await service.geocode(aLocation.address);
//     return true;
//   } catch (err) {
//     if (err.statusCode === 502) {
//       return false;
//     }
//     throw err;
//   }
// }
//# sourceMappingURL=helpers.js.map