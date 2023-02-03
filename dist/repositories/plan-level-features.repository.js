"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanLevelFeaturesRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let PlanLevelFeaturesRepository = class PlanLevelFeaturesRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, planFeaturesRepositoryGetter) {
        super(models_1.PlanLevelFeatures, dataSource);
        this.planFeaturesRepositoryGetter = planFeaturesRepositoryGetter;
        this.feature = this.createBelongsToAccessorFor('feature', planFeaturesRepositoryGetter);
        this.registerInclusionResolver('feature', this.feature.inclusionResolver);
    }
};
PlanLevelFeaturesRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.groupBenefitz')),
    tslib_1.__param(1, repository_1.repository.getter('PlanFeaturesRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.GroupBenefitzDataSource, Function])
], PlanLevelFeaturesRepository);
exports.PlanLevelFeaturesRepository = PlanLevelFeaturesRepository;
//# sourceMappingURL=plan-level-features.repository.js.map