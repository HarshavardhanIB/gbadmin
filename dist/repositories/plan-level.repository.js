"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanLevelRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let PlanLevelRepository = class PlanLevelRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, insurancePlansRepositoryGetter, greenshieldPlanLevelMappingRepositoryGetter, planLevelFeaturesRepositoryGetter, planFeaturesRepositoryGetter, equitablePlanLevelMappingRepositoryGetter) {
        super(models_1.PlanLevel, dataSource);
        this.insurancePlansRepositoryGetter = insurancePlansRepositoryGetter;
        this.greenshieldPlanLevelMappingRepositoryGetter = greenshieldPlanLevelMappingRepositoryGetter;
        this.planLevelFeaturesRepositoryGetter = planLevelFeaturesRepositoryGetter;
        this.planFeaturesRepositoryGetter = planFeaturesRepositoryGetter;
        this.equitablePlanLevelMappingRepositoryGetter = equitablePlanLevelMappingRepositoryGetter;
        this.equitablePackages = this.createHasManyRepositoryFactoryFor('equitablePackages', equitablePlanLevelMappingRepositoryGetter);
        this.registerInclusionResolver('equitablePackages', this.equitablePackages.inclusionResolver);
        this.planFeatures = this.createHasManyThroughRepositoryFactoryFor('planFeatures', planFeaturesRepositoryGetter, planLevelFeaturesRepositoryGetter);
        this.registerInclusionResolver('planFeatures', this.planFeatures.inclusionResolver);
        this.planLevelFeatures = this.createHasManyRepositoryFactoryFor('planLevelFeatures', planLevelFeaturesRepositoryGetter);
        this.registerInclusionResolver('planLevelFeatures', this.planLevelFeatures.inclusionResolver);
        this.greenshieldPackages = this.createHasManyRepositoryFactoryFor('greenshieldPackages', greenshieldPlanLevelMappingRepositoryGetter);
        this.registerInclusionResolver('greenshieldPackages', this.greenshieldPackages.inclusionResolver);
        this.plans = this.createHasManyRepositoryFactoryFor('plans', insurancePlansRepositoryGetter);
        this.registerInclusionResolver('plans', this.plans.inclusionResolver);
    }
};
PlanLevelRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.groupBenefitz')),
    tslib_1.__param(1, repository_1.repository.getter('InsurancePlansRepository')),
    tslib_1.__param(2, repository_1.repository.getter('GreenshieldPlanLevelMappingRepository')),
    tslib_1.__param(3, repository_1.repository.getter('PlanLevelFeaturesRepository')),
    tslib_1.__param(4, repository_1.repository.getter('PlanFeaturesRepository')),
    tslib_1.__param(5, repository_1.repository.getter('EquitablePlanLevelMappingRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.GroupBenefitzDataSource, Function, Function, Function, Function, Function])
], PlanLevelRepository);
exports.PlanLevelRepository = PlanLevelRepository;
//# sourceMappingURL=plan-level.repository.js.map