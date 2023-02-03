"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokerLicensedStatesAndProvincesRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let BrokerLicensedStatesAndProvincesRepository = class BrokerLicensedStatesAndProvincesRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, statesAndProvincesRepositoryGetter) {
        super(models_1.BrokerLicensedStatesAndProvinces, dataSource);
        this.statesAndProvincesRepositoryGetter = statesAndProvincesRepositoryGetter;
        this.stateFullDetails = this.createBelongsToAccessorFor('stateFullDetails', statesAndProvincesRepositoryGetter);
        this.registerInclusionResolver('stateFullDetails', this.stateFullDetails.inclusionResolver);
    }
};
BrokerLicensedStatesAndProvincesRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.groupBenefitz')),
    tslib_1.__param(1, repository_1.repository.getter('StatesAndProvincesRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.GroupBenefitzDataSource, Function])
], BrokerLicensedStatesAndProvincesRepository);
exports.BrokerLicensedStatesAndProvincesRepository = BrokerLicensedStatesAndProvincesRepository;
//# sourceMappingURL=broker-licensed-states-and-provinces.repository.js.map