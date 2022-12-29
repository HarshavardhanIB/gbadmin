"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokerSignupformsPlanlevelsRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let BrokerSignupformsPlanlevelsRepository = class BrokerSignupformsPlanlevelsRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, planLevelRepositoryGetter) {
        super(models_1.BrokerSignupformsPlanlevels, dataSource);
        this.planLevelRepositoryGetter = planLevelRepositoryGetter;
        this.planLevels = this.createBelongsToAccessorFor('planLevels', planLevelRepositoryGetter);
        this.registerInclusionResolver('planLevels', this.planLevels.inclusionResolver);
    }
};
BrokerSignupformsPlanlevelsRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.gbadmin')),
    tslib_1.__param(1, repository_1.repository.getter('PlanLevelRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.GbadminDataSource, Function])
], BrokerSignupformsPlanlevelsRepository);
exports.BrokerSignupformsPlanlevelsRepository = BrokerSignupformsPlanlevelsRepository;
//# sourceMappingURL=broker-signupforms-planlevels.repository.js.map