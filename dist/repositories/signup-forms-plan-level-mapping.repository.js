"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupFormsPlanLevelMappingRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let SignupFormsPlanLevelMappingRepository = class SignupFormsPlanLevelMappingRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, planLevelRepositoryGetter) {
        super(models_1.SignupFormsPlanLevelMapping, dataSource);
        this.planLevelRepositoryGetter = planLevelRepositoryGetter;
        this.planLevels = this.createBelongsToAccessorFor('planLevels', planLevelRepositoryGetter);
        this.registerInclusionResolver('planLevels', this.planLevels.inclusionResolver);
    }
};
SignupFormsPlanLevelMappingRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.groupBenefitz')),
    tslib_1.__param(1, repository_1.repository.getter('PlanLevelRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.GroupBenefitzDataSource, Function])
], SignupFormsPlanLevelMappingRepository);
exports.SignupFormsPlanLevelMappingRepository = SignupFormsPlanLevelMappingRepository;
//# sourceMappingURL=signup-forms-plan-level-mapping.repository.js.map