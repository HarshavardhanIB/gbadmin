"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatesAndProvincesRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let StatesAndProvincesRepository = class StatesAndProvincesRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, plansAvailabilityRepositoryGetter) {
        super(models_1.StatesAndProvinces, dataSource);
        this.plansAvailabilityRepositoryGetter = plansAvailabilityRepositoryGetter;
        this.planAvailability = this.createHasManyRepositoryFactoryFor('planAvailability', plansAvailabilityRepositoryGetter);
        this.registerInclusionResolver('planAvailability', this.planAvailability.inclusionResolver);
    }
};
StatesAndProvincesRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.gbadmin')),
    tslib_1.__param(1, repository_1.repository.getter('PlansAvailabilityRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.GbadminDataSource, Function])
], StatesAndProvincesRepository);
exports.StatesAndProvincesRepository = StatesAndProvincesRepository;
//# sourceMappingURL=states-and-provinces.repository.js.map