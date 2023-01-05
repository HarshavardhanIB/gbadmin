"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanLevelRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let PlanLevelRepository = class PlanLevelRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, insurancePlansRepositoryGetter) {
        super(models_1.PlanLevel, dataSource);
        this.insurancePlansRepositoryGetter = insurancePlansRepositoryGetter;
        this.plans = this.createHasManyRepositoryFactoryFor('plans', insurancePlansRepositoryGetter);
        this.registerInclusionResolver('plans', this.plans.inclusionResolver);
    }
};
PlanLevelRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.gbadmin')),
    tslib_1.__param(1, repository_1.repository.getter('InsurancePlansRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.GbadminDataSource, Function])
], PlanLevelRepository);
exports.PlanLevelRepository = PlanLevelRepository;
//# sourceMappingURL=plan-level.repository.js.map