"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankCodesRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let BankCodesRepository = class BankCodesRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, financialInstitutionsRepositoryGetter) {
        super(models_1.BankCodes, dataSource);
        this.financialInstitutionsRepositoryGetter = financialInstitutionsRepositoryGetter;
        this.bank = this.createBelongsToAccessorFor('bank', financialInstitutionsRepositoryGetter);
        this.registerInclusionResolver('bank', this.bank.inclusionResolver);
    }
};
BankCodesRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.groupBenefitz')),
    tslib_1.__param(1, repository_1.repository.getter('FinancialInstitutionsRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.GroupBenefitzDataSource, Function])
], BankCodesRepository);
exports.BankCodesRepository = BankCodesRepository;
//# sourceMappingURL=bank-codes.repository.js.map