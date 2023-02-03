"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpService = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importStar(require("fs"));
const stream_1 = require("stream");
const util_1 = require("util");
const form_data_1 = tslib_1.__importDefault(require("form-data"));
const axios_1 = tslib_1.__importDefault(require("axios"));
// import fetch, { RequestInit } from 'node-fetch';
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const core_1 = require("@loopback/core");
let HttpService = class HttpService {
    constructor( /* Add @inject to inject parameters */) { }
    async get(url, headers, staticService) {
        let config = {
        // data:{
        // }
        };
        if (headers) {
            config.headers = headers;
        }
        try {
            const response = await axios_1.default.get(url, config);
            //console.log(response.data);
            if (staticService) {
                return response;
            }
            else {
                return response.data;
            }
        }
        catch (error) {
            console.log(`Aitestpro server connection??`);
            console.log(`${process.env.AITPSERVER}`);
            if (error.response) {
                if (error.response.data)
                    return error.response.data;
                else
                    return error.response;
            }
            else {
                console.error(error);
                return error;
            }
            //return error.response.data.message;
        }
    }
    async post(url, data, headers) {
        let config = {
        //data: data,
        };
        if (headers) {
            config.headers = headers;
        }
        try {
            const response = await axios_1.default.post(url, data, config);
            //console.log(response.data);
            return response.data;
        }
        catch (error) {
            console.log(`Aitestpro server connection??`);
            console.log(`${process.env.AITPSERVER}`);
            if (error.response) {
                if (error.response.data)
                    return error.response.data;
                else
                    return error.response;
            }
            else {
                console.error(error);
                return error;
            }
        }
    }
    async fetchXml(url, dir) {
        const streamPipeline = (0, util_1.promisify)(stream_1.pipeline);
        const res = await (0, node_fetch_1.default)(url);
        if (!res.ok) {
            return false;
        }
        await streamPipeline(res.body, (0, fs_1.createWriteStream)(dir + '/excel.xlsx'));
        return true;
    }
    async fetchMultipartFormdata(url, path) {
        try {
            const formFile = fs_1.default.createReadStream(path);
            const form = new form_data_1.default();
            form.append("file", formFile);
            // let satstus = await fetch(url, requestOptions)
            let status = await axios_1.default.post(url, form);
            console.log(">>>>>>>", status);
            // if(status)
            // {}
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
};
HttpService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__metadata("design:paramtypes", [])
], HttpService);
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map