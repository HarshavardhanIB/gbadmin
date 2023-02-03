"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialInstitutionsRoutingNumbersRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let FinancialInstitutionsRoutingNumbersRepository = class FinancialInstitutionsRoutingNumbersRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, financialInstitutionsRepositoryGetter) {
        super(models_1.FinancialInstitutionsRoutingNumbers, dataSource);
        this.financialInstitutionsRepositoryGetter = financialInstitutionsRepositoryGetter;
        this.banks = this.createBelongsToAccessorFor('bank', financialInstitutionsRepositoryGetter);
        this.registerInclusionResolver('bank', this.banks.inclusionResolver);
    }
};
FinancialInstitutionsRoutingNumbersRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.groupBenefitz')),
    tslib_1.__param(1, repository_1.repository.getter('FinancialInstitutionsRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.GroupBenefitzDataSource, Function])
], FinancialInstitutionsRoutingNumbersRepository);
exports.FinancialInstitutionsRoutingNumbersRepository = FinancialInstitutionsRoutingNumbersRepository;
//# sourceMappingURL=financial-institutions-routing-numbers.repository.js.map