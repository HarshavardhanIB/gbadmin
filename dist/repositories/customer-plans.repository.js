"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerPlansRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let CustomerPlansRepository = class CustomerPlansRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, insurancePlansRepositoryGetter) {
        super(models_1.CustomerPlans, dataSource);
        this.insurancePlansRepositoryGetter = insurancePlansRepositoryGetter;
        this.plan = this.createBelongsToAccessorFor('plan', insurancePlansRepositoryGetter);
        this.registerInclusionResolver('plan', this.plan.inclusionResolver);
    }
};
CustomerPlansRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.groupBenefitz')),
    tslib_1.__param(1, repository_1.repository.getter('InsurancePlansRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.GroupBenefitzDataSource, Function])
], CustomerPlansRepository);
exports.CustomerPlansRepository = CustomerPlansRepository;
//# sourceMappingURL=customer-plans.repository.js.map