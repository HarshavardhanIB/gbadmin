"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsurancePackagesRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let InsurancePackagesRepository = class InsurancePackagesRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, insurancePlansRepositoryGetter, planLevelRepositoryGetter) {
        super(models_1.InsurancePackages, dataSource);
        this.insurancePlansRepositoryGetter = insurancePlansRepositoryGetter;
        this.planLevelRepositoryGetter = planLevelRepositoryGetter;
        this.planGroups = this.createHasManyThroughRepositoryFactoryFor('planGroups', planLevelRepositoryGetter, insurancePlansRepositoryGetter);
        this.registerInclusionResolver('planGroups', this.planGroups.inclusionResolver);
        this.plans = this.createHasManyRepositoryFactoryFor('plans', insurancePlansRepositoryGetter);
        this.registerInclusionResolver('plans', this.plans.inclusionResolver);
    }
};
InsurancePackagesRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.groupBenefitz')),
    tslib_1.__param(1, repository_1.repository.getter('InsurancePlansRepository')),
    tslib_1.__param(2, repository_1.repository.getter('PlanLevelRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.GroupBenefitzDataSource, Function, Function])
], InsurancePackagesRepository);
exports.InsurancePackagesRepository = InsurancePackagesRepository;
//# sourceMappingURL=insurance-packages.repository.js.map