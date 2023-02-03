"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlansAvailabilityRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let PlansAvailabilityRepository = class PlansAvailabilityRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, statesAndProvincesRepositoryGetter, insurancePlansRepositoryGetter) {
        super(models_1.PlansAvailability, dataSource);
        this.statesAndProvincesRepositoryGetter = statesAndProvincesRepositoryGetter;
        this.insurancePlansRepositoryGetter = insurancePlansRepositoryGetter;
        this.plan = this.createBelongsToAccessorFor('plan', insurancePlansRepositoryGetter);
        this.registerInclusionResolver('plan', this.plan.inclusionResolver);
        this.state = this.createBelongsToAccessorFor('state', statesAndProvincesRepositoryGetter);
        this.registerInclusionResolver('state', this.state.inclusionResolver);
    }
};
PlansAvailabilityRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.groupBenefitz')),
    tslib_1.__param(1, repository_1.repository.getter('StatesAndProvincesRepository')),
    tslib_1.__param(2, repository_1.repository.getter('InsurancePlansRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.GroupBenefitzDataSource, Function, Function])
], PlansAvailabilityRepository);
exports.PlansAvailabilityRepository = PlansAvailabilityRepository;
//# sourceMappingURL=plans-availability.repository.js.map