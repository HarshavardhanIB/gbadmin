"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorporateBrokerPackages = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let CorporateBrokerPackages = class CorporateBrokerPackages extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 3,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'allow_top_up', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CorporateBrokerPackages.prototype, "allowTopUp", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'broker_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CorporateBrokerPackages.prototype, "brokerId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 3,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'display_voluntary_benefits', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CorporateBrokerPackages.prototype, "displayVoluntaryBenefits", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CorporateBrokerPackages.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'package_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CorporateBrokerPackages.prototype, "packageId", void 0);
CorporateBrokerPackages = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            idInjection: false,
            mysql: { schema: 'gbadmin', table: 'corporate_broker_packages' }
        }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], CorporateBrokerPackages);
exports.CorporateBrokerPackages = CorporateBrokerPackages;
//# sourceMappingURL=corporate-broker-packages.model.js.map