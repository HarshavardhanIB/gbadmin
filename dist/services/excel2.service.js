"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Excel2Service = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const xlsx = tslib_1.__importStar(require("xlsx"));
let Excel2Service = class Excel2Service {
    constructor( /* Add @inject to inject parameters */) { }
    /*
     * Add service methods here
     */
    async excelToJson(filepath) {
        let workbook = xlsx.readFile(filepath);
        let worksheet = workbook.Sheets[workbook.SheetNames[0]];
        let jsonSheetData = xlsx.utils.sheet_to_json(worksheet, { defval: '' });
        let jsonData = JSON.stringify(jsonSheetData);
        console.log(jsonData);
        return jsonData;
    }
};
Excel2Service = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__metadata("design:paramtypes", [])
], Excel2Service);
exports.Excel2Service = Excel2Service;
//# sourceMappingURL=excel2.service.js.map