"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const constants_1 = require("../constants");
const storage_helper_1 = require("../storage.helper");
const http_service_1 = require("./http.service");
const server = constants_1.ACH.server;
let AchService = class AchService {
    constructor(/* Add @inject to inject parameters */ http) {
        this.http = http;
    }
    /*
     * Add service methods here
     */
    async createCustomer(input) {
        const service = server + constants_1.ACHserviceEndpoints.createCustomer; //
        const data = input;
        const headers = {
            'x-client-id': constants_1.PAD_CLIENT_ID,
            'x-client-secret': constants_1.PAD_CLIENT_SECRET
        };
        const response = await this.http.post(service, data, headers);
        return response;
    }
    async createCustomerNoresponse(input) {
        let message, status, data;
        const service = server + constants_1.ACHserviceEndpoints.createCustomer; //
        //const data = input
        const reqInp = input;
        delete reqInp.newFilename;
        delete reqInp.padFilename;
        const headers = {
            'x-client-id': constants_1.PAD_CLIENT_ID,
            'x-client-secret': constants_1.PAD_CLIENT_SECRET
        };
        const response = await this.http.post(service, reqInp, headers);
        //return response;
        if (response && response.data) {
            console.log(input);
            if (input.newFilename)
                (0, storage_helper_1.deleteFile)(input.newFilename);
            if (input.padFilename)
                (0, storage_helper_1.deleteFile)(input.padFilename);
            data = response.data;
            message = 'Customer Record(PAD) created';
            status = '200';
        }
        else {
            message = 'Customer Record(PAD) creation failed';
            status = '202';
        }
        console.log(status);
        console.log(data);
        console.log(message);
        // this.response.status(parseInt(status)).send({
        //   status: status,
        //   message: message,
        //   date: new Date(),
        //   data: data
        // });
    }
};
AchService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, (0, core_1.service)(http_service_1.HttpService)),
    tslib_1.__metadata("design:paramtypes", [http_service_1.HttpService])
], AchService);
exports.AchService = AchService;
//# sourceMappingURL=ach.service.js.map